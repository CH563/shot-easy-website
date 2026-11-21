import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { getCameraEffectsCopy } from '../src/lib/cameraEffectsCopy.js';

const LOCALES = ['en', 'zh-CN', 'ru', 'uk', 'fr'];

test('copy: every locale has complete page copy', () => {
  for (const locale of LOCALES) {
    const copy = getCameraEffectsCopy(locale);
    for (const key of ['title', 'description', 'keywords', 'badge', 'tip', 'introTitle', 'intro', 'techTitle', 'howTitle', 'faqTitle']) {
      assert.equal(typeof copy[key], 'string', `${locale}.${key} should be a string`);
      assert.ok(copy[key].length > 0, `${locale}.${key} should not be empty`);
    }
    assert.equal(copy.cards.length, 3, `${locale} should have 3 cards`);
    assert.equal(copy.tech.length, 4, `${locale} should have 4 tech items`);
    assert.equal(copy.steps.length, 4, `${locale} should have 4 steps`);
    assert.equal(copy.faqs.length, 4, `${locale} should have 4 FAQs`);
    for (const [emoji, title, body] of copy.cards) {
      assert.ok(emoji && title && body, `${locale} card should have emoji, title and body`);
    }
    for (const [title, body] of copy.tech) assert.ok(title && body, `${locale} tech item should have title and body`);
    for (const [num, title, body] of copy.steps) assert.ok(num && title && body, `${locale} step should have number, title and body`);
    for (const [q, a] of copy.faqs) assert.ok(q && a, `${locale} FAQ should have question and answer`);
  }
});

test('copy: ru/uk/fr titles differ from the English title', () => {
  const en = getCameraEffectsCopy('en').title;
  for (const locale of ['ru', 'uk', 'fr']) {
    assert.notEqual(getCameraEffectsCopy(locale).title, en, `${locale} title should be translated`);
  }
});

test('copy: unknown locale falls back to English', () => {
  assert.equal(getCameraEffectsCopy('de').title, getCameraEffectsCopy('en').title);
  assert.equal(getCameraEffectsCopy(undefined).title, getCameraEffectsCopy('en').title);
});

test('routes and components exist', () => {
  for (const path of [
    'src/pages/camera-effects/index.astro',
    'src/pages/[locale]/camera-effects/index.astro',
    'src/components/CameraEffectsPage.astro',
    'src/components/CameraEffects.jsx',
    'src/lib/cameraEffectsCopy.js',
  ]) assert.ok(existsSync(new URL(`../${path}`, import.meta.url)), `${path} should exist`);
});

test('sitemap and locale guard include camera-effects', () => {
  const config = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  assert.ok(config.includes("'camera-effects'"), 'localizedPages should list camera-effects');
  const guard = readFileSync(new URL('../src/lib/localeGuard.js', import.meta.url), 'utf8');
  assert.ok(guard.includes("'camera-effects'"), 'NON_LOCALE_PREFIXES should list camera-effects');
});

test('nav entries exist in en/ru/uk/fr', () => {
  for (const locale of ['en', 'ru', 'uk', 'fr']) {
    const nav = readFileSync(new URL(`../src/i18n/${locale}/nav.js`, import.meta.url), 'utf8');
    assert.ok(nav.includes('cameraEffects'), `${locale} nav should have a cameraEffects entry`);
  }
});

test('header links the tool from the screenshot group', () => {
  const header = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');
  assert.ok(header.includes("optItem(nav.cameraEffects, '/camera-effects', 'cameraEffects')"), 'Header should link /camera-effects (optItem: locales without the key simply omit it)');
});

test('component: weights are self-hosted, presets are bounded, audio is passthrough', () => {
  const source = readFileSync(new URL('../src/components/CameraEffects.jsx', import.meta.url), 'utf8');
  assert.match(source, /const WEIGHTS_URL = '\/longpipe-models\/';/, 'weights should be self-hosted under /longpipe-models/');
  assert.match(source, /const PRESETS = \['fast', 'small', 'balanced'\];/, 'presets should be capped at fast/small/balanced');
  assert.ok(source.includes('adaptive: false'), 'adaptive switching should be off so the SDK never fetches unhosted tiers');
  assert.ok(source.includes("audio: 'passthrough'"), 'audio should be passthrough (no denoise in v1)');
  assert.ok(source.includes("client:only") === false, 'component file itself should not contain the Astro directive');
});

test('component: page shell renders the tool client-only with FAQ structured data', () => {
  const shell = readFileSync(new URL('../src/components/CameraEffectsPage.astro', import.meta.url), 'utf8');
  assert.ok(shell.includes('<CameraEffects client:only="react"'), 'tool should be client-only (getUserMedia does not exist in SSR)');
  assert.ok(shell.includes('FAQPage'), 'page should carry FAQPage structured data');
});

test('weights: the self-hosted model files exist', () => {
  for (const file of [
    'model_xs.f16.bin', 'model_small.f16.bin', 'model_medium.f16.bin',
    'model_landmark_mesh.f16.bin', 'face_topology.json', 'weight_mask.png',
  ]) assert.ok(existsSync(new URL(`../public/longpipe-models/${file}`, import.meta.url)), `public/longpipe-models/${file} should exist`);
});

test('dependency: longpipe is pinned to an exact version', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.dependencies.longpipe, '0.0.23', 'longpipe should be pinned exactly (0.0.x SDK, API may change)');
});
