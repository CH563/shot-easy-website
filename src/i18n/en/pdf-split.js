export default {
    title: 'Split PDF Online Free — Extract Pages & Split into Files | ShotEasy',
    description: 'Split a PDF online: extract selected pages or split every page into separate files. Free, local processing with no upload, no sign-up and no watermark.',
    keywords: 'split pdf online, extract pages from pdf, split pdf into separate files, pdf splitter online, separate pdf pages free',
    h1: 'Split PDF Online',
    tip: 'Not uploaded — split PDFs in your browser',
    online: 'Split PDF Online',
    onlineCont1: 'Free online PDF splitter for everyday document work. Extract the pages you need into a new PDF, or split a whole document into one file per page — all in your browser, without sending files to a server.',
    onlineCont2: 'Processing is purely local: your PDF never leaves your device. Add a file, pick the pages, then download the result. No account, no sign-up, no watermark.',
    faqTitle: 'Split PDF FAQ',
    faq: [
        {
            question: 'Is splitting a PDF free?',
            answer: 'Yes. Both split modes are free to use in your browser, with no account and no sign-up.'
        },
        {
            question: 'Are my PDFs uploaded to a server?',
            answer: 'No. Splitting runs locally in your browser, so your files stay on your device.'
        },
        {
            question: 'Can I split a password-protected PDF?',
            answer: 'No. Encrypted or password-protected PDFs cannot be opened here, and this tool cannot remove passwords. Remove the password in a PDF app first, then split the file.'
        },
        {
            question: 'What page numbers can I enter?',
            answer: 'Page numbers start at 1. Enter single pages and ranges like 1-3, 5, 8-10 — duplicates are removed and pages stay in order. To split every page into its own file instead, use the "Split every page" tab; the files download together as one ZIP.'
        }
    ],
    why: 'Why split a PDF?',
    whyCont1: 'Splitting pulls the pages you need out of a long document — a single chapter, the signed page of a contract, the receipt among scanned pages — so you can share or archive just that part instead of the whole file.',
    whyCont2: 'Splitting every page into separate files is handy for scanned batches and bulk uploads: each page becomes its own PDF, named by page number, in one ZIP download.',
    ui: {
        extractTab: 'Extract pages',
        everyPageTab: 'Split every page',
        addFileTitle: 'Click or drag a PDF file here',
        addFileDesc: 'One PDF file at a time. The split files keep the original pages.',
        rangesLabel: 'Pages to extract',
        rangesPlaceholder: 'Example: 1-3, 5, 8-10',
        rangesHint: 'Page numbers start at 1. Ranges and single pages can be mixed; duplicates are removed and pages stay in order.',
        extractButton: 'Extract pages',
        extracting: 'Extracting…',
        splitEveryButton: 'Split into separate files',
        splitting: 'Splitting…',
        everyPageDesc: 'Every page becomes its own PDF file, named by page number, downloaded together as one ZIP.',
        downloadSplit: 'Download split PDF',
        downloadZip: 'Download ZIP',
        clearFile: 'Remove file',
        pages: 'pages',
        splitSize: 'Split file size',
        splitReady: 'Your split PDF is ready.',
        zipReady: 'Your ZIP with one PDF per page is ready.',
        errorNotPdf: 'Only PDF files are supported. Please add .pdf files.',
        errorEncrypted: 'This PDF is encrypted or password-protected and cannot be opened here.',
        errorLoad: 'This file could not be read as a PDF. Please check the file and try again.',
        errorNoFile: 'Add a PDF file first.',
        errorEmptyRanges: 'Enter the pages to extract, for example 1-3, 5.',
        errorInvalidRanges: 'Check the page numbers. Use numbers and ranges like 1-3, 5, 8-10.',
        errorOutOfRange: 'One of the page numbers is beyond the end of this PDF.',
        errorSplit: 'Splitting failed. Please try again with a different file.'
    }
}
