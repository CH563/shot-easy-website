import en from '../en/convert';

export default {
    ...en,
    title: 'Image Converter Online - PNG to WebP, PDF to Images | ShotEasy',
    description: 'Free online image converter for PNG to WebP, JPG to WebP, SVG to PNG, PNG to ICO, images to PDF, and PDF to images. Convert files locally in your browser.',
    keywords: 'image converter online, png to webp, jpg to webp, images to pdf, pdf to images, svg to png, png to ico, local image converter',
    tip: 'Convert images and PDFs locally in your browser. No upload, no signup.',
    localTitle: 'Local image format converter',
    tool: {
        ...en.tool,
        modes: {
            ...en.tool.modes,
            imageToWebp: 'PNG/JPG to WebP',
            imageToJpg: 'Image to JPG',
            imageToPng: 'Image to PNG',
            imagesToPdf: 'Images to PDF',
            pdfToImages: 'PDF to Images',
            svgToPng: 'SVG to PNG',
            pngToIco: 'PNG to ICO'
        }
    }
};
