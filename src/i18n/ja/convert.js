import en from '../en/convert';

export default {
    ...en,
    title: '画像変換オンライン - PNGからWebP、PDFから画像 | ShotEasy',
    description: 'PNGからWebP、JPGからWebP、SVGからPNG、PNGからICO、画像からPDF、PDFから画像に対応する無料オンライン画像変換ツール。ブラウザ内でローカル変換できます。',
    keywords: '画像変換オンライン, png webp 変換, jpg webp 変換, 画像 pdf 変換, pdf 画像 変換, svg png 変換, png ico 変換, ローカル画像変換',
    tip: '画像と PDF をブラウザ内でローカル変換。アップロード不要、登録不要です。',
    localTitle: 'ローカル画像形式変換',
    tool: {
        ...en.tool,
        modes: {
            ...en.tool.modes,
            imageToWebp: 'PNG/JPG から WebP',
            imageToJpg: '画像から JPG',
            imageToPng: '画像から PNG',
            imagesToPdf: '画像から PDF',
            pdfToImages: 'PDF から画像',
            svgToPng: 'SVG から PNG',
            pngToIco: 'PNG から ICO'
        }
    }
};
