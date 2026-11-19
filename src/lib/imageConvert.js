import { decodeIco } from './icoConvert.js';

export const imageInputTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/bmp', 'image/avif', 'image/tiff', 'image/heic', 'image/heif', 'image/x-icon', 'image/vnd.microsoft.icon'];

// Browsers report flaky or empty MIME types for .heic/.heif/.ico/.tiff files,
// so image handling falls back to the file extension when the type is missing.
export const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'bmp', 'avif', 'tiff', 'heic', 'heif', 'ico'];

export const getImageExtension = (file) => (file?.name?.split('.').pop() || '').toLowerCase();

export const mimeForImageExtension = (extension) => ({
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    gif: 'image/gif',
    bmp: 'image/bmp',
    avif: 'image/avif',
    tiff: 'image/tiff',
    heic: 'image/heic',
    heif: 'image/heif',
    ico: 'image/x-icon',
}[extension] || '');

export const isHeicFile = (file) => ['image/heic', 'image/heif'].includes(file?.type) || ['heic', 'heif'].includes(getImageExtension(file));

export const isIcoFile = (file) => ['image/x-icon', 'image/vnd.microsoft.icon'].includes(file?.type) || getImageExtension(file) === 'ico';

export const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
};

export const extensionForMime = (mime) => {
    if (mime === 'image/jpeg') return 'jpg';
    if (mime === 'image/png') return 'png';
    if (mime === 'image/webp') return 'webp';
    if (mime === 'image/heic') return 'heic';
    if (mime === 'image/heif') return 'heif';
    if (mime === 'image/x-icon' || mime === 'image/vnd.microsoft.icon') return 'ico';
    if (mime === 'application/pdf') return 'pdf';
    return 'bin';
};

export const replaceExtension = (name, ext) => {
    const base = name.replace(/\.[^.]+$/, '');
    return `${base}.${ext}`;
};

export const canvasToBlob = (canvas, type, quality = 0.92) => new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas conversion failed.'));
    }, type, quality);
});

export const loadImageFile = (file) => new Promise((resolve, reject) => {
    const src = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({
        file,
        src,
        image,
        width: image.naturalWidth || image.width,
        height: image.naturalHeight || image.height,
    });
    image.onerror = () => {
        URL.revokeObjectURL(src);
        reject(new Error(`Unable to load ${file.name}`));
    };
    image.src = src;
});

// Pure decode step, testable in Node: returns raw RGBA pixels for the first TIFF page.
export const decodeTiffRgba = async (arrayBuffer) => {
    const { default: UTIF } = await import('utif');
    const ifds = UTIF.decode(arrayBuffer);
    if (!ifds.length) throw new Error('Unable to decode TIFF image.');
    const ifd = ifds[0];
    UTIF.decodeImage(arrayBuffer, ifd);
    const rgba = UTIF.toRGBA8(ifd);
    const width = ifd['t256']?.[0];
    const height = ifd['t257']?.[0];
    if (!width || !height || rgba.length < width * height * 4) {
        throw new Error('Unable to decode TIFF image.');
    }
    return { width, height, rgba };
};

// Browsers cannot decode TIFF with <img>, so decode the first page to a canvas
// and reload it as a PNG. Returns the same shape as loadImageFile.
export const loadTiffFile = async (file) => {
    const buffer = await file.arrayBuffer();
    const { width, height, rgba } = await decodeTiffRgba(buffer);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.putImageData(new ImageData(new Uint8ClampedArray(rgba), width, height), 0, 0);
    const blob = await canvasToBlob(canvas, 'image/png');
    const src = URL.createObjectURL(blob);
    const image = new Image();
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => {
            URL.revokeObjectURL(src);
            reject(new Error(`Unable to load ${file.name}`));
        };
        image.src = src;
    });
    return { file, src, image, width, height };
};

// Browsers cannot decode HEIC with <img> (except Safari), so convert it to PNG
// with heic2any (libheif WASM, bundled, runs in a worker) and reload it as an
// image. Dynamically imported so the ~1.3 MB decoder only loads for HEIC files.
// Returns the same shape as loadImageFile.
export const loadHeicFile = async (file) => {
    const { default: heic2any } = await import('heic2any');
    const converted = await heic2any({ blob: file, toType: 'image/png' });
    const blob = Array.isArray(converted) ? converted[0] : converted;
    if (!blob) throw new Error(`Unable to load ${file.name}`);
    const src = URL.createObjectURL(blob);
    const image = new Image();
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => {
            URL.revokeObjectURL(src);
            reject(new Error(`Unable to load ${file.name}`));
        };
        image.src = src;
    });
    return { file, src, image, width: image.naturalWidth || image.width, height: image.naturalHeight || image.height };
};

// Browsers cannot decode ICO with <img>, so decode it to pixels (BMP icons)
// or pass PNG-embedded icons straight to an <img>. Same shape as loadImageFile.
export const loadIcoFile = async (file) => {
    const buffer = await file.arrayBuffer();
    const decoded = decodeIco(buffer);
    let blob;
    if (decoded.pngBytes) {
        blob = new Blob([decoded.pngBytes], { type: 'image/png' });
    } else {
        const canvas = document.createElement('canvas');
        canvas.width = decoded.width;
        canvas.height = decoded.height;
        const context = canvas.getContext('2d');
        context.putImageData(new ImageData(new Uint8ClampedArray(decoded.rgba), decoded.width, decoded.height), 0, 0);
        blob = await canvasToBlob(canvas, 'image/png');
    }
    const src = URL.createObjectURL(blob);
    const image = new Image();
    await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => {
            URL.revokeObjectURL(src);
            reject(new Error(`Unable to load ${file.name}`));
        };
        image.src = src;
    });
    return { file, src, image, width: image.naturalWidth || image.width, height: image.naturalHeight || image.height };
};

export const loadAnyImageFile = (file) => {
    if (file.type === 'image/tiff' || getImageExtension(file) === 'tiff') return loadTiffFile(file);
    if (isHeicFile(file)) return loadHeicFile(file);
    if (isIcoFile(file)) return loadIcoFile(file);
    return loadImageFile(file);
};

export const drawImageToCanvas = (image, fill = null) => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, image.naturalWidth || image.width);
    canvas.height = Math.max(1, image.naturalHeight || image.height);
    const context = canvas.getContext('2d');
    if (fill) {
        context.fillStyle = fill;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(image, 0, 0);
    return canvas;
};

export const convertImageFile = async (file, mime, quality = 0.92) => {
    const loaded = await loadAnyImageFile(file);
    try {
        const fill = mime === 'image/jpeg' ? '#fff' : null;
        const canvas = drawImageToCanvas(loaded.image, fill);
        const blob = await canvasToBlob(canvas, mime, quality);
        return {
            name: replaceExtension(file.name, extensionForMime(mime)),
            blob,
            type: mime,
            size: blob.size,
            width: canvas.width,
            height: canvas.height,
        };
    } finally {
        URL.revokeObjectURL(loaded.src);
    }
};

export const pngBlobToIcoBlob = async (blob, size = 256) => {
    if (!Number.isInteger(size) || size < 1 || size > 256) {
        throw new Error('ICO size must be an integer from 1 to 256 pixels.');
    }
    const file = new File([blob], 'icon.png', { type: 'image/png' });
    const loaded = await loadImageFile(file);
    try {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, size, size);
        context.drawImage(loaded.image, 0, 0, size, size);
        const pngBlob = await canvasToBlob(canvas, 'image/png');
        const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
        const buffer = new ArrayBuffer(22 + pngBytes.length);
        const view = new DataView(buffer);
        view.setUint16(0, 0, true);
        view.setUint16(2, 1, true);
        view.setUint16(4, 1, true);
        view.setUint8(6, size >= 256 ? 0 : size);
        view.setUint8(7, size >= 256 ? 0 : size);
        view.setUint8(8, 0);
        view.setUint8(9, 0);
        view.setUint16(10, 1, true);
        view.setUint16(12, 32, true);
        view.setUint32(14, pngBytes.length, true);
        view.setUint32(18, 22, true);
        new Uint8Array(buffer, 22).set(pngBytes);
        return new Blob([buffer], { type: 'image/x-icon' });
    } finally {
        URL.revokeObjectURL(loaded.src);
    }
};
