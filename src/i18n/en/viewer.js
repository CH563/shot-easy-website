export default {
    title: 'Open Word, Excel & PPT Online - Free & Secure Office Viewer | ShotEasy',
    description: 'Open DOCX, XLSX, PPTX, CSV, PDF, ZIP, and RAR files online with a free local-first office viewer. No installation required and your files never leave your browser.',
    keywords: 'open docx online, rar extractor online, office viewer, pptx open, open pptx online, excel viewer online, open xlsx online, csv viewer online, pdf viewer online, zip extractor online, docx viewer online',
    h1: 'Open Word, Excel & PPT Online - Free & Secure Office Viewer',
    tip: 'No installation required. Your files never leave your browser - start viewing documents instantly.',
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
    localTitle: 'Private office viewer in your browser',
    localCont1: 'Use this office viewer to open DOCX online, open XLSX workbooks, and open PPTX presentations directly in your browser.',
    localCont2: 'Files are processed locally whenever possible, so private documents do not need to be uploaded to a remote document viewer.',
    supportTitle: 'Supported document and archive formats',
    supportCont1: 'Supported previews include DOCX, XLSX, PPTX, CSV, PDF, common images, text files, ZIP archives, and RAR archives.',
    supportCont2: 'ZIP and RAR files can be opened as an archive tree. Select supported files inside the archive to view them or download extracted copies.',
    seoTitle: 'Free online office viewer for DOCX, XLSX, PPTX, PDF, CSV, ZIP and RAR',
    seoIntro: 'ShotEasy Viewer is built for common searches like open docx online, office viewer, pptx open, zip extractor online, and rar extractor online. It helps you inspect documents quickly without installing Word, Excel, PowerPoint, Acrobat, or archive software.',
    featureSections: [
        {
            title: 'Open DOCX online',
            body: 'View Word documents in a canvas-based DOCX viewer powered by the open-source office-open-xml-viewer project. It is designed for modern Office Open XML documents.'
        },
        {
            title: 'Open XLSX and PPTX online',
            body: 'Preview Excel spreadsheets and PowerPoint presentations locally, including workbook sheets and slide navigation, with no Microsoft Office installation required.'
        },
        {
            title: 'PDF and CSV viewer',
            body: 'PDF pages render with pdf.js, while CSV files open in a clean table preview so you can scan rows and columns before sharing or downloading.'
        },
        {
            title: 'ZIP and RAR extractor online',
            body: 'Browse archive contents in folder or tree mode, select a file to preview, and download extracted files from ZIP, RAR, 7z, TAR, and other libarchive-supported formats.'
        }
    ],
    faqTitle: 'Office Viewer FAQ',
    faqs: [
        {
            question: 'Can I open DOCX online without uploading it?',
            answer: 'Yes. DOCX files are rendered in your browser with a local WebAssembly and Canvas viewer.'
        },
        {
            question: 'Can I use this as a RAR extractor online?',
            answer: 'Yes. RAR archives can be listed and supported files can be extracted for preview or download in the browser.'
        },
        {
            question: 'Does the viewer support old DOC, XLS, or PPT files?',
            answer: 'The office renderer supports modern Office Open XML files: DOCX, XLSX, and PPTX. Older binary Office formats are not supported.'
        }
    ],
    poweredBy: 'Office viewing powered by office-open-xml-viewer. Archive viewing powered by libarchivejs.'
};
