// ppu-paddle-ocr adapter for the ShotEasy OCR tool (src/components/OcrTool.jsx).
//
// Only ru/uk/fr locales use it: ru/uk get the PP-OCRv5 Cyrillic recognition
// model, fr gets the PP-OCRv5 Latin model. All other locales keep the
// existing PaddleOCR.js engine (see OcrTool getOcr()).
//
// ppu returns results grouped by text line:
//   PaddleOcrResult { text, lines: RecognitionResult[][], confidence }
//   RecognitionResult { text, box: { x, y, width, height }, confidence }
// OcrTool works with per-line items { text, score, poly } where poly is an
// array of [x, y] corner points, so each line is flattened to one item:
// text = the line's words joined with a space, score = mean confidence,
// poly = the four corners of the union box of the line's words.

export const PPU_MODEL_BY_LANG = {
  ru: 'V5_CYRILLIC_MOBILE_MODEL',
  uk: 'V5_CYRILLIC_MOBILE_MODEL',
  fr: 'V5_LATIN_MOBILE_MODEL',
};

export function getPpuOcrModelName(lang) {
  return PPU_MODEL_BY_LANG[lang] || null;
}

export function usesPpuOcr(lang) {
  return getPpuOcrModelName(lang) !== null;
}

export function boxToPoly(box = {}) {
  const x = Number(box.x) || 0;
  const y = Number(box.y) || 0;
  const w = Math.max(0, Number(box.width) || 0);
  const h = Math.max(0, Number(box.height) || 0);
  return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
}

export function lineToItem(words = []) {
  const valid = (Array.isArray(words) ? words : []).filter((w) => w && w.box);
  if (!valid.length) return null;
  const xs = valid.map((w) => Number(w.box.x) || 0);
  const ys = valid.map((w) => Number(w.box.y) || 0);
  const rights = valid.map((w) => (Number(w.box.x) || 0) + Math.max(0, Number(w.box.width) || 0));
  const bottoms = valid.map((w) => (Number(w.box.y) || 0) + Math.max(0, Number(w.box.height) || 0));
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  const right = Math.max(...rights);
  const bottom = Math.max(...bottoms);
  const score = valid.reduce((sum, w) => sum + (Number(w.confidence) || 0), 0) / valid.length;
  return {
    text: valid.map((w) => w.text || '').filter(Boolean).join(' '),
    score,
    poly: boxToPoly({ x, y, width: right - x, height: bottom - y }),
  };
}

export function flattenPpuLines(lines = []) {
  return (Array.isArray(lines) ? lines : [])
    .map((words) => lineToItem(words))
    .filter(Boolean);
}

export async function createPpuOcr(lang) {
  const modelName = getPpuOcrModelName(lang);
  if (!modelName) throw new Error(`ppu-paddle-ocr has no model for locale "${lang}"`);
  const mod = await import('ppu-paddle-ocr/web');
  const model = mod[modelName];
  if (!model) throw new Error(`ppu-paddle-ocr model ${modelName} not found`);
  const service = new mod.PaddleOcrService({ model });
  await service.initialize();
  return {
    // Same call shape OcrTool uses for the PaddleOCR.js engine:
    // predict(blob, { textRecScoreThresh }) -> [{ items }]
    // (ppu's recognize() takes an ArrayBuffer or canvas, not a Blob, and
    // minimumConfidence: 0.35 mirrors the existing textRecScoreThresh.)
    predict: async (blob) => {
      const result = await service.recognize(await blob.arrayBuffer(), { minimumConfidence: 0.35 });
      return [{ items: flattenPpuLines(result?.lines) }];
    },
    dispose: () => service.destroy(),
  };
}
