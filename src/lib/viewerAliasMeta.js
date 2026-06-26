export const viewerAliases = [
  'doc-viewer',
  'ppt-viewer',
  'excel-viewer',
  'csv-viewer',
  'pdf-viewer',
  'archive-viewer'
];

const routeTerms = {
  en: {
    'doc-viewer': 'DOCX Viewer Online',
    'ppt-viewer': 'PPTX Viewer Online',
    'excel-viewer': 'Excel Viewer Online',
    'csv-viewer': 'CSV Viewer Online',
    'pdf-viewer': 'PDF Viewer Online',
    'archive-viewer': 'ZIP & RAR Archive Viewer Online'
  },
  es: {
    'doc-viewer': 'Visor DOCX online',
    'ppt-viewer': 'Visor PPTX online',
    'excel-viewer': 'Visor Excel online',
    'csv-viewer': 'Visor CSV online',
    'pdf-viewer': 'Visor PDF online',
    'archive-viewer': 'Visor ZIP y RAR online'
  },
  fr: {
    'doc-viewer': 'Visionneuse DOCX en ligne',
    'ppt-viewer': 'Visionneuse PPTX en ligne',
    'excel-viewer': 'Visionneuse Excel en ligne',
    'csv-viewer': 'Visionneuse CSV en ligne',
    'pdf-viewer': 'Visionneuse PDF en ligne',
    'archive-viewer': 'Visionneuse ZIP et RAR en ligne'
  },
  ja: {
    'doc-viewer': 'DOCXオンラインビューア',
    'ppt-viewer': 'PPTXオンラインビューア',
    'excel-viewer': 'Excelオンラインビューア',
    'csv-viewer': 'CSVオンラインビューア',
    'pdf-viewer': 'PDFオンラインビューア',
    'archive-viewer': 'ZIP・RARオンラインビューア'
  },
  in: {
    'doc-viewer': 'DOCX Viewer Online',
    'ppt-viewer': 'PPTX Viewer Online',
    'excel-viewer': 'Excel Viewer Online',
    'csv-viewer': 'CSV Viewer Online',
    'pdf-viewer': 'PDF Viewer Online',
    'archive-viewer': 'ZIP & RAR Archive Viewer Online'
  },
  vn: {
    'doc-viewer': 'DOCX viewer online',
    'ppt-viewer': 'PPTX viewer online',
    'excel-viewer': 'Excel viewer online',
    'csv-viewer': 'CSV viewer online',
    'pdf-viewer': 'PDF viewer online',
    'archive-viewer': 'ZIP và RAR viewer online'
  },
  uk: {
    'doc-viewer': 'DOCX viewer онлайн',
    'ppt-viewer': 'PPTX viewer онлайн',
    'excel-viewer': 'Excel viewer онлайн',
    'csv-viewer': 'CSV viewer онлайн',
    'pdf-viewer': 'PDF viewer онлайн',
    'archive-viewer': 'ZIP і RAR viewer онлайн'
  },
  ru: {
    'doc-viewer': 'DOCX viewer онлайн',
    'ppt-viewer': 'PPTX viewer онлайн',
    'excel-viewer': 'Excel viewer онлайн',
    'csv-viewer': 'CSV viewer онлайн',
    'pdf-viewer': 'PDF viewer онлайн',
    'archive-viewer': 'ZIP и RAR viewer онлайн'
  },
  'zh-CN': {
    'doc-viewer': 'DOCX 在线查看器',
    'ppt-viewer': 'PPTX 在线查看器',
    'excel-viewer': 'Excel 在线查看器',
    'csv-viewer': 'CSV 在线查看器',
    'pdf-viewer': 'PDF 在线查看器',
    'archive-viewer': 'ZIP 和 RAR 在线查看器'
  }
};

const titleBenefits = {
  en: 'Free Browser-Based Viewer',
  es: 'visor gratis en el navegador',
  fr: 'visionneuse gratuite dans le navigateur',
  ja: '無料ブラウザビューア',
  in: 'Free Browser-Based Viewer',
  vn: 'viewer miễn phí trong trình duyệt',
  uk: 'безкоштовний перегляд у браузері',
  ru: 'бесплатный просмотр в браузере',
  'zh-CN': '免费浏览器本地查看'
};

const descriptionIntros = {
  en: 'No installation required and your files stay in your browser.',
  es: 'Sin instalación y con archivos que permanecen en tu navegador.',
  fr: 'Sans installation, avec des fichiers qui restent dans votre navigateur.',
  ja: 'インストール不要で、ファイルはブラウザ内に残ります。',
  in: 'No installation required and your files stay in your browser.',
  vn: 'Không cần cài đặt và tệp của bạn vẫn ở trong trình duyệt.',
  uk: 'Без встановлення, файли залишаються у вашому браузері.',
  ru: 'Без установки, файлы остаются в вашем браузере.',
  'zh-CN': '无需安装，文件保留在浏览器中本地查看。'
};

const aliasKeywords = {
  'doc-viewer': 'open docx online, docx viewer online, word viewer online, open word document online',
  'ppt-viewer': 'pptx open, open pptx online, pptx viewer online, powerpoint viewer online',
  'excel-viewer': 'excel viewer online, open xlsx online, xlsx viewer online, spreadsheet viewer online',
  'csv-viewer': 'csv viewer online, open csv online, csv file viewer, view csv in browser',
  'pdf-viewer': 'pdf viewer online, open pdf online, view pdf online, pdf reader online',
  'archive-viewer': 'rar extractor online, zip extractor online, rar viewer online, archive viewer online'
};

const routeSubtitles = {
  en: {
    'doc-viewer': 'Open DOCX files online without installing Word. Documents are rendered locally in your browser.',
    'ppt-viewer': 'Open PPTX presentations online, browse slides, and view decks without installing PowerPoint.',
    'excel-viewer': 'Open XLSX spreadsheets online and inspect workbook sheets directly in your browser.',
    'csv-viewer': 'Open CSV files online in a clean table preview for quick row and column checks.',
    'pdf-viewer': 'Open PDF files online and render pages locally in your browser without installing a PDF reader.',
    'archive-viewer': 'Open ZIP and RAR archives online, preview supported files, and download extracted items.'
  },
  es: {
    'doc-viewer': 'Abre archivos DOCX online sin instalar Word. Los documentos se renderizan localmente en tu navegador.',
    'ppt-viewer': 'Abre presentaciones PPTX online, navega por diapositivas y consulta decks sin instalar PowerPoint.',
    'excel-viewer': 'Abre hojas XLSX online y revisa libros de Excel directamente en tu navegador.',
    'csv-viewer': 'Abre archivos CSV online en una tabla limpia para revisar filas y columnas rápidamente.',
    'pdf-viewer': 'Abre archivos PDF online y renderiza páginas localmente en tu navegador sin instalar un lector PDF.',
    'archive-viewer': 'Abre archivos ZIP y RAR online, previsualiza archivos compatibles y descarga elementos extraídos.'
  },
  fr: {
    'doc-viewer': 'Ouvrez des fichiers DOCX en ligne sans installer Word. Les documents sont rendus localement dans le navigateur.',
    'ppt-viewer': 'Ouvrez des présentations PPTX en ligne, parcourez les diapositives et consultez vos decks sans PowerPoint.',
    'excel-viewer': 'Ouvrez des feuilles XLSX en ligne et inspectez les classeurs directement dans votre navigateur.',
    'csv-viewer': 'Ouvrez des fichiers CSV en ligne dans un tableau clair pour vérifier rapidement lignes et colonnes.',
    'pdf-viewer': 'Ouvrez des fichiers PDF en ligne et affichez les pages localement dans votre navigateur sans lecteur PDF.',
    'archive-viewer': 'Ouvrez des archives ZIP et RAR en ligne, prévisualisez les fichiers compatibles et téléchargez les éléments extraits.'
  },
  ja: {
    'doc-viewer': 'WordをインストールせずにDOCXをオンラインで開けます。文書はブラウザ内でローカル表示されます。',
    'ppt-viewer': 'PPTXプレゼンテーションをオンラインで開き、PowerPointなしでスライドを閲覧できます。',
    'excel-viewer': 'XLSXスプレッドシートをオンラインで開き、ブラウザでシートを確認できます。',
    'csv-viewer': 'CSVファイルをオンラインで開き、行と列を見やすい表で確認できます。',
    'pdf-viewer': 'PDFファイルをオンラインで開き、PDFリーダーをインストールせずにブラウザ内でページを表示できます。',
    'archive-viewer': 'ZIPやRARアーカイブをオンラインで開き、対応ファイルをプレビューして抽出済みファイルをダウンロードできます。'
  },
  in: {
    'doc-viewer': 'Open DOCX files online without installing Word. Documents are rendered locally in your browser.',
    'ppt-viewer': 'Open PPTX presentations online, browse slides, and view decks without installing PowerPoint.',
    'excel-viewer': 'Open XLSX spreadsheets online and inspect workbook sheets directly in your browser.',
    'csv-viewer': 'Open CSV files online in a clean table preview for quick row and column checks.',
    'pdf-viewer': 'Open PDF files online and render pages locally in your browser without installing a PDF reader.',
    'archive-viewer': 'Open ZIP and RAR archives online, preview supported files, and download extracted items.'
  },
  vn: {
    'doc-viewer': 'Mở tệp DOCX online không cần cài Word. Tài liệu được hiển thị cục bộ trong trình duyệt.',
    'ppt-viewer': 'Mở bài thuyết trình PPTX online, duyệt slide và xem deck không cần cài PowerPoint.',
    'excel-viewer': 'Mở bảng tính XLSX online và kiểm tra các sheet trực tiếp trong trình duyệt.',
    'csv-viewer': 'Mở tệp CSV online trong bảng rõ ràng để kiểm tra nhanh hàng và cột.',
    'pdf-viewer': 'Mở tệp PDF online và hiển thị trang cục bộ trong trình duyệt, không cần cài trình đọc PDF.',
    'archive-viewer': 'Mở ZIP và RAR online, xem trước tệp được hỗ trợ và tải xuống nội dung đã giải nén.'
  },
  uk: {
    'doc-viewer': 'Відкривайте DOCX онлайн без встановлення Word. Документи відображаються локально у браузері.',
    'ppt-viewer': 'Відкривайте PPTX презентації онлайн, переглядайте слайди без встановлення PowerPoint.',
    'excel-viewer': 'Відкривайте XLSX таблиці онлайн і переглядайте аркуші прямо у браузері.',
    'csv-viewer': 'Відкривайте CSV файли онлайн у зручній таблиці для швидкої перевірки рядків і колонок.',
    'pdf-viewer': 'Відкривайте PDF файли онлайн і переглядайте сторінки локально у браузері без встановлення PDF reader.',
    'archive-viewer': 'Відкривайте ZIP і RAR архіви онлайн, переглядайте підтримувані файли та завантажуйте розпаковані елементи.'
  },
  ru: {
    'doc-viewer': 'Открывайте DOCX онлайн без установки Word. Документы отображаются локально в браузере.',
    'ppt-viewer': 'Открывайте PPTX презентации онлайн, просматривайте слайды без установки PowerPoint.',
    'excel-viewer': 'Открывайте XLSX таблицы онлайн и просматривайте листы прямо в браузере.',
    'csv-viewer': 'Открывайте CSV файлы онлайн в удобной таблице для быстрой проверки строк и столбцов.',
    'pdf-viewer': 'Открывайте PDF файлы онлайн и просматривайте страницы локально в браузере без установки PDF reader.',
    'archive-viewer': 'Открывайте ZIP и RAR архивы онлайн, просматривайте поддерживаемые файлы и скачивайте распакованные элементы.'
  },
  'zh-CN': {
    'doc-viewer': '无需安装 Word，在线打开 DOCX 文档。文件在浏览器本地渲染，适合快速预览 Word 文档。',
    'ppt-viewer': '在线打开 PPTX 演示文稿，浏览幻灯片内容，无需安装 PowerPoint。',
    'excel-viewer': '在线打开 XLSX 表格，直接在浏览器中查看工作簿和工作表内容。',
    'csv-viewer': '在线打开 CSV 文件，用清晰表格快速查看行、列和数据内容。',
    'pdf-viewer': '在线打开 PDF 文件，在浏览器中本地渲染页面，无需安装 PDF 阅读器。',
    'archive-viewer': '在线打开 ZIP 和 RAR 压缩包，预览支持的文件，并下载解压后的内容。'
  }
};

export const getViewerAliasMeta = (viewer, alias, locale = 'en') => {
  if (!viewerAliases.includes(alias)) return viewer;

  const normalizedLocale = routeTerms[locale] ? locale : 'en';
  const term = routeTerms[normalizedLocale][alias] || routeTerms.en[alias];
  const benefit = titleBenefits[normalizedLocale] || titleBenefits.en;
  const intro = descriptionIntros[normalizedLocale] || descriptionIntros.en;
  const subtitle = routeSubtitles[normalizedLocale]?.[alias] || routeSubtitles.en[alias];

  return {
    title: `${term} - ${benefit} | ShotEasy`,
    h1: `${term} - ${benefit}`,
    tip: subtitle,
    description: `${term}. ${intro} ${viewer.description}`,
    keywords: `${term}, ${aliasKeywords[alias]}, ${viewer.keywords}`
  };
};
