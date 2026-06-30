export default {
    title: 'Word, Excel, PPT 온라인 열기 - 무료 Office Viewer | ShotEasy',
    description: 'DOCX, XLSX, PPTX, CSV, PDF, ZIP, RAR 파일을 브라우저에서 온라인으로 여세요. 설치 없이 로컬 우선으로 미리보기합니다.',
    keywords: 'docx online, office viewer, pptx open, excel viewer online, xlsx online, pdf viewer, zip extractor, rar extractor',
    h1: 'Word, Excel, PPT 온라인 열기 - 무료 보안 Office Viewer',
    tip: '설치가 필요 없습니다. 파일은 빠른 미리보기를 위해 브라우저에 남아 있습니다.',
    cards: [
        { title: 'View Word Documents', desc: 'Open DOCX files online with a private browser-based Word document viewer.', icon: 'FileText' },
        { title: 'View Excel Spreadsheets', desc: 'Preview XLSX workbooks, sheets, rows, columns, charts, and cell formatting.', icon: 'Table2' },
        { title: 'View PowerPoint Presentations', desc: 'Open PPTX slides online and move through decks without installing Office.', icon: 'Presentation' },
        { title: 'View CSV Files', desc: 'Inspect CSV data in a clean table preview for quick spreadsheet checks.', icon: 'Rows3' },
        { title: 'View PDF Files', desc: 'Render PDF pages locally with the same PDF library already used by ShotEasy.', icon: 'File' },
        { title: 'View ZIP & RAR Archives', desc: 'Browse archive folders, preview supported files, and download extracted items.', icon: 'Archive' }
    ],
    tool: {
        addFile: 'Add File',
        download: 'Download',
        downloadOriginal: 'Download Original',
        downloadSelected: 'Download Selected',
        downloadPng: 'Download PNG',
        clear: 'Clear',
        fullscreen: 'Full Screen',
        restore: 'Restore',
        previous: 'Previous',
        next: 'Next',
        folder: 'Folder',
        tree: 'Tree',
        view: 'View:',
        root: 'Root',
        archiveContents: 'Archive Contents',
        preview: 'Preview',
        emptyTitle: 'Click or drag a document, PDF, CSV, ZIP, or RAR file here',
        emptyHint: 'DOCX / XLSX / PPTX / CSV / PDF / ZIP / RAR',
        selectFile: 'Select a file to preview it here.',
        unsupported: 'This file type can be downloaded, but preview is not supported yet.',
        loading: 'Loading preview...',
        archiveLoading: 'Reading archive...',
        encryptedArchive: 'This archive appears to be encrypted and cannot be previewed without a password.',
        officeNote: 'Best for Office Open XML files: DOCX, XLSX, and PPTX.',
        legacyOfficeNote: 'Legacy DOC, XLS, and PPT files are not supported by this viewer.',
        pdfPage: 'Page',
        sheet: 'Sheet',
        slide: 'Slide',
        textPreview: 'Text Preview',
        imagePreview: 'Image Preview'
    },
    localTitle: '브라우저의 개인 Office Viewer',
    localCont1: 'DOCX, XLSX, PPTX를 브라우저에서 바로 여세요.',
    localCont2: '가능한 경우 파일은 로컬로 처리되어 원격 뷰어 업로드가 필요 없습니다.',
    supportTitle: '지원되는 문서 및 압축 형식',
    supportCont1: 'DOCX, XLSX, PPTX, CSV, PDF, 이미지, 텍스트, ZIP, RAR 미리보기를 지원합니다.',
    supportCont2: 'ZIP과 RAR은 아카이브 트리로 열어 미리보기하거나 추출할 수 있습니다.',
    seoTitle: 'DOCX, XLSX, PPTX, PDF, CSV, ZIP, RAR용 무료 온라인 Office Viewer',
    seoIntro: 'ShotEasy Viewer는 open docx online, office viewer, pptx open, zip extractor, rar extractor 검색을 위해 설계되었습니다.',
    featureSections: [
        {
            title: 'DOCX 온라인 열기',
            body: '브라우저의 로컬 Viewer로 Word 문서를 미리봅니다. 최신 DOCX 파일에 적합합니다.'
        },
        {
            title: 'XLSX와 PPTX 온라인 열기',
            body: 'Microsoft Office 설치 없이 Excel 시트와 PowerPoint 슬라이드를 미리볼 수 있습니다.'
        },
        {
            title: 'PDF 및 CSV Viewer',
            body: 'PDF는 pdf.js로 렌더링되고 CSV는 읽기 쉬운 테이블로 열립니다.'
        },
        {
            title: 'ZIP 및 RAR 온라인 추출',
            body: '압축 파일 내용을 탐색하고, 파일을 미리보거나 추출해 다운로드할 수 있습니다.'
        }
    ],
    faqTitle: 'Office Viewer FAQ',
    faqs: [
        {
            question: 'DOCX를 업로드 없이 온라인으로 열 수 있나요?',
            answer: '네. DOCX 파일은 브라우저에서 로컬 WebAssembly와 Canvas Viewer로 렌더링됩니다.'
        },
        {
            question: 'RAR extractor online처럼 사용할 수 있나요?',
            answer: '네. RAR 압축 파일을 목록으로 보고 지원되는 파일은 미리보기 또는 다운로드할 수 있습니다.'
        },
        {
            question: '오래된 DOC, XLS, PPT도 지원하나요?',
            answer: 'Viewer는 최신 Office Open XML 형식인 DOCX, XLSX, PPTX를 지원합니다. 오래된 바이너리 형식은 지원하지 않습니다.'
        }
    ],
    poweredBy: 'Office viewing powered by office-open-xml-viewer. Archive viewing powered by libarchivejs.'
};
