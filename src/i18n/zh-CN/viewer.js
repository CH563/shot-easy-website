export default {
    title: '在线打开 Word、Excel 和 PPT - 免费安全 Office 查看器 | ShotEasy',
    description: '免费在线打开 DOCX、XLSX、PPTX、CSV、PDF、ZIP 和 RAR 文件。无需安装，文件在浏览器中本地处理，不离开你的设备。',
    keywords: '在线打开docx, 在线打开pptx, office查看器, 在线office查看器, xlsx在线查看, excel在线查看器, pdf在线查看, csv在线查看, rar在线解压, zip在线解压, docx在线查看器',
    h1: '在线打开 Word、Excel 和 PPT - 免费安全 Office 查看器',
    tip: '无需安装。你的文件不会离开浏览器，选择文件后即可立即查看。',
    cards: [
        { title: '查看 Word 文档', desc: '在浏览器中私密打开 DOCX 文件，适合快速预览 Word 文档。', icon: 'FileText' },
        { title: '查看 Excel 表格', desc: '预览 XLSX 工作簿、工作表、行列、图表和单元格格式。', icon: 'Table2' },
        { title: '查看 PowerPoint 演示文稿', desc: '在线打开 PPTX 幻灯片，无需安装 PowerPoint。', icon: 'Presentation' },
        { title: '查看 CSV 文件', desc: '用清晰表格预览 CSV 数据，快速检查行列内容。', icon: 'Rows3' },
        { title: '查看 PDF 文件', desc: '使用 ShotEasy 现有 PDF 渲染能力在本地打开 PDF 页面。', icon: 'File' },
        { title: '查看 ZIP 和 RAR 压缩包', desc: '浏览压缩包目录，预览支持的文件，并下载解压后的文件。', icon: 'Archive' }
    ],
    tool: {
        addFile: '添加文件',
        download: '下载',
        downloadOriginal: '下载原文件',
        downloadSelected: '下载选中文件',
        downloadPng: '下载 PNG',
        clear: '清除',
        fullscreen: '全屏',
        restore: '恢复',
        previous: '上一页',
        next: '下一页',
        folder: '文件夹',
        tree: '树形',
        view: '视图：',
        root: '根目录',
        archiveContents: '压缩包内容',
        preview: '预览',
        emptyTitle: '点击或拖入文档、PDF、CSV、ZIP 或 RAR 文件',
        emptyHint: 'DOCX / XLSX / PPTX / CSV / PDF / ZIP / RAR',
        selectFile: '选择一个文件后在这里预览。',
        unsupported: '此文件类型可以下载，但暂不支持预览。',
        loading: '正在加载预览...',
        archiveLoading: '正在读取压缩包...',
        encryptedArchive: '此压缩包似乎已加密，无法在没有密码的情况下预览。',
        officeNote: '最适合 Office Open XML 文件：DOCX、XLSX 和 PPTX。',
        legacyOfficeNote: '此查看器不支持旧版 DOC、XLS 和 PPT 文件。',
        pdfPage: '页',
        sheet: '工作表',
        slide: '幻灯片',
        textPreview: '文本预览',
        imagePreview: '图片预览'
    },
    localTitle: '浏览器中的私密 Office 查看器',
    localCont1: '使用这个 office viewer 在线打开 DOCX、XLSX 工作簿和 PPTX 演示文稿。',
    localCont2: '文件尽可能在本地浏览器中处理，私密文档无需上传到远程文档查看器。',
    supportTitle: '支持的文档和压缩包格式',
    supportCont1: '支持预览 DOCX、XLSX、PPTX、CSV、PDF、常见图片、文本文件、ZIP 和 RAR 压缩包。',
    supportCont2: 'ZIP 和 RAR 可按文件夹或树形结构查看，选择压缩包内文件后可预览或下载解压副本。',
    seoTitle: '免费的 DOCX、XLSX、PPTX、PDF、CSV、ZIP 和 RAR 在线查看器',
    seoIntro: 'ShotEasy Viewer 针对在线打开 docx、office 查看器、pptx open、zip 在线解压和 rar extractor online 等常见搜索需求设计，帮助你无需安装 Word、Excel、PowerPoint、Acrobat 或解压软件即可快速查看文件。',
    featureSections: [
        {
            title: '在线打开 DOCX',
            body: '使用由开源 office-open-xml-viewer 驱动的 Canvas DOCX 查看器浏览 Word 文档，适合现代 Office Open XML 文档。'
        },
        {
            title: '在线打开 XLSX 和 PPTX',
            body: '本地预览 Excel 表格和 PowerPoint 演示文稿，支持工作表切换和幻灯片导航，无需安装 Microsoft Office。'
        },
        {
            title: 'PDF 和 CSV 查看器',
            body: 'PDF 页面通过 pdf.js 渲染，CSV 文件以清晰表格打开，便于分享或下载前检查数据。'
        },
        {
            title: 'ZIP 和 RAR 在线解压',
            body: '按文件夹或树形视图浏览压缩包，选择文件预览，并下载 ZIP、RAR、7z、TAR 等格式中的解压文件。'
        }
    ],
    faqTitle: 'Office 查看器常见问题',
    faqs: [
        {
            question: '可以不上传文件就在线打开 DOCX 吗？',
            answer: '可以。DOCX 文件会通过浏览器中的 WebAssembly 和 Canvas 查看器渲染。'
        },
        {
            question: '可以作为 RAR 在线解压工具使用吗？',
            answer: '可以。RAR 压缩包可以列出文件，支持的文件还可以在浏览器中预览或下载。'
        },
        {
            question: '是否支持旧版 DOC、XLS 或 PPT 文件？',
            answer: 'Office 渲染器支持现代 Office Open XML 文件：DOCX、XLSX 和 PPTX。旧版二进制 Office 格式暂不支持。'
        }
    ],
    poweredBy: 'Office 查看由 office-open-xml-viewer 提供支持。压缩包查看由 libarchivejs 提供支持。'
};
