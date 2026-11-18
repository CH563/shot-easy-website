import test from 'node:test';
import assert from 'node:assert/strict';
import { getLocaleRedirect, isKnownLocale, isUnknownLocalePath } from '../src/lib/localeGuard.js';

test('sitemap.xml redirects to the real sitemap', () => {
    assert.equal(getLocaleRedirect('/sitemap.xml'), '/sitemap-index.xml');
    assert.equal(getLocaleRedirect('/SITEMAP.XML'), '/sitemap-index.xml');
    assert.equal(getLocaleRedirect('/sitemap.xml/extra'), null);
});

test('/en redirects to the root homepage', () => {
    assert.equal(getLocaleRedirect('/en'), '/');
    assert.equal(getLocaleRedirect('/en/'), '/');
    assert.equal(getLocaleRedirect('/EN/'), '/');
});

test('valid localized tool pages are not redirected', () => {
    assert.equal(getLocaleRedirect('/en/take-a-screenshot/'), null);
    assert.equal(getLocaleRedirect('/ru/take-a-screenshot/'), null);
    assert.equal(getLocaleRedirect('/zh-CN/'), null);
    assert.equal(getLocaleRedirect('/'), null);
});

test('a locale with the wrong case redirects to its canonical spelling', () => {
    assert.equal(getLocaleRedirect('/zh-cn/'), '/zh-CN/');
    assert.equal(getLocaleRedirect('/ZH-CN/'), '/zh-CN/');
    assert.equal(getLocaleRedirect('/zh-cn/take-a-screenshot/'), '/zh-CN/take-a-screenshot/');
    assert.equal(getLocaleRedirect('/RU/take-a-screenshot/'), '/ru/take-a-screenshot/');
    assert.equal(getLocaleRedirect('/EN/take-a-screenshot/'), '/en/take-a-screenshot/');
});

test('unknown segments are not redirects (they 404 instead)', () => {
    assert.equal(getLocaleRedirect('/pricing/'), null);
    assert.equal(getLocaleRedirect('/xyzabc123/'), null);
    assert.equal(getLocaleRedirect('/foo/take-a-screenshot/'), null);
});

test('isKnownLocale is an exact match', () => {
    assert.equal(isKnownLocale('ru'), true);
    assert.equal(isKnownLocale('zh-CN'), true);
    assert.equal(isKnownLocale('pricing'), false);
    assert.equal(isKnownLocale('RU'), false);
});

test('multi-segment paths under an unknown locale are dead links', () => {
    assert.equal(isUnknownLocalePath('/foo/take-a-screenshot/'), true);
    assert.equal(isUnknownLocalePath('/pricing/take-a-screenshot/'), true);
    assert.equal(isUnknownLocalePath('/foo/bar/'), true);
});

test('multi-segment paths under a known locale or a real route pass through', () => {
    assert.equal(isUnknownLocalePath('/ru/take-a-screenshot/'), false);
    assert.equal(isUnknownLocalePath('/en/take-a-screenshot/'), false);
    assert.equal(isUnknownLocalePath('/blog/some-post/'), false);
    assert.equal(isUnknownLocalePath('/api/remove-bg'), false);
});

test('single-segment paths are left to the [locale] page', () => {
    assert.equal(isUnknownLocalePath('/pricing/'), false);
    assert.equal(isUnknownLocalePath('/'), false);
});
