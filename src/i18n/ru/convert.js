import en from '../en/convert';

export default {
    ...en,
    title: 'Конвертер файлов онлайн - изображения, PDF, CSV, XLSX, JSON, Markdown | ShotEasy',
    description: 'Бесплатный онлайн-конвертер файлов: изображения в JPG, PNG, WebP и PDF — включая HEIC и ICO, — PDF в JPG, PNG и WebP, конвертация CSV, XLSX, JSON и TSV, Markdown в HTML. Конвертируйте файлы локально в браузере.',
    keywords: 'конвертер файлов онлайн, конвертер изображений онлайн, png в webp, jpg в webp, jpg в pdf, pdf в jpg, pdf в webp, svg в jpg, gif в png, bmp в webp, tiff в jpg, heic в jpg, heic в png, heic в webp, ico в png, ico в jpg, конвертер heic, конвертер ico, csv в xlsx, xlsx в csv, json в csv, csv в json, markdown в html, локальный конвертер файлов',
    tip: 'Конвертация изображений, PDF, таблиц и текстовых файлов локально в браузере, без загрузки на сервер.',
    localTitle: 'Локальный конвертер форматов файлов',
    tool: {
        ...en.tool,
        emptyHint: 'Изображения, PDF, CSV, XLSX, JSON, Markdown',
        groups: {
            images: 'Изображения',
            pdf: 'PDF',
            data: 'Данные и текст'
        },
        modes: {
            ...en.tool.modes,
            imageToWebp: 'Изображение в WebP',
            imageToJpg: 'Изображение в JPG',
            imageToPng: 'Изображение в PNG',
            imagesToPdf: 'Изображения в PDF',
            pdfToImages: 'PDF в изображения',
            pdfToJpg: 'PDF в JPG',
            pdfToWebp: 'PDF в WebP',
            svgToPng: 'SVG в PNG',
            svgToJpg: 'SVG в JPG',
            svgToWebp: 'SVG в WebP',
            pngToIco: 'PNG в ICO',
            csvToXlsx: 'CSV в XLSX',
            xlsxToCsv: 'XLSX в CSV',
            jsonToCsv: 'JSON в CSV',
            csvToJson: 'CSV в JSON',
            jsonToXlsx: 'JSON в XLSX',
            xlsxToJson: 'XLSX в JSON',
            tsvToCsv: 'TSV в CSV',
            tsvToXlsx: 'TSV в XLSX',
            mdToHtml: 'Markdown в HTML'
        }
    }
};
