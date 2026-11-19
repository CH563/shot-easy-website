import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, InputNumber, Select, Tooltip, Upload, message } from 'antd';
import JSZip from 'jszip';
import { Icon } from './Icons';
import { UploadDragger } from './UploadDragger';
import { FormatTag } from './FormatTag';
import { toDownloadFile } from '@lib/utils';
import { convertImageFile, extensionForMime, formatBytes, imageExtensions, imageInputTypes, loadAnyImageFile, mimeForImageExtension, pngBlobToIcoBlob, replaceExtension } from '@lib/imageConvert';
import { convertDataFile, convertMarkdownFile, dataInputTypes, getFileExtension } from '@lib/dataConvert';
import { createImagesPdfBlob, renderPdfPages } from '@lib/pdfConvert';

const modes = [
    { value: 'image-to-webp', labelKey: 'imageToWebp', group: 'images', accept: imageInputTypes, output: 'image/webp' },
    { value: 'image-to-jpg', labelKey: 'imageToJpg', group: 'images', accept: imageInputTypes, output: 'image/jpeg' },
    { value: 'image-to-png', labelKey: 'imageToPng', group: 'images', accept: imageInputTypes, output: 'image/png' },
    { value: 'images-to-pdf', labelKey: 'imagesToPdf', group: 'images', accept: imageInputTypes, output: 'application/pdf' },
    { value: 'svg-to-png', labelKey: 'svgToPng', group: 'images', accept: ['image/svg+xml'], output: 'image/png' },
    { value: 'svg-to-jpg', labelKey: 'svgToJpg', group: 'images', accept: ['image/svg+xml'], output: 'image/jpeg' },
    { value: 'svg-to-webp', labelKey: 'svgToWebp', group: 'images', accept: ['image/svg+xml'], output: 'image/webp' },
    { value: 'png-to-ico', labelKey: 'pngToIco', group: 'images', accept: ['image/png'], output: 'image/x-icon' },
    { value: 'pdf-to-images', labelKey: 'pdfToImages', group: 'pdf', accept: ['application/pdf'], output: 'image/png' },
    { value: 'pdf-to-jpg', labelKey: 'pdfToJpg', group: 'pdf', accept: ['application/pdf'], output: 'image/jpeg' },
    { value: 'pdf-to-webp', labelKey: 'pdfToWebp', group: 'pdf', accept: ['application/pdf'], output: 'image/webp' },
    { value: 'csv-to-xlsx', labelKey: 'csvToXlsx', group: 'data', kind: 'data', target: 'xlsx', extensions: ['csv'], output: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { value: 'xlsx-to-csv', labelKey: 'xlsxToCsv', group: 'data', kind: 'data', target: 'csv', extensions: ['xlsx'], output: 'text/csv' },
    { value: 'json-to-csv', labelKey: 'jsonToCsv', group: 'data', kind: 'data', target: 'csv', extensions: ['json'], output: 'text/csv' },
    { value: 'csv-to-json', labelKey: 'csvToJson', group: 'data', kind: 'data', target: 'json', extensions: ['csv'], output: 'application/json' },
    { value: 'json-to-xlsx', labelKey: 'jsonToXlsx', group: 'data', kind: 'data', target: 'xlsx', extensions: ['json'], output: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { value: 'xlsx-to-json', labelKey: 'xlsxToJson', group: 'data', kind: 'data', target: 'json', extensions: ['xlsx'], output: 'application/json' },
    { value: 'tsv-to-csv', labelKey: 'tsvToCsv', group: 'data', kind: 'data', target: 'csv', extensions: ['tsv'], output: 'text/csv' },
    { value: 'tsv-to-xlsx', labelKey: 'tsvToXlsx', group: 'data', kind: 'data', target: 'xlsx', extensions: ['tsv'], output: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    { value: 'md-to-html', labelKey: 'mdToHtml', group: 'data', kind: 'text', extensions: ['md'], output: 'text/html' },
];

const inputTypes = [...new Set([...imageInputTypes, 'application/pdf', ...dataInputTypes])];
const acceptedExtensions = ['csv', 'tsv', 'json', 'xlsx', 'md', 'heic', 'heif', 'ico'];
const acceptAttr = [...inputTypes, ...acceptedExtensions.map((ext) => `.${ext}`)].join(',');

// Browsers report flaky MIME types for .csv/.tsv/.json/.md, so fall back to the extension.
const isAcceptedFile = (file) => inputTypes.includes(file.type) || acceptedExtensions.includes(getFileExtension(file.name));
const dotBackground = {
    backgroundImage: 'radial-gradient(circle, rgba(100,116,139,.45) 1px, transparent 1px)',
    backgroundSize: '16px 16px',
};
const unsupportedReason = 'This file type is not supported by the selected mode.';

const sortFiles = (files) => Array.from(files)
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

const getUploadFile = (file) => file?.originFileObj || file;

const getUniqueZipName = (name, usedNames) => {
    const dotIndex = name.lastIndexOf('.');
    const hasExtension = dotIndex > 0;
    const base = hasExtension ? name.slice(0, dotIndex) : name;
    const extension = hasExtension ? name.slice(dotIndex) : '';
    let nextName = name;
    let index = 2;

    while (usedNames.has(nextName)) {
        nextName = `${base} (${index})${extension}`;
        index += 1;
    }

    usedNames.add(nextName);
    return nextName;
};

const getAllFilesFromEntry = async (entry) => {
    if (entry.isFile) {
        return new Promise((resolve) => {
            entry.file((file) => resolve([file]), () => resolve([]));
        });
    }

    if (entry.isDirectory) {
        const reader = entry.createReader();
        const entries = [];
        let batch = [];
        do {
            batch = await new Promise((resolve) => reader.readEntries(resolve, () => resolve([])));
            entries.push(...batch);
        } while (batch.length);

        const files = [];
        for (const item of entries) {
            files.push(...await getAllFilesFromEntry(item));
        }
        return files;
    }

    return [];
};

const getAllFilesFromHandle = async (handle) => {
    if (handle.kind === 'file') {
        return [await handle.getFile()];
    }

    if (handle.kind === 'directory') {
        const files = [];
        for await (const item of handle.values()) {
            files.push(...await getAllFilesFromHandle(item));
        }
        return files;
    }

    return [];
};

const revokeOutputUrls = (item) => {
    item.outputs?.forEach((output) => {
        if (output.url) URL.revokeObjectURL(output.url);
    });
};

const revokePreviewUrl = (item) => {
    if (item.src) URL.revokeObjectURL(item.src);
};

const cleanupItems = (list) => {
    list.forEach((item) => {
        revokePreviewUrl(item);
        revokeOutputUrls(item);
    });
};

const getFormatLabel = (item) => {
    const type = item?.type;
    if (type === 'application/pdf') return 'PDF';
    if (type === 'image/jpeg') return 'JPG';
    if (type === 'image/svg+xml') return 'SVG';
    if (type === 'image/tiff') return 'TIFF';
    if (type === 'image/gif') return 'GIF';
    if (type === 'image/bmp') return 'BMP';
    if (type === 'image/avif') return 'AVIF';
    if (type === 'text/csv') return 'CSV';
    if (type === 'text/tab-separated-values') return 'TSV';
    if (type === 'application/json') return 'JSON';
    if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'XLSX';
    if (type === 'text/markdown') return 'MD';
    if (type === 'text/html') return 'HTML';
    if (type?.startsWith('image/')) return type.replace('image/', '').toUpperCase();
    const extension = getFileExtension(item?.name);
    return extension ? extension.toUpperCase() : 'FILE';
};

const isCompatible = (item, activeMode) => {
    if (activeMode.accept?.includes(item.type)) return true;
    // Browsers report flaky or empty MIME types for some image files, so fall
    // back to the extension-derived type before rejecting the file.
    const extType = mimeForImageExtension(getFileExtension(item.name));
    if (extType && activeMode.accept?.includes(extType)) return true;
    if (activeMode.extensions?.includes(getFileExtension(item.name))) return true;
    return false;
};

const outputWithUrl = (output, fallbackName) => {
    const name = output.name || fallbackName;
    return {
        ...output,
        name,
        url: URL.createObjectURL(output.blob),
    };
};

const getItemMeta = (item) => {
    if (item.type === 'application/pdf') {
        return item.outputs?.length
            ? `${item.outputs.length} page${item.outputs.length === 1 ? '' : 's'}`
            : 'PDF';
    }
    if (item.width && item.height) return `${item.width}*${item.height}`;
    return '-';
};

const zipOutputs = async (outputs, fileName) => {
    const zip = new JSZip();
    const usedNames = new Set();
    outputs.forEach((output) => zip.file(getUniqueZipName(output.name, usedNames), output.blob));
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    toDownloadFile(url, fileName);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const markPdfSerializationFailures = async (items, errorMessage) => {
    const serializableItems = [];
    const failedIds = new Set();

    for (const item of items) {
        try {
            await createImagesPdfBlob([item]);
            serializableItems.push(item);
        } catch {
            failedIds.add(item.id);
        }
    }

    return { serializableItems, failedIds, errorMessage };
};

export default function ConvertTool({ copy = {}, defaultMode = 'image-to-webp' }) {
    const [messageApi, contextHolder] = message.useMessage();
    const itemsRef = useRef([]);
    const uploadQueueRef = useRef({ files: [], timer: null });
    const [items, setItems] = useState([]);
    const [mode, setMode] = useState(modes.some((item) => item.value === defaultMode) ? defaultMode : 'image-to-webp');
    const [quality, setQuality] = useState(92);
    const [pdfScale, setPdfScale] = useState(2);
    const [icoSize, setIcoSize] = useState(256);
    const [loading, setLoading] = useState(false);

    const activeMode = useMemo(() => modes.find((item) => item.value === mode) || modes[0], [mode]);
    const modeOptions = useMemo(() => {
        const groups = ['images', 'pdf', 'data'];
        return groups.map((group) => ({
            label: copy.groups?.[group] || group,
            options: modes
                .filter((item) => item.group === group)
                .map((item) => ({ value: item.value, label: copy.modes?.[item.labelKey] || item.value })),
        })).filter((group) => group.options.length);
    }, [copy.groups, copy.modes]);
    const showsQuality = activeMode.output === 'image/jpeg' || activeMode.output === 'image/webp';
    const isPdfMode = activeMode.group === 'pdf';
    const supportsDirectoryPicker = typeof window !== 'undefined' && !!window.showDirectoryPicker;
    const outputs = useMemo(() => items.flatMap((item) => item.outputs || []), [items]);
    const inputSize = useMemo(() => items.reduce((total, item) => total + item.size, 0), [items]);
    const outputSize = useMemo(() => outputs.reduce((total, output) => total + output.blob.size, 0), [outputs]);
    const convertedCount = items.filter((item) => item.status === 'done').length;

    useEffect(() => {
        itemsRef.current = items;
    }, [items]);

    useEffect(() => () => {
        if (uploadQueueRef.current.timer) window.clearTimeout(uploadQueueRef.current.timer);
        cleanupItems(itemsRef.current);
    }, []);

    const resetOutputs = (list) => list.map((item) => {
        revokeOutputUrls(item);
        return { ...item, status: 'ready', skipReason: undefined, error: undefined, outputs: [] };
    });

    const invalidateOutputs = () => {
        setItems((prev) => resetOutputs(prev));
    };

    const updateQuality = (value) => {
        invalidateOutputs();
        setQuality(value || 92);
    };

    const updatePdfScale = (value) => {
        invalidateOutputs();
        setPdfScale(value || 2);
    };

    const updateIcoSize = (value) => {
        invalidateOutputs();
        setIcoSize(Math.max(1, Math.min(256, Math.round(value || 256))));
    };

    const addFiles = async (files) => {
        const sortedFiles = sortFiles(files);
        const acceptedFiles = sortedFiles.filter((file) => isAcceptedFile(file));
        if (acceptedFiles.length !== sortedFiles.length) {
            messageApi.warning('Unsupported files were skipped.');
        }
        if (!acceptedFiles.length) {
            messageApi.warning('Please select supported image, PDF, data or text files.');
            return;
        }

        setLoading(true);
        const loadedItems = [];
        let hasLoadError = false;
        try {
            for (const file of acceptedFiles) {
                const baseItem = {
                    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
                    file,
                    name: file.name,
                    type: file.type || 'application/octet-stream',
                    size: file.size,
                    status: 'ready',
                    outputs: [],
                };

                if (imageInputTypes.includes(file.type) || imageExtensions.includes(getImageExtension(file.name))) {
                    try {
                        const preview = await loadAnyImageFile(file);
                        loadedItems.push({
                            ...baseItem,
                            src: preview.src,
                            image: preview.image,
                            width: preview.width,
                            height: preview.height,
                        });
                    } catch (error) {
                        hasLoadError = true;
                        loadedItems.push({
                            ...baseItem,
                            status: 'error',
                            error: error.message || 'Image load failed.',
                        });
                    }
                    continue;
                }

                loadedItems.push(baseItem);
            }

            setItems((prev) => [...resetOutputs(prev), ...loadedItems]);
            if (hasLoadError) messageApi.error('Some images could not be loaded.');
        } catch (error) {
            cleanupItems(loadedItems);
            messageApi.error(error.message || 'File load failed.');
        } finally {
            setLoading(false);
        }
    };

    const flushUploadQueue = async () => {
        const files = uploadQueueRef.current.files;
        uploadQueueRef.current = { files: [], timer: null };
        await addFiles(files);
    };

    const beforeUpload = (file, fileList = []) => {
        const queuedFiles = (fileList.length ? fileList : [file])
            .map(getUploadFile)
            .filter(Boolean);
        const queuedSet = new Set(uploadQueueRef.current.files);
        queuedFiles.forEach((queuedFile) => {
            if (!queuedSet.has(queuedFile)) {
                queuedSet.add(queuedFile);
                uploadQueueRef.current.files.push(queuedFile);
            }
        });

        if (!uploadQueueRef.current.timer) {
            uploadQueueRef.current.timer = window.setTimeout(flushUploadQueue, 0);
        }

        return Upload.LIST_IGNORE;
    };

    const addFolder = async () => {
        if (!supportsDirectoryPicker) return;
        try {
            const handle = await window.showDirectoryPicker();
            const files = await getAllFilesFromHandle(handle);
            await addFiles(files);
        } catch (error) {
            if (error.name !== 'AbortError') messageApi.error(error.message || 'Folder selection failed.');
        }
    };

    const onDrop = async (event) => {
        event.preventDefault();
        const files = [];
        if (event.dataTransfer?.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
                const item = event.dataTransfer.items[i];
                if (typeof item.getAsFileSystemHandle === 'function') {
                    const handle = await item.getAsFileSystemHandle();
                    if (handle.kind === 'directory') {
                        files.push(...await getAllFilesFromHandle(handle));
                    }
                    continue;
                }
                if (typeof item.webkitGetAsEntry === 'function') {
                    const entry = item.webkitGetAsEntry();
                    if (entry?.isDirectory) {
                        files.push(...await getAllFilesFromEntry(entry));
                        continue;
                    }
                }
            }
        }
        if (files.length) await addFiles(files);
    };

    const convertItem = async (item, selectedMode) => {
        if (!isCompatible(item, selectedMode)) {
            return { ...item, status: 'skipped', skipReason: unsupportedReason, outputs: [] };
        }

        if (selectedMode.value === 'png-to-ico') {
            const blob = await pngBlobToIcoBlob(item.file, icoSize);
            const output = {
                name: replaceExtension(item.name, extensionForMime(selectedMode.output)),
                blob,
                type: 'image/x-icon',
                size: blob.size,
                width: icoSize,
                height: icoSize,
            };
            return { ...item, status: 'done', outputs: [outputWithUrl(output, output.name)] };
        }

        if (selectedMode.group === 'pdf') {
            const pageOutputs = await renderPdfPages(item.file, {
                scale: pdfScale,
                outputType: selectedMode.output,
                quality: quality / 100,
            });
            return {
                ...item,
                status: 'done',
                outputs: pageOutputs.map((output) => outputWithUrl(output, output.name)),
            };
        }

        if (selectedMode.kind === 'data') {
            const output = await convertDataFile(item.file, selectedMode.target);
            return { ...item, status: 'done', outputs: [outputWithUrl(output, output.name)] };
        }

        if (selectedMode.kind === 'text') {
            const output = await convertMarkdownFile(item.file);
            return { ...item, status: 'done', outputs: [outputWithUrl(output, output.name)] };
        }

        const output = await convertImageFile(item.file, selectedMode.output, quality / 100);
        return { ...item, status: 'done', outputs: [outputWithUrl(output, replaceExtension(item.name, extensionForMime(selectedMode.output)))] };
    };

    const convertImagesToPdf = async (sourceItems, selectedMode) => {
        const compatibleItems = [];
        const preparedItems = [];
        let compatibleCount = 0;

        for (const item of sourceItems) {
            if (!isCompatible(item, selectedMode)) {
                preparedItems.push({ ...item, status: 'skipped', skipReason: unsupportedReason, outputs: [] });
                continue;
            }

            compatibleCount += 1;
            try {
                let preparedItem = item;
                if (!preparedItem.image) {
                    const preview = await loadAnyImageFile(preparedItem.file);
                    preparedItem = {
                        ...preparedItem,
                        src: preview.src,
                        image: preview.image,
                        width: preview.width,
                        height: preview.height,
                    };
                }
                compatibleItems.push(preparedItem);
                preparedItems.push({ ...preparedItem, status: 'done', outputs: [] });
            } catch (error) {
                preparedItems.push({
                    ...item,
                    status: 'error',
                    error: error.message || 'Image load failed.',
                    outputs: [],
                });
            }
        }

        if (!compatibleItems.length) {
            if (compatibleCount) {
                messageApi.error('No images could be converted to PDF.');
            } else {
                messageApi.warning('Please add images supported by the selected mode.');
            }
            return preparedItems;
        }

        let pdfItems = compatibleItems;
        let serializationFailedIds = new Set();
        let blob = null;

        try {
            blob = await createImagesPdfBlob(pdfItems);
        } catch (error) {
            const fallback = await markPdfSerializationFailures(compatibleItems, error.message || 'PDF serialization failed.');
            pdfItems = fallback.serializableItems;
            serializationFailedIds = fallback.failedIds;

            if (!pdfItems.length) {
                messageApi.error('No images could be serialized to PDF.');
                return preparedItems.map((item) => {
                    if (!serializationFailedIds.has(item.id)) return item;
                    return {
                        ...item,
                        status: 'error',
                        error: fallback.errorMessage,
                        outputs: [],
                    };
                });
            }

            try {
                blob = await createImagesPdfBlob(pdfItems);
            } catch (retryError) {
                const errorMessage = retryError.message || 'PDF conversion failed.';
                messageApi.error(errorMessage);
                const remainingIds = new Set(pdfItems.map((item) => item.id));
                return preparedItems.map((item) => {
                    if (!serializationFailedIds.has(item.id) && !remainingIds.has(item.id)) return item;
                    return {
                        ...item,
                        status: 'error',
                        error: serializationFailedIds.has(item.id) ? fallback.errorMessage : errorMessage,
                        outputs: [],
                    };
                });
            }
        }

        const output = outputWithUrl({
            name: 'shoteasy-images.pdf',
            blob,
            type: 'application/pdf',
            size: blob.size,
            pageCount: pdfItems.length,
        }, 'shoteasy-images.pdf');

        const outputItemId = pdfItems[0].id;
        return preparedItems.map((item) => {
            if (serializationFailedIds.has(item.id)) {
                return {
                    ...item,
                    status: 'error',
                    error: 'PDF serialization failed.',
                    outputs: [],
                };
            }
            if (item.id !== outputItemId) return item;
            return { ...item, outputs: [output] };
        });
    };

    const convertAll = async () => {
        if (!items.length) {
            messageApi.warning('Please add files first.');
            return;
        }

        setLoading(true);
        const selectedMode = activeMode;
        const sourceItems = resetOutputs(items);
        setItems(sourceItems.map((item) => ({ ...item, status: 'converting' })));

        try {
            const convertedItems = selectedMode.value === 'images-to-pdf'
                ? await convertImagesToPdf(sourceItems, selectedMode)
                : await Promise.all(sourceItems.map(async (item) => {
                    try {
                        return await convertItem(item, selectedMode);
                    } catch (error) {
                        return { ...item, status: 'error', error: error.message || 'Conversion failed.', outputs: [] };
                    }
                }));

            setItems(convertedItems);
            if (convertedItems.some((item) => item.outputs?.length)) {
                messageApi.success('Convert Success!');
            }
        } catch (error) {
            setItems(sourceItems.map((item) => ({ ...item, status: 'error', error: error.message || 'Conversion failed.', outputs: [] })));
            messageApi.error(error.message || 'Conversion failed.');
        } finally {
            setLoading(false);
        }
    };

    const clearAll = () => {
        cleanupItems(items);
        setItems([]);
    };

    const removeItem = (id) => {
        setItems((prev) => {
            const remaining = [];
            prev.forEach((item) => {
                if (item.id === id) {
                    revokePreviewUrl(item);
                    revokeOutputUrls(item);
                    return;
                }
                remaining.push(item);
            });
            return resetOutputs(remaining);
        });
    };

    const handleModeChange = (value) => {
        if (loading) return;
        setItems((prev) => resetOutputs(prev));
        setMode(value);
    };

    const downloadOutput = (output) => {
        toDownloadFile(output.url, output.name);
        messageApi.success('Download Success!');
    };

    const downloadItemOutputs = async (item) => {
        if (!item.outputs?.length) return;
        if (item.outputs.length === 1) {
            downloadOutput(item.outputs[0]);
            return;
        }
        await zipOutputs(item.outputs, `${item.name.replace(/\.[^.]+$/, '') || 'converted'}-pages.zip`);
        messageApi.success('Download Success!');
    };

    const downloadAll = async () => {
        if (!outputs.length) {
            messageApi.warning('Convert files before downloading.');
            return;
        }
        setLoading(true);
        try {
            await zipOutputs(outputs, 'shoteasy-converted-files.zip');
            messageApi.success('Download Success!');
        } finally {
            setLoading(false);
        }
    };

    const getStatusLabel = (item) => {
        if (item.status === 'skipped') return copy.skipped || 'Skipped';
        if (item.status === 'converting') return copy.converting || 'Converting';
        if (item.status === 'done') return copy.done || 'Done';
        if (item.status === 'error') return copy.error || 'Error';
        return copy.ready || 'Ready';
    };

    const listComponent = items.length ? (
        <div className="w-full bg-white shadow-md rounded-md overflow-hidden border-t-gray-600">
            <div className="bg-gray-900 py-1.5 px-3 text-white text-sm flex flex-wrap items-center gap-x-5 gap-y-1">
                <span className="flex items-center gap-2 text-slate-400">
                    <span className="inline-flex w-3.5 h-3.5 rounded-full border-[3px] border-green-500"></span>
                    <span><span className="font-semibold text-green-500">{convertedCount}</span> / {items.length}</span>
                </span>
                <span className="text-slate-400">{copy.files || 'Files'}:<span className="text-white ml-1">{items.length}</span></span>
                <span className="text-slate-400">{copy.input || 'Input'}:<span className="text-white ml-1">{formatBytes(inputSize)}</span></span>
                <span className="text-slate-400">{copy.outputSize || 'Output'}:<span className="text-green-400 ml-1 font-semibold">{formatBytes(outputSize)}</span></span>
                <span className="text-slate-400">{copy.mode || 'Mode'}:<span className="text-white ml-1">{copy.modes?.[activeMode.labelKey] || activeMode.value}</span></span>
            </div>
            <div className="p-4 grid gap-6">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 pb-5 relative after:block after:absolute after:bottom-0 after:left-16 after:right-0 after:h-[1px] after:bg-slate-200 last:after:hidden">
                        <div className="flex items-center min-w-0 flex-1">
                            <div className="w-12 h-12 mr-4 rounded-md overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100 flex items-center justify-center text-slate-400">
                                {item.src
                                    ? <img src={item.src} alt={`${item.name || 'Image'} convert preview`} className="w-full h-full object-cover" />
                                    : <Icon name="FileText" size={22} />
                                }
                            </div>
                            <div className="min-w-0">
                                <div className="font-semibold mb-1.5 truncate">{item.name}</div>
                                <div className="text-xs flex flex-wrap gap-x-2 gap-y-1 text-slate-500">
                                    <span><FormatTag type={getFormatLabel(item)} /></span>
                                    <span>{getItemMeta(item)}</span>
                                    <span>{formatBytes(item.size)}</span>
                                    {item.outputs?.length > 0 && <span>{item.outputs.length} {copy.output || 'Output'}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Tooltip title={item.skipReason || item.error || getStatusLabel(item)}>
                                <span className="text-xs rounded bg-slate-100 text-slate-600 px-2 py-1">{getStatusLabel(item)}</span>
                            </Tooltip>
                            {item.outputs?.length > 0 && (
                                <span className="hidden sm:inline text-xs text-slate-500 text-right min-w-[68px]">
                                    {formatBytes(item.outputs.reduce((total, output) => total + output.blob.size, 0))}
                                </span>
                            )}
                            <Tooltip title={item.outputs?.length ? 'Download' : 'Convert first'}>
                                <Button
                                    type="primary"
                                    className="bg-black"
                                    icon={<Icon name="Download" />}
                                    disabled={!item.outputs?.length || loading}
                                    onClick={() => downloadItemOutputs(item)}
                                />
                            </Tooltip>
                            <Tooltip title="Remove">
                                <Button type="text" icon={<Icon name="X" />} disabled={loading} onClick={() => removeItem(item.id)} />
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <div className="flex w-full justify-center py-4">
            <UploadDragger
                beforeUpload={beforeUpload}
                multiple={true}
                onDrop={onDrop}
                customRequest={() => {}}
                accept={acceptAttr}
                desc={copy.emptyHint || 'PNG / JPG / WEBP / SVG / PDF'}
            />
        </div>
    );

    return (
        <>
            {contextHolder}
            <div className="bg-white shadow-md rounded-md overflow-hidden border-t border-t-gray-600">
                <div className="flex min-w-0 gap-4 p-2 justify-center flex-col-reverse min-[1300px]:flex-row min-[1300px]:justify-between border-b border-dotted bg-white">
                    <div className="flex min-w-0 w-full gap-3 items-center justify-center flex-wrap min-[1300px]:w-auto">
                        <Upload name="file" multiple={true} beforeUpload={beforeUpload} showUploadList={false} accept={acceptAttr}>
                            <Button className="max-w-full whitespace-normal" disabled={loading} icon={<Icon name="ImagePlus" />}>{copy.addFiles || 'Add Files'}</Button>
                        </Upload>
                        {supportsDirectoryPicker && <Button className="max-w-full whitespace-normal" disabled={loading} icon={<Icon name="FolderPlus" />} onClick={addFolder}>{copy.addFolder || 'Add Folder'}</Button>}
                    </div>
                    <div className="flex min-w-0 w-full gap-3 items-center justify-center flex-wrap min-[1300px]:w-auto">
                        <Tooltip placement="top" title={copy.convertAll || 'Convert All'}>
                            <Button
                                type="primary"
                                className="max-w-full whitespace-normal bg-black"
                                loading={loading}
                                disabled={!items.length}
                                icon={<Icon name="Repeat2" />}
                                onClick={convertAll}
                            >{copy.convertAll || 'Convert All'}</Button>
                        </Tooltip>
                        <Tooltip placement="top" title={outputs.length ? (copy.downloadAll || 'Download All') : 'Convert first'}>
                            <Button
                                type="primary"
                                className="max-w-full whitespace-normal bg-black"
                                disabled={!outputs.length || loading}
                                icon={<Icon name="Download" />}
                                onClick={downloadAll}
                            >{copy.downloadAll || 'Download All'}</Button>
                        </Tooltip>
                        <Tooltip placement="top" title={copy.clearAll || 'Clear All'}>
                            <Button className="max-w-full whitespace-normal" type="text" disabled={!items.length || loading} icon={<Icon name="Eraser" />} onClick={clearAll}>{copy.clearAll || 'Clear All'}</Button>
                        </Tooltip>
                    </div>
                </div>
                <div className="py-2 px-2 flex items-center gap-3 border-b border-dotted bg-slate-50 text-xs select-none flex-wrap">
                    <div className="flex min-w-0 w-full gap-2 items-center min-[1300px]:w-auto">
                        <label className="shrink-0 font-semibold">{copy.convert || 'Convert'}:</label>
                        <Select className="min-w-0 flex-1 min-[1300px]:w-44 min-[1300px]:flex-none" size="small" value={mode} options={modeOptions} onChange={handleModeChange} disabled={loading} />
                    </div>
                    {showsQuality && (
                        <div className="flex min-w-0 w-full gap-2 items-center min-[1300px]:w-auto">
                            <label className="shrink-0 font-semibold">{copy.quality || 'Quality'}:</label>
                            <InputNumber className="min-w-0 flex-1 min-[1300px]:w-28 min-[1300px]:flex-none" size="small" min={1} max={100} value={quality} addonAfter="%" onChange={updateQuality} disabled={loading} />
                        </div>
                    )}
                    {isPdfMode && (
                        <div className="flex min-w-0 w-full gap-2 items-center min-[1300px]:w-auto">
                            <label className="shrink-0 font-semibold">{copy.pdfScale || 'PDF Scale'}:</label>
                            <InputNumber className="min-w-0 flex-1 min-[1300px]:w-28 min-[1300px]:flex-none" size="small" min={0.5} max={4} step={0.5} value={pdfScale} addonAfter="x" onChange={updatePdfScale} disabled={loading} />
                        </div>
                    )}
                    {mode === 'png-to-ico' && (
                        <div className="flex min-w-0 w-full gap-2 items-center min-[1300px]:w-auto">
                            <label className="shrink-0 font-semibold">{copy.icoSize || 'ICO Size'}:</label>
                            <InputNumber className="min-w-0 flex-1 min-[1300px]:w-32 min-[1300px]:flex-none" size="small" min={16} max={256} step={16} value={icoSize} addonAfter="px" onChange={updateIcoSize} disabled={loading} />
                        </div>
                    )}
                    <div className="w-full text-right min-[1300px]:flex-1">
                        <Button
                            size="small"
                            type="link"
                            disabled={loading}
                            onClick={() => {
                                setItems((prev) => resetOutputs(prev));
                                setMode(defaultMode);
                                setQuality(92);
                                setPdfScale(2);
                                setIcoSize(256);
                            }}
                        >{copy.reset || 'Reset'}</Button>
                    </div>
                </div>
                <div className="relative min-h-[240px] p-5" style={dotBackground}>
                    <div className="flex w-full justify-center z-10">
                        {listComponent}
                    </div>
                </div>
            </div>
        </>
    );
}
