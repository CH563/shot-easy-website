// Client-side helper for URL screenshots (POST /api/screenshot).
// The request is signed with the same public scheme as /api/remove-bg:
// { t: Date.now(), m: url } hashed with PUBLIC_SECRET_KEY. The key ships
// to the browser, so the signature only deters hotlinking — the server's
// per-IP rate limit is the real protection.

import { generateSignature } from './auth.js';

export class UrlScreenshotError extends Error {
    constructor(code, message, retryAfterSeconds = undefined) {
        super(message);
        this.name = 'UrlScreenshotError';
        this.code = code;
        if (retryAfterSeconds !== undefined) this.retryAfterSeconds = retryAfterSeconds;
    }
}

// Normalize user input to a full http(s) URL. Returns the URL string, or
// null when the input is not a usable web address. A bare domain gets
// https:// prepended; anything else (ftp:, relative paths, empty) is
// rejected — the server only serves http(s) on ports 80/443.
export function normalizeScreenshotUrl(raw) {
    if (typeof raw !== 'string') return null;
    const trimmed = raw.trim();
    if (!trimmed) return null;
    const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
    let parsed;
    try {
        parsed = new URL(withScheme);
    } catch {
        return null;
    }
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    if (parsed.port && parsed.port !== '80' && parsed.port !== '443') return null;
    return parsed.toString();
}

async function readError(response) {
    try {
        const data = await response.json();
        return data?.error ?? {};
    } catch {
        return {};
    }
}

// Request a server-side screenshot of a URL. Returns the PNG Blob.
// `sign` is injectable so tests can stub the signature; production passes
// generateSignature. Throws UrlScreenshotError with a machine-readable
// code: invalid_url, rate_limited (with retryAfterSeconds), or a code
// forwarded from the server (e.g. insufficient_credits).
export async function requestUrlScreenshot(rawUrl, { fetchImpl = fetch, sign = generateSignature, endpoint = '/api/screenshot' } = {}) {
    const url = normalizeScreenshotUrl(rawUrl);
    if (!url) {
        throw new UrlScreenshotError('invalid_url', 'Enter a valid http(s) URL.');
    }
    const time = Date.now();
    const signValue = await sign({ t: time, m: url });
    let response;
    try {
        response = await fetchImpl(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, time, sign: signValue }),
        });
    } catch {
        throw new UrlScreenshotError('request_failed', 'Could not reach the screenshot service.');
    }
    if (!response.ok) {
        const error = await readError(response);
        if (response.status === 429) {
            const header = Number(response.headers?.get?.('Retry-After'));
            const retryAfterSeconds = Number.isFinite(header) && header > 0 ? header : undefined;
            throw new UrlScreenshotError('rate_limited', error.message || 'Too many screenshot requests.', retryAfterSeconds);
        }
        throw new UrlScreenshotError(error.code || 'request_failed', error.message || 'Screenshot request failed.');
    }
    return response.blob();
}
