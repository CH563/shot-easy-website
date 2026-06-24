import React, { useMemo, useState } from 'react';
import { Button, InputNumber, Radio, Select, Upload, Tooltip, message } from 'antd';
import { Icon } from './Icons';
import { UploadDragger } from './UploadDragger';
import { FormatTag } from './FormatTag';
import { formatSize, getFilesFromEntry, getFilesFromHandle, toDownloadFile } from '@lib/utils';

const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];
const inputTypes = [...imageTypes, 'application/pdf'];
const outputOptions = [
    { value: 'jpg', label: 'JPG' },
    { value: 'png', label: 'PNG' },
    { value: 'pdf', label: 'PDF' },
];
const pdfCMapUrls = import.meta.glob('/node_modules/pdfjs-dist/cmaps/*.bcmap', { query: '?url', import: 'default', eager: true });
const pdfStandardFontUrls = import.meta.glob('/node_modules/pdfjs-dist/standard_fonts/*.{pfb,ttf}', { query: '?url', import: 'default', eager: true });
const dotBackground = {
    backgroundImage: 'radial-gradient(circle, rgba(100,116,139,.45) 1px, transparent 1px)',
    backgroundSize: '16px 16px',
};

const getFormatLabel = (type) => {
    if (!type) return 'IMG';
    if (type === 'image/jpeg') return 'JPG';
    if (type === 'image/svg+xml') return 'SVG';
    return type.replace('image/', '').toUpperCase();
};

const loadImage = (file) => new Promise((resolve, reject) => {
    const src = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({ image, src });
    image.onerror = () => {
        URL.revokeObjectURL(src);
        reject(new Error(`Can not load ${file.name}`));
    };
    image.src = src;
});

const canvasToBlob = (canvas, type, quality = 0.92) => new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
});

const getPdfJs = async () => {
    const [pdfjsLib, worker] = await Promise.all([
        import('pdfjs-dist'),
        import('pdfjs-dist/build/pdf.worker.mjs?url'),
    ]);
    pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
    return pdfjsLib;
};

class ViteCMapReaderFactory {
    constructor({ isCompressed = true } = {}) {
        this.isCompressed = isCompressed;
    }

    async fetch({ name }) {
        const url = pdfCMapUrls[`/node_modules/pdfjs-dist/cmaps/${name}.bcmap`];
        if (!url) throw new Error(`Unable to load PDF CMap: ${name}`);
        const data = await fetch(url).then((response) => response.arrayBuffer());
        return { cMapData: new Uint8Array(data), isCompressed: this.isCompressed };
    }
}

class ViteStandardFontDataFactory {
    async fetch({ filename }) {
        const url = pdfStandardFontUrls[`/node_modules/pdfjs-dist/standard_fonts/${filename}`];
        if (!url) throw new Error(`Unable to load PDF standard font: ${filename}`);
        const data = await fetch(url).then((response) => response.arrayBuffer());
        return new Uint8Array(data);
    }
}

const canvasToImageItem = async (canvas, name, sourceFile) => {
    const blob = await canvasToBlob(canvas, 'image/png');
    const file = new File([blob], name, { type: 'image/png', lastModified: sourceFile.lastModified });
    const { image, src } = await loadImage(file);
    return {
        id: `${sourceFile.name}-${name}-${sourceFile.size}-${Math.random()}`,
        name,
        size: file.size,
        type: file.type,
        src,
        image,
        width: image.naturalWidth,
        height: image.naturalHeight,
    };
};

const renderPdfPages = async (file) => {
    const pdfjsLib = await getPdfJs();
    const data = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({
        data,
        cMapPacked: true,
        CMapReaderFactory: ViteCMapReaderFactory,
        StandardFontDataFactory: ViteStandardFontDataFactory,
        useWorkerFetch: false,
        enableXfa: true,
    }).promise;
    const items = [];
    const name = file.name.replace(/\.pdf$/i, '');
    const pageNumberLength = String(pdf.numPages).length;
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        const context = canvas.getContext('2d');
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({
            canvasContext: context,
            viewport,
            background: 'white',
        }).promise;
        const pageLabel = String(pageNumber).padStart(pageNumberLength, '0');
        items.push(await canvasToImageItem(canvas, `${name}-page-${pageLabel}.png`, file));
    }
    await pdf.destroy();
    return items;
};

const textBytes = (value) => new TextEncoder().encode(value);

const createPdfBlob = async (canvas) => {
    const imageCanvas = document.createElement('canvas');
    imageCanvas.width = canvas.width;
    imageCanvas.height = canvas.height;
    const imageCtx = imageCanvas.getContext('2d');
    imageCtx.fillStyle = '#fff';
    imageCtx.fillRect(0, 0, imageCanvas.width, imageCanvas.height);
    imageCtx.drawImage(canvas, 0, 0);
    const jpegBlob = await canvasToBlob(imageCanvas, 'image/jpeg', 0.92);
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
    const content = `q\n${canvas.width} 0 0 ${canvas.height} 0 0 cm\n/Im0 Do\nQ\n`;
    const parts = [];
    const offsets = [0];
    let length = 0;
    const pushText = (value) => {
        const bytes = textBytes(value);
        parts.push(bytes);
        length += bytes.length;
    };
    const pushBytes = (bytes) => {
        parts.push(bytes);
        length += bytes.length;
    };
    const addObject = (body) => {
        offsets.push(length);
        pushText(`${offsets.length - 1} 0 obj\n${body}\nendobj\n`);
    };

    pushText('%PDF-1.4\n');
    addObject('<< /Type /Catalog /Pages 2 0 R >>');
    addObject('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${canvas.width} ${canvas.height}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
    offsets.push(length);
    pushText(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
    pushBytes(jpegBytes);
    pushText('\nendstream\nendobj\n');
    addObject(`<< /Length ${content.length} >>\nstream\n${content}endstream`);

    const xrefOffset = length;
    pushText(`xref\n0 ${offsets.length}\n0000000000 65535 f \n`);
    for (let i = 1; i < offsets.length; i += 1) {
        pushText(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
    }
    pushText(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

    return new Blob(parts, { type: 'application/pdf' });
};

const getSortedInputFiles = (files) => {
    return Array.from(files)
        .filter((file) => inputTypes.includes(file.type))
        .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
};

const getLayout = (items, option) => {
    if (!items.length) return null;
    const first = items[0];
    const baseSize = option.direction === 'vertical' ? first.width : first.height;
    const targetSize = option.sizeMode === 'percent'
        ? Math.max(1, Math.round(baseSize * option.sizeValue / 100))
        : Math.max(1, Math.round(option.sizeValue));
    const margin = Math.max(0, option.margin);
    const gap = option.gap;
    let cursor = margin;
    let maxCross = 0;
    const placements = items.map((item) => {
        const scale = option.direction === 'vertical' ? targetSize / item.width : targetSize / item.height;
        const width = Math.max(1, Math.round(item.width * scale));
        const height = Math.max(1, Math.round(item.height * scale));
        const placement = option.direction === 'vertical'
            ? { item, x: margin, y: cursor, width, height }
            : { item, x: cursor, y: margin, width, height };
        cursor += (option.direction === 'vertical' ? height : width) + gap;
        maxCross = Math.max(maxCross, option.direction === 'vertical' ? width : height);
        return placement;
    });
    const last = placements[placements.length - 1];
    const contentEnd = option.direction === 'vertical' ? last.y + last.height : last.x + last.width;
    return {
        width: option.direction === 'vertical' ? maxCross + margin * 2 : contentEnd + margin,
        height: option.direction === 'vertical' ? contentEnd + margin : maxCross + margin * 2,
        placements,
    };
};

const LongImageComposer = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [option, setOption] = useState({
        direction: 'vertical',
        sizeMode: 'percent',
        sizeValue: 100,
        margin: 20,
        gap: 20,
        format: 'jpg',
    });

    const layout = useMemo(() => getLayout(items, option), [items, option]);
    const sizeLabel = option.direction === 'vertical' ? 'Output Width' : 'Output Height';
    const sizeUnit = option.sizeMode === 'percent' ? '%' : 'px';
    const estimatedSize = layout ? `${Math.round(layout.width)}*${Math.round(layout.height)} px` : '-';
    const supportsDirectoryPicker = typeof window !== 'undefined' && !!window.showDirectoryPicker;

    const updateOption = (key, value) => {
        setResult(null);
        setOption((prev) => ({ ...prev, [key]: value }));
    };

    const addFiles = async (files) => {
        const inputFiles = getSortedInputFiles(files);
        if (!inputFiles.length) {
            messageApi.warning('Please select image or PDF files.');
            return;
        }
        setLoading(true);
        try {
            const loaded = [];
            for (const file of inputFiles) {
                if (file.type === 'application/pdf') {
                    loaded.push(...await renderPdfPages(file));
                    continue;
                }
                const { image, src } = await loadImage(file);
                loaded.push({
                    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    src,
                    image,
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                });
            }
            setItems((prev) => [...prev, ...loaded]);
            setResult(null);
        } catch (error) {
            messageApi.error(error.message || 'Image load failed.');
        } finally {
            setLoading(false);
        }
    };

    const beforeUpload = async (file) => {
        await addFiles([file]);
        return Promise.reject();
    };

    const addFolder = async () => {
        if (!window.showDirectoryPicker) return;
        const handle = await window.showDirectoryPicker();
        const files = await getFilesFromHandle(handle, inputTypes);
        await addFiles(files);
    };

    const onDrop = async (event) => {
        event.preventDefault();
        const files = [];
        if (event.dataTransfer?.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
                const item = event.dataTransfer.items[i];
                if (typeof item.getAsFileSystemHandle === 'function') {
                    const handle = await item.getAsFileSystemHandle();
                    const result = await getFilesFromHandle(handle, inputTypes);
                    files.push(...result);
                    continue;
                }
                if (typeof item.webkitGetAsEntry === 'function') {
                    const entry = item.webkitGetAsEntry();
                    if (entry) {
                        const result = await getFilesFromEntry(entry, inputTypes);
                        files.push(...result);
                        continue;
                    }
                }
                const file = item.getAsFile?.();
                if (file) files.push(file);
            }
        } else if (event.dataTransfer?.files) {
            files.push(...event.dataTransfer.files);
        }
        await addFiles(files);
    };

    const compose = async () => {
        if (!layout || !items.length) {
            messageApi.warning('Please add images first.');
            return;
        }
        if (layout.width > 32767 || layout.height > 32767) {
            messageApi.error('The output is too large for browser canvas. Please lower the output size.');
            return;
        }
        setLoading(true);
        try {
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(layout.width));
            canvas.height = Math.max(1, Math.round(layout.height));
            const ctx = canvas.getContext('2d');
            if (option.format === 'jpg' || option.format === 'pdf') {
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            for (const placement of layout.placements) {
                ctx.drawImage(placement.item.image, placement.x, placement.y, placement.width, placement.height);
            }
            const blob = option.format === 'pdf'
                ? await createPdfBlob(canvas)
                : await canvasToBlob(canvas, option.format === 'png' ? 'image/png' : 'image/jpeg', 0.92);
            const url = URL.createObjectURL(blob);
            setResult({ url, blob, width: canvas.width, height: canvas.height, format: option.format });
            messageApi.success('Compose Success!');
        } catch (error) {
            messageApi.error(error.message || 'Compose failed.');
        } finally {
            setLoading(false);
        }
    };

    const download = () => {
        if (!result) return;
        toDownloadFile(result.url, `shoteasy-long-image.${result.format}`);
        messageApi.success('Download Success!');
    };

    const clearAll = () => {
        items.forEach((item) => URL.revokeObjectURL(item.src));
        if (result?.url) URL.revokeObjectURL(result.url);
        setItems([]);
        setResult(null);
    };

    const moveItem = (index, offset) => {
        const nextIndex = index + offset;
        if (nextIndex < 0 || nextIndex >= items.length) return;
        const next = [...items];
        const [item] = next.splice(index, 1);
        next.splice(nextIndex, 0, item);
        setItems(next);
        setResult(null);
    };

    const removeItem = (index) => {
        const next = [...items];
        const [item] = next.splice(index, 1);
        URL.revokeObjectURL(item.src);
        setItems(next);
        setResult(null);
    };

    let listComponent = (
        <div className="flex w-full justify-center py-4">
            <UploadDragger
                beforeUpload={beforeUpload}
                multiple={true}
                onDrop={onDrop}
                customRequest={(e) => console.log('upload', e)}
                accept={inputTypes.join(',')}
                desc={'JPG / JPEG / PNG / WEBP / GIF / BMP / SVG / PDF'}
            />
        </div>
    );

    if (items.length) {
        listComponent = (
            <div className="w-full bg-white shadow-md rounded-md overflow-hidden">
                <div className="bg-gray-800 py-1 px-3 text-white text-sm flex flex-wrap items-center gap-x-5 gap-y-1">
                    <span className="flex items-center gap-2 text-slate-400">
                        <span className="inline-flex w-3.5 h-3.5 rounded-full border-[3px] border-green-500"></span>
                        <span><span className="font-semibold text-green-500">{items.length}</span> / {items.length}</span>
                    </span>
                    <span className="text-slate-400">Images:<span className="text-white ml-1">{items.length}</span></span>
                    <span className="text-slate-400">Estimated:<span className="text-green-400 ml-1 font-semibold">{estimatedSize}</span></span>
                </div>
                <div className="p-4 grid gap-6">
                    {items.map((item, index) => (
                        <div key={item.id} className="flex items-center justify-between pb-5 relative after:block after:absolute after:bottom-0 after:left-16 after:right-0 after:h-[1px] after:bg-slate-200">
                            <div className="flex items-center min-w-0 max-w-[62%]">
                                <img src={item.src} className="w-12 h-12 mr-4 rounded-md object-cover flex-shrink-0 bg-slate-100" />
                                <div className="min-w-0">
                                    <div className="font-semibold mb-1.5 truncate">{item.name}</div>
                                    <div className="text-xs flex gap-1 text-slate-500">
                                        <span><FormatTag type={getFormatLabel(item.type)} /></span>
                                        <span>{item.width}*{item.height}</span>
                                        <span>{formatSize(item.size)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Tooltip title="Move up">
                                    <Button type="text" icon={<Icon name="ArrowUp" />} disabled={index === 0} onClick={() => moveItem(index, -1)} />
                                </Tooltip>
                                <Tooltip title="Move down">
                                    <Button type="text" icon={<Icon name="ArrowDown" />} disabled={index === items.length - 1} onClick={() => moveItem(index, 1)} />
                                </Tooltip>
                                <Tooltip title="Remove">
                                    <Button type="text" icon={<Icon name="X" />} onClick={() => removeItem(index)} />
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            {contextHolder}
            <div className="bg-white shadow-md rounded-md overflow-hidden">
                <div className="flex gap-4 p-2 justify-center flex-col-reverse md:flex-row md:justify-between">
                    <div className="flex gap-3 items-center justify-center flex-wrap">
                        <Upload name="file" multiple={true} beforeUpload={beforeUpload} showUploadList={false} accept={inputTypes.join(',')}>
                            <Button disabled={loading} icon={<Icon name="ImagePlus" />}>Add Images / PDF</Button>
                        </Upload>
                        {supportsDirectoryPicker && <Button disabled={loading} icon={<Icon name="FolderPlus" />} onClick={addFolder}>Add Folder</Button>}
                    </div>
                    {items.length > 0 &&
                        <div className="flex gap-3 items-center justify-center">
                            <Tooltip placement="top" title="Compose">
                                <Button
                                    type="primary"
                                    className="bg-black"
                                    loading={loading}
                                    icon={<Icon name="Combine" />}
                                    onClick={compose}
                                >Compose</Button>
                            </Tooltip>
                            <Tooltip placement="top" title={result ? "Download composed image" : "Compose first"}>
                                <Button
                                    type="primary"
                                    className="bg-black"
                                    disabled={!result}
                                    icon={<Icon name="Download" />}
                                    onClick={download}
                                >Download</Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Clear all">
                                <Button type="text" icon={<Icon name="Eraser" />} onClick={clearAll}></Button>
                            </Tooltip>
                        </div>
                    }
                </div>
                <div className="py-1 px-2 flex items-center gap-4 border-t border-dotted bg-slate-50 text-xs select-none flex-wrap">
                    <div className="flex gap-2 items-center">
                        <label className="font-semibold">Direction:</label>
                        <Radio.Group
                            size="small"
                            value={option.direction}
                            onChange={(event) => updateOption('direction', event.target.value)}
                            optionType="button"
                            buttonStyle="solid"
                            options={[
                                { label: 'Vertical', value: 'vertical' },
                                { label: 'Horizontal', value: 'horizontal' },
                            ]}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="font-semibold">{sizeLabel}:</label>
                        <Select
                            className="w-28"
                            size="small"
                            value={option.sizeMode}
                            onChange={(value) => {
                                setResult(null);
                                setOption((prev) => ({ ...prev, sizeMode: value, sizeValue: value === 'percent' ? 100 : 1000 }));
                            }}
                            options={[
                                { value: 'percent', label: 'Relative' },
                                { value: 'pixel', label: 'Pixel' },
                            ]}
                        />
                        <InputNumber className="w-32" size="small" min={1} value={option.sizeValue} addonAfter={sizeUnit} onChange={(value) => updateOption('sizeValue', value || 1)} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="font-semibold">Margin:</label>
                        <InputNumber className="w-28" size="small" min={0} value={option.margin} addonAfter="px" onChange={(value) => updateOption('margin', value || 0)} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="font-semibold">Gap:</label>
                        <InputNumber className="w-28" size="small" value={option.gap} addonAfter="px" onChange={(value) => updateOption('gap', value || 0)} />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label className="font-semibold">Format:</label>
                        <Select className="w-24" size="small" value={option.format} options={outputOptions} onChange={(value) => updateOption('format', value)} />
                    </div>
                    <div className="flex-1 text-right">
                        <Button
                            size="small"
                            type="link"
                            onClick={() => {
                                setResult(null);
                                setOption({
                                    direction: 'vertical',
                                    sizeMode: 'percent',
                                    sizeValue: 100,
                                    margin: 20,
                                    gap: 20,
                                    format: 'jpg',
                                });
                            }}
                        >Reset</Button>
                    </div>
                </div>
                <div className="relative min-h-[240px] p-5" style={dotBackground}>
                    <div className="flex w-full justify-center z-10">
                        {listComponent}
                    </div>
                    {result && (
                        <div className="mt-4 mx-auto max-w-3xl rounded-md bg-white shadow-md p-4">
                            <div className="flex items-center justify-between mb-3 text-sm">
                                <span className="font-semibold">Preview</span>
                                <span className="text-xs text-slate-500">{result.width}*{result.height} px · {formatSize(result.blob.size)}</span>
                            </div>
                            {result.format === 'pdf'
                                ? <iframe title="PDF Preview" src={result.url} className="w-full h-[520px] rounded border" />
                                : <img src={result.url} className="block max-w-full max-h-[620px] mx-auto rounded border object-contain" />
                            }
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LongImageComposer;
