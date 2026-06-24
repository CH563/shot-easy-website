import en from '../en/convert';

export default {
    ...en,
    title: 'Конвертер изображений онлайн - PNG в WebP, PDF в изображения | ShotEasy',
    description: 'Бесплатный онлайн-конвертер изображений для PNG в WebP, JPG в WebP, SVG в PNG, PNG в ICO, изображений в PDF и PDF в изображения. Конвертируйте файлы локально в браузере.',
    keywords: 'конвертер изображений онлайн, png в webp, jpg в webp, изображения в pdf, pdf в изображения, svg в png, png в ico, локальный конвертер изображений',
    tip: 'Конвертация изображений и PDF локально в браузере, без загрузки на сервер.',
    localTitle: 'Локальный конвертер форматов изображений',
    tool: {
        ...en.tool,
        modes: {
            imageToWebp: 'PNG/JPG в WebP',
            imageToJpg: 'Изображение в JPG',
            imageToPng: 'Изображение в PNG',
            imagesToPdf: 'Изображения в PDF',
            pdfToImages: 'PDF в изображения',
            svgToPng: 'SVG в PNG',
            pngToIco: 'PNG в ICO'
        }
    }
};
