import en from '../en/convert';

export default {
    ...en,
    title: 'Convertisseur de fichiers en ligne - images, PDF, CSV, XLSX, JSON, Markdown | ShotEasy',
    description: 'Convertisseur de fichiers gratuit en ligne : images en JPG, PNG, WebP et PDF — y compris les entrées HEIC et ICO —, PDF en JPG, PNG et WebP, conversion CSV, XLSX, JSON et TSV, et Markdown en HTML. Convertissez vos fichiers localement dans votre navigateur.',
    keywords: 'convertisseur de fichiers en ligne, convertisseur d’images en ligne, png en webp, jpg en webp, jpg en pdf, pdf en jpg, pdf en webp, svg en jpg, gif en png, bmp en webp, tiff en jpg, heic en jpg, heic en png, heic en webp, ico en png, ico en jpg, convertisseur heic, convertisseur ico, csv en xlsx, xlsx en csv, json en csv, csv en json, markdown en html, convertisseur de fichiers local',
    tip: 'Convertissez images, PDF, feuilles de calcul et fichiers texte localement dans votre navigateur. Aucun envoi, aucune inscription.',
    convertersTitle: 'Tous les convertisseurs',
    localTitle: 'Convertisseur local de formats de fichiers',
    tool: {
        ...en.tool,
        emptyHint: 'Images, PDF, CSV, XLSX, JSON, Markdown',
        groups: {
            images: 'Images',
            pdf: 'PDF',
            data: 'Données et texte'
        },
        modes: {
            ...en.tool.modes,
            imageToWebp: 'Image en WebP',
            imageToJpg: 'Image en JPG',
            imageToPng: 'Image en PNG',
            imagesToPdf: 'Images en PDF',
            pdfToImages: 'PDF en images',
            pdfToJpg: 'PDF en JPG',
            pdfToWebp: 'PDF en WebP',
            svgToPng: 'SVG en PNG',
            svgToJpg: 'SVG en JPG',
            svgToWebp: 'SVG en WebP',
            pngToIco: 'PNG en ICO',
            csvToXlsx: 'CSV en XLSX',
            xlsxToCsv: 'XLSX en CSV',
            jsonToCsv: 'JSON en CSV',
            csvToJson: 'CSV en JSON',
            jsonToXlsx: 'JSON en XLSX',
            xlsxToJson: 'XLSX en JSON',
            tsvToCsv: 'TSV en CSV',
            tsvToXlsx: 'TSV en XLSX',
            mdToHtml: 'Markdown en HTML'
        }
    }
};
