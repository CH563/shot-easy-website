import en from '../en/convert';

export default {
    ...en,
    title: 'Chuyển đổi ảnh online - PNG sang WebP, PDF sang ảnh | ShotEasy',
    description: 'Công cụ chuyển đổi ảnh online miễn phí cho PNG sang WebP, JPG sang WebP, SVG sang PNG, PNG sang ICO, ảnh sang PDF và PDF sang ảnh. Chuyển đổi tệp cục bộ trong trình duyệt.',
    keywords: 'chuyển đổi ảnh online, png sang webp, jpg sang webp, ảnh sang pdf, pdf sang ảnh, svg sang png, png sang ico, chuyển đổi ảnh cục bộ',
    tip: 'Chuyển đổi ảnh và PDF cục bộ trong trình duyệt. Không tải lên, không cần đăng ký.',
    localTitle: 'Chuyển đổi định dạng ảnh cục bộ',
    tool: {
        ...en.tool,
        modes: {
            imageToWebp: 'PNG/JPG sang WebP',
            imageToJpg: 'Ảnh sang JPG',
            imageToPng: 'Ảnh sang PNG',
            imagesToPdf: 'Ảnh sang PDF',
            pdfToImages: 'PDF sang ảnh',
            svgToPng: 'SVG sang PNG',
            pngToIco: 'PNG sang ICO'
        }
    }
};
