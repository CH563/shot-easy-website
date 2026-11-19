import en from '../en/convert';

export default {
    ...en,
    title: 'Конвертер файлів онлайн - зображення, PDF, CSV, XLSX, JSON, Markdown | ShotEasy',
    description: 'Безкоштовний онлайн-конвертер файлів: зображення у JPG, PNG, WebP і PDF — включно з HEIC і ICO, — PDF у JPG, PNG і WebP, конвертація CSV, XLSX, JSON і TSV, Markdown у HTML. Конвертуйте файли локально в браузері.',
    keywords: 'конвертер файлів онлайн, конвертер зображень онлайн, png у webp, jpg у webp, jpg у pdf, pdf у jpg, pdf у webp, svg у jpg, gif у png, bmp у webp, tiff у jpg, heic у jpg, heic у png, heic у webp, ico у png, ico у jpg, конвертер heic, конвертер ico, csv у xlsx, xlsx у csv, json у csv, csv у json, markdown у html, локальний конвертер файлів',
    tip: 'Конвертація зображень, PDF, таблиць і текстових файлів локально в браузері, без завантаження на сервер.',
    convertersTitle: 'Усі конвертери',
    localTitle: 'Локальний конвертер форматів файлів',
    tool: {
        ...en.tool,
        emptyHint: 'Зображення, PDF, CSV, XLSX, JSON, Markdown',
        groups: {
            images: 'Зображення',
            pdf: 'PDF',
            data: 'Дані та текст'
        },
        modes: {
            ...en.tool.modes,
            imageToWebp: 'Зображення у WebP',
            imageToJpg: 'Зображення у JPG',
            imageToPng: 'Зображення у PNG',
            imagesToPdf: 'Зображення у PDF',
            pdfToImages: 'PDF у зображення',
            pdfToJpg: 'PDF у JPG',
            pdfToWebp: 'PDF у WebP',
            svgToPng: 'SVG у PNG',
            svgToJpg: 'SVG у JPG',
            svgToWebp: 'SVG у WebP',
            pngToIco: 'PNG у ICO',
            csvToXlsx: 'CSV у XLSX',
            xlsxToCsv: 'XLSX у CSV',
            jsonToCsv: 'JSON у CSV',
            csvToJson: 'CSV у JSON',
            jsonToXlsx: 'JSON у XLSX',
            xlsxToJson: 'XLSX у JSON',
            tsvToCsv: 'TSV у CSV',
            tsvToXlsx: 'TSV у XLSX',
            mdToHtml: 'Markdown у HTML'
        }
    }
};
