import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeIco } from '../src/lib/icoConvert.js';

// 2x2 32bpp BMP icon: top row blue, white; bottom row red, green (BGRA order,
// rows stored bottom-up), all-opaque AND mask.
const build32bppIco = (maskBytes = new Uint8Array(8)) => {
    const buffer = new ArrayBuffer(86);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, 1, true);
    bytes[6] = 2;
    bytes[7] = 2;
    view.setUint16(10, 1, true);
    view.setUint16(12, 32, true);
    view.setUint32(14, 64, true);
    view.setUint32(18, 22, true);
    view.setUint32(22, 40, true);
    view.setInt32(26, 2, true);
    view.setInt32(30, 4, true);
    view.setUint16(34, 1, true);
    view.setUint16(36, 32, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, 16, true);
    // Pixels, bottom row first: red, green, blue, white (BGRA).
    bytes.set([0, 0, 255, 255, 0, 255, 0, 255], 62);
    bytes.set([255, 0, 0, 255, 255, 255, 255, 255], 70);
    bytes.set(maskBytes, 78);
    return buffer;
};

test('decodes a 32bpp BMP icon to top-down RGBA', () => {
    const { width, height, rgba } = decodeIco(build32bppIco());
    assert.equal(width, 2);
    assert.equal(height, 2);
    assert.deepEqual([...rgba], [
        0, 0, 255, 255, 255, 255, 255, 255,
        255, 0, 0, 255, 0, 255, 0, 255,
    ]);
});

test('applies the AND mask when the alpha channel is all zero', () => {
    const buffer = build32bppIco();
    const bytes = new Uint8Array(buffer);
    // Zero out every alpha byte, then mask the top-left pixel transparent.
    for (let i = 65; i < 78; i += 4) bytes[i] = 0;
    bytes[82] = 0x80;
    const { rgba } = decodeIco(buffer);
    assert.equal(rgba[3], 0);
    assert.equal(rgba[7], 255);
    assert.equal(rgba[11], 255);
    assert.equal(rgba[15], 255);
});

// 2x1 24bpp BMP icon: red (masked transparent), green (opaque).
const build24bppIco = () => {
    const buffer = new ArrayBuffer(74);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, 1, true);
    bytes[6] = 2;
    bytes[7] = 1;
    view.setUint16(10, 1, true);
    view.setUint16(12, 24, true);
    view.setUint32(14, 52, true);
    view.setUint32(18, 22, true);
    view.setUint32(22, 40, true);
    view.setInt32(26, 2, true);
    view.setInt32(30, 2, true);
    view.setUint16(34, 1, true);
    view.setUint16(36, 24, true);
    view.setUint32(38, 0, true);
    view.setUint32(42, 8, true);
    bytes.set([0, 0, 255, 0, 255, 0, 0, 0], 62);
    bytes[70] = 0x80;
    return buffer;
};

test('decodes a 24bpp BMP icon with the AND mask', () => {
    const { width, height, rgba } = decodeIco(build24bppIco());
    assert.equal(width, 2);
    assert.equal(height, 1);
    assert.deepEqual([...rgba], [255, 0, 0, 0, 0, 255, 0, 255]);
});

// Standard 1x1 transparent PNG (67 bytes), embedded as the icon image.
const PNG_1X1 = new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
    0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
    0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
    0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]);

test('passes PNG-embedded icons through as bytes', () => {
    const buffer = new ArrayBuffer(22 + PNG_1X1.length);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, 1, true);
    bytes[6] = 1;
    bytes[7] = 1;
    view.setUint16(10, 1, true);
    view.setUint16(12, 32, true);
    view.setUint32(14, PNG_1X1.length, true);
    view.setUint32(18, 22, true);
    bytes.set(PNG_1X1, 22);
    const decoded = decodeIco(buffer);
    assert.equal(decoded.width, 1);
    assert.equal(decoded.height, 1);
    assert.deepEqual([...decoded.pngBytes], [...PNG_1X1]);
    assert.equal(decoded.rgba, undefined);
});

test('rejects invalid files and unsupported bit depths', () => {
    assert.throws(() => decodeIco(new ArrayBuffer(4)), /Invalid ICO/);
    const cur = build32bppIco();
    new DataView(cur).setUint16(2, 2, true);
    assert.throws(() => decodeIco(cur), /Only ICO/);
    const paletted = build32bppIco();
    new DataView(paletted).setUint16(36, 8, true);
    assert.throws(() => decodeIco(paletted), /bit depth: 8/);
});
