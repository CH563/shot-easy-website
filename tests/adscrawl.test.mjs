import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { AdsCrawlError, buildScreenshotRequest, captureScreenshot } from '../src/lib/adscrawl.js';

const root = new URL('../', import.meta.url);
const textAt = path => readFile(new URL(path, root), 'utf8');

const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x01]).buffer;

function stubResponse({ ok, status, contentType = 'image/png', jsonBody = undefined, textBody = '' }) {
    return {
        ok,
        status,
        headers: { get: name => (name.toLowerCase() === 'content-type' ? contentType : null) },
        json: async () => jsonBody,
        text: async () => (jsonBody === undefined ? textBody : JSON.stringify(jsonBody)),
        arrayBuffer: async () => pngBytes.slice(0),
    };
}

test('buildScreenshotRequest keeps a minimal valid request', () => {
    assert.deepEqual(buildScreenshotRequest({ url: 'https://example.com' }), { url: 'https://example.com' });
});

test('buildScreenshotRequest forwards only documented fields', () => {
    assert.deepEqual(
        buildScreenshotRequest({
            url: 'https://example.com/page',
            viewport: { width: 1280, height: 800 },
            fullPage: false,
            selector: 'main',
            waitUntil: 'networkidle',
            timeoutMs: 30000,
            locale: 'ru-RU',
            timezone: 'Europe/Moscow',
            apiKey: 'must-not-be-forwarded',
        }),
        {
            url: 'https://example.com/page',
            viewport: { width: 1280, height: 800 },
            fullPage: false,
            selector: 'main',
            waitUntil: 'networkidle',
            timeoutMs: 30000,
            locale: 'ru-RU',
            timezone: 'Europe/Moscow',
        },
    );
});

test('buildScreenshotRequest rejects bad URLs and options', () => {
    assert.throws(() => buildScreenshotRequest({}), error => error.code === 'invalid_url');
    assert.throws(() => buildScreenshotRequest({ url: 'ftp://example.com' }), error => error.code === 'invalid_url');
    assert.throws(() => buildScreenshotRequest({ url: 'https://example.com:8080' }), error => error.code === 'invalid_url');
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', viewport: { width: 0, height: 800 } }),
        error => error.code === 'invalid_viewport',
    );
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', viewport: { width: 1280.5, height: 800 } }),
        error => error.code === 'invalid_viewport',
    );
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', fullPage: 'yes' }),
        error => error.code === 'invalid_full_page',
    );
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', selector: '  ' }),
        error => error.code === 'invalid_selector',
    );
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', waitUntil: 'sleep' }),
        error => error.code === 'invalid_wait_until',
    );
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', timeoutMs: 0 }),
        error => error.code === 'invalid_timeout',
    );
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', timeoutMs: 3600001 }),
        error => error.code === 'invalid_timeout',
    );
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', locale: '' }),
        error => error.code === 'invalid_locale',
    );
    assert.throws(
        () => buildScreenshotRequest({ url: 'https://example.com', timezone: '' }),
        error => error.code === 'invalid_timezone',
    );
});

test('captureScreenshot sends one POST with x-api-key and returns the PNG bytes', async () => {
    const calls = [];
    const fetchImpl = async (url, init) => {
        calls.push({ url, init });
        return stubResponse({ ok: true, status: 200 });
    };
    const shot = await captureScreenshot(
        { url: 'https://example.com', viewport: { width: 1280, height: 800 } },
        { apiKey: 'test-key', fetchImpl },
    );
    assert.equal(calls.length, 1, 'exactly one request: a retry would spend another credit');
    assert.equal(calls[0].url, 'https://api.adscrawl.net/screenshot');
    assert.equal(calls[0].init.method, 'POST');
    assert.equal(calls[0].init.headers['x-api-key'], 'test-key');
    assert.equal(JSON.parse(calls[0].init.body).url, 'https://example.com');
    assert.equal(shot.contentType, 'image/png');
    assert.equal(shot.buffer.byteLength, pngBytes.byteLength);
});

test('captureScreenshot refuses to call the API without a key', async () => {
    let called = false;
    await assert.rejects(
        captureScreenshot({ url: 'https://example.com' }, { apiKey: '', fetchImpl: async () => { called = true; } }),
        error => error instanceof AdsCrawlError && error.code === 'missing_api_key',
    );
    assert.equal(called, false);
});

test('captureScreenshot maps upstream failures to useful errors', async () => {
    const cases = [
        {
            response: stubResponse({ ok: false, status: 401, contentType: 'application/json', jsonBody: { code: 'UNAUTHORIZED' } }),
            status: 502,
            code: 'invalid_api_key',
        },
        {
            response: stubResponse({ ok: false, status: 402, contentType: 'application/json', jsonBody: { code: 'INSUFFICIENT_CREDITS', balance: 3, requiredCredits: 1 } }),
            status: 402,
            code: 'insufficient_credits',
        },
        {
            response: stubResponse({ ok: false, status: 422, contentType: 'application/json', jsonBody: { code: 'CONTENT_SELECTOR_NOT_FOUND' } }),
            status: 422,
            code: 'CONTENT_SELECTOR_NOT_FOUND',
        },
        {
            response: stubResponse({ ok: false, status: 429, contentType: 'application/json', jsonBody: { code: 'RATE_LIMITED' } }),
            status: 429,
            code: 'rate_limited',
        },
        {
            response: stubResponse({ ok: false, status: 504, contentType: 'application/json', jsonBody: {} }),
            status: 504,
            code: 'upstream_timeout',
        },
        {
            response: stubResponse({ ok: false, status: 500, contentType: 'application/json', jsonBody: {} }),
            status: 502,
            code: 'upstream_error',
        },
    ];
    for (const { response, status, code } of cases) {
        await assert.rejects(
            captureScreenshot({ url: 'https://example.com' }, { apiKey: 'test-key', fetchImpl: async () => response }),
            error => error instanceof AdsCrawlError && error.status === status && error.code === code,
            `HTTP ${response.status} should map to ${status}/${code}`,
        );
    }
    const insufficient = await captureScreenshot(
        { url: 'https://example.com' },
        {
            apiKey: 'test-key',
            fetchImpl: async () => stubResponse({ ok: false, status: 402, contentType: 'application/json', jsonBody: { code: 'INSUFFICIENT_CREDITS', balance: 3, requiredCredits: 1 } }),
        },
    ).catch(error => error);
    assert.deepEqual(insufficient.details, { balance: 3, requiredCredits: 1 });
});

test('captureScreenshot rejects non-PNG and empty success responses', async () => {
    await assert.rejects(
        captureScreenshot({ url: 'https://example.com' }, {
            apiKey: 'test-key',
            fetchImpl: async () => stubResponse({ ok: true, status: 200, contentType: 'text/html', textBody: '<html>' }),
        }),
        error => error.code === 'invalid_response',
    );
    await assert.rejects(
        captureScreenshot({ url: 'https://example.com' }, {
            apiKey: 'test-key',
            fetchImpl: async () => ({
                ...stubResponse({ ok: true, status: 200 }),
                arrayBuffer: async () => new ArrayBuffer(0),
            }),
        }),
        error => error.code === 'empty_response',
    );
});

test('captureScreenshot turns a fetch timeout into a 504, not a retry', async () => {
    const timeoutError = new DOMException('The operation timed out.', 'TimeoutError');
    await assert.rejects(
        captureScreenshot({ url: 'https://example.com' }, { apiKey: 'test-key', fetchImpl: async () => { throw timeoutError; } }),
        error => error.status === 504 && error.code === 'request_timeout',
    );
    await assert.rejects(
        captureScreenshot({ url: 'https://example.com' }, { apiKey: 'test-key', fetchImpl: async () => { throw new TypeError('fetch failed'); } }),
        error => error.status === 502 && error.code === 'network_error',
    );
});

test('the screenshot route verifies the request signature and returns PNG', async () => {
    const route = await textAt('src/pages/api/screenshot.js');
    assert.match(route, /verifySignature\(\{ t: time, m: url \}, sign\)/);
    assert.match(route, /captureScreenshot\(/);
    assert.match(route, /import\.meta\.env\.ADSCRAWL_API_KEY/);
    assert.match(route, /'Content-Type': shot\.contentType/);
    assert.match(route, /'Cache-Control': 'no-store'/);
    assert.doesNotMatch(route, /ADSCRAWL_API_KEY\s*=\s*['"][^'"]+['"]/);
});

test('example env config carries only an empty placeholder and .env stays ignored', async () => {
    const example = await textAt('.env.example');
    assert.match(example, /^ADSCRAWL_API_KEY=$/m);
    assert.doesNotMatch(example, /ADSCRAWL_API_KEY=\S/);
    const gitignore = await textAt('.gitignore');
    assert.match(gitignore, /^\.env$/m);
});
