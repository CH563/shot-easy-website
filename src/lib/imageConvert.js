export const imageInputTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

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
    if (mime === 'image/x-icon') return 'ico';
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
    const loaded = await loadImageFile(file);
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
