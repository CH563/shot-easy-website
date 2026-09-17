import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { CONFIG, LANGUAGES_CODE } from '../src/lib/config.js';
import { homepageCopy } from '../src/lib/homepageCopy.js';
import { SITE_IDENTITY, siteGraph, serializeJsonLd } from '../src/lib/siteIdentity.js';

test('every supported locale has a complete homepage introduction and four answers', () => {
    assert.deepEqual(Object.keys(homepageCopy).sort(), [...CONFIG.locals].sort());
    for (const locale of CONFIG.locals) {
        const copy = homepageCopy[locale];
        assert.ok(copy.intro.includes('ShotEasy'), locale);
        assert.ok(copy.about && copy.contact && copy.faqTitle, locale);
        assert.equal(copy.questions.length, 4, locale);
        for (const [question, answer] of copy.questions) {
            assert.ok(question && answer, locale);
        }
    }
});

test('brand entities have stable production identities and real project links', () => {
    const ids = siteGraph.map(entity => entity['@id']);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(ids.every(id => id.startsWith(`${CONFIG.website}/`)));
    const project = siteGraph.find(entity => entity['@id'] === SITE_IDENTITY.projectId);
    assert.deepEqual(project.sameAs, [SITE_IDENTITY.repository]);
    const website = siteGraph.find(entity => entity['@type'] === 'WebSite');
    assert.equal(website.publisher['@id'], project['@id']);
});

test('JSON-LD serialization cannot close the script element', () => {
    const value = { name: '</script><script>alert(1)</script>', text: '照片 & screenshots' };
    const serialized = serializeJsonLd(value);
    assert.ok(!serialized.includes('<'));
    assert.deepEqual(JSON.parse(serialized), value);
});

test('llms.txt has Markdown discovery links and discloses the processing exception', async () => {
    const text = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8');
    for (const path of ['about/', 'contact/', 'privacy-policy/', 'terms-of-service/', 'blog/', 'ocr-pdf/']) {
        assert.ok(text.includes(`](https://shoteasy.fun/${path})`), path);
    }
    assert.match(text, /separate server-side background-removal API/i);
    assert.doesNotMatch(text, /^- [^\n]*: https:\/\//m);
});

const baseUrl = process.env.GEO_BASE_URL;
const htmlFor = async path => {
    const response = await fetch(new URL(path, baseUrl), { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, path);
    return response.text();
};
const entitiesIn = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(([, json]) => {
        const schema = JSON.parse(json);
        return schema['@graph'] || [schema];
    });
const sharedChecks = (html, path, canonicalPath = path) => {
    assert.equal((html.match(/<h1\b/g) || []).length, 1, path);
    assert.match(html, /<a\b[^>]*href="\/about\/"/, path);
    assert.match(html, /<a\b[^>]*href="\/contact\/"/, path);
    assert.ok(html.includes(`rel="canonical" href="${CONFIG.website}${canonicalPath}"`), path);
    const entities = entitiesIn(html);
    assert.ok(entities.some(entity => entity['@id'] === SITE_IDENTITY.websiteId), path);
    assert.ok(entities.some(entity => entity['@id'] === SITE_IDENTITY.projectId), path);
    return entities;
};

test('server HTML delivers localized answers, linked entities, and no invented ratings', { skip: !baseUrl }, async () => {
    for (const locale of CONFIG.locals) {
        const path = locale === 'en' ? '/' : `/${locale}/`;
        const html = await htmlFor(`${path}?geo-test=1`);
        const entities = sharedChecks(html, path);
        const copy = homepageCopy[locale];
        assert.ok(html.includes(copy.intro), locale);
        assert.ok(html.includes(copy.faqTitle), locale);
        const faqSection = html.match(/<section\b[^>]*aria-labelledby="shoteasy-questions"[^>]*>([\s\S]*?)<\/section>/)[1];
        assert.equal((faqSection.match(/<h3\b/g) || []).length, 4, locale);
        assert.doesNotMatch(faqSection, /<a\b/, locale);
        assert.equal((html.match(/href="\/about\/"/g) || []).length, 1, locale);
        assert.equal((html.match(/href="\/contact\/"/g) || []).length, 1, locale);
        const app = entities.find(entity => entity['@type'] === 'WebApplication');
        assert.equal(app.name, 'ShotEasy');
        assert.equal(app.url, `${CONFIG.website}${path}`);
        assert.equal(app.inLanguage, LANGUAGES_CODE[locale]);
        assert.equal(app.provider['@id'], SITE_IDENTITY.projectId);
        assert.ok(!('aggregateRating' in app));
        assert.ok(!('dateModified' in app));
    }
});

test('trust pages expose matching page schemas, dates, and no fictional translations', { skip: !baseUrl }, async () => {
    for (const [path, type] of [['/about/', 'AboutPage'], ['/contact/', 'ContactPage']]) {
        const html = await htmlFor(path);
        const entities = sharedChecks(html, path);
        const page = entities.find(entity => entity['@type'] === type);
        assert.equal(page.dateModified, SITE_IDENTITY.updatedDate);
        assert.ok(html.includes(`datetime="${SITE_IDENTITY.updatedDate}"`));
        assert.ok(!html.includes('rel="alternate"'));
        assert.ok(html.includes(SITE_IDENTITY.maintainerProfile));
    }
});

test('all privacy routes use the same current disclosure and declare the English content', { skip: !baseUrl }, async () => {
    for (const locale of CONFIG.locals) {
        const path = `${locale === 'en' ? '' : `/${locale}`}/privacy-policy/`;
        const html = await htmlFor(path);
        sharedChecks(html, path, '/privacy-policy/');
        assert.match(html, /<html lang="en-US"/);
        assert.match(html, /Google Tag Manager/);
        assert.match(html, /Google AdSense/);
        assert.match(html, /Vercel Web Analytics/);
        assert.match(html, /remove\.bg/);
        assert.doesNotMatch(html, /deleted automatically after 90 days|only uses <a|complies with GDPR/);
    }
});

test('tool provider references resolve to the shared project entity', { skip: !baseUrl }, async () => {
    for (const path of ['/convert/', '/zh-CN/image-compressor/', '/viewer/']) {
        const entities = sharedChecks(await htmlFor(path), path);
        const app = entities.find(entity => Array.isArray(entity['@type']) && entity['@type'].includes('WebApplication'));
        assert.equal(app.provider['@id'], SITE_IDENTITY.projectId);
        assert.equal(app.isPartOf['@id'], SITE_IDENTITY.websiteId);
        assert.equal(app.url, `${CONFIG.website}${path}`);
    }
});

test('blog attribution resolves to About and preserves its real publication date', { skip: !baseUrl }, async () => {
    const html = await htmlFor('/blog/paddleocr-js-browser-ocr-searchable-pdf/');
    const entities = sharedChecks(html, '/blog/paddleocr-js-browser-ocr-searchable-pdf/');
    assert.match(html, /href="\/about\/" rel="author"/);
    const article = entities.find(entity => entity['@type'] === 'Article');
    assert.equal(article.publisher['@id'], SITE_IDENTITY.projectId);
    assert.equal(article.author[0]['@id'], SITE_IDENTITY.projectId);
    assert.ok(article.datePublished.startsWith('2026-08-11'));
});

test('production sitemap includes trust pages but not duplicate English policy routes', { skip: !process.env.GEO_CHECK_BUILD }, async () => {
    const xml = await readFile(new URL('../.vercel/output/static/sitemap-0.xml', import.meta.url), 'utf8');
    for (const path of ['about/', 'contact/', 'privacy-policy/']) {
        assert.ok(xml.includes(`<loc>${CONFIG.website}/${path}</loc>`), path);
    }
    const policyEntries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
        .map(([, entry]) => entry).filter(entry => entry.includes('/privacy-policy/'));
    assert.equal(policyEntries.length, 1);
    assert.ok(!policyEntries[0].includes('hreflang'));
    for (const [path, type] of [['about', 'AboutPage'], ['contact', 'ContactPage']]) {
        const html = await readFile(new URL(`../.vercel/output/static/${path}/index.html`, import.meta.url), 'utf8');
        const entities = sharedChecks(html, `/${path}/`);
        assert.ok(entities.some(entity => entity['@type'] === type));
    }
});
