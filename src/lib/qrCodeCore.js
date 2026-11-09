import QRCode from 'qrcode';

export const ERROR_CORRECTION_LEVELS = ['L', 'M', 'Q', 'H'];

export const buildQrOptions = ({ errorCorrectionLevel = 'M', margin = 4, width = 512, dark = '#000000', light = '#FFFFFF' } = {}) => ({
    errorCorrectionLevel,
    margin,
    width,
    color: { dark, light }
});

export const isOverCapacityError = (error) => /too big to be stored in a qr code/i.test(String(error?.message || ''));

export const generateQrPngDataUrl = (text, options) => QRCode.toDataURL(text, buildQrOptions(options));

export const generateQrSvg = (text, options) => QRCode.toString(text, { ...buildQrOptions(options), type: 'svg' });

export const drawQrToCanvas = (canvas, text, options) => QRCode.toCanvas(canvas, text, buildQrOptions(options));
