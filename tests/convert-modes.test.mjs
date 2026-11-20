import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { convertModes, convertModePages, getConvertModePage } from '../src/lib/convertModePages.js';

const modeValues = convertModes.map((item) => item.value);

test('mode list matches the landing-page data exactly', () => {
    assert.equal(modeValues.length, 20);
    assert.deepEqual(Object.keys(convertModePages).sort(), [...modeValues].sort());
    assert.equal(new Set(modeValues).size, modeValues.length);
});

test('every landing mode exists in the ConvertTool dropdown', () => {
    const tool = readFileSync(new URL('../src/components/ConvertTool.jsx', import.meta.url), 'utf8');
    for (const value of modeValues) {
        assert.ok(tool.includes(`value: '${value}'`), `mode ${value} missing from ConvertTool`);
    }
});

test('every mode has complete en + ru content', () => {
    for (const value of modeValues) {
        for (const locale of ['en', 'ru']) {
            const page = convertModePages[value][locale];
            assert.ok(page, `${value}/${locale} missing`);
            for (const field of ['title', 'description', 'keywords', 'h1', 'eyebrow', 'backLink']) {
                assert.ok(page[field]?.length > 0, `${value}/${locale} missing ${field}`);
            }
            assert.equal(page.intro.length, 2, `${value}/${locale} intro`);
            assert.equal(page.sections.length, 3, `${value}/${locale} sections`);
            assert.equal(page.faq.length, 3, `${value}/${locale} faq`);
            for (const section of page.sections) {
                assert.ok(section.title.length > 0);
                assert.ok(section.body.length >= 2);
            }
            for (const item of page.faq) {
                assert.ok(item.question.length > 0);
                assert.ok(item.answer.length > 0);
            }
        }
    }
});

test('titles are unique per locale', () => {
    for (const locale of ['en', 'ru']) {
        const titles = modeValues.map((value) => convertModePages[value][locale].title);
        assert.equal(new Set(titles).size, titles.length, `duplicate title in ${locale}`);
    }
});

test('getConvertModePage falls back and rejects unknown modes', () => {
    assert.equal(getConvertModePage('nope', 'en'), null);
    assert.equal(getConvertModePage('image-to-webp', 'uk').title, convertModePages['image-to-webp'].en.title);
    assert.equal(getConvertModePage('image-to-webp', 'ru').title, convertModePages['image-to-webp'].ru.title);
});

test('mode routes exist', () => {
    assert.ok(existsSync(new URL('../src/pages/convert/[mode]/index.astro', import.meta.url)));
    assert.ok(existsSync(new URL('../src/pages/[locale]/convert/[mode]/index.astro', import.meta.url)));
    assert.ok(existsSync(new URL('../src/components/ConvertModePage.astro', import.meta.url)));
});

test('sitemap lists every ru mode page', () => {
    const config = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
    for (const value of modeValues) {
        assert.ok(config.includes(`'${value}'`), `mode ${value} missing from sitemap config`);
    }
    assert.ok(config.includes("`/ru/convert/${page}/`"));
    assert.ok(config.includes("`/convert/${page}/`"));
});
