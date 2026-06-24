import en from '../en/convert';

export default {
    ...en,
    title: 'Convertidor de imágenes online - PNG a WebP, PDF a imágenes | ShotEasy',
    description: 'Convertidor de imágenes online gratis para PNG a WebP, JPG a WebP, SVG a PNG, PNG a ICO, imágenes a PDF y PDF a imágenes. Convierte archivos localmente en tu navegador.',
    keywords: 'convertidor de imágenes online, png a webp, jpg a webp, imágenes a pdf, pdf a imágenes, svg a png, png a ico, convertidor de imágenes local',
    tip: 'Convierte imágenes y PDF localmente en tu navegador. Sin subir archivos ni registrarte.',
    localTitle: 'Convertidor local de formatos de imagen',
    tool: {
        ...en.tool,
        modes: {
            imageToWebp: 'PNG/JPG a WebP',
            imageToJpg: 'Imagen a JPG',
            imageToPng: 'Imagen a PNG',
            imagesToPdf: 'Imágenes a PDF',
            pdfToImages: 'PDF a imágenes',
            svgToPng: 'SVG a PNG',
            pngToIco: 'PNG a ICO'
        }
    }
};
