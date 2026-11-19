// Pure-frontend data and text conversion: CSV / TSV / JSON / XLSX and Markdown.
// All work happens locally with SheetJS and markdown-it; nothing is uploaded.

export const dataExtensions = ['csv', 'tsv', 'json', 'xlsx'];
export const textExtensions = ['md'];

export const dataMimeByExtension = {
    csv: 'text/csv',
    tsv: 'text/tab-separated-values',
    json: 'application/json',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const dataInputTypes = [
    'text/csv',
    'text/tab-separated-values',
    'application/json',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/markdown',
];

export const getFileExtension = (name = '') => {
    const dotIndex = name.lastIndexOf('.');
    return dotIndex > 0 ? name.slice(dotIndex + 1).toLowerCase() : '';
};

export const isDataFile = (file) => dataExtensions.includes(getFileExtension(file?.name));
export const isTextFile = (file) => textExtensions.includes(getFileExtension(file?.name));

const loadXlsx = async () => {
    const mod = await import('xlsx');
    return mod.default ?? mod;
};

const readDataWorkbook = async (file, XLSX) => {
    const extension = getFileExtension(file.name);
    if (extension === 'xlsx') {
        const buffer = await file.arrayBuffer();
        return XLSX.read(buffer, { type: 'array' });
    }
    if (extension === 'json') {
        const text = await file.text();
        const parsed = JSON.parse(text);
        const rows = Array.isArray(parsed) ? parsed : [parsed];
        const sheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
        return workbook;
    }
    if (extension === 'csv' || extension === 'tsv') {
        const text = await file.text();
        return XLSX.read(text, { type: 'string', FS: extension === 'tsv' ? '\t' : ',' });
    }
    throw new Error(`Unsupported data file: ${file.name}`);
};

const firstSheetOf = (workbook, XLSX) => {
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) throw new Error('The file has no data sheet.');
    return workbook.Sheets[sheetName];
};

export const convertDataFile = async (file, target) => {
    if (!['xlsx', 'csv', 'json'].includes(target)) {
        throw new Error(`Unsupported data target: ${target}`);
    }
    const XLSX = await loadXlsx();
    const workbook = await readDataWorkbook(file, XLSX);
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'converted';
    if (target === 'xlsx') {
        const bytes = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([bytes], { type: dataMimeByExtension.xlsx });
        return { name: `${baseName}.xlsx`, blob, type: dataMimeByExtension.xlsx, size: blob.size };
    }
    if (target === 'csv') {
        const text = XLSX.write(workbook, { bookType: 'csv', type: 'string' });
        const blob = new Blob([text], { type: dataMimeByExtension.csv });
        return { name: `${baseName}.csv`, blob, type: dataMimeByExtension.csv, size: blob.size };
    }
    const sheet = firstSheetOf(workbook, XLSX);
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });
    const text = JSON.stringify(rows, null, 2);
    const blob = new Blob([text], { type: dataMimeByExtension.json });
    return { name: `${baseName}.json`, blob, type: dataMimeByExtension.json, size: blob.size };
};

export const convertMarkdownFile = async (file) => {
    const { default: MarkdownIt } = await import('markdown-it');
    const text = await file.text();
    const body = new MarkdownIt().render(text);
    const title = file.name.replace(/\.[^.]+$/, '') || 'Document';
    const html = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>${title}</title>\n</head>\n<body>\n${body}</body>\n</html>\n`;
    const blob = new Blob([html], { type: 'text/html' });
    return { name: `${title}.html`, blob, type: 'text/html', size: blob.size };
};
