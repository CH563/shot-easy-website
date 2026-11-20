// One SEO page per converter mode on /convert/. Each mode gets its own route
// (/convert/<mode>/ and /ru/convert/<mode>/), its own TDK, and an article:
// what the formats are, when to use the conversion, and how it works in the
// browser. The mode list mirrors the tool's dropdown order in ConvertTool.jsx.
// Content is en + ru for now; uk/fr fall back to en until translated.

export const convertModes = [
    { value: 'image-to-webp', labelKey: 'imageToWebp', group: 'images' },
    { value: 'image-to-jpg', labelKey: 'imageToJpg', group: 'images' },
    { value: 'image-to-png', labelKey: 'imageToPng', group: 'images' },
    { value: 'images-to-pdf', labelKey: 'imagesToPdf', group: 'images' },
    { value: 'svg-to-png', labelKey: 'svgToPng', group: 'images' },
    { value: 'svg-to-jpg', labelKey: 'svgToJpg', group: 'images' },
    { value: 'svg-to-webp', labelKey: 'svgToWebp', group: 'images' },
    { value: 'png-to-ico', labelKey: 'pngToIco', group: 'images' },
    { value: 'pdf-to-images', labelKey: 'pdfToImages', group: 'pdf' },
    { value: 'pdf-to-jpg', labelKey: 'pdfToJpg', group: 'pdf' },
    { value: 'pdf-to-webp', labelKey: 'pdfToWebp', group: 'pdf' },
    { value: 'csv-to-xlsx', labelKey: 'csvToXlsx', group: 'data' },
    { value: 'xlsx-to-csv', labelKey: 'xlsxToCsv', group: 'data' },
    { value: 'json-to-csv', labelKey: 'jsonToCsv', group: 'data' },
    { value: 'csv-to-json', labelKey: 'csvToJson', group: 'data' },
    { value: 'json-to-xlsx', labelKey: 'jsonToXlsx', group: 'data' },
    { value: 'xlsx-to-json', labelKey: 'xlsxToJson', group: 'data' },
    { value: 'tsv-to-csv', labelKey: 'tsvToCsv', group: 'data' },
    { value: 'tsv-to-xlsx', labelKey: 'tsvToXlsx', group: 'data' },
    { value: 'md-to-html', labelKey: 'mdToHtml', group: 'data' },
];

export const convertModePages = {
    'image-to-webp': {
        en: {
            title: 'Convert Images to WebP Online Free | ShotEasy',
            description: 'Convert JPG, PNG, GIF, BMP, AVIF, SVG, TIFF, HEIC and ICO images to WebP online, free, in your browser. Smaller files, same quality, nothing uploaded.',
            keywords: 'convert image to webp, jpg to webp, png to webp, gif to webp, heic to webp, image to webp online, webp converter',
            h1: 'Convert Images to WebP',
            eyebrow: 'Image to WebP converter',
            intro: [
                'WebP makes images much smaller than JPG or PNG at the same visible quality — often 25–35% smaller — so pages load faster and use less storage.',
                'Drop in JPG, PNG, GIF, BMP, AVIF, SVG, TIFF, HEIC or ICO files and download WebP versions. Everything runs in your browser; your files are never uploaded.',
            ],
            sections: [
                {
                    title: 'What is WebP?',
                    body: [
                        'WebP is Google’s image format for the web. It supports both lossy compression (like JPG) and transparency (like PNG), so one format covers photos and graphics.',
                        'Most browsers and apps support WebP today, including Chrome, Firefox, Safari, Edge, Android and iOS. It is the default choice when file size matters.',
                    ],
                },
                {
                    title: 'When to convert to WebP',
                    body: [
                        'Use WebP for website images, blog covers, product photos and social graphics — anywhere a smaller file means a faster page.',
                        'Keep the original if you need maximum compatibility with very old software, or if you are printing: WebP is a screen format, not a print format.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'Your image is decoded in the browser (HEIC and TIFF are decoded first with a built-in decoder) and re-encoded to WebP with the quality you choose — 92% by default.',
                        'Transparency is preserved, and the original file is never modified: you download a new .webp file next to it.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting to WebP free?',
                    answer: 'Yes. Conversion is free, unlimited, and runs entirely in your browser — no signup, no upload.',
                },
                {
                    question: 'Will WebP keep my image quality?',
                    answer: 'At the default 92% quality, the difference from the original is usually invisible. Lower the quality slider for smaller files, or raise it toward 100% when every detail counts.',
                },
                {
                    question: 'Can I convert HEIC photos to WebP?',
                    answer: 'Yes. iPhone HEIC photos are decoded in the browser first and then encoded to WebP like any other image.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать изображения в WebP онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте JPG, PNG, GIF, BMP, AVIF, SVG, TIFF, HEIC и ICO в WebP онлайн, бесплатно, в браузере. Меньше размер, то же качество, без загрузки на сервер.',
            keywords: 'конвертировать изображение в webp, jpg в webp, png в webp, gif в webp, heic в webp, изображение в webp онлайн, конвертер webp',
            h1: 'Конвертировать изображения в WebP',
            eyebrow: 'Конвертер изображений в WebP',
            intro: [
                'WebP делает изображения заметно меньше, чем JPG или PNG, при том же видимом качестве — часто на 25–35% меньше, — поэтому страницы грузятся быстрее и занимают меньше места.',
                'Перетащите JPG, PNG, GIF, BMP, AVIF, SVG, TIFF, HEIC или ICO и скачайте версии в WebP. Всё работает в браузере, файлы никуда не загружаются.',
            ],
            sections: [
                {
                    title: 'Что такое WebP?',
                    body: [
                        'WebP — формат изображений Google для веба. Он поддерживает сжатие с потерями (как JPG) и прозрачность (как PNG), поэтому один формат подходит и для фото, и для графики.',
                        'Сегодня WebP поддерживают почти все браузеры и приложения: Chrome, Firefox, Safari, Edge, Android и iOS. Это выбор по умолчанию, когда важен размер файла.',
                    ],
                },
                {
                    title: 'Когда конвертировать в WebP',
                    body: [
                        'Используйте WebP для изображений на сайте, обложек блога, фото товаров и графики для соцсетей — везде, где меньший файл означает более быструю страницу.',
                        'Оставьте оригинал, если нужна максимальная совместимость со старым софтом или если вы печатаете: WebP — экранный формат, а не формат для печати.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Изображение декодируется в браузере (HEIC и TIFF сначала декодируются встроенным декодером), а затем кодируется в WebP с выбранным вами качеством — по умолчанию 92%.',
                        'Прозрачность сохраняется, а исходный файл не меняется: вы скачиваете новый файл .webp рядом с ним.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация в WebP бесплатна?',
                    answer: 'Да. Конвертация бесплатна, без ограничений, и выполняется полностью в браузере — без регистрации и загрузки.',
                },
                {
                    question: 'Сохранится ли качество изображения в WebP?',
                    answer: 'При качестве 92% по умолчанию разница с оригиналом обычно незаметна. Уменьшите качество для меньшего файла или поднимите к 100%, когда важна каждая деталь.',
                },
                {
                    question: 'Можно ли конвертировать фото HEIC в WebP?',
                    answer: 'Да. Фото HEIC с iPhone сначала декодируются в браузере, а затем кодируются в WebP, как любое другое изображение.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'image-to-jpg': {
        en: {
            title: 'Convert Images to JPG Online Free | ShotEasy',
            description: 'Convert PNG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC and ICO images to JPG online, free, in your browser. Universal format, nothing uploaded.',
            keywords: 'convert image to jpg, png to jpg, webp to jpg, heic to jpg, image to jpg online, jpg converter',
            h1: 'Convert Images to JPG',
            eyebrow: 'Image to JPG converter',
            intro: [
                'JPG is the most widely supported image format: every device, app and website opens it. Converting to JPG is the safe choice when a file has to work everywhere.',
                'Convert PNG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC or ICO to JPG in your browser — free, no upload, no signup.',
            ],
            sections: [
                {
                    title: 'What is JPG?',
                    body: [
                        'JPG (JPEG) is the standard format for photos. It compresses images by discarding fine detail the eye barely notices, which keeps files small.',
                        'JPG has no transparency: any transparent areas become white. It is best for photos and worst for screenshots, logos and text, where its compression shows.',
                    ],
                },
                {
                    title: 'When to convert to JPG',
                    body: [
                        'Use JPG for photos you email, upload to social media, or attach to documents — anywhere compatibility matters more than pixel-perfect quality.',
                        'Don’t use JPG for images with sharp edges or transparency: PNG or WebP keeps those crisp.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'Your image is decoded in the browser and drawn onto a canvas, where transparent areas are filled white, then encoded as JPG at the quality you choose.',
                        'The original file stays untouched. You download a new .jpg file; nothing is sent to a server.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting to JPG free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Why did my transparent PNG get a white background?',
                    answer: 'JPG cannot store transparency, so transparent pixels are filled with white during conversion. Use PNG or WebP if you need to keep transparency.',
                },
                {
                    question: 'Can I convert HEIC photos to JPG?',
                    answer: 'Yes. iPhone HEIC photos are decoded in the browser first and then saved as JPG.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать изображения в JPG онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте PNG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC и ICO в JPG онлайн, бесплатно, в браузере. Универсальный формат, без загрузки на сервер.',
            keywords: 'конвертировать изображение в jpg, png в jpg, webp в jpg, heic в jpg, изображение в jpg онлайн, конвертер jpg',
            h1: 'Конвертировать изображения в JPG',
            eyebrow: 'Конвертер изображений в JPG',
            intro: [
                'JPG — самый распространённый формат изображений: его открывает любое устройство, приложение и сайт. Конвертация в JPG — безопасный выбор, когда файл должен работать везде.',
                'Конвертируйте PNG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC или ICO в JPG в браузере — бесплатно, без загрузки и регистрации.',
            ],
            sections: [
                {
                    title: 'Что такое JPG?',
                    body: [
                        'JPG (JPEG) — стандартный формат для фотографий. Он сжимает изображения, отбрасывая мелкие детали, которые глаз почти не замечает, поэтому файлы остаются небольшими.',
                        'В JPG нет прозрачности: прозрачные области становятся белыми. Он лучше всего подходит для фото и хуже всего — для скриншотов, логотипов и текста, где его сжатие заметно.',
                    ],
                },
                {
                    title: 'Когда конвертировать в JPG',
                    body: [
                        'Используйте JPG для фото, которые отправляете по почте, загружаете в соцсети или прикладываете к документам, — везде, где совместимость важнее идеального качества.',
                        'Не используйте JPG для изображений с резкими краями или прозрачностью: PNG или WebP сохранят их чёткими.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Изображение декодируется в браузере и рисуется на холсте, где прозрачные области заливаются белым, а затем кодируется в JPG с выбранным вами качеством.',
                        'Исходный файл не меняется. Вы скачиваете новый файл .jpg; на сервер ничего не отправляется.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация в JPG бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Почему у моего прозрачного PNG появился белый фон?',
                    answer: 'JPG не хранит прозрачность, поэтому прозрачные пиксели при конвертации заливаются белым. Используйте PNG или WebP, если нужно сохранить прозрачность.',
                },
                {
                    question: 'Можно ли конвертировать фото HEIC в JPG?',
                    answer: 'Да. Фото HEIC с iPhone сначала декодируются в браузере, а затем сохраняются как JPG.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'image-to-png': {
        en: {
            title: 'Convert Images to PNG Online Free | ShotEasy',
            description: 'Convert JPG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC and ICO images to PNG online, free, in your browser. Lossless quality with transparency.',
            keywords: 'convert image to png, jpg to png, webp to png, heic to png, svg to png, image to png online, png converter',
            h1: 'Convert Images to PNG',
            eyebrow: 'Image to PNG converter',
            intro: [
                'PNG stores every pixel exactly, with full transparency — the right format for screenshots, logos, icons and any image with sharp edges or text.',
                'Convert JPG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC or ICO to PNG in your browser, free and without uploading anything.',
            ],
            sections: [
                {
                    title: 'What is PNG?',
                    body: [
                        'PNG is a lossless format: unlike JPG it throws away no detail, so the converted image is pixel-for-pixel identical to the source.',
                        'PNG also supports full transparency, which makes it the standard for logos, icons, screenshots and overlays.',
                    ],
                },
                {
                    title: 'When to convert to PNG',
                    body: [
                        'Use PNG for screenshots, UI graphics, logos and images with text or transparency — anywhere exact pixels matter.',
                        'Don’t use PNG for large photos: the files are bigger than JPG or WebP, and the extra quality is invisible on a photo.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'Your image is decoded in the browser and drawn onto a canvas, then encoded as PNG without any quality loss.',
                        'No data leaves your device: the PNG is created locally and downloaded straight from your browser.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting to PNG free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Will converting a JPG to PNG improve its quality?',
                    answer: 'No. PNG is lossless, but it can only preserve the quality that is already there — it cannot restore detail a JPG already lost.',
                },
                {
                    question: 'Does PNG keep transparency?',
                    answer: 'Yes. Transparent areas stay transparent, unlike JPG, which fills them white.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать изображения в PNG онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте JPG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC и ICO в PNG онлайн, бесплатно, в браузере. Качество без потерь, с прозрачностью.',
            keywords: 'конвертировать изображение в png, jpg в png, webp в png, heic в png, svg в png, изображение в png онлайн, конвертер png',
            h1: 'Конвертировать изображения в PNG',
            eyebrow: 'Конвертер изображений в PNG',
            intro: [
                'PNG хранит каждый пиксель точно, с полной прозрачностью, — правильный формат для скриншотов, логотипов, иконок и любых изображений с резкими краями или текстом.',
                'Конвертируйте JPG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC или ICO в PNG в браузере, бесплатно и без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое PNG?',
                    body: [
                        'PNG — формат без потерь: в отличие от JPG он не отбрасывает детали, поэтому сконвертированное изображение попиксельно совпадает с исходным.',
                        'PNG также поддерживает полную прозрачность, поэтому это стандарт для логотипов, иконок, скриншотов и наложений.',
                    ],
                },
                {
                    title: 'Когда конвертировать в PNG',
                    body: [
                        'Используйте PNG для скриншотов, графики интерфейса, логотипов и изображений с текстом или прозрачностью — везде, где важны точные пиксели.',
                        'Не используйте PNG для больших фотографий: файлы получаются больше, чем JPG или WebP, а дополнительное качество на фото незаметно.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Изображение декодируется в браузере и рисуется на холсте, а затем кодируется в PNG без потери качества.',
                        'Данные не покидают ваше устройство: PNG создаётся локально и скачивается прямо из браузера.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация в PNG бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Улучшит ли конвертация JPG в PNG качество?',
                    answer: 'Нет. PNG — формат без потерь, но он может лишь сохранить то качество, которое уже есть, — он не восстановит детали, уже потерянные в JPG.',
                },
                {
                    question: 'Сохраняет ли PNG прозрачность?',
                    answer: 'Да. Прозрачные области остаются прозрачными, в отличие от JPG, который заливает их белым.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'images-to-pdf': {
        en: {
            title: 'Convert Images to PDF Online Free | ShotEasy',
            description: 'Combine JPG, PNG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC and ICO images into one PDF online, free, in your browser. One image per page, nothing uploaded.',
            keywords: 'convert images to pdf, jpg to pdf, png to pdf, images to pdf online, combine images into pdf',
            h1: 'Convert Images to PDF',
            eyebrow: 'Images to PDF converter',
            intro: [
                'Turn a set of images into a single PDF: scanned pages, photos, receipts or screenshots, one image per page, in the order you choose.',
                'Add images, arrange them, and download one PDF. Everything runs in your browser — nothing is uploaded.',
            ],
            sections: [
                {
                    title: 'What is an image PDF?',
                    body: [
                        'A PDF made from images keeps each image on its own page at full size. It is the standard way to share scans, photo sets and receipts as one file.',
                        'Unlike a ZIP, a PDF opens everywhere — on phones, in browsers and in any PDF reader — with no extra software.',
                    ],
                },
                {
                    title: 'When to combine images into a PDF',
                    body: [
                        'Use it for scanned documents, expense receipts, photo albums, screenshots of a long page, or any set of images that belongs together.',
                        'If you need editable text, use OCR first: a PDF made from images contains pictures, not selectable text.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'Each image is decoded in the browser (HEIC and TIFF included) and placed on its own PDF page at its original size.',
                        'The PDF is assembled locally with pdf-lib. No file leaves your device, and the original images are not modified.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting images to PDF free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Can I change the page order?',
                    answer: 'Yes. Add the images in the order you want them, or reorder them in the tool before converting.',
                },
                {
                    question: 'Will the PDF contain selectable text?',
                    answer: 'No. The pages are images, so text inside them is not selectable. Use the OCR tool first if you need searchable text.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать изображения в PDF онлайн бесплатно | ShotEasy',
            description: 'Объединяйте JPG, PNG, WebP, GIF, BMP, AVIF, SVG, TIFF, HEIC и ICO в один PDF онлайн, бесплатно, в браузере. Одно изображение на странице, без загрузки на сервер.',
            keywords: 'конвертировать изображения в pdf, jpg в pdf, png в pdf, изображения в pdf онлайн, объединить изображения в pdf',
            h1: 'Конвертировать изображения в PDF',
            eyebrow: 'Конвертер изображений в PDF',
            intro: [
                'Превратите набор изображений в один PDF: отсканированные страницы, фото, чеки или скриншоты — одно изображение на странице, в выбранном вами порядке.',
                'Добавьте изображения, расставьте их и скачайте один PDF. Всё работает в браузере — ничего не загружается.',
            ],
            sections: [
                {
                    title: 'Что такое PDF из изображений?',
                    body: [
                        'PDF из изображений хранит каждое изображение на отдельной странице в полном размере. Это стандартный способ поделиться сканами, наборами фото и чеками одним файлом.',
                        'В отличие от ZIP, PDF открывается везде — на телефонах, в браузерах и в любом просмотрщике PDF — без дополнительного софта.',
                    ],
                },
                {
                    title: 'Когда объединять изображения в PDF',
                    body: [
                        'Используйте это для отсканированных документов, чеков, фотоальбомов, скриншотов длинной страницы или любого набора изображений, которые должны быть вместе.',
                        'Если нужен редактируемый текст, сначала используйте OCR: PDF из изображений содержит картинки, а не выделяемый текст.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Каждое изображение декодируется в браузере (включая HEIC и TIFF) и размещается на отдельной странице PDF в исходном размере.',
                        'PDF собирается локально с помощью pdf-lib. Файлы не покидают ваше устройство, а исходные изображения не меняются.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация изображений в PDF бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Можно ли изменить порядок страниц?',
                    answer: 'Да. Добавляйте изображения в нужном порядке или меняйте их местами в инструменте перед конвертацией.',
                },
                {
                    question: 'Будет ли в PDF выделяемый текст?',
                    answer: 'Нет. Страницы — это изображения, поэтому текст внутри них не выделяется. Сначала используйте инструмент OCR, если нужен текст с поиском.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'svg-to-png': {
        en: {
            title: 'Convert SVG to PNG Online Free | ShotEasy',
            description: 'Convert SVG vector files to PNG online, free, in your browser. Crisp raster images at the SVG’s own size, nothing uploaded.',
            keywords: 'svg to png, convert svg to png, svg to png online, svg converter',
            h1: 'Convert SVG to PNG',
            eyebrow: 'SVG to PNG converter',
            intro: [
                'SVG files are vectors: they scale to any size without losing sharpness, but many apps and websites need a raster image instead. Converting to PNG gives you a crisp bitmap at the SVG’s own size.',
                'Drop in an SVG and download a PNG — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What is SVG?',
                    body: [
                        'SVG (Scalable Vector Graphics) describes an image as shapes and paths in code, not as pixels. It stays sharp at any size and is the standard for logos and icons on the web.',
                        'Because it is code, an SVG needs a browser or editor to render it — it is not a photo you can paste into a document or a chat app.',
                    ],
                },
                {
                    title: 'When to convert SVG to PNG',
                    body: [
                        'Use PNG when you need the logo or icon as a plain image: in a document, a presentation, a social post, or an app that does not accept SVG.',
                        'PNG keeps transparency, so icons and logos sit cleanly on any background.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The SVG is loaded as an image in the browser and drawn onto a canvas at its natural size, then encoded as PNG without quality loss.',
                        'Note: SVGs that reference external images or web fonts may not render fully — the conversion uses only what is inside the file. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting SVG to PNG free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'What size will the PNG be?',
                    answer: 'The PNG is rendered at the SVG’s own width and height. If the SVG has no fixed size, it is rendered at its default size.',
                },
                {
                    question: 'Does the PNG keep transparency?',
                    answer: 'Yes. Transparent areas of the SVG stay transparent in the PNG.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать SVG в PNG онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте векторные файлы SVG в PNG онлайн, бесплатно, в браузере. Чёткие растровые изображения в исходном размере SVG, без загрузки на сервер.',
            keywords: 'svg в png, конвертировать svg в png, svg в png онлайн, конвертер svg',
            h1: 'Конвертировать SVG в PNG',
            eyebrow: 'Конвертер SVG в PNG',
            intro: [
                'Файлы SVG — векторные: они масштабируются до любого размера без потери чёткости, но многим приложениям и сайтам нужно растровое изображение. Конвертация в PNG даёт чёткий растр в исходном размере SVG.',
                'Перетащите SVG и скачайте PNG — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое SVG?',
                    body: [
                        'SVG (Scalable Vector Graphics) описывает изображение фигурами и путями в коде, а не пикселями. Он остаётся чётким при любом размере и является стандартом для логотипов и иконок в вебе.',
                        'Поскольку это код, для отображения SVG нужен браузер или редактор — это не фото, которое можно вставить в документ или чат.',
                    ],
                },
                {
                    title: 'Когда конвертировать SVG в PNG',
                    body: [
                        'Используйте PNG, когда логотип или иконка нужны как обычное изображение: в документе, презентации, посте в соцсети или приложении, которое не принимает SVG.',
                        'PNG сохраняет прозрачность, поэтому иконки и логотипы чисто ложатся на любой фон.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'SVG загружается как изображение в браузере и рисуется на холсте в естественном размере, затем кодируется в PNG без потери качества.',
                        'Обратите внимание: SVG, ссылающиеся на внешние изображения или веб-шрифты, могут отобразиться не полностью — конвертация использует только то, что внутри файла. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация SVG в PNG бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какого размера будет PNG?',
                    answer: 'PNG рендерится в собственной ширине и высоте SVG. Если у SVG нет фиксированного размера, используется размер по умолчанию.',
                },
                {
                    question: 'Сохраняет ли PNG прозрачность?',
                    answer: 'Да. Прозрачные области SVG остаются прозрачными в PNG.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'svg-to-jpg': {
        en: {
            title: 'Convert SVG to JPG Online Free | ShotEasy',
            description: 'Convert SVG vector files to JPG online, free, in your browser. Universal format for logos and icons, nothing uploaded.',
            keywords: 'svg to jpg, convert svg to jpg, svg to jpg online, svg converter',
            h1: 'Convert SVG to JPG',
            eyebrow: 'SVG to JPG converter',
            intro: [
                'SVG files are vectors that stay sharp at any size, but many places only accept photos. Converting to JPG gives you a universal image that opens everywhere.',
                'Drop in an SVG and download a JPG — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What is SVG?',
                    body: [
                        'SVG (Scalable Vector Graphics) describes an image as shapes and paths in code, not as pixels. It stays sharp at any size and is the standard for logos and icons on the web.',
                        'Because it is code, an SVG needs a browser or editor to render it — it is not a photo you can paste into a document or a chat app.',
                    ],
                },
                {
                    title: 'When to convert SVG to JPG',
                    body: [
                        'Use JPG when the image has to work everywhere: email attachments, documents, forms, or apps that do not accept SVG or PNG.',
                        'JPG has no transparency, so it suits logos and icons on a solid background — not ones that need to float over other content.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The SVG is loaded as an image in the browser and drawn onto a canvas at its natural size, with transparent areas filled white, then encoded as JPG at the quality you choose.',
                        'Note: SVGs that reference external images or web fonts may not render fully — the conversion uses only what is inside the file. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting SVG to JPG free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'What size will the JPG be?',
                    answer: 'The JPG is rendered at the SVG’s own width and height. If the SVG has no fixed size, it is rendered at its default size.',
                },
                {
                    question: 'Why does my icon have a white background now?',
                    answer: 'JPG cannot store transparency, so transparent pixels are filled with white. Use PNG or WebP if you need to keep transparency.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать SVG в JPG онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте векторные файлы SVG в JPG онлайн, бесплатно, в браузере. Универсальный формат для логотипов и иконок, без загрузки на сервер.',
            keywords: 'svg в jpg, конвертировать svg в jpg, svg в jpg онлайн, конвертер svg',
            h1: 'Конвертировать SVG в JPG',
            eyebrow: 'Конвертер SVG в JPG',
            intro: [
                'Файлы SVG — векторные и остаются чёткими при любом размере, но многие места принимают только фото. Конвертация в JPG даёт универсальное изображение, которое открывается везде.',
                'Перетащите SVG и скачайте JPG — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое SVG?',
                    body: [
                        'SVG (Scalable Vector Graphics) описывает изображение фигурами и путями в коде, а не пикселями. Он остаётся чётким при любом размере и является стандартом для логотипов и иконок в вебе.',
                        'Поскольку это код, для отображения SVG нужен браузер или редактор — это не фото, которое можно вставить в документ или чат.',
                    ],
                },
                {
                    title: 'Когда конвертировать SVG в JPG',
                    body: [
                        'Используйте JPG, когда изображение должно работать везде: вложения в письмах, документы, формы или приложения, которые не принимают SVG или PNG.',
                        'В JPG нет прозрачности, поэтому он подходит для логотипов и иконок на сплошном фоне, а не для тех, что должны лежать поверх другого содержимого.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'SVG загружается как изображение в браузере и рисуется на холсте в естественном размере, прозрачные области заливаются белым, а затем файл кодируется в JPG с выбранным вами качеством.',
                        'Обратите внимание: SVG, ссылающиеся на внешние изображения или веб-шрифты, могут отобразиться не полностью — конвертация использует только то, что внутри файла. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация SVG в JPG бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какого размера будет JPG?',
                    answer: 'JPG рендерится в собственной ширине и высоте SVG. Если у SVG нет фиксированного размера, используется размер по умолчанию.',
                },
                {
                    question: 'Почему у моей иконки теперь белый фон?',
                    answer: 'JPG не хранит прозрачность, поэтому прозрачные области заливаются белым. Используйте PNG или WebP, если нужно сохранить прозрачность.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'svg-to-webp': {
        en: {
            title: 'Convert SVG to WebP Online Free | ShotEasy',
            description: 'Convert SVG vector files to WebP online, free, in your browser. Small, sharp images with transparency, nothing uploaded.',
            keywords: 'svg to webp, convert svg to webp, svg to webp online, svg converter',
            h1: 'Convert SVG to WebP',
            eyebrow: 'SVG to WebP converter',
            intro: [
                'SVG files are vectors that stay sharp at any size, but many websites want a small raster image instead. Converting to WebP gives you a sharp, compact image with transparency.',
                'Drop in an SVG and download a WebP — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What is SVG?',
                    body: [
                        'SVG (Scalable Vector Graphics) describes an image as shapes and paths in code, not as pixels. It stays sharp at any size and is the standard for logos and icons on the web.',
                        'Because it is code, an SVG needs a browser or editor to render it — it is not a photo you can paste into a document or a chat app.',
                    ],
                },
                {
                    title: 'When to convert SVG to WebP',
                    body: [
                        'Use WebP for logos and icons on a website: it is smaller than PNG at the same visible quality, loads faster, and keeps transparency.',
                        'WebP is the best choice when the image is headed for the web and file size matters.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The SVG is loaded as an image in the browser and drawn onto a canvas at its natural size, then encoded to WebP at the quality you choose — 92% by default.',
                        'Transparency is preserved. Note: SVGs that reference external images or web fonts may not render fully — the conversion uses only what is inside the file. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting SVG to WebP free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'What size will the WebP be?',
                    answer: 'The WebP is rendered at the SVG’s own width and height. If the SVG has no fixed size, it is rendered at its default size.',
                },
                {
                    question: 'Does the WebP keep transparency?',
                    answer: 'Yes. Transparent areas of the SVG stay transparent in the WebP.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать SVG в WebP онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте векторные файлы SVG в WebP онлайн, бесплатно, в браузере. Небольшие чёткие изображения с прозрачностью, без загрузки на сервер.',
            keywords: 'svg в webp, конвертировать svg в webp, svg в webp онлайн, конвертер svg',
            h1: 'Конвертировать SVG в WebP',
            eyebrow: 'Конвертер SVG в WebP',
            intro: [
                'Файлы SVG — векторные и остаются чёткими при любом размере, но многим сайтам нужно небольшое растровое изображение. Конвертация в WebP даёт чёткое компактное изображение с прозрачностью.',
                'Перетащите SVG и скачайте WebP — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое SVG?',
                    body: [
                        'SVG (Scalable Vector Graphics) описывает изображение фигурами и путями в коде, а не пикселями. Он остаётся чётким при любом размере и является стандартом для логотипов и иконок в вебе.',
                        'Поскольку это код, для отображения SVG нужен браузер или редактор — это не фото, которое можно вставить в документ или чат.',
                    ],
                },
                {
                    title: 'Когда конвертировать SVG в WebP',
                    body: [
                        'Используйте WebP для логотипов и иконок на сайте: он меньше PNG при том же видимом качестве, грузится быстрее и сохраняет прозрачность.',
                        'WebP — лучший выбор, когда изображение предназначено для веба и важен размер файла.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'SVG загружается как изображение в браузере и рисуется на холсте в естественном размере, а затем кодируется в WebP с выбранным вами качеством — по умолчанию 92%.',
                        'Прозрачность сохраняется. Обратите внимание: SVG, ссылающиеся на внешние изображения или веб-шрифты, могут отобразиться не полностью — конвертация использует только то, что внутри файла. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация SVG в WebP бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какого размера будет WebP?',
                    answer: 'WebP рендерится в собственной ширине и высоте SVG. Если у SVG нет фиксированного размера, используется размер по умолчанию.',
                },
                {
                    question: 'Сохраняет ли WebP прозрачность?',
                    answer: 'Да. Прозрачные области SVG остаются прозрачными в WebP.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'png-to-ico': {
        en: {
            title: 'Convert PNG to ICO Online Free | ShotEasy',
            description: 'Convert PNG images to ICO icon files online, free, in your browser. Choose 16–256 px — perfect for favicons and app icons.',
            keywords: 'png to ico, convert png to ico, png to ico online, favicon converter, ico converter',
            h1: 'Convert PNG to ICO',
            eyebrow: 'PNG to ICO converter',
            intro: [
                'ICO is the icon format Windows and browsers use for favicons and app icons. Converting a PNG to ICO gives you a real icon file in the size you need.',
                'Pick a size from 16 to 256 pixels and download the .ico file — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What is ICO?',
                    body: [
                        'ICO is a container for icon images. A single .ico file holds one or more images at fixed sizes, and Windows, browsers and apps read it directly.',
                        'The classic use is favicon.ico — the small icon a browser shows in the tab and bookmarks for a website.',
                    ],
                },
                {
                    title: 'When to convert PNG to ICO',
                    body: [
                        'Use ICO for website favicons, desktop shortcuts and app icons — anywhere the system expects an icon file rather than a plain image.',
                        'For a favicon, 16×16 or 32×32 pixels is standard; 48×48 and larger sizes look sharper on high-resolution screens.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'Your PNG is resized in the browser to the size you pick, then its PNG bytes are wrapped in the ICO container — the standard format every browser accepts.',
                        'Transparency is preserved, so the icon has no white box around it. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting PNG to ICO free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'What size should I choose for a favicon?',
                    answer: '16×16 or 32×32 pixels is the standard favicon size. Choose 48×48 or larger if the icon also appears on high-resolution screens.',
                },
                {
                    question: 'Does the ICO keep transparency?',
                    answer: 'Yes. Transparent areas of the PNG stay transparent in the ICO.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать PNG в ICO онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте изображения PNG в файлы иконок ICO онлайн, бесплатно, в браузере. Выберите 16–256 пкс — идеально для фавиконок и иконок приложений.',
            keywords: 'png в ico, конвертировать png в ico, png в ico онлайн, конвертер фавиконок, конвертер ico',
            h1: 'Конвертировать PNG в ICO',
            eyebrow: 'Конвертер PNG в ICO',
            intro: [
                'ICO — формат иконок, который Windows и браузеры используют для фавиконок и иконок приложений. Конвертация PNG в ICO даёт настоящий файл иконки нужного размера.',
                'Выберите размер от 16 до 256 пикселей и скачайте файл .ico — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое ICO?',
                    body: [
                        'ICO — контейнер для изображений иконок. Один файл .ico содержит одно или несколько изображений фиксированных размеров, и Windows, браузеры и приложения читают его напрямую.',
                        'Классическое применение — favicon.ico: маленькая иконка, которую браузер показывает во вкладке и закладках для сайта.',
                    ],
                },
                {
                    title: 'Когда конвертировать PNG в ICO',
                    body: [
                        'Используйте ICO для фавиконок сайтов, ярлыков на рабочем столе и иконок приложений — везде, где система ожидает файл иконки, а не обычное изображение.',
                        'Для фавиконки стандарт — 16×16 или 32×32 пикселя; 48×48 и больше выглядят резче на экранах высокого разрешения.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Ваш PNG изменяется в браузере до выбранного размера, затем его байты PNG оборачиваются в контейнер ICO — стандартный формат, который принимают все браузеры.',
                        'Прозрачность сохраняется, поэтому у иконки нет белой рамки. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация PNG в ICO бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какой размер выбрать для фавиконки?',
                    answer: 'Стандартный размер фавиконки — 16×16 или 32×32 пикселя. Выберите 48×48 или больше, если иконка также будет на экранах высокого разрешения.',
                },
                {
                    question: 'Сохраняет ли ICO прозрачность?',
                    answer: 'Да. Прозрачные области PNG остаются прозрачными в ICO.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'pdf-to-images': {
        en: {
            title: 'Convert PDF to Images Online Free | ShotEasy',
            description: 'Convert every PDF page to a PNG image online, free, in your browser. Scanned PDFs, slides and documents as images, nothing uploaded.',
            keywords: 'pdf to images, convert pdf to png, pdf pages to images, pdf to image online, pdf to png converter',
            h1: 'Convert PDF to Images',
            eyebrow: 'PDF to Images converter',
            intro: [
                'Turn each page of a PDF into its own image: slides, scanned documents, forms or book pages, saved as PNG files you can share anywhere.',
                'Add a PDF and download one image per page. Everything runs in your browser — nothing is uploaded.',
            ],
            sections: [
                {
                    title: 'What does PDF to images mean?',
                    body: [
                        'Each page of the PDF becomes a separate image file, rendered exactly as the page looks — text, photos, tables and all.',
                        'Images are easier to share than a PDF: paste them into a chat, a document or a social post without asking anyone to open a PDF reader.',
                    ],
                },
                {
                    title: 'When to convert PDF pages to images',
                    body: [
                        'Use it to share a single page on social media, to use a slide as a picture, to extract a scan, or to preview a document where only images are accepted.',
                        'It is also handy for archiving: a page saved as an image keeps its exact appearance even if fonts or software change later.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'Each PDF page is rendered in the browser with pdf.js onto a canvas at the scale you choose, then saved as a PNG image.',
                        'The PDF Scale setting controls sharpness: higher values make crisper images and larger files. Password-protected PDFs cannot be opened. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting PDF to images free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'What image quality will I get?',
                    answer: 'Use the PDF Scale setting: 2× is the default and looks sharp on most screens. Raise it for print-quality images, or lower it for smaller files.',
                },
                {
                    question: 'Can I convert a password-protected PDF?',
                    answer: 'No. Encrypted PDFs cannot be opened here. Remove the password in a PDF app first, then convert the pages.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать PDF в изображения онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте каждую страницу PDF в изображение PNG онлайн, бесплатно, в браузере. Отсканированные PDF, слайды и документы как картинки, без загрузки на сервер.',
            keywords: 'pdf в изображения, конвертировать pdf в png, страницы pdf в изображения, pdf в изображение онлайн, конвертер pdf в png',
            h1: 'Конвертировать PDF в изображения',
            eyebrow: 'Конвертер PDF в изображения',
            intro: [
                'Превратите каждую страницу PDF в отдельное изображение: слайды, отсканированные документы, формы или страницы книг, сохранённые как PNG, которыми можно поделиться где угодно.',
                'Добавьте PDF и скачайте по одному изображению на страницу. Всё работает в браузере — ничего не загружается.',
            ],
            sections: [
                {
                    title: 'Что значит «PDF в изображения»?',
                    body: [
                        'Каждая страница PDF становится отдельным файлом изображения, отрисованным точно так, как выглядит страница, — с текстом, фото, таблицами и всем остальным.',
                        'Изображениями делиться проще, чем PDF: их можно вставить в чат, документ или пост в соцсети, не прося никого открывать просмотрщик PDF.',
                    ],
                },
                {
                    title: 'Когда конвертировать страницы PDF в изображения',
                    body: [
                        'Используйте это, чтобы поделиться одной страницей в соцсетях, использовать слайд как картинку, извлечь скан или показать документ там, где принимаются только изображения.',
                        'Это также удобно для архива: страница, сохранённая как изображение, сохраняет точный вид, даже если шрифты или программы позже изменятся.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Каждая страница PDF рендерится в браузере с помощью pdf.js на холст в выбранном вами масштабе, а затем сохраняется как изображение PNG.',
                        'Настройка «Масштаб PDF» управляет резкостью: большие значения дают более чёткие изображения и большие файлы. PDF с паролем открыть нельзя. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация PDF в изображения бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какое качество изображений я получу?',
                    answer: 'Используйте настройку «Масштаб PDF»: 2× по умолчанию и выглядит резко на большинстве экранов. Поднимите для качества печати или уменьшите для меньших файлов.',
                },
                {
                    question: 'Можно ли конвертировать PDF с паролем?',
                    answer: 'Нет. Зашифрованные PDF здесь не открываются. Сначала снимите пароль в приложении для PDF, затем конвертируйте страницы.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'pdf-to-jpg': {
        en: {
            title: 'Convert PDF to JPG Online Free | ShotEasy',
            description: 'Convert every PDF page to a JPG image online, free, in your browser. Smaller files than PNG, perfect for sharing pages anywhere.',
            keywords: 'pdf to jpg, convert pdf to jpg, pdf pages to jpg, pdf to jpg online, pdf to jpg converter',
            h1: 'Convert PDF to JPG',
            eyebrow: 'PDF to JPG converter',
            intro: [
                'Turn each page of a PDF into a JPG image: smaller than PNG, and openable everywhere — in chats, documents, emails and on any device.',
                'Add a PDF and download one JPG per page. Everything runs in your browser — nothing is uploaded.',
            ],
            sections: [
                {
                    title: 'What does PDF to JPG mean?',
                    body: [
                        'Each page of the PDF becomes a separate JPG file, rendered exactly as the page looks — text, photos, tables and all.',
                        'JPG files are much smaller than PNG, so they are the best choice when you need to share or upload pages quickly.',
                    ],
                },
                {
                    title: 'When to convert PDF pages to JPG',
                    body: [
                        'Use it to share a page by email or chat, to attach a document page to a form, or to publish a page where only photos are accepted.',
                        'JPG suits pages that are mostly photos or printed text. For pages with sharp diagrams or tiny text, PNG stays crisper.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'Each PDF page is rendered in the browser with pdf.js onto a canvas at the scale you choose, then encoded as JPG at the quality you set.',
                        'The PDF Scale setting controls sharpness: higher values make crisper images and larger files. Password-protected PDFs cannot be opened. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting PDF to JPG free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Will the JPG be sharp enough to read?',
                    answer: 'At the default 2× scale, text on the page is sharp on most screens. Raise the PDF Scale setting if small print looks blurry.',
                },
                {
                    question: 'Can I convert a password-protected PDF?',
                    answer: 'No. Encrypted PDFs cannot be opened here. Remove the password in a PDF app first, then convert the pages.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать PDF в JPG онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте каждую страницу PDF в изображение JPG онлайн, бесплатно, в браузере. Файлы меньше, чем PNG, — идеально для обмена страницами где угодно.',
            keywords: 'pdf в jpg, конвертировать pdf в jpg, страницы pdf в jpg, pdf в jpg онлайн, конвертер pdf в jpg',
            h1: 'Конвертировать PDF в JPG',
            eyebrow: 'Конвертер PDF в JPG',
            intro: [
                'Превратите каждую страницу PDF в изображение JPG: меньше, чем PNG, и открывается везде — в чатах, документах, письмах и на любом устройстве.',
                'Добавьте PDF и скачайте по одному JPG на страницу. Всё работает в браузере — ничего не загружается.',
            ],
            sections: [
                {
                    title: 'Что значит «PDF в JPG»?',
                    body: [
                        'Каждая страница PDF становится отдельным файлом JPG, отрисованным точно так, как выглядит страница, — с текстом, фото, таблицами и всем остальным.',
                        'Файлы JPG намного меньше PNG, поэтому это лучший выбор, когда нужно быстро поделиться страницами или загрузить их.',
                    ],
                },
                {
                    title: 'Когда конвертировать страницы PDF в JPG',
                    body: [
                        'Используйте это, чтобы поделиться страницей по почте или в чате, приложить страницу документа к форме или опубликовать страницу там, где принимаются только фото.',
                        'JPG подходит для страниц, где в основном фото или печатный текст. Для страниц с резкими схемами или мелким текстом PNG остаётся чётче.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Каждая страница PDF рендерится в браузере с помощью pdf.js на холст в выбранном вами масштабе, а затем кодируется в JPG с установленным вами качеством.',
                        'Настройка «Масштаб PDF» управляет резкостью: большие значения дают более чёткие изображения и большие файлы. PDF с паролем открыть нельзя. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация PDF в JPG бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Будет ли JPG достаточно резким для чтения?',
                    answer: 'При масштабе 2× по умолчанию текст на странице резкий на большинстве экранов. Поднимите настройку «Масштаб PDF», если мелкий шрифт выглядит размытым.',
                },
                {
                    question: 'Можно ли конвертировать PDF с паролем?',
                    answer: 'Нет. Зашифрованные PDF здесь не открываются. Сначала снимите пароль в приложении для PDF, затем конвертируйте страницы.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'pdf-to-webp': {
        en: {
            title: 'Convert PDF to WebP Online Free | ShotEasy',
            description: 'Convert every PDF page to a WebP image online, free, in your browser. The smallest files for web pages, nothing uploaded.',
            keywords: 'pdf to webp, convert pdf to webp, pdf pages to webp, pdf to webp online',
            h1: 'Convert PDF to WebP',
            eyebrow: 'PDF to WebP converter',
            intro: [
                'Turn each page of a PDF into a WebP image: smaller than PNG or JPG at the same visible quality, and ready for the web.',
                'Add a PDF and download one WebP per page. Everything runs in your browser — nothing is uploaded.',
            ],
            sections: [
                {
                    title: 'What does PDF to WebP mean?',
                    body: [
                        'Each page of the PDF becomes a separate WebP file, rendered exactly as the page looks — text, photos, tables and all.',
                        'WebP is the smallest of the three image formats, so it is the best choice when pages are headed for a website or a chat.',
                    ],
                },
                {
                    title: 'When to convert PDF pages to WebP',
                    body: [
                        'Use it to publish document pages on a website, to share pages in chats where file size matters, or to build a fast image gallery from a PDF.',
                        'WebP keeps transparency too, so pages with transparent elements stay correct — unlike JPG.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'Each PDF page is rendered in the browser with pdf.js onto a canvas at the scale you choose, then encoded to WebP at the quality you set.',
                        'The PDF Scale setting controls sharpness: higher values make crisper images and larger files. Password-protected PDFs cannot be opened. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting PDF to WebP free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Is WebP smaller than JPG for PDF pages?',
                    answer: 'Usually yes. At the same visible quality, WebP files are often 25–35% smaller than JPG, which is why they load faster on the web.',
                },
                {
                    question: 'Can I convert a password-protected PDF?',
                    answer: 'No. Encrypted PDFs cannot be opened here. Remove the password in a PDF app first, then convert the pages.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать PDF в WebP онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте каждую страницу PDF в изображение WebP онлайн, бесплатно, в браузере. Самые маленькие файлы для веб-страниц, без загрузки на сервер.',
            keywords: 'pdf в webp, конвертировать pdf в webp, страницы pdf в webp, pdf в webp онлайн',
            h1: 'Конвертировать PDF в WebP',
            eyebrow: 'Конвертер PDF в WebP',
            intro: [
                'Превратите каждую страницу PDF в изображение WebP: меньше, чем PNG или JPG, при том же видимом качестве, и готово для веба.',
                'Добавьте PDF и скачайте по одному WebP на страницу. Всё работает в браузере — ничего не загружается.',
            ],
            sections: [
                {
                    title: 'Что значит «PDF в WebP»?',
                    body: [
                        'Каждая страница PDF становится отдельным файлом WebP, отрисованным точно так, как выглядит страница, — с текстом, фото, таблицами и всем остальным.',
                        'WebP — самый маленький из трёх форматов изображений, поэтому это лучший выбор, когда страницы предназначены для сайта или чата.',
                    ],
                },
                {
                    title: 'Когда конвертировать страницы PDF в WebP',
                    body: [
                        'Используйте это, чтобы публиковать страницы документов на сайте, делиться страницами в чатах, где важен размер файла, или собрать быструю галерею изображений из PDF.',
                        'WebP также сохраняет прозрачность, поэтому страницы с прозрачными элементами остаются корректными — в отличие от JPG.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Каждая страница PDF рендерится в браузере с помощью pdf.js на холст в выбранном вами масштабе, а затем кодируется в WebP с установленным вами качеством.',
                        'Настройка «Масштаб PDF» управляет резкостью: большие значения дают более чёткие изображения и большие файлы. PDF с паролем открыть нельзя. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация PDF в WebP бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'WebP меньше JPG для страниц PDF?',
                    answer: 'Обычно да. При том же видимом качестве файлы WebP часто на 25–35% меньше JPG, поэтому они быстрее грузятся в вебе.',
                },
                {
                    question: 'Можно ли конвертировать PDF с паролем?',
                    answer: 'Нет. Зашифрованные PDF здесь не открываются. Сначала снимите пароль в приложении для PDF, затем конвертируйте страницы.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'csv-to-xlsx': {
        en: {
            title: 'Convert CSV to XLSX Online Free | ShotEasy',
            description: 'Convert CSV files to Excel XLSX spreadsheets online, free, in your browser. Open data exports in Excel, nothing uploaded.',
            keywords: 'csv to xlsx, convert csv to xlsx, csv to excel, csv to xlsx online',
            h1: 'Convert CSV to XLSX',
            eyebrow: 'CSV to XLSX converter',
            intro: [
                'CSV files are plain text, and Excel opens them awkwardly: columns can split wrong and numbers can change. Converting to XLSX gives you a real spreadsheet that opens correctly.',
                'Drop in a CSV and download an .xlsx file — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What are CSV and XLSX?',
                    body: [
                        'CSV is a text file with one row per line and values separated by commas. It is the format most apps use to export data.',
                        'XLSX is the Excel workbook format: it stores the same table with types, so numbers stay numbers and dates stay dates when Excel opens it.',
                    ],
                },
                {
                    title: 'When to convert CSV to XLSX',
                    body: [
                        'Use it when a data export, a report or a contact list arrives as CSV and you want to sort, filter or chart it in Excel or Google Sheets.',
                        'It also fixes the classic CSV problem: Excel opening a file with the wrong separator and putting a whole row into one column.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The CSV is parsed in the browser with SheetJS: the first row becomes the column headers, and each following row becomes a spreadsheet row.',
                        'The workbook is built locally and downloaded as .xlsx. Cell values transfer; cell colours and fonts do not — this is data conversion, not a copy of a formatted sheet. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting CSV to XLSX free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Will my numbers and dates stay correct?',
                    answer: 'Yes, in most cases. SheetJS detects numbers and dates while parsing, so they open in Excel as values you can calculate with — not as text.',
                },
                {
                    question: 'Will formatting like colours survive?',
                    answer: 'No. CSV has no formatting to keep, and this conversion moves the data only. If the file needs colours or fonts, add them in Excel after converting.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать CSV в XLSX онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте файлы CSV в таблицы Excel XLSX онлайн, бесплатно, в браузере. Открывайте выгрузки данных в Excel, без загрузки на сервер.',
            keywords: 'csv в xlsx, конвертировать csv в xlsx, csv в excel, csv в xlsx онлайн',
            h1: 'Конвертировать CSV в XLSX',
            eyebrow: 'Конвертер CSV в XLSX',
            intro: [
                'Файлы CSV — это обычный текст, и Excel открывает их неуклюже: столбцы могут разбиться неверно, а числа — измениться. Конвертация в XLSX даёт настоящую таблицу, которая открывается корректно.',
                'Перетащите CSV и скачайте файл .xlsx — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое CSV и XLSX?',
                    body: [
                        'CSV — текстовый файл: одна строка на строку, значения разделены запятыми. Это формат, в котором большинство приложений выгружают данные.',
                        'XLSX — формат книги Excel: он хранит ту же таблицу с типами, поэтому числа остаются числами, а даты — датами, когда Excel открывает файл.',
                    ],
                },
                {
                    title: 'Когда конвертировать CSV в XLSX',
                    body: [
                        'Используйте это, когда выгрузка данных, отчёт или список контактов приходит как CSV, а вы хотите сортировать, фильтровать или строить диаграммы в Excel или Google Таблицах.',
                        'Это также решает классическую проблему CSV: Excel открывает файл с неверным разделителем и кладёт всю строку в один столбец.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'CSV разбирается в браузере с помощью SheetJS: первая строка становится заголовками столбцов, а каждая следующая строка — строкой таблицы.',
                        'Книга строится локально и скачивается как .xlsx. Значения ячеек переносятся; цвета и шрифты — нет: это конвертация данных, а не копия отформатированного листа. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация CSV в XLSX бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Сохранятся ли числа и даты корректно?',
                    answer: 'В большинстве случаев да. SheetJS определяет числа и даты при разборе, поэтому в Excel они открываются как значения, с которыми можно считать, а не как текст.',
                },
                {
                    question: 'Сохранится ли форматирование, например цвета?',
                    answer: 'Нет. В CSV нет форматирования, которое можно сохранить, а конвертация переносит только данные. Если файлу нужны цвета или шрифты, добавьте их в Excel после конвертации.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'xlsx-to-csv': {
        en: {
            title: 'Convert XLSX to CSV Online Free | ShotEasy',
            description: 'Convert Excel XLSX spreadsheets to CSV files online, free, in your browser. Plain-text data for any app, nothing uploaded.',
            keywords: 'xlsx to csv, convert xlsx to csv, excel to csv, xlsx to csv online',
            h1: 'Convert XLSX to CSV',
            eyebrow: 'XLSX to CSV converter',
            intro: [
                'CSV is the plain-text table format almost every app can read. Converting a spreadsheet to CSV makes its data portable: import it anywhere, or process it with a script.',
                'Drop in an .xlsx file and download a .csv — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What are XLSX and CSV?',
                    body: [
                        'XLSX is the Excel workbook format: typed cells, formulas, formatting and multiple sheets in one file.',
                        'CSV is the same table as plain text — one row per line, values separated by commas. It has no formatting, but every tool can read it.',
                    ],
                },
                {
                    title: 'When to convert XLSX to CSV',
                    body: [
                        'Use it to import spreadsheet data into another app, a database or a script, or to share a table with someone who does not have Excel.',
                        'CSV is also the right format for version control: a text file diffs cleanly, while a binary spreadsheet does not.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The workbook is parsed in the browser with SheetJS and the first sheet is written out as CSV: one row per line, values separated by commas.',
                        'Only the first sheet is converted, and only cell values transfer — formulas are replaced by their results, and formatting is dropped. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting XLSX to CSV free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Which sheet is converted?',
                    answer: 'The first sheet of the workbook. If your data is on another sheet, move it to the first position in Excel before converting.',
                },
                {
                    question: 'Will formulas survive?',
                    answer: 'No — formulas are replaced by their calculated values. CSV stores data only, so any formula becomes the number or text it produced.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать XLSX в CSV онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте таблицы Excel XLSX в файлы CSV онлайн, бесплатно, в браузере. Простой текст данных для любого приложения, без загрузки на сервер.',
            keywords: 'xlsx в csv, конвертировать xlsx в csv, excel в csv, xlsx в csv онлайн',
            h1: 'Конвертировать XLSX в CSV',
            eyebrow: 'Конвертер XLSX в CSV',
            intro: [
                'CSV — формат таблиц в виде простого текста, который читает почти любое приложение. Конвертация таблицы в CSV делает её данные переносимыми: импортируйте их куда угодно или обрабатывайте скриптом.',
                'Перетащите файл .xlsx и скачайте .csv — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое XLSX и CSV?',
                    body: [
                        'XLSX — формат книги Excel: типизированные ячейки, формулы, форматирование и несколько листов в одном файле.',
                        'CSV — та же таблица в виде простого текста: одна строка на строку, значения разделены запятыми. В нём нет форматирования, но его читает любой инструмент.',
                    ],
                },
                {
                    title: 'Когда конвертировать XLSX в CSV',
                    body: [
                        'Используйте это, чтобы импортировать данные таблицы в другое приложение, базу данных или скрипт, или поделиться таблицей с тем, у кого нет Excel.',
                        'CSV также подходит для контроля версий: текстовый файл чисто показывает различия, а бинарная таблица — нет.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Книга разбирается в браузере с помощью SheetJS, а первый лист записывается как CSV: одна строка на строку, значения разделены запятыми.',
                        'Конвертируется только первый лист, и переносятся только значения ячеек: формулы заменяются их результатами, а форматирование отбрасывается. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация XLSX в CSV бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какой лист конвертируется?',
                    answer: 'Первый лист книги. Если ваши данные на другом листе, переместите его на первую позицию в Excel перед конвертацией.',
                },
                {
                    question: 'Сохранятся ли формулы?',
                    answer: 'Нет — формулы заменяются их вычисленными значениями. CSV хранит только данные, поэтому любая формула становится числом или текстом, который она выдала.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'json-to-csv': {
        en: {
            title: 'Convert JSON to CSV Online Free | ShotEasy',
            description: 'Convert JSON data to CSV spreadsheets online, free, in your browser. Turn API responses into tables, nothing uploaded.',
            keywords: 'json to csv, convert json to csv, json to excel, json to csv online',
            h1: 'Convert JSON to CSV',
            eyebrow: 'JSON to CSV converter',
            intro: [
                'APIs and apps export data as JSON — great for code, awkward for humans. Converting to CSV turns a list of objects into a table you can open in Excel or Google Sheets.',
                'Drop in a .json file and download a .csv — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What are JSON and CSV?',
                    body: [
                        'JSON is the standard data format of the web: a list of objects, each with named fields, often nested inside one another.',
                        'CSV is the same data flattened into a table: one row per object, one column per field. It opens in any spreadsheet app.',
                    ],
                },
                {
                    title: 'When to convert JSON to CSV',
                    body: [
                        'Use it to inspect an API response in a spreadsheet, to share structured data with non-developers, or to feed data into a tool that only accepts CSV.',
                        'It is the fastest way to turn a JSON export from an app or a database into a table you can sort and filter.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The JSON is parsed in the browser with SheetJS: object keys become column headers, and each object becomes one CSV row.',
                        'Nested objects and arrays are flattened into text. Only the first sheet of data is written; nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting JSON to CSV free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'What JSON shape does it expect?',
                    answer: 'A list (array) of objects with the same fields — for example, rows exported from an API or a database. A single object is converted as one row.',
                },
                {
                    question: 'What happens to nested data?',
                    answer: 'Nested objects and arrays are flattened into text in their cell. Deeply nested JSON is better explored in code than in a spreadsheet.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать JSON в CSV онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте данные JSON в таблицы CSV онлайн, бесплатно, в браузере. Превращайте ответы API в таблицы, без загрузки на сервер.',
            keywords: 'json в csv, конвертировать json в csv, json в excel, json в csv онлайн',
            h1: 'Конвертировать JSON в CSV',
            eyebrow: 'Конвертер JSON в CSV',
            intro: [
                'API и приложения выгружают данные как JSON — удобно для кода, неудобно для людей. Конвертация в CSV превращает список объектов в таблицу, которую можно открыть в Excel или Google Таблицах.',
                'Перетащите файл .json и скачайте .csv — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое JSON и CSV?',
                    body: [
                        'JSON — стандартный формат данных веба: список объектов, каждый с именованными полями, часто вложенными друг в друга.',
                        'CSV — те же данные, развёрнутые в таблицу: одна строка на объект, один столбец на поле. Он открывается в любом табличном приложении.',
                    ],
                },
                {
                    title: 'Когда конвертировать JSON в CSV',
                    body: [
                        'Используйте это, чтобы посмотреть ответ API в таблице, поделиться структурированными данными с не-разработчиками или передать данные в инструмент, который принимает только CSV.',
                        'Это самый быстрый способ превратить выгрузку JSON из приложения или базы данных в таблицу, которую можно сортировать и фильтровать.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'JSON разбирается в браузере с помощью SheetJS: ключи объектов становятся заголовками столбцов, а каждый объект — одной строкой CSV.',
                        'Вложенные объекты и массивы разворачиваются в текст. Записывается только первый набор данных; ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация JSON в CSV бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какой вид JSON ожидается?',
                    answer: 'Список (массив) объектов с одинаковыми полями — например, строки, выгруженные из API или базы данных. Один объект конвертируется как одна строка.',
                },
                {
                    question: 'Что происходит с вложенными данными?',
                    answer: 'Вложенные объекты и массивы разворачиваются в текст в своей ячейке. Глубоко вложенный JSON лучше изучать в коде, чем в таблице.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'csv-to-json': {
        en: {
            title: 'Convert CSV to JSON Online Free | ShotEasy',
            description: 'Convert CSV files to JSON data online, free, in your browser. Turn spreadsheets into API-ready data, nothing uploaded.',
            keywords: 'csv to json, convert csv to json, csv to json online, csv to json converter',
            h1: 'Convert CSV to JSON',
            eyebrow: 'CSV to JSON converter',
            intro: [
                'CSV is the table format humans use; JSON is the data format code uses. Converting a CSV to JSON turns a spreadsheet into structured data an app or API can consume directly.',
                'Drop in a .csv file and download a .json — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What are CSV and JSON?',
                    body: [
                        'CSV is a text file with one row per line and values separated by commas — the format most apps use to export tables.',
                        'JSON is the standard data format of the web: a list of objects, each with named fields. APIs, databases and scripts all speak JSON.',
                    ],
                },
                {
                    title: 'When to convert CSV to JSON',
                    body: [
                        'Use it to feed spreadsheet data into a script, an API or a database, or to turn a contact list or a price table into data your code can read.',
                        'It is the standard step when a table leaves Excel and enters an application.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The CSV is parsed in the browser with SheetJS: the first row becomes the field names, and each following row becomes one JSON object.',
                        'Numbers and dates are detected where possible, and the result is downloaded as a .json file. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting CSV to JSON free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'How are the JSON field names chosen?',
                    answer: 'From the first row of the CSV. Make sure the first row holds column headers — otherwise the first data row becomes the headers.',
                },
                {
                    question: 'Will numbers stay numbers?',
                    answer: 'Yes, in most cases. SheetJS detects numbers and dates while parsing, so they appear as values in the JSON, not as text.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать CSV в JSON онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте файлы CSV в данные JSON онлайн, бесплатно, в браузере. Превращайте таблицы в данные, готовые для API, без загрузки на сервер.',
            keywords: 'csv в json, конвертировать csv в json, csv в json онлайн, конвертер csv в json',
            h1: 'Конвертировать CSV в JSON',
            eyebrow: 'Конвертер CSV в JSON',
            intro: [
                'CSV — формат таблиц для людей; JSON — формат данных для кода. Конвертация CSV в JSON превращает таблицу в структурированные данные, которые приложение или API могут использовать напрямую.',
                'Перетащите файл .csv и скачайте .json — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое CSV и JSON?',
                    body: [
                        'CSV — текстовый файл: одна строка на строку, значения разделены запятыми, — формат, в котором большинство приложений выгружают таблицы.',
                        'JSON — стандартный формат данных веба: список объектов, каждый с именованными полями. API, базы данных и скрипты говорят на JSON.',
                    ],
                },
                {
                    title: 'Когда конвертировать CSV в JSON',
                    body: [
                        'Используйте это, чтобы передать данные таблицы в скрипт, API или базу данных, или превратить список контактов или прайс в данные, которые может читать ваш код.',
                        'Это стандартный шаг, когда таблица покидает Excel и попадает в приложение.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'CSV разбирается в браузере с помощью SheetJS: первая строка становится именами полей, а каждая следующая строка — одним объектом JSON.',
                        'Числа и даты определяются, где возможно, а результат скачивается как файл .json. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация CSV в JSON бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Как выбираются имена полей JSON?',
                    answer: 'Из первой строки CSV. Убедитесь, что первая строка содержит заголовки столбцов, — иначе заголовками станет первая строка данных.',
                },
                {
                    question: 'Останутся ли числа числами?',
                    answer: 'В большинстве случаев да. SheetJS определяет числа и даты при разборе, поэтому в JSON они появляются как значения, а не как текст.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'json-to-xlsx': {
        en: {
            title: 'Convert JSON to XLSX Online Free | ShotEasy',
            description: 'Convert JSON data to Excel XLSX spreadsheets online, free, in your browser. Turn API responses into workbooks, nothing uploaded.',
            keywords: 'json to xlsx, convert json to xlsx, json to excel, json to xlsx online',
            h1: 'Convert JSON to XLSX',
            eyebrow: 'JSON to XLSX converter',
            intro: [
                'APIs and apps export data as JSON — great for code, awkward for humans. Converting to XLSX turns a list of objects into a real spreadsheet you can sort, filter and chart.',
                'Drop in a .json file and download an .xlsx — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What are JSON and XLSX?',
                    body: [
                        'JSON is the standard data format of the web: a list of objects, each with named fields, often nested inside one another.',
                        'XLSX is the Excel workbook format: the same data as a typed table that opens in Excel or Google Sheets with numbers and dates intact.',
                    ],
                },
                {
                    title: 'When to convert JSON to XLSX',
                    body: [
                        'Use it to inspect an API response in a spreadsheet, to share structured data with non-developers, or to analyse exported data with Excel tools.',
                        'It is the fastest way to turn a JSON export into a table you can work with by hand.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The JSON is parsed in the browser with SheetJS: object keys become column headers, each object becomes one spreadsheet row, and the workbook is built locally.',
                        'Nested objects and arrays are flattened into text. Cell values transfer; formatting is added in Excel afterwards. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting JSON to XLSX free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'What JSON shape does it expect?',
                    answer: 'A list (array) of objects with the same fields — for example, rows exported from an API or a database. A single object is converted as one row.',
                },
                {
                    question: 'What happens to nested data?',
                    answer: 'Nested objects and arrays are flattened into text in their cell. Deeply nested JSON is better explored in code than in a spreadsheet.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать JSON в XLSX онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте данные JSON в таблицы Excel XLSX онлайн, бесплатно, в браузере. Превращайте ответы API в книги, без загрузки на сервер.',
            keywords: 'json в xlsx, конвертировать json в xlsx, json в excel, json в xlsx онлайн',
            h1: 'Конвертировать JSON в XLSX',
            eyebrow: 'Конвертер JSON в XLSX',
            intro: [
                'API и приложения выгружают данные как JSON — удобно для кода, неудобно для людей. Конвертация в XLSX превращает список объектов в настоящую таблицу, которую можно сортировать, фильтровать и строить по ней диаграммы.',
                'Перетащите файл .json и скачайте .xlsx — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое JSON и XLSX?',
                    body: [
                        'JSON — стандартный формат данных веба: список объектов, каждый с именованными полями, часто вложенными друг в друга.',
                        'XLSX — формат книги Excel: те же данные в виде типизированной таблицы, которая открывается в Excel или Google Таблицах с сохранёнными числами и датами.',
                    ],
                },
                {
                    title: 'Когда конвертировать JSON в XLSX',
                    body: [
                        'Используйте это, чтобы посмотреть ответ API в таблице, поделиться структурированными данными с не-разработчиками или проанализировать выгруженные данные инструментами Excel.',
                        'Это самый быстрый способ превратить выгрузку JSON в таблицу, с которой можно работать вручную.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'JSON разбирается в браузере с помощью SheetJS: ключи объектов становятся заголовками столбцов, каждый объект — одной строкой таблицы, а книга строится локально.',
                        'Вложенные объекты и массивы разворачиваются в текст. Значения ячеек переносятся; форматирование добавляется в Excel после. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация JSON в XLSX бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какой вид JSON ожидается?',
                    answer: 'Список (массив) объектов с одинаковыми полями — например, строки, выгруженные из API или базы данных. Один объект конвертируется как одна строка.',
                },
                {
                    question: 'Что происходит с вложенными данными?',
                    answer: 'Вложенные объекты и массивы разворачиваются в текст в своей ячейке. Глубоко вложенный JSON лучше изучать в коде, чем в таблице.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'xlsx-to-json': {
        en: {
            title: 'Convert XLSX to JSON Online Free | ShotEasy',
            description: 'Convert Excel XLSX spreadsheets to JSON data online, free, in your browser. Turn tables into API-ready data, nothing uploaded.',
            keywords: 'xlsx to json, convert xlsx to json, excel to json, xlsx to json online',
            h1: 'Convert XLSX to JSON',
            eyebrow: 'XLSX to JSON converter',
            intro: [
                'Spreadsheets hold data humans can read; JSON holds data code can read. Converting an XLSX to JSON turns a table into structured data an app, API or script can consume directly.',
                'Drop in an .xlsx file and download a .json — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What are XLSX and JSON?',
                    body: [
                        'XLSX is the Excel workbook format: typed cells, formulas, formatting and multiple sheets in one file.',
                        'JSON is the standard data format of the web: a list of objects, each with named fields. APIs, databases and scripts all speak JSON.',
                    ],
                },
                {
                    title: 'When to convert XLSX to JSON',
                    body: [
                        'Use it to feed spreadsheet data into a script, an API or a database, or to turn a price table or a contact list into data your code can read.',
                        'It is the standard step when a table leaves Excel and enters an application.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The workbook is parsed in the browser with SheetJS: the first sheet’s first row becomes the field names, and each following row becomes one JSON object.',
                        'Only the first sheet is converted, and formulas are replaced by their calculated values. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting XLSX to JSON free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Which sheet is converted?',
                    answer: 'The first sheet of the workbook. If your data is on another sheet, move it to the first position in Excel before converting.',
                },
                {
                    question: 'Will formulas survive?',
                    answer: 'No — formulas are replaced by their calculated values. JSON stores data only, so any formula becomes the number or text it produced.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать XLSX в JSON онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте таблицы Excel XLSX в данные JSON онлайн, бесплатно, в браузере. Превращайте таблицы в данные, готовые для API, без загрузки на сервер.',
            keywords: 'xlsx в json, конвертировать xlsx в json, excel в json, xlsx в json онлайн',
            h1: 'Конвертировать XLSX в JSON',
            eyebrow: 'Конвертер XLSX в JSON',
            intro: [
                'Таблицы хранят данные, которые читают люди; JSON хранит данные, которые читает код. Конвертация XLSX в JSON превращает таблицу в структурированные данные, которые приложение, API или скрипт могут использовать напрямую.',
                'Перетащите файл .xlsx и скачайте .json — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое XLSX и JSON?',
                    body: [
                        'XLSX — формат книги Excel: типизированные ячейки, формулы, форматирование и несколько листов в одном файле.',
                        'JSON — стандартный формат данных веба: список объектов, каждый с именованными полями. API, базы данных и скрипты говорят на JSON.',
                    ],
                },
                {
                    title: 'Когда конвертировать XLSX в JSON',
                    body: [
                        'Используйте это, чтобы передать данные таблицы в скрипт, API или базу данных, или превратить прайс или список контактов в данные, которые может читать ваш код.',
                        'Это стандартный шаг, когда таблица покидает Excel и попадает в приложение.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Книга разбирается в браузере с помощью SheetJS: первая строка первого листа становится именами полей, а каждая следующая строка — одним объектом JSON.',
                        'Конвертируется только первый лист, а формулы заменяются их вычисленными значениями. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация XLSX в JSON бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Какой лист конвертируется?',
                    answer: 'Первый лист книги. Если ваши данные на другом листе, переместите его на первую позицию в Excel перед конвертацией.',
                },
                {
                    question: 'Сохранятся ли формулы?',
                    answer: 'Нет — формулы заменяются их вычисленными значениями. JSON хранит только данные, поэтому любая формула становится числом или текстом, который она выдала.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'tsv-to-csv': {
        en: {
            title: 'Convert TSV to CSV Online Free | ShotEasy',
            description: 'Convert TSV (tab-separated) files to CSV online, free, in your browser. One separator swap for any spreadsheet app, nothing uploaded.',
            keywords: 'tsv to csv, convert tsv to csv, tab separated to csv, tsv to csv online',
            h1: 'Convert TSV to CSV',
            eyebrow: 'TSV to CSV converter',
            intro: [
                'TSV and CSV hold the same table — only the separator differs: tabs in TSV, commas in CSV. Many apps export TSV, but most tools expect CSV.',
                'Drop in a .tsv file and download a .csv — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What are TSV and CSV?',
                    body: [
                        'TSV (tab-separated values) is a text table with one row per line and values separated by tab characters. It is common in exports from spreadsheets, databases and log tools.',
                        'CSV is the same table with commas instead of tabs — the separator almost every spreadsheet app and script expects.',
                    ],
                },
                {
                    title: 'When to convert TSV to CSV',
                    body: [
                        'Use it when an export arrives as TSV and the tool you need — Excel, Google Sheets, a database import or a script — wants CSV.',
                        'CSV is also safer to share: tabs are invisible and easy to lose in a copy-paste, while commas are explicit.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The TSV is parsed in the browser with SheetJS and written out as CSV: one row per line, values separated by commas, with quoting where a value contains a comma.',
                        'Only the table data transfers — there is no formatting in either format. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting TSV to CSV free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Will my data change?',
                    answer: 'No. The table is identical — only the separator changes from tabs to commas, and values containing commas are quoted so they stay in one column.',
                },
                {
                    question: 'What if my TSV has no header row?',
                    answer: 'The first row is treated as headers either way. If your file has no headers, add one first, or the first data row will be used as the header.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать TSV в CSV онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте файлы TSV (с разделителем-табуляцией) в CSV онлайн, бесплатно, в браузере. Одна замена разделителя для любого табличного приложения, без загрузки на сервер.',
            keywords: 'tsv в csv, конвертировать tsv в csv, tab separated в csv, tsv в csv онлайн',
            h1: 'Конвертировать TSV в CSV',
            eyebrow: 'Конвертер TSV в CSV',
            intro: [
                'TSV и CSV хранят одну и ту же таблицу — отличается только разделитель: табуляция в TSV, запятые в CSV. Многие приложения выгружают TSV, но большинство инструментов ждут CSV.',
                'Перетащите файл .tsv и скачайте .csv — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое TSV и CSV?',
                    body: [
                        'TSV (значения, разделённые табуляцией) — текстовая таблица: одна строка на строку, значения разделены символами табуляции. Он распространён в выгрузках из таблиц, баз данных и лог-инструментов.',
                        'CSV — та же таблица с запятыми вместо табуляции: разделитель, который ожидает почти любое табличное приложение и скрипт.',
                    ],
                },
                {
                    title: 'Когда конвертировать TSV в CSV',
                    body: [
                        'Используйте это, когда выгрузка приходит как TSV, а нужный вам инструмент — Excel, Google Таблицы, импорт в базу данных или скрипт — хочет CSV.',
                        'CSV также безопаснее для обмена: табуляция невидима и легко теряется при копировании, а запятые — явные.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'TSV разбирается в браузере с помощью SheetJS и записывается как CSV: одна строка на строку, значения разделены запятыми, а значения с запятыми берутся в кавычки.',
                        'Переносятся только данные таблицы — форматирования нет ни в одном из форматов. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация TSV в CSV бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Изменятся ли мои данные?',
                    answer: 'Нет. Таблица идентична — меняется только разделитель с табуляции на запятые, а значения с запятыми берутся в кавычки, чтобы остаться в одном столбце.',
                },
                {
                    question: 'Что если в моём TSV нет строки заголовков?',
                    answer: 'Первая строка в любом случае считается заголовками. Если в вашем файле нет заголовков, сначала добавьте их, иначе заголовками станет первая строка данных.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'tsv-to-xlsx': {
        en: {
            title: 'Convert TSV to XLSX Online Free | ShotEasy',
            description: 'Convert TSV (tab-separated) files to Excel XLSX spreadsheets online, free, in your browser. Open data exports in Excel, nothing uploaded.',
            keywords: 'tsv to xlsx, convert tsv to xlsx, tsv to excel, tsv to xlsx online',
            h1: 'Convert TSV to XLSX',
            eyebrow: 'TSV to XLSX converter',
            intro: [
                'TSV files are plain text, and Excel opens them awkwardly. Converting to XLSX gives you a real spreadsheet that opens correctly, with numbers and dates intact.',
                'Drop in a .tsv file and download an .xlsx — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What are TSV and XLSX?',
                    body: [
                        'TSV (tab-separated values) is a text table with one row per line and values separated by tab characters. It is common in exports from spreadsheets, databases and log tools.',
                        'XLSX is the Excel workbook format: it stores the same table with types, so numbers stay numbers and dates stay dates when Excel opens it.',
                    ],
                },
                {
                    title: 'When to convert TSV to XLSX',
                    body: [
                        'Use it when a data export, a report or a log arrives as TSV and you want to sort, filter or chart it in Excel or Google Sheets.',
                        'It also fixes the classic TSV problem: Excel opening a file with the wrong separator and putting a whole row into one column.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The TSV is parsed in the browser with SheetJS: the first row becomes the column headers, and each following row becomes a spreadsheet row.',
                        'The workbook is built locally and downloaded as .xlsx. Cell values transfer; cell colours and fonts do not — this is data conversion, not a copy of a formatted sheet. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting TSV to XLSX free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Will my numbers and dates stay correct?',
                    answer: 'Yes, in most cases. SheetJS detects numbers and dates while parsing, so they open in Excel as values you can calculate with — not as text.',
                },
                {
                    question: 'Will formatting like colours survive?',
                    answer: 'No. TSV has no formatting to keep, and this conversion moves the data only. If the file needs colours or fonts, add them in Excel after converting.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать TSV в XLSX онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте файлы TSV (с разделителем-табуляцией) в таблицы Excel XLSX онлайн, бесплатно, в браузере. Открывайте выгрузки данных в Excel, без загрузки на сервер.',
            keywords: 'tsv в xlsx, конвертировать tsv в xlsx, tsv в excel, tsv в xlsx онлайн',
            h1: 'Конвертировать TSV в XLSX',
            eyebrow: 'Конвертер TSV в XLSX',
            intro: [
                'Файлы TSV — это обычный текст, и Excel открывает их неуклюже. Конвертация в XLSX даёт настоящую таблицу, которая открывается корректно, с сохранёнными числами и датами.',
                'Перетащите файл .tsv и скачайте .xlsx — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое TSV и XLSX?',
                    body: [
                        'TSV (значения, разделённые табуляцией) — текстовая таблица: одна строка на строку, значения разделены символами табуляции. Он распространён в выгрузках из таблиц, баз данных и лог-инструментов.',
                        'XLSX — формат книги Excel: он хранит ту же таблицу с типами, поэтому числа остаются числами, а даты — датами, когда Excel открывает файл.',
                    ],
                },
                {
                    title: 'Когда конвертировать TSV в XLSX',
                    body: [
                        'Используйте это, когда выгрузка данных, отчёт или лог приходит как TSV, а вы хотите сортировать, фильтровать или строить диаграммы в Excel или Google Таблицах.',
                        'Это также решает классическую проблему TSV: Excel открывает файл с неверным разделителем и кладёт всю строку в один столбец.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'TSV разбирается в браузере с помощью SheetJS: первая строка становится заголовками столбцов, а каждая следующая строка — строкой таблицы.',
                        'Книга строится локально и скачивается как .xlsx. Значения ячеек переносятся; цвета и шрифты — нет: это конвертация данных, а не копия отформатированного листа. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация TSV в XLSX бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Сохранятся ли числа и даты корректно?',
                    answer: 'В большинстве случаев да. SheetJS определяет числа и даты при разборе, поэтому в Excel они открываются как значения, с которыми можно считать, а не как текст.',
                },
                {
                    question: 'Сохранится ли форматирование, например цвета?',
                    answer: 'Нет. В TSV нет форматирования, которое можно сохранить, а конвертация переносит только данные. Если файлу нужны цвета или шрифты, добавьте их в Excel после конвертации.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
    'md-to-html': {
        en: {
            title: 'Convert Markdown to HTML Online Free | ShotEasy',
            description: 'Convert Markdown files to HTML pages online, free, in your browser. Headings, lists, tables and code blocks rendered with markdown-it.',
            keywords: 'markdown to html, convert md to html, markdown to html online, md converter, markdown converter',
            h1: 'Convert Markdown to HTML',
            eyebrow: 'Markdown to HTML converter',
            intro: [
                'Markdown is how READMEs, blog posts and docs are written — plain text with simple marks for headings, lists and links. Converting to HTML turns it into a page a browser can display.',
                'Drop in a .md file and download a standalone .html page — free, in your browser, with nothing uploaded.',
            ],
            sections: [
                {
                    title: 'What is Markdown?',
                    body: [
                        'Markdown is a lightweight way to write formatted text: # for headings, ** for bold, - for lists, and so on. It stays readable as plain text and renders into HTML.',
                        'It is the standard for READMEs on GitHub, for blog posts in static site generators, and for notes in many apps.',
                    ],
                },
                {
                    title: 'When to convert Markdown to HTML',
                    body: [
                        'Use it to publish a README or a doc as a web page, to preview a post before it goes live, or to paste formatted content into a CMS that accepts HTML.',
                        'It is also the quickest way to check how a Markdown file will look once rendered.',
                    ],
                },
                {
                    title: 'How the conversion works',
                    body: [
                        'The file is rendered in the browser with markdown-it: headings, lists, tables, code blocks, links and images become their HTML equivalents.',
                        'The result is a standalone HTML file you can open in any browser. Links and image paths pass through unchanged. Nothing is uploaded.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Is converting Markdown to HTML free?',
                    answer: 'Yes. Free, unlimited, and processed locally in your browser.',
                },
                {
                    question: 'Do links and images survive?',
                    answer: 'Yes. Links and image references pass through into the HTML unchanged. Relative paths stay relative, so keep the images next to the HTML file.',
                },
                {
                    question: 'Can I put raw HTML in my Markdown?',
                    answer: 'Yes. markdown-it passes raw HTML through, so mixed Markdown and HTML renders as you wrote it.',
                },
            ],
            backLink: 'All converters',
        },
        ru: {
            title: 'Конвертировать Markdown в HTML онлайн бесплатно | ShotEasy',
            description: 'Конвертируйте файлы Markdown в HTML-страницы онлайн, бесплатно, в браузере. Заголовки, списки, таблицы и блоки кода — с помощью markdown-it.',
            keywords: 'markdown в html, конвертировать markdown в html, markdown в html онлайн, md конвертер, конвертер markdown',
            h1: 'Конвертировать Markdown в HTML',
            eyebrow: 'Конвертер Markdown в HTML',
            intro: [
                'Markdown — это то, как пишутся README, посты в блогах и документы: простой текст с лёгкими пометками для заголовков, списков и ссылок. Конвертация в HTML превращает его в страницу, которую может показать браузер.',
                'Перетащите файл .md и скачайте отдельную страницу .html — бесплатно, в браузере, без загрузки.',
            ],
            sections: [
                {
                    title: 'Что такое Markdown?',
                    body: [
                        'Markdown — лёгкий способ писать форматированный текст: # для заголовков, ** для жирного, - для списков и так далее. Он остаётся читаемым как простой текст и рендерится в HTML.',
                        'Это стандарт для README на GitHub, постов в блогах на статических генераторах сайтов и заметок во многих приложениях.',
                    ],
                },
                {
                    title: 'Когда конвертировать Markdown в HTML',
                    body: [
                        'Используйте это, чтобы опубликовать README или документ как веб-страницу, посмотреть пост перед публикацией или вставить форматированный контент в CMS, которая принимает HTML.',
                        'Это также самый быстрый способ проверить, как файл Markdown будет выглядеть после рендеринга.',
                    ],
                },
                {
                    title: 'Как работает конвертация',
                    body: [
                        'Файл рендерится в браузере с помощью markdown-it: заголовки, списки, таблицы, блоки кода, ссылки и изображения становятся их HTML-эквивалентами.',
                        'Результат — отдельная HTML-страница, которую можно открыть в любом браузере. Ссылки и пути к изображениям проходят без изменений. Ничего не загружается.',
                    ],
                },
            ],
            faq: [
                {
                    question: 'Конвертация Markdown в HTML бесплатна?',
                    answer: 'Да. Бесплатно, без ограничений, обработка локально в браузере.',
                },
                {
                    question: 'Сохранятся ли ссылки и изображения?',
                    answer: 'Да. Ссылки и ссылки на изображения переходят в HTML без изменений. Относительные пути остаются относительными, поэтому держите изображения рядом с HTML-файлом.',
                },
                {
                    question: 'Можно ли вставлять сырой HTML в Markdown?',
                    answer: 'Да. markdown-it пропускает сырой HTML, поэтому смешанный Markdown и HTML рендерится так, как вы написали.',
                },
            ],
            backLink: 'Все конвертеры',
        },
    },
};

export const getConvertModePage = (mode, locale) => {
    const entry = convertModePages[mode];
    if (!entry) return null;
    return entry[locale] || entry.en || null;
};
