import { verifySignature } from '@lib/auth';
import { captureScreenshot, AdsCrawlError } from '@lib/adscrawl';
import { getClientIp, screenshotRateLimiter } from '@lib/rateLimit';

// POST /api/screenshot — server-side screenshot via AdsCrawl.
// Body (JSON): { url, time, sign, fullPage?, selector?, viewport?, waitUntil?, timeoutMs?, locale?, timezone? }
// `time` + `sign` use the same request-signature scheme as /api/remove-bg,
// so the endpoint cannot be hotlinked to spend AdsCrawl credits.
// Rate limit: 5 requests per IP every 10 minutes (see src/lib/rateLimit.js).
// Success: the PNG bytes. Errors: { error: { message, code? } }.
const jsonError = (status, message, code, headers = {}) => new Response(JSON.stringify({
    error: {
        message,
        ...(code ? { code } : {}),
    },
}), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
});

export const POST = async ({ request, clientAddress }) => {
    let payload;
    try {
        payload = await request.json();
    } catch {
        return jsonError(400, 'Request body must be valid JSON.');
    }
    const { url, time, sign, fullPage, selector, viewport, waitUntil, timeoutMs, locale, timezone } = payload ?? {};
    if (typeof url !== 'string' || !url) {
        return jsonError(400, 'url is required.');
    }
    // Counted before the signature check and before any AdsCrawl credit is
    // spent, so invalid or unsigned floods still hit the limit.
    const limit = screenshotRateLimiter.check(getClientIp(request, clientAddress));
    if (!limit.allowed) {
        return jsonError(
            429,
            `Too many screenshot requests. Try again in ${limit.retryAfterSeconds} seconds.`,
            'rate_limited',
            { 'Retry-After': String(limit.retryAfterSeconds) },
        );
    }
    if (!time || !sign) {
        return jsonError(400, 'time and sign are required.');
    }
    const isOk = await verifySignature({ t: time, m: url }, sign);
    if (!isOk) {
        return jsonError(401, 'Invalid signature.');
    }
    try {
        const shot = await captureScreenshot(
            { url, fullPage, selector, viewport, waitUntil, timeoutMs, locale, timezone },
            { apiKey: import.meta.env.ADSCRAWL_API_KEY },
        );
        return new Response(shot.buffer, {
            status: 200,
            headers: {
                'Content-Type': shot.contentType,
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        if (error instanceof AdsCrawlError) {
            return jsonError(error.status, error.message, error.code);
        }
        return jsonError(502, 'Screenshot request failed.');
    }
};
