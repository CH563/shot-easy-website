import test from 'node:test';
import assert from 'node:assert/strict';
import QRCode from 'qrcode';
import { decodeQrFromImageData, isProbablyUrl, openableHref } from '../src/lib/qrScannerCore.js';

// Paints a QR matrix into an RGBA buffer jsQR can read: white quiet zone + black modules.
const renderQrPixels = (text, scale = 4, quiet = 4) => {
    const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
    const size = qr.modules.size;
    const side = (size + quiet * 2) * scale;
    const data = new Uint8ClampedArray(side * side * 4);
    for (let y = 0; y < side; y++) {
        for (let x = 0; x < side; x++) {
            const moduleX = Math.floor(x / scale) - quiet;
            const moduleY = Math.floor(y / scale) - quiet;
            const dark = moduleX >= 0 && moduleX < size && moduleY >= 0 && moduleY < size && qr.modules.data[moduleY * size + moduleX];
            const offset = (y * side + x) * 4;
            const value = dark ? 0 : 255;
            data[offset] = value;
            data[offset + 1] = value;
            data[offset + 2] = value;
            data[offset + 3] = 255;
        }
    }
    return { data, width: side, height: side };
};

test('decodeQrFromImageData reads a generated QR code', () => {
    const { data, width, height } = renderQrPixels('https://shoteasy.fun/qr-scanner/');
    assert.equal(decodeQrFromImageData(data, width, height), 'https://shoteasy.fun/qr-scanner/');
});

test('decodeQrFromImageData returns null when no code is present', () => {
    const width = 100;
    const height = 100;
    const data = new Uint8ClampedArray(width * height * 4).fill(255);
    assert.equal(decodeQrFromImageData(data, width, height), null);
});

test('isProbablyUrl detects links and rejects plain text', () => {
    assert.equal(isProbablyUrl('https://example.com/path?q=1'), true);
    assert.equal(isProbablyUrl('example.com'), true);
    assert.equal(isProbablyUrl('mailto:hi@example.com'), true);
    assert.equal(isProbablyUrl('hello world'), false);
    assert.equal(isProbablyUrl('WIFI:S:Home;T:WPA;P:secret;;'), false);
    assert.equal(isProbablyUrl(''), false);
});

test('openableHref prefixes bare domains with https', () => {
    assert.equal(openableHref('example.com'), 'https://example.com');
    assert.equal(openableHref('https://example.com'), 'https://example.com');
    assert.equal(openableHref('mailto:hi@example.com'), 'mailto:hi@example.com');
});
