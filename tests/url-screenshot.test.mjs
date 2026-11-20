import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeScreenshotUrl, requestUrlScreenshot, UrlScreenshotError } from '../src/lib/urlScreenshot.js';

test('normalizeScreenshotUrl adds https:// and rejects non-web URLs', () => {
    assert.equal(normalizeScreenshotUrl('example.com'), 'https://example.com/');
    assert.equal(normalizeScreenshotUrl('  https://example.com/path?q=1  '), 'https://example.com/path?q=1');
    assert.equal(normalizeScreenshotUrl('http://example.com'), 'http://example.com/');
    assert.equal(normalizeScreenshotUrl('ftp://example.com'), null);
    assert.equal(normalizeScreenshotUrl('example.com:8080'), null);
    assert.equal(normalizeScreenshotUrl(''), null);
    assert.equal(normalizeScreenshotUrl('not a url'), null);
    assert.equal(normalizeScreenshotUrl(null), null);
});

const okResponse = blob => ({
    ok: true,
    status: 200,
    headers: { get: () => null },
    blob: async () => blob,
});

const errorResponse = ({ status, code, message, retryAfter }) => ({
    ok: false,
    status,
    headers: { get: name => (name === 'Retry-After' ? retryAfter ?? null : null) },
    json: async () => ({ error: { message, code } }),
});

test('a valid request POSTs url, time and signature as JSON', async () => {
    const calls = [];
    const fetchImpl = async (url, init) => {
        calls.push([url, init]);
        return okResponse(new Blob(['png'], { type: 'image/png' }));
    };
    const blob = await requestUrlScreenshot('example.com', {
        fetchImpl,
        sign: async ({ t, m }) => `sig-${t}-${m}`,
    });
    assert.equal(blob.size, 3);
    assert.equal(calls.length, 1);
    assert.equal(calls[0][0], '/api/screenshot');
    assert.equal(calls[0][1].method, 'POST');
    const body = JSON.parse(calls[0][1].body);
    assert.equal(body.url, 'https://example.com/');
    assert.equal(typeof body.time, 'number');
    assert.equal(body.sign, `sig-${body.time}-https://example.com/`);
});

test('an invalid URL never reaches the server', async () => {
    let called = false;
    await assert.rejects(
        requestUrlScreenshot('ftp://example.com', { fetchImpl: async () => { called = true; } }),
        error => error instanceof UrlScreenshotError && error.code === 'invalid_url',
    );
    assert.equal(called, false);
});

test('a 429 maps to rate_limited with the Retry-After seconds', async () => {
    await assert.rejects(
        requestUrlScreenshot('https://example.com', {
            fetchImpl: async () => errorResponse({ status: 429, code: 'rate_limited', message: 'Too many.', retryAfter: '120' }),
            sign: async () => 'sig',
        }),
        error => error instanceof UrlScreenshotError
            && error.code === 'rate_limited'
            && error.retryAfterSeconds === 120,
    );
});

test('other server errors forward the server code', async () => {
    await assert.rejects(
        requestUrlScreenshot('https://example.com', {
            fetchImpl: async () => errorResponse({ status: 402, code: 'insufficient_credits', message: 'No credits.' }),
            sign: async () => 'sig',
        }),
        error => error instanceof UrlScreenshotError && error.code === 'insufficient_credits',
    );
});

test('a failed fetch becomes request_failed', async () => {
    await assert.rejects(
        requestUrlScreenshot('https://example.com', {
            fetchImpl: async () => { throw new Error('down'); },
            sign: async () => 'sig',
        }),
        error => error instanceof UrlScreenshotError && error.code === 'request_failed',
    );
});
