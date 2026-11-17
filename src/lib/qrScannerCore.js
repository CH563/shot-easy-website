import jsQR from 'jsqr';

// Returns the decoded text, or null when no QR code is found.
export const decodeQrFromImageData = (data, width, height) => {
    const result = jsQR(data, width, height);
    return result ? result.data : null;
};

export const isProbablyUrl = (text) => {
    const value = String(text || '').trim();
    if (!value) return false;
    if (/^(https?:\/\/|mailto:|tel:)/i.test(value)) return true;
    return /^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(value);
};

// Turns scanned text into something safe to open: bare domains get https://.
export const openableHref = (text) => {
    const value = String(text || '').trim();
    if (/^(https?:\/\/|mailto:|tel:)/i.test(value)) return value;
    return `https://${value}`;
};
