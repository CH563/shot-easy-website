import en from '../en/convert';

export default {
    ...en,
    title: 'Конвертер зображень онлайн - PNG у WebP, PDF у зображення | ShotEasy',
    description: 'Безкоштовний онлайн-конвертер зображень для PNG у WebP, JPG у WebP, SVG у PNG, PNG у ICO, зображень у PDF і PDF у зображення. Конвертуйте файли локально в браузері.',
    keywords: 'конвертер зображень онлайн, png у webp, jpg у webp, зображення у pdf, pdf у зображення, svg у png, png у ico, локальний конвертер зображень',
    tip: 'Конвертація зображень і PDF локально в браузері, без завантаження на сервер.',
    localTitle: 'Локальний конвертер форматів зображень',
    tool: {
        ...en.tool,
        modes: {
            ...en.tool.modes,
            imageToWebp: 'PNG/JPG у WebP',
            imageToJpg: 'Зображення у JPG',
            imageToPng: 'Зображення у PNG',
            imagesToPdf: 'Зображення у PDF',
            pdfToImages: 'PDF у зображення',
            svgToPng: 'SVG у PNG',
            pngToIco: 'PNG у ICO'
        }
    }
};
