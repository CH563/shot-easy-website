import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { getViewerLandingContent } from '../src/lib/viewerLandingContent.js';
import { getViewerAliasMeta } from '../src/lib/viewerAliasMeta.js';
import { getScreenshotToolCopy, getCaptureErrorKey } from '../src/lib/screenshotToolCopy.js';
import { CONFIG, LANGUAGES_CODE } from '../src/lib/config.js';

const targets = [['ru', 'doc-viewer', 'DOCX'], ['uk', 'ppt-viewer', 'PPTX'], ['fr', 'excel-viewer', 'XLSX']];

test('each priority landing has format-specific metadata, steps, limits and FAQs', () => {
    for (const [locale, alias, format] of targets) {
        const copy = getViewerLandingContent(locale, alias);
        const meta = getViewerAliasMeta({}, alias, locale);
        assert.equal(meta.title, copy.title);
        assert.equal(meta.description, copy.description);
        assert.equal(meta.tip, copy.intro);
        assert.ok(meta.h1.includes(format));
        assert.doesNotMatch(meta.title, /viewer/i);
        assert.equal(copy.steps.length, 3);
        assert.equal(copy.limits.length, 4);
        assert.equal(copy.faqs.length, 4);
        assert.ok(copy.tool.emptyTitle.includes(format));
        assert.ok(copy.featureList.length);
    }
});

test('other viewer routes retain their original metadata and do not inherit targeted copy', () => {
    const base = { description: 'Generic viewer', keywords: 'viewer' };
    assert.equal(getViewerLandingContent('en', 'doc-viewer'), undefined);
    assert.equal(getViewerLandingContent('ru', 'ppt-viewer'), undefined);
    assert.equal(getViewerAliasMeta(base, 'viewer', 'ru'), base);
    assert.match(getViewerAliasMeta(base, 'doc-viewer', 'en').title, /^DOCX Viewer Online/);
});

test('Russian and Ukrainian screenshot controls and errors have complete localized copy', () => {
    const en = getScreenshotToolCopy();
    for (const locale of ['ru', 'uk']) {
        const copy = getScreenshotToolCopy(locale);
        assert.deepEqual(Object.keys(copy).sort(), Object.keys(en).sort());
        for (const [key, value] of Object.entries(copy)) {
            assert.ok(value && value !== en[key], `${locale}:${key}`);
        }
    }
    assert.equal(getScreenshotToolCopy('de'), en);
    assert.equal(getCaptureErrorKey({ name: 'NotAllowedError' }), 'captureDenied');
    assert.equal(getCaptureErrorKey({ name: 'NotSupportedError' }), 'captureUnsupported');
    assert.equal(getCaptureErrorKey({ name: 'NotReadableError' }), 'captureFailed');
});

test('capture releases all tracks on success or video failure, preserving other callers', async () => {
    const source = await readFile(new URL('../src/lib/utils.js', import.meta.url), 'utf8');
    const code = source.slice(source.indexOf('export const captureScreen'), source.indexOf('export function splitFileName'))
        .replace('export const captureScreen', 'globalThis.captureScreen');
    for (const videoFails of [false, true]) {
        let stopped = 0;
        const video = { play: async () => { if (videoFails) throw new Error('Video failure'); }, videoWidth: 10, videoHeight: 10 };
        const sandbox = {
            navigator: { mediaDevices: { getDisplayMedia: async () => ({ getTracks: () => [{ stop: () => stopped++ }] }) } },
            document: { createElement: tag => tag === 'video' ? video : { getContext: () => ({ drawImage() {} }), toDataURL: () => 'data:image/png;base64,test' } },
            console: { log() {} }
        };
        vm.runInNewContext(code, sandbox);
        if (videoFails) await assert.rejects(sandbox.captureScreen({ throwOnError: true }), /Video failure/);
        else assert.match(await sandbox.captureScreen({ throwOnError: true }), /^data:image\/png/);
        assert.equal(stopped, 1);
        assert.equal(video.srcObject, null);
        if (videoFails) assert.equal(await sandbox.captureScreen(), undefined);
    }
});

const baseUrl = process.env.SEO_BASE_URL;
const htmlFor = async path => {
    const response = await fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, path);
    return response.text();
};
const schemas = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(([, value]) => { const schema = JSON.parse(value); return schema['@graph'] || [schema]; });
const alternateLinks = html => [...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/g)]
    .map(([link]) => ({ href: link.match(/href="([^"]+)"/)[1], language: link.match(/hreflang="([^"]+)"/)[1] }));

test('priority server pages deliver unique copy, early file controls and matching FAQ schema', { skip: !baseUrl }, async () => {
    for (const [locale, alias] of targets) {
        const path = `/${locale}/${alias}/`;
        const html = await htmlFor(`${path}?seo-test=1`);
        const copy = getViewerLandingContent(locale, alias);
        assert.ok(html.includes(`<title>${copy.title}</title>`));
        assert.ok(html.includes(`rel="canonical" href="${CONFIG.website}${path}"`));
        assert.equal((html.match(/<h1\b/g) || []).length, 1);
        assert.ok(html.includes(copy.intro));
        assert.ok(html.includes(copy.stepsTitle));
        assert.ok(html.includes(copy.limitsTitle));
        assert.ok(html.indexOf('id="file-viewer"') < html.indexOf(copy.relatedTitle));
        assert.ok(html.includes(copy.tool.emptyTitle));
        const faq = schemas(html).find(schema => schema['@type'] === 'FAQPage');
        assert.deepEqual(faq.mainEntity.map(item => [item.name, item.acceptedAnswer.text]), copy.faqs.map(item => [item.question, item.answer]));
        const app = schemas(html).find(schema => Array.isArray(schema['@type']) && schema['@type'].includes('WebApplication'));
        assert.deepEqual(app.featureList, copy.featureList);
    }
});

test('screenshot alternates are reciprocal canonical URLs, with no language redirects', { skip: !baseUrl }, async () => {
    const expected = CONFIG.locals.map(locale => ({ language: LANGUAGES_CODE[locale], href: `${CONFIG.website}${locale === 'en' ? '' : `/${locale}`}/take-a-screenshot/` }));
    expected.push({ language: 'x-default', href: `${CONFIG.website}/take-a-screenshot/` });
    for (const locale of CONFIG.locals) {
        const path = `${locale === 'en' ? '' : `/${locale}`}/take-a-screenshot/`;
        const response = await fetch(new URL(path, baseUrl), { redirect: 'manual' });
        assert.equal(response.status, 200, path);
        const html = await response.text();
        assert.ok(html.includes(`rel="canonical" href="${CONFIG.website}${path}"`));
        assert.ok(html.includes(`<html lang="${LANGUAGES_CODE[locale]}"`));
        assert.deepEqual(alternateLinks(html), expected);
        if (['ru', 'uk'].includes(locale)) assert.ok(html.includes(getScreenshotToolCopy(locale).captureDenied));
    }
    const home = await htmlFor('/uk/');
    assert.match(home, /href="\/uk\/take-a-screenshot\/"/);
    const redirect = await fetch(new URL('/uk/take-a-screenshot', baseUrl), { redirect: 'manual' });
    assert.equal(redirect.status, 301);
    assert.ok(redirect.headers.get('location').endsWith('/uk/take-a-screenshot/'));
});

test('generated sitemap lists Ukrainian screenshot and priority landing canonical URLs', { skip: !process.env.SEO_CHECK_BUILD }, async () => {
    const xml = await readFile(new URL('../.vercel/output/static/sitemap-0.xml', import.meta.url), 'utf8');
    for (const path of ['/uk/take-a-screenshot/', ...targets.map(([locale, alias]) => `/${locale}/${alias}/`)]) {
        assert.ok(xml.includes(`<loc>${CONFIG.website}${path}</loc>`), path);
    }
});
