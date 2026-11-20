// Server-side AdsCrawl client (screenshot). The API key is server-side only:
// it is read from ADSCRAWL_API_KEY and never sent to the browser.
// API contract: https://docs.adscrawl.net/api-reference/screenshot
// POST /screenshot returns a PNG binary stream; 1 credit per request,
// deducted after validation, so a request is never retried blindly.

export const ADSCRAWL_API_URL = 'https://api.adscrawl.net';
export const ADSCRAWL_MAX_TIMEOUT_MS = 3600000;

// Bound for the HTTP request itself. The task timeout (timeoutMs) can be
// longer on the server, but a Vercel function cannot wait on it indefinitely.
const CLIENT_TIMEOUT_MS = 120000;

const WAIT_UNTIL_VALUES = new Set(['domcontentloaded', 'load', 'networkidle']);

export class AdsCrawlError extends Error {
    constructor(status, code, message, details = undefined) {
        super(message);
        this.name = 'AdsCrawlError';
        // HTTP status the API route should return to its caller.
        this.status = status;
        this.code = code;
        if (details !== undefined) this.details = details;
    }
}

function isHttpUrl(value) {
    if (typeof value !== 'string' || !value) return false;
    let parsed;
    try {
        parsed = new URL(value);
    } catch {
        return false;
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    // The API only serves port 80 / 443.
    if (parsed.port && parsed.port !== '80' && parsed.port !== '443') return false;
    return true;
}

function isPositiveInteger(value) {
    return Number.isInteger(value) && value > 0;
}

// Validate the caller-supplied options and build the exact JSON body sent
// to POST /screenshot. Unknown fields are dropped, never forwarded.
export function buildScreenshotRequest(options = {}) {
    const { url, viewport, fullPage, selector, waitUntil, timeoutMs, locale, timezone } = options;
    if (!isHttpUrl(url)) {
        throw new AdsCrawlError(400, 'invalid_url', 'url must be a reachable HTTP(S) URL on port 80 or 443.');
    }
    const body = { url };
    if (viewport !== undefined) {
        if (typeof viewport !== 'object' || viewport === null || !isPositiveInteger(viewport.width) || !isPositiveInteger(viewport.height)) {
            throw new AdsCrawlError(400, 'invalid_viewport', 'viewport must be an object with positive integer width and height.');
        }
        body.viewport = { width: viewport.width, height: viewport.height };
    }
    if (fullPage !== undefined) {
        if (typeof fullPage !== 'boolean') {
            throw new AdsCrawlError(400, 'invalid_full_page', 'fullPage must be a boolean.');
        }
        body.fullPage = fullPage;
    }
    if (selector !== undefined) {
        if (typeof selector !== 'string' || !selector.trim()) {
            throw new AdsCrawlError(400, 'invalid_selector', 'selector must be a non-empty CSS selector string.');
        }
        body.selector = selector;
    }
    if (waitUntil !== undefined) {
        if (!WAIT_UNTIL_VALUES.has(waitUntil)) {
            throw new AdsCrawlError(400, 'invalid_wait_until', 'waitUntil must be domcontentloaded, load, or networkidle.');
        }
        body.waitUntil = waitUntil;
    }
    if (timeoutMs !== undefined) {
        if (!isPositiveInteger(timeoutMs) || timeoutMs > ADSCRAWL_MAX_TIMEOUT_MS) {
            throw new AdsCrawlError(400, 'invalid_timeout', `timeoutMs must be a positive integer no greater than ${ADSCRAWL_MAX_TIMEOUT_MS}.`);
        }
        body.timeoutMs = timeoutMs;
    }
    if (locale !== undefined) {
        if (typeof locale !== 'string' || !locale.trim()) {
            throw new AdsCrawlError(400, 'invalid_locale', 'locale must be a non-empty string such as en-US.');
        }
        body.locale = locale;
    }
    if (timezone !== undefined) {
        if (typeof timezone !== 'string' || !timezone.trim()) {
            throw new AdsCrawlError(400, 'invalid_timezone', 'timezone must be a non-empty IANA identifier such as Asia/Shanghai.');
        }
        body.timezone = timezone;
    }
    return body;
}

async function readErrorBody(response) {
    try {
        const text = await response.text();
        if (!text) return {};
        try {
            return JSON.parse(text);
        } catch {
            return { message: text.slice(0, 300) };
        }
    } catch {
        return {};
    }
}

function mapUpstreamError(status, errorBody) {
    const code = typeof errorBody?.code === 'string' ? errorBody.code : undefined;
    const message = typeof errorBody?.message === 'string' && errorBody.message
        ? errorBody.message
        : `Screenshot request failed with HTTP ${status}.`;
    if (status === 401) {
        return new AdsCrawlError(502, 'invalid_api_key', 'The configured AdsCrawl API key was rejected.');
    }
    if (status === 402) {
        const details = {};
        if (typeof errorBody?.balance === 'number') details.balance = errorBody.balance;
        if (typeof errorBody?.requiredCredits === 'number') details.requiredCredits = errorBody.requiredCredits;
        return new AdsCrawlError(402, 'insufficient_credits', 'Insufficient AdsCrawl credits for this screenshot.', details);
    }
    if (status === 422) {
        if (code === 'CONTENT_SELECTOR_NOT_FOUND') {
            return new AdsCrawlError(422, 'CONTENT_SELECTOR_NOT_FOUND', 'The selector did not match any element on the page.');
        }
        return new AdsCrawlError(422, code ?? 'invalid_request', message);
    }
    if (status === 429) {
        return new AdsCrawlError(429, 'rate_limited', 'Screenshot requests are rate limited. Try again later.');
    }
    if (status === 504) {
        return new AdsCrawlError(504, 'upstream_timeout', 'The screenshot task timed out.');
    }
    return new AdsCrawlError(502, code ?? 'upstream_error', message);
}

// Capture a screenshot of a URL. Returns { buffer: ArrayBuffer, contentType }.
// Makes exactly one request: a retry would spend another credit.
export async function captureScreenshot(options = {}, { apiKey, apiUrl = ADSCRAWL_API_URL, fetchImpl = fetch } = {}) {
    if (typeof apiKey !== 'string' || !apiKey) {
        throw new AdsCrawlError(502, 'missing_api_key', 'ADSCRAWL_API_KEY is not configured on the server.');
    }
    const body = buildScreenshotRequest(options);
    const clientTimeoutMs = Math.min(body.timeoutMs ?? 60000, CLIENT_TIMEOUT_MS);
    let response;
    try {
        response = await fetchImpl(`${apiUrl}/screenshot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(clientTimeoutMs),
        });
    } catch (error) {
        if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
            throw new AdsCrawlError(504, 'request_timeout', 'The screenshot request timed out.');
        }
        throw new AdsCrawlError(502, 'network_error', 'Could not reach the AdsCrawl API.');
    }
    if (!response.ok) {
        throw mapUpstreamError(response.status, await readErrorBody(response));
    }
    const contentType = response.headers?.get?.('content-type') ?? '';
    if (!contentType.includes('image/png')) {
        throw new AdsCrawlError(502, 'invalid_response', 'AdsCrawl did not return a PNG screenshot.');
    }
    const buffer = await response.arrayBuffer();
    if (!buffer || buffer.byteLength === 0) {
        throw new AdsCrawlError(502, 'empty_response', 'AdsCrawl returned an empty screenshot.');
    }
    return { buffer, contentType: 'image/png' };
}
