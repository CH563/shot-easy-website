import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import vm from 'node:vm';
import { defineMiddleware } from 'astro/middleware';
import { CONFIG } from '../src/lib/config.js';
import { getLocaleSwitcherPath, getRelativeLocaleUrl } from '../src/lib/localePaths.js';

test('navigation URLs point directly to canonical trailing-slash routes', () => {
    assert.equal(getRelativeLocaleUrl('en', '/viewer'), '/viewer/');
    assert.equal(getRelativeLocaleUrl('ru', '/viewer/'), '/ru/viewer/');
    assert.equal(getRelativeLocaleUrl('en-in'), '/en-in/');
    assert.equal(getRelativeLocaleUrl('en'), '/');
});

test('language-switch paths preserve the page for every source and target locale', () => {
    for (const source of CONFIG.locals) {
        for (const target of CONFIG.locals) {
            for (const page of ['', 'take-a-screenshot', 'doc-viewer']) {
                const path = `${source === 'en' ? '' : `/${source}`}/${page}${page ? '/' : ''}`;
                const expected = `${target === 'en' ? '' : `/${target}`}/${page}${page ? '/' : ''}`;
                assert.equal(getLocaleSwitcherPath(path, target), expected);
            }
        }
    }
    assert.equal(getLocaleSwitcherPath('/en-in/viewer/', 'en'), '/viewer/');
    assert.equal(getLocaleSwitcherPath('/ZH-cn/viewer', 'ru'), '/ru/viewer/');
    assert.equal(getLocaleSwitcherPath('/english-guide/', 'ru'), '/ru/english-guide/');
});

const redirects = [
    ['/viewer', '/viewer/'],
    ['/take-a-screenshot?ref=a%2Fb&x=1', '/take-a-screenshot/?ref=a%2Fb&x=1'],
    ['/ru/take-a-screenshot', '/ru/take-a-screenshot/'],
    ['/uk/blog/?page=2', '/blog/?page=2'],
    ['/ru/blog/example/?ref=test', '/blog/example/?ref=test'],
    ['/in/viewer/?ref=test', '/en-in/viewer/?ref=test'],
    ['/PT-BR/viewer/', '/pt-br/viewer/'],
    ['/EN-IN/viewer/', '/en-in/viewer/'],
    ['//untrusted/viewer', '/untrusted/viewer/']
];

test('all middleware redirects stay on the current site, even with an internal localhost origin', async () => {
    // Load the real middleware body with its virtual Astro import supplied by
    // the public runtime export, so this regression check needs no dev server.
    const source = (await readFile(new URL('../src/middleware.js', import.meta.url), 'utf8'))
        .replace(/^import[^\n]+;\s*/gm, '')
        .replace('export const onRequest', 'globalThis.onRequest');
    const sandbox = { defineMiddleware, CONFIG, URL };
    vm.runInNewContext(source, sandbox);
    for (const origin of ['https://localhost', CONFIG.website, 'https://untrusted.invalid']) {
        for (const [path, expected] of redirects) {
            const response = await sandbox.onRequest({
                request: { url: `${origin}${path}` },
                redirect: (location, status) => new Response(null, { status, headers: { location } })
            }, () => new Response(null, { status: 200 }));
            assert.equal(response.status, 301, path);
            assert.equal(response.headers.get('location'), expected, path);
            assert.match(response.headers.get('location'), /^\/(?!\/)/);
        }
    }
});

const baseUrl = process.env.NAVIGATION_BASE_URL;
test('the built Node runtime trusts the production host but rejects arbitrary forwarded hosts', { skip: !process.env.RUNTIME_CHECK_BUILD }, async () => {
    const directory = new URL('../.vercel/output/functions/_render.func/dist/server/', import.meta.url);
    const manifestFile = (await readdir(directory)).find(path => /^manifest.*\.mjs$/.test(path));
    assert.ok(manifestFile);
    const { manifest } = await import(new URL(manifestFile, directory));
    assert.deepEqual(manifest.allowedDomains, [{ hostname: new URL(CONFIG.website).hostname }]);
    const { NodeApp } = await import('astro/app/node');
    const requestWithHost = forwardedHost => NodeApp.createRequest({
        method: 'GET',
        url: '/viewer/',
        headers: { host: 'internal.invalid', 'x-forwarded-host': forwardedHost, 'x-forwarded-proto': 'https' },
        socket: { encrypted: true }
    }, { allowedDomains: manifest.allowedDomains });
    assert.equal(requestWithHost('shoteasy.fun').url, `${CONFIG.website}/viewer/`);
    assert.equal(new URL(requestWithHost('untrusted.invalid').url).hostname, 'localhost');
});

test('built SSR redirects have exact root-relative Location headers under proxy headers', { skip: !baseUrl }, async () => {
    for (const forwardedHost of ['shoteasy.fun', 'untrusted.invalid']) {
        for (const [path, expected] of redirects.slice(0, -1)) {
            const response = await fetch(new URL(path, baseUrl), {
                redirect: 'manual',
                headers: { 'x-forwarded-host': forwardedHost, 'x-forwarded-proto': 'https' },
                signal: AbortSignal.timeout(30000)
            });
            assert.equal(response.status, 301, path);
            assert.equal(response.headers.get('location'), expected, `${forwardedHost}${path}`);
        }
    }
});

test('all locale homepages expose root-relative header, tool, and language navigation', { skip: !baseUrl }, async () => {
    for (const locale of CONFIG.locals) {
        const path = locale === 'en' ? '/' : `/${locale}/`;
        const response = await fetch(new URL(path, baseUrl), {
            headers: { 'x-forwarded-host': 'untrusted.invalid', 'x-forwarded-proto': 'https' },
            signal: AbortSignal.timeout(30000)
        });
        assert.equal(response.status, 200, path);
        const html = await response.text();
        const hrefs = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(([, href]) => href);
        assert.ok(!hrefs.some(href => /localhost|127\.0\.0\.1|untrusted\.invalid/.test(href)), path);
        assert.ok(hrefs.filter(href => href.startsWith('/')).every(href => href.endsWith('/')), path);
        for (const target of CONFIG.locals.filter(item => item !== locale)) {
            assert.ok(hrefs.includes(getLocaleSwitcherPath(path, target)), `${path} -> ${target}`);
        }
        const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)[1];
        const headerHrefs = [...header.matchAll(/href="([^"]+)"/g)].map(([, href]) => href);
        assert.ok(headerHrefs.length);
        assert.ok(headerHrefs.every(href => /^\/(?!\/)/.test(href)), path);
        assert.ok(headerHrefs.every(href => href.endsWith('/')), path);
        for (const href of new Set(headerHrefs)) {
            const navigation = await fetch(new URL(href, baseUrl), {
                redirect: 'manual',
                headers: { 'x-forwarded-host': 'shoteasy.fun', 'x-forwarded-proto': 'https' },
                signal: AbortSignal.timeout(30000)
            });
            if (navigation.status >= 300 && navigation.status < 400) {
                const location = navigation.headers.get('location');
                assert.match(location, /^\/(?!\/)/, href);
                const destination = await fetch(new URL(location, baseUrl), { signal: AbortSignal.timeout(30000) });
                assert.equal(destination.status, 200, location);
            } else {
                assert.equal(navigation.status, 200, href);
            }
        }
    }
});

test('Russian screenshot breadcrumb entities always use production URLs', { skip: !baseUrl }, async () => {
    const response = await fetch(new URL('/ru/kak-sdelat-skrinshot/', baseUrl), {
        headers: { 'x-forwarded-host': 'untrusted.invalid' },
        signal: AbortSignal.timeout(30000)
    });
    assert.equal(response.status, 200);
    const html = await response.text();
    const entities = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
        .map(([, json]) => JSON.parse(json));
    const breadcrumbs = entities.find(entity => entity['@type'] === 'BreadcrumbList');
    assert.deepEqual(breadcrumbs.itemListElement.map(item => item.item), [
        `${CONFIG.website}/ru/take-a-screenshot/`,
        `${CONFIG.website}/ru/kak-sdelat-skrinshot/`
    ]);
});
