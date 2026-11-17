import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBeautifierEmbedHtml, backgroundCss } from '../src/lib/beautifierEmbed.js';

const base = {
    bgValue: 'default_1',
    boxStyle: {},
    marginValue: 150,
    paddingValue: 0,
    paddingBg: 'rgba(255,255,255,.85)',
    roundValue: 10,
    shadowValue: 3,
    frame: 'none',
    hasAnnotations: false
};

test('default gradient background converts Tailwind classes to CSS', () => {
    const html = buildBeautifierEmbedHtml(base);
    assert.match(html, /background-image: linear-gradient\(to right, #6366f1, #a855f7, #ec4899\);/);
    assert.match(html, /padding: 75px;/);
    assert.match(html, /border-radius: 10px;/);
    assert.match(html, /box-shadow: 0 4px 6px -1px rgb\(0 0 0 \/ 0.1\), 0 2px 4px -2px rgb\(0 0 0 \/ 0.1\);/);
    assert.match(html, /<img src="shotEasy\.png"/);
});

test('gradient with explicit stops keeps the stop positions', () => {
    const css = backgroundCss('gradient_1', {});
    assert.equal(css, 'background-image: linear-gradient(to bottom right, #ff6432 12.8%, #ff0065 43.52%, #7b2eff 84.34%);');
});

test('solid and transparent backgrounds resolve to a color', () => {
    assert.equal(backgroundCss('solid_18', {}), 'background-color: #818cf8;');
    assert.equal(backgroundCss('solid_1', {}), 'background-color: transparent;');
});

test('photo backgrounds become a cover image', () => {
    const css = backgroundCss('cosmic_img_1', {});
    assert.match(css, /^background-image: url\('https:\/\/images\.unsplash\.com\/[^']+'\); background-size: cover; background-position: center;$/);
});

test('custom JSON background style is serialized as-is', () => {
    const css = backgroundCss('{"background":"linear-gradient(90deg, red, blue)"}', { background: 'linear-gradient(90deg, red, blue)' });
    assert.equal(css, 'background: linear-gradient(90deg, red, blue);');
});

test('unknown background falls back to white', () => {
    assert.equal(backgroundCss('no_such_key', {}), 'background-color: #ffffff;');
});

test('light glass frame adds the translucent wrapper and shrinks the inner radius', () => {
    const html = buildBeautifierEmbedHtml({ ...base, frame: 'light', roundValue: 10 });
    assert.match(html, /background-color: rgba\(255, 255, 255, 0\.4\); padding: 6px;/);
    assert.match(html, /border-radius: 8px;/);
});

test('device frames are noted, not faked, in the snippet', () => {
    const html = buildBeautifierEmbedHtml({ ...base, frame: 'macbookPro' });
    assert.match(html, /Device frame is not included in this snippet/);
    assert.match(html, /export the PNG for the framed version/);
    const bar = buildBeautifierEmbedHtml({ ...base, frame: 'macosBarLight' });
    assert.match(bar, /Title bar is not included in this snippet/);
});

test('annotations note appears only when annotations or watermark are on', () => {
    assert.doesNotMatch(buildBeautifierEmbedHtml(base), /Annotations and watermark/);
    assert.match(buildBeautifierEmbedHtml({ ...base, hasAnnotations: true }), /Annotations and watermark are not included/);
});

test('shadow 0 means no shadow', () => {
    const html = buildBeautifierEmbedHtml({ ...base, shadowValue: 0 });
    assert.match(html, /box-shadow: none;/);
});
