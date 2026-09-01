import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, InputNumber, Select, Tooltip, message } from 'antd';
import { Icon } from './Icons';
import { formatSize, getFilesFromEntry, getFilesFromHandle, toDownloadFile } from '@lib/utils';

const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];
const accept = imageTypes.join(',');
const MAX_CANVAS_SIDE = 32767;
const MAX_CANVAS_PIXELS = 80_000_000;
const darkToolbarButtonStyle = {
    color: '#f8fafc',
    background: '#1e293b',
    borderColor: '#475569',
};

const copy = {
    en: {
        addImages: 'Add images',
        addFolder: 'Add folder',
        pasteImages: 'Paste image',
        pasteShortcut: 'Paste with Ctrl/⌘ + V',
        pasteEmpty: 'No image found in the clipboard.',
        pastePermission: 'Press Ctrl/⌘ + V to paste an image here.',
        clear: 'Clear all',
        download: 'Generate & download long image',
        downloading: 'Generating long image',
        dropTitle: 'Upload multiple images to make one long image',
        dropDescription: 'Select images or a folder, paste, or drop at least 2 images. They will be stitched vertically in order.',
        chooseImages: 'Choose images',
        local: 'Images are processed locally and never uploaded',
        sequence: 'Image order',
        sequenceHint: 'Use the arrows to adjust the stitching order',
        preview: 'Long image preview',
        previewHint: 'The images below will be exported as one image',
        images: 'images',
        oneLongImage: '1 long image',
        outputWidth: 'Output width',
        gap: 'Image gap',
        margin: 'Outer margin',
        format: 'Format',
        background: 'Background',
        white: 'White',
        transparent: 'Transparent',
        moveUp: 'Move up',
        moveDown: 'Move down',
        remove: 'Remove',
        addAtLeastTwo: 'Please add at least 2 images.',
        unsupported: 'Please select supported image files.',
        loadFailed: 'Some images could not be loaded.',
        tooLarge: 'The long image is too large for the browser. Reduce the output width or the number of images.',
        success: 'Long image generated and downloaded.',
        failed: 'Could not generate the long image.',
        dimensions: 'Estimated size',
    },
    zh: {
        addImages: '添加图片',
        addFolder: '选择文件夹',
        pasteImages: '粘贴图片',
        pasteShortcut: '支持 Ctrl/⌘ + V 粘贴',
        pasteEmpty: '剪贴板中没有可用的图片。',
        pastePermission: '请按 Ctrl/⌘ + V 将剪贴板图片粘贴到这里。',
        clear: '清空全部',
        download: '生成并下载长图',
        downloading: '正在生成长图',
        dropTitle: '上传多张图片，合并成一张长图',
        dropDescription: '可选择图片、选择文件夹、粘贴或拖入至少 2 张图片，并按顺序从上到下无缝拼接。',
        chooseImages: '选择多张图片',
        local: '图片仅在浏览器本地处理，不会上传',
        sequence: '图片顺序',
        sequenceHint: '使用箭头调整长图中的先后顺序',
        preview: '长图预览',
        previewHint: '下方所有图片会导出为一张图片',
        images: '张图片',
        oneLongImage: '1 张长图',
        outputWidth: '长图宽度',
        gap: '图片间距',
        margin: '四周留白',
        format: '导出格式',
        background: '背景',
        white: '白色',
        transparent: '透明',
        moveUp: '上移',
        moveDown: '下移',
        remove: '移除',
        addAtLeastTwo: '请至少添加 2 张图片。',
        unsupported: '请选择支持的图片文件。',
        loadFailed: '部分图片读取失败，请重试。',
        tooLarge: '长图尺寸超出浏览器限制，请减小长图宽度或减少图片数量。',
        success: '长图已生成并开始下载。',
        failed: '长图生成失败，请重试。',
        dimensions: '预计尺寸',
    },
};

const getText = (locale) => locale === 'zh-CN' ? copy.zh : copy.en;

const isImageFile = (file) => {
    if (imageTypes.includes(file.type)) return true;
    return /\.(jpe?g|png|webp|gif|bmp|svg)$/i.test(file.name || '');
};

const loadImage = (file) => new Promise((resolve, reject) => {
    const src = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve({
        id: `${file.name}-${file.size}-${file.lastModified}-${globalThis.crypto?.randomUUID?.() || Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        src,
        image,
        width: image.naturalWidth,
        height: image.naturalHeight,
    });
    image.onerror = () => {
        URL.revokeObjectURL(src);
        reject(new Error(`Could not load ${file.name}`));
    };
    image.src = src;
});

const canvasToBlob = (canvas, type, quality) => new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas export failed'));
    }, type, quality);
});

const getLayout = (items, option) => {
    if (!items.length || !option.outputWidth) return null;
    const contentWidth = Math.max(1, Math.round(option.outputWidth));
    const margin = Math.max(0, Math.round(option.margin));
    const gap = Math.max(0, Math.round(option.gap));
    let y = margin;
    const placements = items.map((item) => {
        const height = Math.max(1, Math.round(item.height * contentWidth / item.width));
        const placement = { item, x: margin, y, width: contentWidth, height };
        y += height + gap;
        return placement;
    });
    return {
        width: contentWidth + margin * 2,
        height: y - gap + margin,
        placements,
    };
};

const LongImageComposer = ({ locale = 'en' }) => {
    const t = getText(locale);
    const [messageApi, contextHolder] = message.useMessage();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [option, setOption] = useState({
        outputWidth: null,
        gap: 0,
        margin: 0,
        format: 'png',
        background: 'white',
    });
    const fileInputRef = useRef(null);
    const folderInputRef = useRef(null);
    const addFilesRef = useRef(null);
    const objectUrlsRef = useRef(new Set());
    const layout = useMemo(() => getLayout(items, option), [items, option]);

    useEffect(() => () => {
        objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        objectUrlsRef.current.clear();
    }, []);

    const updateOption = (key, value) => {
        setOption((previous) => ({ ...previous, [key]: value }));
    };

    const addFiles = async (fileList) => {
        const files = Array.from(fileList).filter(isImageFile);
        if (!files.length) {
            messageApi.warning(t.unsupported);
            return;
        }

        setLoading(true);
        try {
            const settled = await Promise.allSettled(files.map(loadImage));
            const loaded = settled
                .filter((result) => result.status === 'fulfilled')
                .map((result) => result.value);

            loaded.forEach((item) => objectUrlsRef.current.add(item.src));
            if (loaded.length) {
                setItems((previous) => {
                    if (!previous.length) {
                        setOption((current) => ({ ...current, outputWidth: loaded[0].width }));
                    }
                    return [...previous, ...loaded];
                });
            }
            if (loaded.length !== files.length) messageApi.warning(t.loadFailed);
        } finally {
            setLoading(false);
        }
    };

    addFilesRef.current = addFiles;

    useEffect(() => {
        const handlePaste = (event) => {
            const pastedFiles = Array.from(event.clipboardData?.files || []).filter(isImageFile);
            if (!pastedFiles.length) return;
            event.preventDefault();
            addFilesRef.current?.(pastedFiles);
        };
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, []);

    const pasteFromClipboard = async () => {
        if (!navigator.clipboard?.read) {
            messageApi.info(t.pastePermission);
            return;
        }
        try {
            const clipboardItems = await navigator.clipboard.read();
            const files = [];
            for (const clipboardItem of clipboardItems) {
                const type = clipboardItem.types.find((itemType) => itemType.startsWith('image/'));
                if (!type) continue;
                const blob = await clipboardItem.getType(type);
                const extension = type.split('/')[1]?.replace('jpeg', 'jpg') || 'png';
                files.push(new File(
                    [blob],
                    `pasted-image-${Date.now()}-${files.length + 1}.${extension}`,
                    { type, lastModified: Date.now() },
                ));
            }
            if (!files.length) {
                messageApi.warning(t.pasteEmpty);
                return;
            }
            await addFiles(files);
        } catch (error) {
            if (error?.name === 'NotAllowedError') messageApi.info(t.pastePermission);
            else messageApi.error(t.loadFailed);
        }
    };

    const collectDroppedFiles = async (event) => {
        const files = [];
        const transferItems = Array.from(event.dataTransfer?.items || []);

        if (transferItems.length) {
            for (const item of transferItems) {
                if (typeof item.getAsFileSystemHandle === 'function') {
                    const handle = await item.getAsFileSystemHandle();
                    if (handle) files.push(...await getFilesFromHandle(handle, imageTypes));
                    continue;
                }
                if (typeof item.webkitGetAsEntry === 'function') {
                    const entry = item.webkitGetAsEntry();
                    if (entry) files.push(...await getFilesFromEntry(entry, imageTypes));
                    continue;
                }
                const file = item.getAsFile?.();
                if (file) files.push(file);
            }
        } else {
            files.push(...Array.from(event.dataTransfer?.files || []));
        }
        return files;
    };

    const onDrop = async (event) => {
        event.preventDefault();
        setDragging(false);
        await addFiles(await collectDroppedFiles(event));
    };

    const addFolder = () => folderInputRef.current?.click();

    const moveItem = (index, offset) => {
        const target = index + offset;
        if (target < 0 || target >= items.length) return;
        setItems((previous) => {
            const next = [...previous];
            const [item] = next.splice(index, 1);
            next.splice(target, 0, item);
            return next;
        });
    };

    const removeItem = (index) => {
        setItems((previous) => {
            const next = [...previous];
            const [removed] = next.splice(index, 1);
            if (removed) {
                URL.revokeObjectURL(removed.src);
                objectUrlsRef.current.delete(removed.src);
            }
            if (!next.length) setOption((current) => ({ ...current, outputWidth: null }));
            return next;
        });
    };

    const clearAll = () => {
        objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        objectUrlsRef.current.clear();
        setItems([]);
        setOption({ outputWidth: null, gap: 0, margin: 0, format: 'png', background: 'white' });
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (folderInputRef.current) folderInputRef.current.value = '';
    };

    const generateAndDownload = async () => {
        if (items.length < 2 || !layout) {
            messageApi.warning(t.addAtLeastTwo);
            return;
        }
        if (
            layout.width > MAX_CANVAS_SIDE
            || layout.height > MAX_CANVAS_SIDE
            || layout.width * layout.height > MAX_CANVAS_PIXELS
        ) {
            messageApi.error(t.tooLarge);
            return;
        }

        setLoading(true);
        try {
            const canvas = document.createElement('canvas');
            canvas.width = layout.width;
            canvas.height = layout.height;
            const context = canvas.getContext('2d');
            if (!context) throw new Error('Canvas is not available');

            const hasTransparentBackground = option.format === 'png' && option.background === 'transparent';
            if (!hasTransparentBackground) {
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            layout.placements.forEach((placement) => {
                context.drawImage(
                    placement.item.image,
                    placement.x,
                    placement.y,
                    placement.width,
                    placement.height,
                );
            });

            const mimeType = option.format === 'jpg' ? 'image/jpeg' : 'image/png';
            const blob = await canvasToBlob(canvas, mimeType, 0.94);
            const url = URL.createObjectURL(blob);
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
            toDownloadFile(url, `shoteasy-long-image-${timestamp}.${option.format}`);
            window.setTimeout(() => URL.revokeObjectURL(url), 1500);
            messageApi.success(t.success);
        } catch (error) {
            messageApi.error(error?.message || t.failed);
        } finally {
            setLoading(false);
        }
    };

    const uploadPanel = (
        <div
            className={`group relative mx-auto flex min-h-[310px] w-full max-w-3xl cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-all ${dragging ? 'border-blue-500 bg-blue-50 shadow-[0_24px_80px_rgba(37,99,235,.16)]' : 'border-slate-300 bg-white/80 hover:border-blue-400 hover:bg-white'}`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false);
            }}
            onDrop={onDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') fileInputRef.current?.click();
            }}
        >
            <div className="absolute inset-x-10 top-8 h-24 rounded-full bg-gradient-to-r from-cyan-200/40 via-blue-200/50 to-indigo-200/40 blur-3xl" />
            <div className="relative mb-6 flex items-end gap-2" aria-hidden="true">
                <div className="h-16 w-11 -rotate-6 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
                    <div className="h-full rounded bg-gradient-to-b from-amber-200 to-orange-300" />
                </div>
                <div className="z-10 h-20 w-14 rounded-lg border border-blue-100 bg-white p-1.5 shadow-xl">
                    <div className="h-full rounded bg-gradient-to-b from-sky-300 to-blue-600" />
                </div>
                <div className="h-16 w-11 rotate-6 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
                    <div className="h-full rounded bg-gradient-to-b from-emerald-200 to-teal-500" />
                </div>
                <Icon name="ArrowDown" className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 p-1.5 text-lg text-white shadow-lg" />
            </div>
            <h2 className="relative text-xl font-bold tracking-tight text-slate-900 md:text-2xl">{t.dropTitle}</h2>
            <p className="relative mt-2 max-w-xl text-sm leading-6 text-slate-500">{t.dropDescription}</p>
            <Button type="primary" size="large" loading={loading} className="relative mt-6 h-11 rounded-xl bg-slate-900 px-6 shadow-lg" icon={<Icon name="ImagePlus" />}>
                {t.chooseImages}
            </Button>
            <div className="relative mt-3 flex flex-wrap items-center justify-center gap-2">
                <Button
                    className="rounded-xl border-slate-300 bg-white text-slate-700"
                    disabled={loading}
                    icon={<Icon name="FolderPlus" />}
                    onClick={(event) => { event.stopPropagation(); addFolder(); }}
                >
                    {t.addFolder}
                </Button>
                <Button
                    className="rounded-xl border-slate-300 bg-white text-slate-700"
                    disabled={loading}
                    icon={<Icon name="ClipboardPaste" />}
                    onClick={(event) => { event.stopPropagation(); pasteFromClipboard(); }}
                >
                    {t.pasteImages}
                </Button>
            </div>
            <span className="relative mt-3 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">{t.pasteShortcut}</span>
            <p className="relative mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                <Icon name="ShieldCheck" /> {t.local}
            </p>
        </div>
    );

    return (
        <>
            {contextHolder}
            <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept={accept}
                multiple
                onChange={(event) => {
                    addFiles(event.target.files);
                    event.target.value = '';
                }}
            />
            <input
                ref={folderInputRef}
                className="hidden"
                type="file"
                accept={accept}
                multiple
                webkitdirectory=""
                directory=""
                onChange={(event) => {
                    const files = Array.from(event.target.files || []);
                    files.sort((a, b) => a.webkitRelativePath.localeCompare(
                        b.webkitRelativePath,
                        undefined,
                        { numeric: true, sensitivity: 'base' },
                    ));
                    addFiles(files);
                    event.target.value = '';
                }}
            />

            {!items.length ? uploadPanel : (
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,.10)]">
                    <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-950 px-4 py-4 text-white md:flex-row md:items-center md:justify-between md:px-6">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-lg shadow-inner">
                                <Icon name="LayoutPanelTop" />
                            </span>
                            <div>
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <span>{items.length} {t.images}</span>
                                    <Icon name="ArrowRight" className="text-slate-500" />
                                    <span className="text-blue-300">{t.oneLongImage}</span>
                                </div>
                                <div className="mt-0.5 text-xs text-slate-400">
                                    {t.dimensions}: {layout ? `${layout.width} × ${layout.height} px` : '—'}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                style={darkToolbarButtonStyle}
                                onClick={() => fileInputRef.current?.click()}
                                disabled={loading}
                                icon={<Icon name="ImagePlus" />}
                            >
                                {t.addImages}
                            </Button>
                            <Button
                                style={darkToolbarButtonStyle}
                                onClick={addFolder}
                                disabled={loading}
                                icon={<Icon name="FolderPlus" />}
                            >
                                {t.addFolder}
                            </Button>
                            <Button
                                style={darkToolbarButtonStyle}
                                onClick={pasteFromClipboard}
                                disabled={loading}
                                icon={<Icon name="ClipboardPaste" />}
                            >
                                {t.pasteImages}
                            </Button>
                            <Tooltip title={t.clear}>
                                <Button
                                    style={darkToolbarButtonStyle}
                                    aria-label={t.clear}
                                    onClick={clearAll}
                                    disabled={loading}
                                    icon={<Icon name="Trash2" />}
                                />
                            </Tooltip>
                        </div>
                    </div>

                    <div className="grid min-h-[620px] lg:grid-cols-[360px_minmax(0,1fr)]">
                        <aside className="border-b border-slate-200 bg-white lg:flex lg:min-h-0 lg:flex-col lg:overflow-hidden lg:border-b-0 lg:border-r">
                            <div className="border-b border-slate-100 px-5 py-4 lg:flex-none">
                                <h3 className="text-sm font-bold text-slate-900">{t.sequence}</h3>
                                <p className="mt-1 text-xs text-slate-400">{t.sequenceHint}</p>
                            </div>
                            <div className="max-h-[560px] space-y-2 overflow-y-auto p-3 lg:min-h-0 lg:max-h-none lg:flex-1">
                                {items.map((item, index) => (
                                    <div key={item.id} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 transition hover:border-blue-200 hover:shadow-sm">
                                        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">{index + 1}</span>
                                        <img src={item.src} alt={item.name} className="h-14 w-12 flex-none rounded-lg bg-slate-100 object-cover" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-semibold text-slate-800" title={item.name}>{item.name}</p>
                                            <p className="mt-1 text-[11px] text-slate-400">{item.width} × {item.height} · {formatSize(item.size)}</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <Tooltip title={t.moveUp} placement="right">
                                                <Button type="text" size="small" aria-label={t.moveUp} disabled={index === 0} onClick={() => moveItem(index, -1)} icon={<Icon name="ChevronUp" />} />
                                            </Tooltip>
                                            <Tooltip title={t.moveDown} placement="right">
                                                <Button type="text" size="small" aria-label={t.moveDown} disabled={index === items.length - 1} onClick={() => moveItem(index, 1)} icon={<Icon name="ChevronDown" />} />
                                            </Tooltip>
                                            <Tooltip title={t.remove} placement="right">
                                                <Button type="text" danger size="small" aria-label={t.remove} onClick={() => removeItem(index)} icon={<Icon name="X" />} />
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>

                        <section className="min-w-0 bg-slate-100/80">
                            <div className="flex flex-col gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur md:flex-row md:flex-wrap md:items-center">
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                    {t.outputWidth}
                                    <InputNumber
                                        className="w-28"
                                        min={1}
                                        max={12000}
                                        value={option.outputWidth}
                                        addonAfter="px"
                                        onChange={(value) => updateOption('outputWidth', value || 1)}
                                    />
                                </label>
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                    {t.gap}
                                    <InputNumber className="w-24" min={0} max={500} value={option.gap} addonAfter="px" onChange={(value) => updateOption('gap', value || 0)} />
                                </label>
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                    {t.margin}
                                    <InputNumber className="w-24" min={0} max={500} value={option.margin} addonAfter="px" onChange={(value) => updateOption('margin', value || 0)} />
                                </label>
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                    {t.format}
                                    <Select
                                        className="w-24"
                                        value={option.format}
                                        options={[{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }]}
                                        onChange={(value) => updateOption('format', value)}
                                    />
                                </label>
                                {option.format === 'png' && (
                                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                        {t.background}
                                        <Select
                                            className="w-24"
                                            value={option.background}
                                            options={[{ value: 'white', label: t.white }, { value: 'transparent', label: t.transparent }]}
                                            onChange={(value) => updateOption('background', value)}
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="p-4 md:p-6">
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">{t.preview}</h3>
                                        <p className="mt-1 text-xs text-slate-500">{t.previewHint}</p>
                                    </div>
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold text-blue-700">{items.length} → 1</span>
                                </div>
                                <div
                                    className="max-h-[700px] min-h-[430px] overflow-auto rounded-2xl border border-slate-300 p-5 shadow-inner"
                                    style={{
                                        backgroundColor: '#dfe4ea',
                                        backgroundImage: 'radial-gradient(circle, rgba(71,85,105,.32) 1px, transparent 1px)',
                                        backgroundSize: '16px 16px',
                                    }}
                                    onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
                                    onDragOver={(event) => event.preventDefault()}
                                    onDrop={onDrop}
                                >
                                    <div
                                        className="mx-auto flex w-full max-w-[520px] flex-col overflow-hidden shadow-[0_18px_60px_rgba(15,23,42,.22)]"
                                        style={{
                                            gap: `${Math.min(option.gap, 40)}px`,
                                            padding: `${Math.min(option.margin, 40)}px`,
                                            background: option.format === 'png' && option.background === 'transparent'
                                                ? 'repeating-conic-gradient(#fff 0 25%, #e2e8f0 0 50%) 0 / 16px 16px'
                                                : '#fff',
                                        }}
                                    >
                                        {items.map((item, index) => (
                                            <img key={item.id} src={item.src} alt={`${index + 1}. ${item.name}`} className="block h-auto w-full flex-none" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                        <p className="flex items-center gap-2 text-xs text-slate-400">
                            <Icon name="LockKeyhole" /> {t.local}
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            className="h-12 rounded-xl bg-blue-600 px-7 font-semibold shadow-[0_10px_30px_rgba(37,99,235,.28)]"
                            disabled={items.length < 2}
                            loading={loading}
                            icon={<Icon name="Download" />}
                            onClick={generateAndDownload}
                        >
                            {loading ? t.downloading : t.download}
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LongImageComposer;
