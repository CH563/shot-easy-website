# Convert Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new browser-local `Convert` page for image and PDF format conversion using the approved operation-first tool layout.

**Architecture:** Add localized Astro routes and i18n entries, then implement a React `ConvertTool` that owns file intake, conversion mode, conversion state, downloads, and cleanup. Reuse browser Canvas APIs, existing `pdfjs-dist`, existing `jszip`, and extract small local helpers where Long Image already proves the PDF rendering approach.

**Tech Stack:** Astro, React, Ant Design, Tailwind, `pdfjs-dist`, `jszip`, browser Canvas/File/Blob/ObjectURL APIs.

---

## File Structure

- Create `src/components/ConvertPage.astro`: page shell matching existing tool pages, SEO sections, local processing, privacy, JSON-LD.
- Create `src/components/ConvertTool.jsx`: React tool surface for mode selection, uploads, list, conversion, download all.
- Create `src/lib/pdfConvert.js`: shared browser PDF rendering and simple multi-page PDF creation helpers, adapted from `LongImageComposer`.
- Create `src/lib/imageConvert.js`: image loading, canvas conversion, SVG rendering, ICO byte generation, filename helpers.
- Create `src/i18n/*/convert.js`: localized TDK and page/tool copy for all existing locales.
- Modify `src/i18n/*/index.js`: import and expose `convert`.
- Modify `src/i18n/*/nav.js`: add `convert` nav labels.
- Modify `src/components/Header.astro`: add Convert nav item.
- Modify `src/components/Footer.astro`: add Convert to core tool links.
- Modify `src/components/IndexPage.astro`: add Convert to homepage tool links.
- Create `src/pages/convert/index.astro` and `src/pages/[locale]/convert/index.astro`: route files.
- Do not modify `src/components/LongImageComposer.jsx` in the first implementation. Copy the proven PDF approach into `src/lib/pdfConvert.js` for Convert first, then consider deduplication in a later cleanup.

## Task 1: Add Localized Convert Metadata And Navigation

**Files:**
- Create: `src/i18n/en/convert.js`
- Create: `src/i18n/zh-CN/convert.js`
- Create: `src/i18n/ru/convert.js`
- Create: `src/i18n/uk/convert.js`
- Create: `src/i18n/es/convert.js`
- Create: `src/i18n/fr/convert.js`
- Create: `src/i18n/ja/convert.js`
- Create: `src/i18n/vn/convert.js`
- Create: `src/i18n/in/convert.js`
- Modify: `src/i18n/*/index.js`
- Modify: `src/i18n/*/nav.js`

- [ ] **Step 1: Create English convert copy**

Create `src/i18n/en/convert.js`:

```js
export default {
    title: 'Image Converter Online - PNG to WebP, PDF to Images | ShotEasy',
    description: 'Free online image converter for PNG to WebP, JPG to WebP, SVG to PNG, PNG to ICO, images to PDF, and PDF to images. Convert files locally in your browser.',
    keywords: 'image converter online, png to webp, jpg to webp, images to pdf, pdf to images, svg to png, png to ico, local image converter',
    tip: 'Convert images and PDFs locally in your browser. No upload, no signup.',
    localTitle: 'Local image format converter',
    localCont1: 'Choose a conversion mode, add images or PDFs, and convert files in your browser without uploading them to a server.',
    localCont2: 'Use it for PNG to WebP, JPG to WebP, SVG to PNG, PNG to ICO, images to PDF, and PDF pages to images.',
    pdfTitle: 'PDF and image conversion in your browser',
    pdfCont1: 'PDF pages are rendered with pdf.js on your device, and image-to-PDF output is assembled directly in the browser.',
    pdfCont2: 'Large files can take longer because the work happens on your computer rather than a remote conversion queue.',
    supportTitle: 'Supported conversions',
    supportCont1: 'Image modes support common browser-readable formats such as JPG, PNG, WebP, and SVG.',
    supportCont2: 'PDF and ICO modes use dedicated settings so batch jobs stay predictable.',
    tool: {
        addFiles: 'Add Files',
        addFolder: 'Add Folder',
        convertAll: 'Convert All',
        downloadAll: 'Download All',
        clearAll: 'Clear All',
        convert: 'Convert',
        output: 'Output',
        quality: 'Quality',
        pdfScale: 'PDF Scale',
        icoSize: 'ICO Size',
        reset: 'Reset',
        emptyTitle: 'Click or drag images / PDFs to this area',
        emptyHint: 'PNG / JPG / WEBP / SVG / PDF',
        files: 'Files',
        input: 'Input',
        outputSize: 'Output',
        mode: 'Mode',
        skipped: 'Skipped',
        ready: 'Ready',
        converting: 'Converting',
        done: 'Done',
        error: 'Error',
        modes: {
            imageToWebp: 'PNG/JPG to WebP',
            imageToJpg: 'Image to JPG',
            imageToPng: 'Image to PNG',
            imagesToPdf: 'Images to PDF',
            pdfToImages: 'PDF to Images',
            svgToPng: 'SVG to PNG',
            pngToIco: 'PNG to ICO'
        }
    }
};
```

- [ ] **Step 2: Create Chinese convert copy**

Create `src/i18n/zh-CN/convert.js` with this content:

```js
export default {
    title: '在线图片格式转换 - PNG转WebP、PDF转图片 | ShotEasy',
    description: '免费在线图片格式转换工具，支持 PNG转WebP、JPG转WebP、多图片转PDF、PDF转图片、SVG转PNG、PNG转ICO，全部在浏览器本地完成。',
    keywords: '图片格式转换, PNG转WebP, JPG转WebP, 多图片转PDF, PDF转图片, SVG转PNG, PNG转ICO, 在线图片转换, 本地图片转换',
    tip: '图片和 PDF 在浏览器本地转换，无需上传、无需注册。',
    localTitle: '本地图片格式转换',
    localCont1: '先选择转换模式，再添加图片或 PDF，所有处理都在当前浏览器中完成，不会上传到服务器。',
    localCont2: '支持 PNG 转 WebP、JPG 转 WebP、SVG 转 PNG、PNG 转 ICO、多图片转 PDF 和 PDF 页面转图片。',
    pdfTitle: 'PDF 与图片转换都在浏览器中完成',
    pdfCont1: 'PDF 页面使用 pdf.js 在本机渲染，图片转 PDF 也直接在浏览器中生成。',
    pdfCont2: '大文件可能需要更长时间，因为所有转换都运行在你的电脑上，而不是远程排队处理。',
    supportTitle: '支持的转换类型',
    supportCont1: '图片模式支持 JPG、PNG、WebP、SVG 等浏览器可读取格式。',
    supportCont2: 'PDF 和 ICO 模式有独立设置，批量转换时更可控。',
    tool: {
        addFiles: '添加文件',
        addFolder: '添加文件夹',
        convertAll: '全部转换',
        downloadAll: '全部下载',
        clearAll: '清空',
        convert: '转换',
        output: '输出',
        quality: '质量',
        pdfScale: 'PDF 清晰度',
        icoSize: 'ICO 尺寸',
        reset: '重置',
        emptyTitle: '点击或拖放图片 / PDF 到这里',
        emptyHint: 'PNG / JPG / WEBP / SVG / PDF',
        files: '文件',
        input: '输入',
        outputSize: '输出',
        mode: '模式',
        skipped: '跳过',
        ready: '就绪',
        converting: '转换中',
        done: '完成',
        error: '错误',
        modes: {
            imageToWebp: 'PNG/JPG 转 WebP',
            imageToJpg: '图片转 JPG',
            imageToPng: '图片转 PNG',
            imagesToPdf: '多图片转 PDF',
            pdfToImages: 'PDF 转多图片',
            svgToPng: 'SVG 转 PNG',
            pngToIco: 'PNG 转 ICO'
        }
    }
};
```

- [ ] **Step 3: Create other locale convert files**

For `src/i18n/ru/convert.js`, `src/i18n/uk/convert.js`, `src/i18n/es/convert.js`, `src/i18n/fr/convert.js`, `src/i18n/ja/convert.js`, `src/i18n/vn/convert.js`, and `src/i18n/in/convert.js`, import English and override TDK plus the visible `tip`, `localTitle`, and `tool.modes` labels where straightforward. Use this pattern:

```js
import en from '../en/convert';

export default {
    ...en,
    title: 'Image Converter Online - PNG to WebP, PDF to Images | ShotEasy',
    description: 'Free online image converter for PNG to WebP, JPG to WebP, SVG to PNG, PNG to ICO, images to PDF, and PDF to images. Convert files locally in your browser.',
    keywords: 'image converter online, png to webp, jpg to webp, images to pdf, pdf to images, svg to png, png to ico, local image converter',
};
```

For Russian and Ukrainian, include local search terms in `keywords` and translate `tip`:

```js
tip: 'Конвертация изображений и PDF локально в браузере, без загрузки на сервер.',
```

```js
tip: 'Конвертація зображень і PDF локально в браузері, без завантаження на сервер.',
```

- [ ] **Step 4: Wire convert into each locale index**

In every `src/i18n/*/index.js`, add:

```js
import convert from './convert';
```

and include `convert` in the exported object next to `compressor`, `longImage`, and `videoConvert`.

- [ ] **Step 5: Add nav labels**

In every `src/i18n/*/nav.js`, add:

```js
convert: {
    name: 'Convert',
    title: 'Image Convert'
},
```

For Chinese use:

```js
convert: {
    name: '转换',
    title: '图片格式转换',
},
```

- [ ] **Step 6: Run syntax check**

Run: `npm run astro -- check`

Expected: exits `0`. Existing hints from `dist/` or wasm files may remain.

- [ ] **Step 7: Commit**

```bash
git add src/i18n
git commit -m "Add convert page translations"
```

## Task 2: Add Convert Routes And Page Shell

**Files:**
- Create: `src/components/ConvertPage.astro`
- Create: `src/pages/convert/index.astro`
- Create: `src/pages/[locale]/convert/index.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/IndexPage.astro`

- [ ] **Step 1: Create initial Convert tool scaffold**

Create `src/components/ConvertTool.jsx` temporarily:

```jsx
import React from 'react';

export default function ConvertTool({ copy = {} }) {
    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="flex gap-4 p-2 justify-center border-b border-dotted bg-white">
                <button className="rounded border border-slate-200 px-3 py-1.5 text-sm">{copy.addFiles || 'Add Files'}</button>
                <button className="rounded border border-slate-200 px-3 py-1.5 text-sm">{copy.convertAll || 'Convert All'}</button>
            </div>
            <div className="relative min-h-[240px] p-5" style={{
                backgroundImage: 'radial-gradient(circle, rgba(100,116,139,.45) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
            }}>
                <div className="mx-auto flex min-h-[170px] max-w-sm items-center justify-center rounded-md border border-dashed border-slate-300 bg-white text-center text-sm text-slate-500">
                    {copy.emptyTitle || 'Click or drag images / PDFs to this area'}
                </div>
            </div>
        </div>
    );
}
```

- [ ] **Step 2: Create page shell**

Create `src/components/ConvertPage.astro`:

```astro
---
import ConvertTool from '@components/ConvertTool';
import Privacy from '@components/Privacy.astro';
import LocalProcessingBlock from '@components/LocalProcessingBlock.astro';
import { getLang } from '@i18n/index';
const { locale } = Astro.params;
const l = getLang(locale);
const nav = l.nav;
const t = l.convert;
---

<div class="container py-8 relative z-10 flex-1">
    <h1 class="text-4xl text-center leading-[42px] font-bold mb-0.5 bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">{nav.convert.title}</h1>
    <p class="text-slate-600 text-center mb-2">{t.tip}</p>
    <div class="pb-12 min-h-[300px]">
        <ConvertTool client:only="react" copy={t.tool} />
    </div>
    <section class="mb-3 rounded-md p-4 bg-sky-100/40 text-xs [&>p]:mb-1">
        <div class="mb-1 text-sm">🔁</div>
        <h2 class="text-lg font-bold mb-2">{t.localTitle}</h2>
        <p>{t.localCont1}</p>
        <p>{t.localCont2}</p>
    </section>
    <section class="mb-3 rounded-md p-4 bg-pink-100/40 text-xs [&>p]:mb-1">
        <div class="mb-1 text-sm">📄</div>
        <h2 class="text-lg font-bold mb-2">{t.pdfTitle}</h2>
        <p>{t.pdfCont1}</p>
        <p>{t.pdfCont2}</p>
    </section>
    <section class="mb-3 rounded-md p-4 bg-green-100/40 text-xs [&>p]:mb-1">
        <div class="mb-1 text-sm">🧰</div>
        <h2 class="text-lg font-bold mb-2">{t.supportTitle}</h2>
        <p>{t.supportCont1}</p>
        <p>{t.supportCont2}</p>
    </section>
    <LocalProcessingBlock />
    <Privacy />
</div>
<script type="application/ld+json" set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": t.title,
    "description": t.description,
    "operatingSystem": "ALL",
    "applicationCategory": "BrowserApplication",
    "browserRequirements": "requires HTML5 Canvas support",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
})}/>
```

- [ ] **Step 3: Create default route**

Create `src/pages/convert/index.astro`:

```astro
---
import Layout from '@layouts/Layout.astro';
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';
import ConvertPage from '@components/ConvertPage.astro';
import { getLang } from '@i18n/index';
const t = getLang().convert;
---

<Layout title={t.title} description={t.description} keywords={t.keywords}>
    <main class="relative overflow-hidden min-h-screen flex flex-col">
        <Header />
        <ConvertPage />
        <Footer />
    </main>
</Layout>
```

- [ ] **Step 4: Create localized route**

Create `src/pages/[locale]/convert/index.astro`:

```astro
---
import Layout from '@layouts/Layout.astro';
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';
import ConvertPage from '@components/ConvertPage.astro';
import { getLang } from '@i18n/index';
const { locale } = Astro.params;
const t = getLang(locale).convert;
---

<Layout title={t.title} description={t.description} keywords={t.keywords}>
    <main class="relative overflow-hidden min-h-screen flex flex-col">
        <Header />
        <ConvertPage />
        <Footer />
    </main>
</Layout>
```

- [ ] **Step 5: Add header nav**

In `src/components/Header.astro`, insert after the compressor nav item:

```js
{
    pathname: getRelativeLocaleUrl(lang, '/convert'),
    title: nav.convert.title,
    name: nav.convert.name
},
```

- [ ] **Step 6: Add footer and homepage links**

In `src/components/Footer.astro`, add Convert to `coreTools`:

```js
{ href: getRelativeLocaleUrl(lang, '/convert'), title: l.nav.convert.title, label: l.nav.convert.name },
```

In `src/components/IndexPage.astro`, add a link near image compressor:

```astro
<div class="text-center"><a href={getRelativeLocaleUrl(lang, '/convert')} title={l.nav.convert.title}>🔁 {l.nav.convert.title}</a></div>
```

- [ ] **Step 7: Check**

Run: `npm run astro -- check`

Expected: exits `0`.

- [ ] **Step 8: Commit**

```bash
git add src/components/ConvertPage.astro src/components/ConvertTool.jsx src/pages/convert src/pages/[locale]/convert src/components/Header.astro src/components/Footer.astro src/components/IndexPage.astro
git commit -m "Add convert page shell"
```

## Task 3: Implement Browser Conversion Helpers

**Files:**
- Create: `src/lib/imageConvert.js`
- Create: `src/lib/pdfConvert.js`

- [ ] **Step 1: Create image conversion helpers**

Create `src/lib/imageConvert.js`:

```js
export const imageInputTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

export const formatBytes = (bytes) => {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
};

export const extensionForMime = (mime) => {
    if (mime === 'image/jpeg') return 'jpg';
    if (mime === 'image/png') return 'png';
    if (mime === 'image/webp') return 'webp';
    if (mime === 'image/x-icon') return 'ico';
    if (mime === 'application/pdf') return 'pdf';
    return 'bin';
};

export const replaceExtension = (name, ext) => {
    const base = name.replace(/\.[^.]+$/, '');
    return `${base}.${ext}`;
};

export const canvasToBlob = (canvas, type, quality = 0.92) => new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas conversion failed.'));
    }, type, quality);
});

export const loadImageFile = (file) => new Promise((resolve, reject) => {
    const src = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({
        file,
        src,
        image,
        width: image.naturalWidth || image.width,
        height: image.naturalHeight || image.height,
    });
    image.onerror = () => {
        URL.revokeObjectURL(src);
        reject(new Error(`Unable to load ${file.name}`));
    };
    image.src = src;
});

export const drawImageToCanvas = (image, fill = null) => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, image.naturalWidth || image.width);
    canvas.height = Math.max(1, image.naturalHeight || image.height);
    const context = canvas.getContext('2d');
    if (fill) {
        context.fillStyle = fill;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(image, 0, 0);
    return canvas;
};

export const convertImageFile = async (file, mime, quality = 0.92) => {
    const loaded = await loadImageFile(file);
    const fill = mime === 'image/jpeg' ? '#fff' : null;
    const canvas = drawImageToCanvas(loaded.image, fill);
    const blob = await canvasToBlob(canvas, mime, quality);
    return {
        name: replaceExtension(file.name, extensionForMime(mime)),
        blob,
        type: mime,
        size: blob.size,
        width: canvas.width,
        height: canvas.height,
    };
};

export const pngBlobToIcoBlob = async (blob, size = 256) => {
    const file = new File([blob], 'icon.png', { type: 'image/png' });
    const loaded = await loadImageFile(file);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, size, size);
    context.drawImage(loaded.image, 0, 0, size, size);
    URL.revokeObjectURL(loaded.src);
    const pngBlob = await canvasToBlob(canvas, 'image/png');
    const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
    const buffer = new ArrayBuffer(22 + pngBytes.length);
    const view = new DataView(buffer);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1, true);
    view.setUint16(4, 1, true);
    view.setUint8(6, size >= 256 ? 0 : size);
    view.setUint8(7, size >= 256 ? 0 : size);
    view.setUint8(8, 0);
    view.setUint8(9, 0);
    view.setUint16(10, 1, true);
    view.setUint16(12, 32, true);
    view.setUint32(14, pngBytes.length, true);
    view.setUint32(18, 22, true);
    new Uint8Array(buffer, 22).set(pngBytes);
    return new Blob([buffer], { type: 'image/x-icon' });
};
```

- [ ] **Step 2: Create PDF conversion helpers**

Create `src/lib/pdfConvert.js` by extracting the proven PDF pieces from `LongImageComposer.jsx`: `getPdfJs`, `ViteCMapReaderFactory`, `ViteStandardFontDataFactory`, `renderPdfPages(file, { scale, outputType, quality })`, and `createImagesPdfBlob(images)`.

Use this public interface:

```js
export async function renderPdfPages(file, options = {}) {
    // returns [{ name, blob, type, size, width, height, pageNumber }]
}

export async function createImagesPdfBlob(items) {
    // items are loaded image records with image, width, height
    // returns Blob application/pdf
}
```

Keep the same `pdfjs-dist` imports and Vite asset glob strategy already used in `LongImageComposer.jsx`.

- [ ] **Step 3: Run helper import check**

Run: `npm run astro -- check`

Expected: exits `0`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/imageConvert.js src/lib/pdfConvert.js
git commit -m "Add local convert helpers"
```

## Task 4: Implement ConvertTool UI And State

**Files:**
- Modify: `src/components/ConvertTool.jsx`

- [ ] **Step 1: Replace scaffold with full React structure**

Implement `ConvertTool.jsx` with these imports:

```jsx
import React, { useMemo, useState } from 'react';
import { Button, InputNumber, Select, Tooltip, Upload, message } from 'antd';
import JSZip from 'jszip';
import { Icon } from './Icons';
import { UploadDragger } from './UploadDragger';
import { FormatTag } from './FormatTag';
import { getFilesFromEntry, getFilesFromHandle, toDownloadFile } from '@lib/utils';
import { convertImageFile, extensionForMime, formatBytes, imageInputTypes, loadImageFile, pngBlobToIcoBlob, replaceExtension } from '@lib/imageConvert';
import { createImagesPdfBlob, renderPdfPages } from '@lib/pdfConvert';
```

Define the modes:

```js
const modes = [
    { value: 'image-to-webp', labelKey: 'imageToWebp', accept: ['image/png', 'image/jpeg'], output: 'image/webp' },
    { value: 'image-to-jpg', labelKey: 'imageToJpg', accept: imageInputTypes, output: 'image/jpeg' },
    { value: 'image-to-png', labelKey: 'imageToPng', accept: imageInputTypes, output: 'image/png' },
    { value: 'images-to-pdf', labelKey: 'imagesToPdf', accept: imageInputTypes, output: 'application/pdf' },
    { value: 'pdf-to-images', labelKey: 'pdfToImages', accept: ['application/pdf'], output: 'image/png' },
    { value: 'svg-to-png', labelKey: 'svgToPng', accept: ['image/svg+xml'], output: 'image/png' },
    { value: 'png-to-ico', labelKey: 'pngToIco', accept: ['image/png'], output: 'image/x-icon' },
];
```

State shape:

```js
const [items, setItems] = useState([]);
const [mode, setMode] = useState('image-to-webp');
const [quality, setQuality] = useState(92);
const [pdfScale, setPdfScale] = useState(2);
const [icoSize, setIcoSize] = useState(256);
const [loading, setLoading] = useState(false);
```

- [ ] **Step 2: Implement file intake**

Add files from `Upload`, drag/drop, and folder picker. Sort by filename numeric order and keep unsupported files out with an Ant message warning.

Each item must include:

```js
{
    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
    file,
    name: file.name,
    type: file.type || 'application/octet-stream',
    size: file.size,
    status: 'ready',
    outputs: [],
}
```

For image files, load preview metadata with `loadImageFile(file)` and add `src`, `image`, `width`, `height`.

- [ ] **Step 3: Implement mode-specific conversion**

Implement `convertItem(item, activeMode)`:

- `image-to-webp`: output WebP via `convertImageFile(item.file, 'image/webp', quality / 100)`.
- `image-to-jpg`: output JPG via `convertImageFile(item.file, 'image/jpeg', quality / 100)`.
- `image-to-png`: output PNG via `convertImageFile(item.file, 'image/png')`.
- `svg-to-png`: same as image-to-png but only accepts SVG.
- `png-to-ico`: convert PNG to ICO via `pngBlobToIcoBlob(item.file, icoSize)` and name with `.ico`.
- `pdf-to-images`: return all page outputs from `renderPdfPages(item.file, { scale: pdfScale, outputType: 'image/png' })`.
- `images-to-pdf`: handled once for all compatible images, not per item.

Set incompatible items to:

```js
{ ...item, status: 'skipped', skipReason: 'This file type is not supported by the selected mode.', outputs: [] }
```

- [ ] **Step 4: Implement images-to-pdf batch conversion**

For `images-to-pdf`, filter compatible image items, load any missing `image` data, pass them to `createImagesPdfBlob`, and attach the single PDF output to a synthetic result state or to the first compatible item. Name it `shoteasy-images.pdf`.

The UI must make the PDF downloadable even though it represents multiple inputs.

- [ ] **Step 5: Implement downloads**

Single output:

```js
toDownloadFile(output.url, output.name);
```

Download all:

```js
const zip = new JSZip();
outputs.forEach((output) => zip.file(output.name, output.blob));
const blob = await zip.generateAsync({ type: 'blob' });
toDownloadFile(URL.createObjectURL(blob), 'shoteasy-converted-files.zip');
```

- [ ] **Step 6: Implement UI matching existing tool pages**

The component must include:

- top white toolbar with Add Files, Add Folder, Convert All, Download All, Clear All
- dotted settings row with Convert select and conditional controls
- dotted workspace background
- centered upload empty state using `UploadDragger`
- white file list card
- black summary bar with count, input size, output size, mode
- rows with thumbnail, `FormatTag`, dimensions/page output count, status, and download button

- [ ] **Step 7: Check missing alt**

Run:

```bash
rg "<img\\b(?![^>]*\\balt=)" src -n --pcre2
```

Expected: no output.

- [ ] **Step 8: Astro check**

Run: `npm run astro -- check`

Expected: exits `0`.

- [ ] **Step 9: Commit**

```bash
git add src/components/ConvertTool.jsx
git commit -m "Build local convert tool"
```

## Task 5: Verify Workflows In Browser

**Files:**
- Modify only if verification finds bugs.

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

Expected: local Astro server URL is printed.

- [ ] **Step 2: Open `/convert`**

Verify:

- Page H1 and subtitle render.
- Empty state appears centered.
- Toolbar matches Image Compressor style.
- Settings row does not wrap badly on desktop.

- [ ] **Step 3: Test core workflows**

Use small local sample files:

- PNG to WebP: add a PNG, convert, download WebP.
- JPG to WebP: add a JPG, convert, download WebP.
- SVG to PNG: add a simple SVG, convert, download PNG.
- PNG to ICO: add a PNG, convert, download ICO.
- Images to PDF: add two images, convert, download PDF.
- PDF to Images: add a simple PDF, convert, download page PNG outputs.

- [ ] **Step 4: Test responsive layout**

Open mobile viewport around `390x844`. Verify:

- nav remains usable
- toolbar wraps without overlap
- file rows remain readable
- buttons do not clip text

- [ ] **Step 5: Run final checks**

Run:

```bash
npm run astro -- check
rg "<img\\b(?![^>]*\\balt=)" src -n --pcre2
```

Expected:

- `astro check` exits `0`
- alt scan has no output

- [ ] **Step 6: Commit final fixes**

```bash
git add src
git commit -m "Verify convert workflows"
```
