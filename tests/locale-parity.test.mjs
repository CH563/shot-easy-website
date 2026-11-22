import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CONFIG } from '../src/lib/config.js';

// Regression tests for the 2026-11-22 locale-consistency report: the header
// nav showed 5 fewer links in 10 locales, /<locale>/convert/ rendered a
// white "Internal server error" page in de/pt-br/hi/ko/id/zh-CN, and the
// ru/uk article slugs redirected every other locale to a Russian/Ukrainian
// tool page. Note the convert error pages returned HTTP 200 with the error
// as the body, so status-only checks cannot catch a recurrence — the
// dev-server test below asserts on the response body, not just the status.

const root = new URL('..', import.meta.url).pathname;
const read = (p) => readFileSync(join(root, p), 'utf8');

test('Header merges the nav with the English fallback so every locale shows all links', () => {
    const src = read('src/components/Header.astro');
    assert.match(src, /\{\s*\.\.\.getLang\('en'\)\.nav,\s*\.\.\.l\.nav\s*\}/);
});

test('Footer merges the nav with the English fallback and lists PDF/QR tools unconditionally', () => {
    const src = read('src/components/Footer.astro');
    assert.match(src, /\{\s*\.\.\.getLang\('en'\)\.nav,\s*\.\.\.l\.nav\s*\}/);
    assert.doesNotMatch(src, /if \(l\.nav\.pdfTools\)/);
    assert.doesNotMatch(src, /if \(l\.nav\.qrCode\)/);
});

test('Convert page falls back to the English copy for groups, modes and the directory title', () => {
    const src = read('src/components/ConvertPage.astro');
    assert.match(src, /getLang\('en'\)\.convert/);
    assert.match(src, /modes:\s*\{\s*\.\.\.enConvert\.tool\.modes/);
    assert.match(src, /groups:\s*\{\s*\.\.\.enConvert\.tool\.groups/);
    assert.match(src, /convertersTitle\s*=\s*t\.convertersTitle \|\| enConvert\.convertersTitle/);
    assert.doesNotMatch(src, /t\.tool\.groups\[group\]/);
    assert.doesNotMatch(src, /copy=\{t\.tool\}/);
});

test('cluster landing redirects land on the requested locale tool page, never a hardcoded /ru/ or /uk/', () => {
    const dir = join(root, 'src/pages/[locale]');
    const shells = readdirSync(dir).filter((d) => /^(kak|yak|obrezat|redaktor)/.test(d));
    assert.ok(shells.length >= 14, `expected 14 cluster shells, found ${shells.length}`);
    for (const shell of shells) {
        const src = read(`src/pages/[locale]/${shell}/index.astro`);
        assert.doesNotMatch(src, /Astro\.redirect\('\/ru\//, `${shell}: hardcoded /ru/ redirect`);
        assert.doesNotMatch(src, /Astro\.redirect\('\/uk\//, `${shell}: hardcoded /uk/ redirect`);
        assert.match(src, /Astro\.redirect\(`\/\$\{locale\}\//, `${shell}: redirect must use the requested locale`);
    }
});

const baseUrl = process.env.LOCALE_PARITY_BASE_URL;

test('every locale homepage shows all 17 header links and every locale convert page renders the full directory', { skip: !baseUrl }, async () => {
    const toolPaths = [
        '/take-a-screenshot/', '/screenshot-beautifier/', '/long-image/', '/camera-effects/',
        '/photo-to-rounded/', '/background-remover/', '/blur-background-online/', '/image-compressor/',
        '/convert/', '/video-convert/', '/viewer/', '/pdf-tools/', '/pdf-split/',
        '/ocr-pdf/', '/qr-code-generator/', '/qr-scanner/'
    ];
    for (const locale of CONFIG.locals) {
        const prefix = locale === 'en' ? '' : `/${locale}`;
        const home = await fetch(new URL(`${prefix}/`, baseUrl), { signal: AbortSignal.timeout(30000) });
        assert.equal(home.status, 200, `${prefix}/`);
        const homeHtml = await home.text();
        assert.doesNotMatch(homeHtml, /Internal server error/, `${prefix}/ body`);
        const header = homeHtml.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)[1];
        for (const tool of toolPaths) {
            assert.ok(header.includes(`href="${prefix}${tool}"`), `${prefix}/ header missing ${tool}`);
        }
        const convert = await fetch(new URL(`${prefix}/convert/`, baseUrl), { signal: AbortSignal.timeout(30000) });
        assert.equal(convert.status, 200, `${prefix}/convert/`);
        const convertHtml = await convert.text();
        assert.doesNotMatch(convertHtml, /Internal server error/, `${prefix}/convert/ body`);
        for (const mode of ['image-to-webp', 'pdf-to-images', 'json-to-csv', 'md-to-html']) {
            assert.ok(convertHtml.includes(`/convert/${mode}/`), `${prefix}/convert/ missing ${mode} link`);
        }
    }
});

test('cluster slugs in another locale redirect to that locale tool page', { skip: !baseUrl }, async () => {
    const cases = [
        ['/de/kak-otkryt-docx/', '/de/doc-viewer/'],
        ['/ja/kak-sdelat-skrinshot/', '/ja/take-a-screenshot/'],
        ['/de/yak-vidkryty-docx/', '/de/doc-viewer/'],
        ['/pt-br/kak-otkryt-prezentatsiyu/', '/pt-br/ppt-viewer/']
    ];
    for (const [path, expected] of cases) {
        const response = await fetch(new URL(path, baseUrl), { redirect: 'manual', signal: AbortSignal.timeout(30000) });
        assert.equal(response.status, 301, path);
        assert.equal(response.headers.get('location'), expected, path);
    }
});
