import test from 'node:test';
import assert from 'node:assert/strict';
import { createRateLimiter, getClientIp } from '../src/lib/rateLimit.js';

const windowMs = 10 * 60 * 1000;

test('allows up to max requests, then blocks with a retry-after', () => {
    let now = 0;
    const limiter = createRateLimiter({ max: 5, windowMs, now: () => now });
    for (let i = 0; i < 5; i++) {
        assert.deepEqual(limiter.check('1.2.3.4'), { allowed: true });
    }
    const blocked = limiter.check('1.2.3.4');
    assert.equal(blocked.allowed, false);
    assert.equal(blocked.retryAfterSeconds, 600);
});

test('the window slides: old hits expire and the limit resets', () => {
    let now = 0;
    const limiter = createRateLimiter({ max: 2, windowMs, now: () => now });
    assert.deepEqual(limiter.check('1.2.3.4'), { allowed: true });
    now += 1000;
    assert.deepEqual(limiter.check('1.2.3.4'), { allowed: true });
    assert.equal(limiter.check('1.2.3.4').allowed, false);
    now += windowMs;
    assert.deepEqual(limiter.check('1.2.3.4'), { allowed: true });
});

test('retry-after counts down from the oldest hit in the window', () => {
    let now = 0;
    const limiter = createRateLimiter({ max: 1, windowMs, now: () => now });
    assert.deepEqual(limiter.check('1.2.3.4'), { allowed: true });
    now += 90 * 1000;
    assert.equal(limiter.check('1.2.3.4').retryAfterSeconds, 510);
});

test('limits are per IP, not global', () => {
    let now = 0;
    const limiter = createRateLimiter({ max: 1, windowMs, now: () => now });
    assert.deepEqual(limiter.check('1.1.1.1'), { allowed: true });
    assert.equal(limiter.check('1.1.1.1').allowed, false);
    assert.deepEqual(limiter.check('2.2.2.2'), { allowed: true });
});

test('getClientIp prefers x-real-ip, then the first forwarded address', () => {
    const headers = values => ({ get: name => values[name.toLowerCase()] ?? null });
    assert.equal(getClientIp({ headers: headers({ 'x-real-ip': '9.9.9.9', 'x-forwarded-for': '1.1.1.1, 2.2.2.2' }) }), '9.9.9.9');
    assert.equal(getClientIp({ headers: headers({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2' }) }), '1.1.1.1');
    assert.equal(getClientIp({ headers: headers({}) }, '3.3.3.3'), '3.3.3.3');
    assert.equal(getClientIp({ headers: headers({}) }), 'unknown');
});
