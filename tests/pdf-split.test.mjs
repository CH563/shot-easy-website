import test from 'node:test';
import assert from 'node:assert/strict';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { parsePageRanges, splitPdfBytes, splitPdfEveryPage } from '../src/lib/pdfToolsCore.js';

const makePdf = async (pageCount) => {
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    for (let i = 0; i < pageCount; i++) {
        const page = doc.addPage([400, 300]);
        page.drawText(`Page ${i + 1}`, { x: 50, y: 200, size: 24, font, color: rgb(0, 0, 0) });
    }
    return doc.save();
};

const pageCountOf = async (bytes) => (await PDFDocument.load(bytes)).getPageCount();

test('parsePageRanges handles ranges, singles, duplicates and order', () => {
    assert.deepEqual(parsePageRanges('1-3, 5', 10), [0, 1, 2, 4]);
    assert.deepEqual(parsePageRanges('5, 1-3, 3', 10), [0, 1, 2, 4]);
    assert.deepEqual(parsePageRanges(' 2 ', 10), [1]);
    assert.deepEqual(parsePageRanges('10', 10), [9]);
});

test('parsePageRanges rejects empty, invalid and out-of-range input', () => {
    assert.throws(() => parsePageRanges('', 5), /empty/);
    assert.throws(() => parsePageRanges('   ', 5), /empty/);
    assert.throws(() => parsePageRanges('abc', 5), /invalid/);
    assert.throws(() => parsePageRanges('0', 5), /outOfRange/);
    assert.throws(() => parsePageRanges('6', 5), /outOfRange/);
    assert.throws(() => parsePageRanges('3-1', 5), /invalid/);
    assert.throws(() => parsePageRanges('1-6', 5), /outOfRange/);
    assert.throws(() => parsePageRanges('1,,3', 5), /invalid/);
});

test('splitPdfBytes extracts the selected pages in order', async () => {
    const bytes = await makePdf(5);
    const result = await splitPdfBytes(bytes, [0, 2, 4]);
    assert.equal(result.pages, 3);
    assert.equal(await pageCountOf(result.bytes), 3);
    assert.ok(result.size > 0);
});

test('splitPdfEveryPage returns one single-page PDF per page', async () => {
    const bytes = await makePdf(4);
    const parts = await splitPdfEveryPage(bytes);
    assert.equal(parts.length, 4);
    assert.deepEqual(parts.map((part) => part.page), [1, 2, 3, 4]);
    for (const part of parts) assert.equal(await pageCountOf(part.bytes), 1);
});
