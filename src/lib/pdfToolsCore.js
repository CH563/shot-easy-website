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

// Parses user input like "1-3, 5, 8-10" into sorted unique 0-based page indices.
// Throws Error('empty' | 'invalid' | 'outOfRange').
export const parsePageRanges = (input, pageCount) => {
    const text = String(input || '').trim();
    if (!text) throw new Error('empty');
    const pages = new Set();
    for (const part of text.split(',')) {
        const token = part.trim();
        if (!token) throw new Error('invalid');
        const range = token.match(/^(\d+)\s*-\s*(\d+)$/);
        if (range) {
            const start = Number(range[1]);
            const end = Number(range[2]);
            if (start < 1 || end < 1 || start > end) throw new Error('invalid');
            if (end > pageCount) throw new Error('outOfRange');
            for (let p = start; p <= end; p++) pages.add(p - 1);
        } else if (/^\d+$/.test(token)) {
            const page = Number(token);
            if (page < 1 || page > pageCount) throw new Error('outOfRange');
            pages.add(page - 1);
        } else {
            throw new Error('invalid');
        }
    }
    return [...pages].sort((a, b) => a - b);
};

export const splitPdfBytes = async (bytes, indices) => {
    const source = await PDFDocument.load(bytes);
    const out = await PDFDocument.create();
    const pages = await out.copyPages(source, indices);
    pages.forEach((page) => out.addPage(page));
    stripMetadata(out);
    const outBytes = await out.save({ useObjectStreams: true });
    return { bytes: outBytes, size: outBytes.length, pages: out.getPageCount() };
};

export const splitPdfEveryPage = async (bytes) => {
    const source = await PDFDocument.load(bytes);
    const results = [];
    for (const index of source.getPageIndices()) {
        const out = await PDFDocument.create();
        const [page] = await out.copyPages(source, [index]);
        out.addPage(page);
        stripMetadata(out);
        const outBytes = await out.save({ useObjectStreams: true });
        results.push({ bytes: outBytes, size: outBytes.length, page: index + 1 });
    }
    return results;
};
