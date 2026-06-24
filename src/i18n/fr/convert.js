import en from '../en/convert';

export default {
    ...en,
    title: 'Convertisseur d’images en ligne - PNG en WebP, PDF en images | ShotEasy',
    description: 'Convertisseur d’images gratuit en ligne pour PNG en WebP, JPG en WebP, SVG en PNG, PNG en ICO, images en PDF et PDF en images. Convertissez les fichiers localement dans votre navigateur.',
    keywords: 'convertisseur d’images en ligne, png en webp, jpg en webp, images en pdf, pdf en images, svg en png, png en ico, convertisseur d’images local',
    tip: 'Convertissez images et PDF localement dans votre navigateur. Aucun envoi, aucune inscription.',
    localTitle: 'Convertisseur local de formats d’image',
    tool: {
        ...en.tool,
        modes: {
            imageToWebp: 'PNG/JPG en WebP',
            imageToJpg: 'Image en JPG',
            imageToPng: 'Image en PNG',
            imagesToPdf: 'Images en PDF',
            pdfToImages: 'PDF en images',
            svgToPng: 'SVG en PNG',
            pngToIco: 'PNG en ICO'
        }
    }
};
