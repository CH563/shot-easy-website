import { canvasToBlob, extensionForMime } from './imageConvert';

const pdfCMapUrls = import.meta.glob('/node_modules/pdfjs-dist/cmaps/*.bcmap', { query: '?url', import: 'default', eager: true });
const pdfStandardFontUrls = import.meta.glob('/node_modules/pdfjs-dist/standard_fonts/*.{pfb,ttf}', { query: '?url', import: 'default', eager: true });

const textBytes = (value) => new TextEncoder().encode(value);

const getPdfBaseName = (name) => name.replace(/\.pdf$/i, '') || 'document';

const normalizeImageType = (type = 'image/png') => {
    if (type === 'jpg' || type === 'jpeg') return 'image/jpeg';
    if (type === 'png') return 'image/png';
    if (type === 'webp') return 'image/webp';
    if (type === 'image/jpeg' || type === 'image/png' || type === 'image/webp') return type;
    return 'image/png';
};

const getPdfJs = async () => {
    const [pdfjsLib, worker] = await Promise.all([
        import('pdfjs-dist'),
        import('pdfjs-dist/build/pdf.worker.mjs?url'),
    ]);
    pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
    return pdfjsLib;
};

class ViteCMapReaderFactory {
    constructor({ isCompressed = true } = {}) {
        this.isCompressed = isCompressed;
    }

    async fetch({ name }) {
        const url = pdfCMapUrls[`/node_modules/pdfjs-dist/cmaps/${name}.bcmap`];
        if (!url) throw new Error(`Unable to load PDF CMap: ${name}`);
        const data = await fetch(url).then((response) => response.arrayBuffer());
        return { cMapData: new Uint8Array(data), isCompressed: this.isCompressed };
    }
}

class ViteStandardFontDataFactory {
    async fetch({ filename }) {
        const url = pdfStandardFontUrls[`/node_modules/pdfjs-dist/standard_fonts/${filename}`];
        if (!url) throw new Error(`Unable to load PDF standard font: ${filename}`);
        const data = await fetch(url).then((response) => response.arrayBuffer());
        return new Uint8Array(data);
    }
}

const drawImageRecordToCanvas = (item) => {
    const width = Math.max(1, Math.round(item.width || item.image?.naturalWidth || item.image?.width || 1));
    const height = Math.max(1, Math.round(item.height || item.image?.naturalHeight || item.image?.height || 1));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
    context.drawImage(item.image, 0, 0, width, height);
    return canvas;
};

const createPdfWriter = () => {
    const parts = [];
    const offsets = [0];
    let length = 0;

    const pushText = (value) => {
        const bytes = textBytes(value);
        parts.push(bytes);
        length += bytes.length;
    };

    const pushBytes = (bytes) => {
        parts.push(bytes);
        length += bytes.length;
    };

    const addObject = (body) => {
        offsets.push(length);
        pushText(`${offsets.length - 1} 0 obj\n${body}\nendobj\n`);
    };

    const addStreamObject = (dictionary, streamBytes) => {
        offsets.push(length);
        pushText(`${offsets.length - 1} 0 obj\n${dictionary}\nstream\n`);
        pushBytes(streamBytes);
        pushText('\nendstream\nendobj\n');
    };

    const finish = () => {
        const xrefOffset = length;
        pushText(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`);
        for (let i = 1; i < offsets.length; i += 1) {
            pushText(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
        }
        pushText(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
        return new Blob(parts, { type: 'application/pdf' });
    };

    return { addObject, addStreamObject, finish, pushText };
};

export async function renderPdfPages(file, options = {}) {
    const scale = options.scale ?? 2;
    const outputType = normalizeImageType(options.outputType);
    const quality = options.quality ?? 0.92;
    const pdfjsLib = await getPdfJs();
    const data = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({
        data,
        cMapPacked: true,
        CMapReaderFactory: ViteCMapReaderFactory,
        StandardFontDataFactory: ViteStandardFontDataFactory,
        useWorkerFetch: false,
        enableXfa: true,
    }).promise;

    try {
        const items = [];
        const baseName = getPdfBaseName(file.name);
        const pageNumberLength = String(pdf.numPages).length;
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.ceil(viewport.width));
            canvas.height = Math.max(1, Math.ceil(viewport.height));
            const context = canvas.getContext('2d');
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({
                canvasContext: context,
                viewport,
                background: 'white',
            }).promise;
            page.cleanup?.();

            const blob = await canvasToBlob(canvas, outputType, quality);
            const pageLabel = String(pageNumber).padStart(pageNumberLength, '0');
            items.push({
                name: `${baseName}-page-${pageLabel}.${extensionForMime(outputType)}`,
                blob,
                type: outputType,
                size: blob.size,
                width: canvas.width,
                height: canvas.height,
                pageNumber,
            });
        }
        return items;
    } finally {
        await pdf.destroy();
    }
}

export async function createImagesPdfBlob(items) {
    if (!items.length) throw new Error('No images to convert.');

    const pages = [];
    for (const item of items) {
        if (!item.image) throw new Error('PDF image records must include an image.');
        const canvas = drawImageRecordToCanvas(item);
        const jpegBlob = await canvasToBlob(canvas, 'image/jpeg', 0.92);
        pages.push({
            width: canvas.width,
            height: canvas.height,
            jpegBytes: new Uint8Array(await jpegBlob.arrayBuffer()),
        });
    }

    const writer = createPdfWriter();
    const pageRefs = pages.map((_, index) => `${3 + index * 3} 0 R`).join(' ');
    writer.pushText('%PDF-1.4\n');
    writer.addObject('<< /Type /Catalog /Pages 2 0 R >>');
    writer.addObject(`<< /Type /Pages /Kids [${pageRefs}] /Count ${pages.length} >>`);

    pages.forEach((page, index) => {
        const pageObject = 3 + index * 3;
        const imageObject = pageObject + 1;
        const contentObject = pageObject + 2;
        const content = `q\n${page.width} 0 0 ${page.height} 0 0 cm\n/Im${index} Do\nQ\n`;
        const contentBytes = textBytes(content);

        writer.addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /XObject << /Im${index} ${imageObject} 0 R >> >> /Contents ${contentObject} 0 R >>`);
        writer.addStreamObject(`<< /Type /XObject /Subtype /Image /Width ${page.width} /Height ${page.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page.jpegBytes.length} >>`, page.jpegBytes);
        writer.addStreamObject(`<< /Length ${contentBytes.length} >>`, contentBytes);
    });

    return writer.finish();
}
