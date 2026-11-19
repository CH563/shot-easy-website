// Pure ICO decoding, testable in Node. No DOM access here; the browser loader
// lives in imageConvert.js (loadIcoFile) and mirrors the TIFF pattern.
// Supports BMP/DIB icons at 32bpp and 24bpp (with the AND transparency mask)
// and PNG-embedded icons (Vista and later). Paletted icons (1/4/8bpp) are
// rejected with a clear error instead of silently producing wrong pixels.

const PNG_MAGIC = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const decodeBmpIco = (data) => {
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    if (data.length < 40) throw new Error('Invalid ICO image data.');
    const headerSize = view.getUint32(0, true);
    if (headerSize < 40) throw new Error('Invalid ICO image data.');
    const bmpWidth = view.getInt32(4, true);
    const bmpHeight = view.getInt32(8, true);
    const bitCount = view.getUint16(14, true);
    if (bitCount !== 32 && bitCount !== 24) {
        throw new Error(`Unsupported ICO bit depth: ${bitCount}.`);
    }
    // biHeight is doubled: the XOR image plus the AND transparency mask.
    const topDown = bmpHeight < 0;
    const imageHeight = Math.abs(bmpHeight) / 2;
    if (!bmpWidth || !imageHeight) throw new Error('Invalid ICO image data.');
    const bytesPerPixel = bitCount / 8;
    const rowBytes = Math.floor((bmpWidth * bitCount + 31) / 32) * 4;
    const pixelData = headerSize;
    const maskRowBytes = Math.floor((bmpWidth + 31) / 32) * 4;
    const maskData = pixelData + rowBytes * imageHeight;
    const hasMask = maskData + maskRowBytes * imageHeight <= data.length;
    const rgba = new Uint8Array(bmpWidth * imageHeight * 4);
    let hasAlpha = false;
    for (let y = 0; y < imageHeight; y++) {
        const srcY = topDown ? y : imageHeight - 1 - y;
        for (let x = 0; x < bmpWidth; x++) {
            const px = pixelData + srcY * rowBytes + x * bytesPerPixel;
            const dst = (y * bmpWidth + x) * 4;
            rgba[dst] = data[px + 2];
            rgba[dst + 1] = data[px + 1];
            rgba[dst + 2] = data[px];
            rgba[dst + 3] = bitCount === 32 ? data[px + 3] : 255;
            if (bitCount === 32 && data[px + 3] !== 0) hasAlpha = true;
        }
    }
    // 32bpp icons with an all-zero alpha channel (and all 24bpp icons) rely on
    // the 1-bit AND mask: a set bit means the pixel is transparent, and the
    // mask is the only source of transparency, so unmasked pixels are opaque.
    if (!hasAlpha && hasMask) {
        for (let y = 0; y < imageHeight; y++) {
            const srcY = topDown ? y : imageHeight - 1 - y;
            for (let x = 0; x < bmpWidth; x++) {
                const byte = data[maskData + srcY * maskRowBytes + Math.floor(x / 8)];
                rgba[(y * bmpWidth + x) * 4 + 3] = byte & (0x80 >> (x % 8)) ? 0 : 255;
            }
        }
    }
    return { width: bmpWidth, height: imageHeight, rgba };
};

// Returns { width, height, rgba } for BMP icons, or { width, height, pngBytes }
// for PNG-embedded icons (the caller decodes those with an <img>).
export const decodeIco = (arrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer);
    const view = new DataView(arrayBuffer);
    if (bytes.length < 6) throw new Error('Invalid ICO file.');
    if (view.getUint16(0, true) !== 0) throw new Error('Invalid ICO file.');
    if (view.getUint16(2, true) !== 1) throw new Error('Only ICO files are supported.');
    const count = view.getUint16(4, true);
    if (!count || bytes.length < 6 + count * 16) throw new Error('Invalid ICO file.');
    let best = null;
    for (let i = 0; i < count; i++) {
        const off = 6 + i * 16;
        const width = bytes[off] || 256;
        const height = bytes[off + 1] || 256;
        const bitCount = view.getUint16(off + 6, true);
        const size = view.getUint32(off + 8, true);
        const imageOffset = view.getUint32(off + 12, true);
        if (!size || imageOffset + size > bytes.length) continue;
        const area = width * height;
        if (!best || area > best.area || (area === best.area && bitCount > best.bitCount)) {
            best = { width, height, bitCount, size, imageOffset, area };
        }
    }
    if (!best) throw new Error('No usable image found in ICO file.');
    const data = bytes.subarray(best.imageOffset, best.imageOffset + best.size);
    if (PNG_MAGIC.every((magic, index) => data[index] === magic)) {
        return { width: best.width, height: best.height, pngBytes: data };
    }
    return decodeBmpIco(data);
};
