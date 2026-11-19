import test from 'node:test';
import assert from 'node:assert/strict';
import * as XLSX from 'xlsx';
import { convertDataFile, convertMarkdownFile, getFileExtension, isDataFile, isTextFile } from '../src/lib/dataConvert.js';
import { decodeTiffRgba, extensionForMime, imageInputTypes } from '../src/lib/imageConvert.js';

const csvText = 'name,age\nAlice,30\nBob,25\n';

const readXlsxRows = async (blob) => {
    const workbook = XLSX.read(await blob.arrayBuffer(), { type: 'array' });
    return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: null });
};

const makeXlsxFile = (rows, name = 'data.xlsx') => {
    const sheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
    const bytes = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return new File([bytes], name, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};

test('image inputs cover the browser-decodable formats plus TIFF', () => {
    for (const type of ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/bmp', 'image/avif', 'image/tiff']) {
        assert.ok(imageInputTypes.includes(type), `missing ${type}`);
    }
    assert.equal(extensionForMime('image/jpeg'), 'jpg');
    assert.equal(extensionForMime('image/webp'), 'webp');
    assert.equal(extensionForMime('application/pdf'), 'pdf');
});

test('file extension helpers route data and text files', () => {
    assert.equal(getFileExtension('Report.CSV'), 'csv');
    assert.equal(getFileExtension('no-extension'), '');
    assert.ok(isDataFile({ name: 'a.tsv' }));
    assert.ok(isDataFile({ name: 'a.xlsx' }));
    assert.ok(!isDataFile({ name: 'a.png' }));
    assert.ok(isTextFile({ name: 'notes.md' }));
    assert.ok(!isTextFile({ name: 'notes.txt' }));
});

test('csv to xlsx round-trips through SheetJS', async () => {
    const output = await convertDataFile(new File([csvText], 'data.csv', { type: 'text/csv' }), 'xlsx');
    assert.equal(output.name, 'data.xlsx');
    assert.equal(output.type, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    assert.deepEqual(await readXlsxRows(output.blob), [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
    ]);
});

test('xlsx to csv and csv to json keep the rows', async () => {
    const input = makeXlsxFile([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]);
    const csv = await convertDataFile(input, 'csv');
    assert.equal(csv.name, 'data.csv');
    assert.match(await csv.blob.text(), /Alice,30/);
    const json = await convertDataFile(new File([csvText], 'data.csv', { type: 'text/csv' }), 'json');
    assert.equal(json.name, 'data.json');
    assert.deepEqual(JSON.parse(await json.blob.text()), [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
    ]);
});

test('json to xlsx and xlsx to json round-trip', async () => {
    const jsonFile = new File([JSON.stringify([{ city: 'Paris', n: 2 }])], 'cities.json', { type: 'application/json' });
    const xlsx = await convertDataFile(jsonFile, 'xlsx');
    assert.deepEqual(await readXlsxRows(xlsx.blob), [{ city: 'Paris', n: 2 }]);
    const back = await convertDataFile(makeXlsxFile([{ city: 'Paris', n: 2 }]), 'json');
    assert.deepEqual(JSON.parse(await back.blob.text()), [{ city: 'Paris', n: 2 }]);
});

test('tsv converts with a tab separator', async () => {
    const tsv = new File(['a\tb\n1\t2\n'], 'data.tsv', { type: 'text/tab-separated-values' });
    const csv = await convertDataFile(tsv, 'csv');
    assert.equal(await csv.blob.text(), 'a,b\n1,2');
    const xlsx = await convertDataFile(tsv, 'xlsx');
    assert.deepEqual(await readXlsxRows(xlsx.blob), [{ a: 1, b: 2 }]);
});

test('data conversion rejects unsupported files and targets', async () => {
    await assert.rejects(
        () => convertDataFile(new File(['x'], 'notes.txt', { type: 'text/plain' }), 'csv'),
        /Unsupported data file/,
    );
    await assert.rejects(
        () => convertDataFile(new File([csvText], 'data.csv', { type: 'text/csv' }), 'pdf'),
        /Unsupported data target/,
    );
});

test('markdown becomes a standalone html page', async () => {
    const output = await convertMarkdownFile(new File(['# Title\n\n**bold** and [link](https://example.com)\n'], 'notes.md', { type: 'text/markdown' }));
    assert.equal(output.name, 'notes.html');
    assert.equal(output.type, 'text/html');
    const html = await output.blob.text();
    assert.match(html, /<h1>Title<\/h1>/);
    assert.match(html, /<strong>bold<\/strong>/);
    assert.match(html, /<a href="https:\/\/example\.com">link<\/a>/);
});

// Minimal 2x2 uncompressed RGB TIFF, little-endian:
// header (8) + IFD (2 + 10*12 + 4 = 126) + BitsPerSample array (6) + pixels (12) = 152 bytes.
const makeTinyTiff = () => {
    const buffer = new ArrayBuffer(152);
    const view = new DataView(buffer);
    view.setUint8(0, 0x49); // 'I'
    view.setUint8(1, 0x49); // 'I'
    view.setUint16(2, 42, true);
    view.setUint32(4, 8, true);
    const entries = [
        [256, 3, 1, 2], [257, 3, 1, 2], [258, 3, 3, 134], [259, 3, 1, 1],
        [262, 3, 1, 2], [273, 4, 1, 140], [277, 3, 1, 3], [278, 4, 1, 2],
        [279, 4, 1, 12], [284, 3, 1, 1],
    ];
    view.setUint16(8, entries.length, true);
    entries.forEach(([tag, type, count, value], index) => {
        const offset = 10 + index * 12;
        view.setUint16(offset, tag, true);
        view.setUint16(offset + 2, type, true);
        view.setUint32(offset + 4, count, true);
        view.setUint32(offset + 8, value, true);
    });
    view.setUint32(130, 0, true);
    view.setUint16(134, 8, true);
    view.setUint16(136, 8, true);
    view.setUint16(138, 8, true);
    const pixels = new Uint8Array(buffer, 140);
    pixels.set([255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255]);
    return buffer;
};

test('decodeTiffRgba reads a minimal uncompressed TIFF', async () => {
    const { width, height, rgba } = await decodeTiffRgba(makeTinyTiff());
    assert.equal(width, 2);
    assert.equal(height, 2);
    assert.deepEqual(Array.from(rgba), [
        255, 0, 0, 255,
        0, 255, 0, 255,
        0, 0, 255, 255,
        255, 255, 255, 255,
    ]);
});
