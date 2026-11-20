// In-memory sliding-window rate limiter for the server-side screenshot
// endpoint. Each screenshot costs one AdsCrawl credit, and the request
// signature uses a key that is shipped to the browser (PUBLIC_SECRET_KEY),
// so the signature alone cannot stop abuse — the per-IP limit is the real
// protection.
//
// Best-effort by design: counters live in this serverless instance only.
// They do not survive a cold start and are not shared between instances,
// so a determined caller can still get more through over time. The limit
// exists to stop casual hotlinking and credit drain, not a distributed
// attack. If abuse grows, move the counters to a shared store (e.g. Vercel
// KV / Upstash Redis) behind the same check() interface.

export const SCREENSHOT_RATE_LIMIT = {
    // 5 URL screenshots per IP every 10 minutes. A human trying a few
    // pages never notices it; a script hammering the endpoint hits 429.
    max: 5,
    windowMs: 10 * 60 * 1000,
};

const MAX_KEYS = 5000;

export function createRateLimiter({ max, windowMs, now = () => Date.now() } = {}) {
    const hits = new Map();
    return {
        check(key) {
            const t = now();
            const recent = (hits.get(key) || []).filter(ts => t - ts < windowMs);
            if (recent.length >= max) {
                const retryAfterMs = windowMs - (t - recent[0]);
                return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
            }
            recent.push(t);
            if (hits.size >= MAX_KEYS && !hits.has(key)) hits.clear();
            hits.set(key, recent);
            return { allowed: true };
        },
    };
}

export const screenshotRateLimiter = createRateLimiter(SCREENSHOT_RATE_LIMIT);

// The connecting IP. Prefer x-real-ip: Vercel sets it to the actual client
// and it cannot be spoofed, unlike x-forwarded-for whose first entry a
// caller can fake. Falls back to the first forwarded address, then to
// Astro's clientAddress.
export function getClientIp(request, clientAddress) {
    const realIp = request.headers.get('x-real-ip');
    if (realIp) return realIp.trim();
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    return clientAddress || 'unknown';
}
