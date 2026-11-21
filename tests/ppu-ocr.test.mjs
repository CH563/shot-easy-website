import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PPU_MODEL_BY_LANG,
  boxToPoly,
  createPpuOcr,
  flattenPpuLines,
  getPpuOcrModelName,
  lineToItem,
  usesPpuOcr,
} from '../src/lib/ppuOcr.js';

test('model selection: ru/uk use the Cyrillic model, fr the Latin model', () => {
  assert.equal(getPpuOcrModelName('ru'), 'V5_CYRILLIC_MOBILE_MODEL');
  assert.equal(getPpuOcrModelName('uk'), 'V5_CYRILLIC_MOBILE_MODEL');
  assert.equal(getPpuOcrModelName('fr'), 'V5_LATIN_MOBILE_MODEL');
  assert.equal(getPpuOcrModelName('en'), null);
  assert.equal(getPpuOcrModelName('zh-CN'), null);
  assert.equal(getPpuOcrModelName(undefined), null);
  assert.equal(PPU_MODEL_BY_LANG.ru, 'V5_CYRILLIC_MOBILE_MODEL');
  assert.equal(usesPpuOcr('ru'), true);
  assert.equal(usesPpuOcr('uk'), true);
  assert.equal(usesPpuOcr('fr'), true);
  assert.equal(usesPpuOcr('en'), false);
});

test('boxToPoly converts an axis-aligned box to four corners', () => {
  assert.deepEqual(boxToPoly({ x: 10, y: 20, width: 30, height: 40 }), [
    [10, 20], [40, 20], [40, 60], [10, 60],
  ]);
  assert.deepEqual(boxToPoly({}), [[0, 0], [0, 0], [0, 0], [0, 0]]);
  assert.deepEqual(boxToPoly({ x: 5, y: 5, width: -3, height: -2 }), [
    [5, 5], [5, 5], [5, 5], [5, 5],
  ]);
});

test('lineToItem joins words, unions boxes, averages confidence', () => {
  const item = lineToItem([
    { text: 'Привет', box: { x: 10, y: 20, width: 60, height: 18 }, confidence: 0.9 },
    { text: 'мир', box: { x: 75, y: 22, width: 30, height: 16 }, confidence: 0.7 },
  ]);
  assert.equal(item.text, 'Привет мир');
  assert.equal(item.score, 0.8);
  assert.deepEqual(item.poly, [[10, 20], [105, 20], [105, 38], [10, 38]]);
});

test('lineToItem skips words without a box and empty lines', () => {
  assert.equal(lineToItem([]), null);
  assert.equal(lineToItem([{ text: 'x' }]), null);
  const item = lineToItem([
    { text: '', box: { x: 0, y: 0, width: 10, height: 10 }, confidence: 0.5 },
    { text: 'Київ', box: { x: 12, y: 0, width: 40, height: 10 }, confidence: 0.9 },
  ]);
  assert.equal(item.text, 'Київ');
  assert.equal(item.score, 0.7);
});

test('flattenPpuLines maps one line to one item and drops empty lines', () => {
  const lines = [
    [{ text: 'Bonjour', box: { x: 0, y: 0, width: 50, height: 14 }, confidence: 0.95 }],
    [],
    [
      { text: 'le', box: { x: 0, y: 20, width: 12, height: 14 }, confidence: 0.8 },
      { text: 'monde', box: { x: 16, y: 20, width: 40, height: 14 }, confidence: 0.9 },
    ],
  ];
  const items = flattenPpuLines(lines);
  assert.equal(items.length, 2);
  assert.equal(items[0].text, 'Bonjour');
  assert.equal(items[1].text, 'le monde');
  assert.deepEqual(flattenPpuLines(null), []);
  assert.deepEqual(flattenPpuLines('nope'), []);
});

test('createPpuOcr rejects unsupported locales without importing the SDK', async () => {
  await assert.rejects(() => createPpuOcr('en'), /no model for locale "en"/);
  await assert.rejects(() => createPpuOcr('zh-CN'), /no model for locale "zh-CN"/);
});
