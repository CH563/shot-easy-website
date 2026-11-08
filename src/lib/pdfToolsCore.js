import { PDFDocument } from 'pdf-lib';

let idCounter = 0;

export const isPdfFile = (file) => {
    const name = (file?.name || '').toLowerCase();
    return name.endsWith('.pdf') || file?.type === 'application/pdf';
};

export const loadPdfInfo = async (file) => {
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    return {
        id: ++idCounter,
        file,
        name: file.name,
        size: file.size,
        pages: doc.getPageCount(),
        bytes
    };
};

export const describeLoadError = (error, ui) => {
    const text = String(error?.message || '');
    if (/encrypt/i.test(text)) return ui.errorEncrypted;
    return ui.errorLoad;
};

export const stripMetadata = (doc) => {
    doc.setTitle('');
    doc.setAuthor('');
    doc.setSubject('');
    doc.setKeywords([]);
    doc.setProducer('');
    doc.setCreator('');
};

export const mergePdfBytes = async (items) => {
    const merged = await PDFDocument.create();
    for (const item of items) {
        const source = await PDFDocument.load(item.bytes);
        const pages = await merged.copyPages(source, source.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
    }
    stripMetadata(merged);
    const bytes = await merged.save({ useObjectStreams: true });
    return { bytes, size: bytes.length, pages: merged.getPageCount() };
};

export const compressPdfBytes = async (bytes) => {
    const doc = await PDFDocument.load(bytes);
    stripMetadata(doc);
    const out = await doc.save({ useObjectStreams: true });
    return { bytes: out, size: out.length, pages: doc.getPageCount() };
};
