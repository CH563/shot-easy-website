import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Radio, Spin, Upload, message } from 'antd';
import { Icon } from './Icons';
import { cn, formatSize, toDownloadFile } from '@lib/utils';

const { Dragger } = Upload;

const pdfCMapUrls = import.meta.glob('/node_modules/pdfjs-dist/cmaps/*.bcmap', { query: '?url', import: 'default', eager: true });
const pdfStandardFontUrls = import.meta.glob('/node_modules/pdfjs-dist/standard_fonts/*.{pfb,ttf}', { query: '?url', import: 'default', eager: true });

const accept = [
    '.docx',
    '.xlsx',
    '.pptx',
    '.csv',
    '.pdf',
    '.zip',
    '.rar',
    '.7z',
    '.tar',
    '.gz',
    '.txt',
    '.md',
    'image/*',
].join(',');

const officeKinds = new Set(['docx', 'xlsx', 'pptx']);
const archiveKinds = new Set(['zip', 'rar', '7z', 'tar', 'gz', 'tgz', 'bz2', 'xz']);
const imageKinds = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'avif', 'ico', 'tif', 'tiff']);
const textKinds = new Set(['txt', 'md', 'json', 'xml', 'html', 'css', 'js', 'ts']);

const getExtension = (name = '') => name.toLowerCase().split('.').pop() || '';

const getKind = (file) => {
    const ext = getExtension(file?.name);
    if (officeKinds.has(ext)) return ext;
    if (archiveKinds.has(ext)) return 'archive';
    if (ext === 'csv' || file?.type === 'text/csv') return 'csv';
    if (ext === 'pdf' || file?.type === 'application/pdf') return 'pdf';
    if (imageKinds.has(ext) || file?.type?.startsWith('image/')) return 'image';
    if (textKinds.has(ext) || file?.type?.startsWith('text/')) return 'text';
    if (['doc', 'xls', 'ppt'].includes(ext)) return 'legacy-office';
    return 'unsupported';
};

const getViewerLabel = (kind) => ({
    docx: 'Word',
    xlsx: 'Excel',
    pptx: 'PowerPoint',
    csv: 'CSV',
    pdf: 'PDF',
    archive: 'Archive',
    image: 'Image',
    text: 'Text',
    'legacy-office': 'Legacy Office',
}[kind] || 'File');

const getFileIcon = (kind, isFolder = false) => {
    if (isFolder) return 'Folder';
    if (kind === 'docx' || kind === 'text') return 'FileText';
    if (kind === 'xlsx' || kind === 'csv') return 'Table2';
    if (kind === 'pptx') return 'Presentation';
    if (kind === 'pdf') return 'File';
    if (kind === 'archive') return 'Archive';
    if (kind === 'image') return 'Image';
    return 'FileQuestion';
};

const fileToUrl = (file) => URL.createObjectURL(file);

const downloadFile = (file) => {
    const url = fileToUrl(file);
    toDownloadFile(url, file.name || 'download');
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const downloadCanvasPng = (canvas, name) => {
    if (!canvas) return;
    try {
        canvas.toBlob((blob) => {
            if (!blob) {
                message.error('PNG export failed.');
                return;
            }
            const url = URL.createObjectURL(blob);
            toDownloadFile(url, name);
            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        }, 'image/png');
    } catch (error) {
        message.error(error.message || 'PNG export failed.');
    }
};

const downloadElementPng = (element, name) => {
    if (!element) return;
    const width = Math.ceil(element.clientWidth || element.scrollWidth || 1);
    const height = Math.ceil(element.clientHeight || element.scrollHeight || 1);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    const rootRect = element.getBoundingClientRect();
    context.scale(dpr, dpr);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
    context.save();
    context.rect(0, 0, width, height);
    context.clip();

    const drawNode = (node) => {
        if (!(node instanceof Element)) return;
        const rect = node.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        if (rect.right < rootRect.left || rect.left > rootRect.right || rect.bottom < rootRect.top || rect.top > rootRect.bottom) return;

        const style = window.getComputedStyle(node);
        const x = rect.left - rootRect.left;
        const y = rect.top - rootRect.top;
        const w = rect.width;
        const h = rect.height;
        const directText = Array.from(node.childNodes)
            .filter((child) => child.nodeType === Node.TEXT_NODE)
            .map((child) => child.textContent || '')
            .join(' ')
            .trim();
        const text = directText || (node.children.length ? '' : (node.textContent || '').trim());
        const hasBorder = ['Top', 'Right', 'Bottom', 'Left'].some((side) => parseFloat(style[`border${side}Width`]) > 0);
        const background = style.backgroundColor;
        const hasBackground = background && background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent';

        if (hasBackground) {
            context.fillStyle = background;
            context.fillRect(x, y, w, h);
        }

        if (hasBorder) {
            context.strokeStyle = style.borderTopColor || '#d1d5db';
            context.lineWidth = 1;
            context.strokeRect(x + 0.5, y + 0.5, Math.max(0, w - 1), Math.max(0, h - 1));
        }

        if (text) {
            const fontSize = parseFloat(style.fontSize) || 12;
            const fontFamily = style.fontFamily || 'Arial, sans-serif';
            const fontWeight = style.fontWeight || '400';
            const paddingLeft = parseFloat(style.paddingLeft) || 4;
            const paddingTop = parseFloat(style.paddingTop) || 2;
            const color = style.color || '#111827';
            context.save();
            context.rect(x, y, w, h);
            context.clip();
            context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
            context.fillStyle = color;
            context.textBaseline = 'top';
            context.fillText(text, x + paddingLeft, y + paddingTop + Math.max(0, (h - fontSize) / 2 - paddingTop));
            context.restore();
        }

        Array.from(node.children).forEach(drawNode);
    };

    Array.from(element.children).forEach(drawNode);
    context.restore();
    downloadCanvasPng(canvas, name);
};

const getBaseName = (name = 'page') => name.replace(/\.[^.]+$/, '') || 'page';

const parseCsv = (text) => {
    const rows = [];
    let row = [];
    let cell = '';
    let quoted = false;

    for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        const next = text[i + 1];
        if (char === '"' && quoted && next === '"') {
            cell += '"';
            i += 1;
        } else if (char === '"') {
            quoted = !quoted;
        } else if (char === ',' && !quoted) {
            row.push(cell);
            cell = '';
        } else if ((char === '\n' || char === '\r') && !quoted) {
            if (char === '\r' && next === '\n') i += 1;
            row.push(cell);
            rows.push(row);
            row = [];
            cell = '';
        } else {
            cell += char;
        }
    }
    row.push(cell);
    rows.push(row);
    return rows.filter((item) => item.some((value) => value.trim() !== '')).slice(0, 200);
};

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

function PdfPreview({ file, copy, isFullscreen = false }) {
    const canvasRef = useRef(null);
    const pdfRef = useRef(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [thumbnails, setThumbnails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setPage(1);
        setTotal(0);
        setThumbnails([]);
        setLoading(true);
        getPdfJs()
            .then(async (pdfjsLib) => {
                const data = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({
                    data,
                    cMapPacked: true,
                    CMapReaderFactory: ViteCMapReaderFactory,
                    StandardFontDataFactory: ViteStandardFontDataFactory,
                    useWorkerFetch: false,
                    enableXfa: true,
                }).promise;
                if (cancelled) {
                    await pdf.destroy();
                    return;
                }
                pdfRef.current = pdf;
                setTotal(pdf.numPages);
                setThumbnails(new Array(pdf.numPages).fill(''));
            })
            .catch((error) => message.error(error.message || 'PDF load failed.'))
            .finally(() => !cancelled && setLoading(false));

        return () => {
            cancelled = true;
            pdfRef.current?.destroy?.();
            pdfRef.current = null;
        };
    }, [file]);

    useEffect(() => {
        let cancelled = false;
        const render = async () => {
            if (!pdfRef.current || !canvasRef.current) return;
            setLoading(true);
            const pdfPage = await pdfRef.current.getPage(page);
            try {
                const viewport = pdfPage.getViewport({ scale: 1.4 });
                const canvas = canvasRef.current;
                canvas.width = Math.ceil(viewport.width);
                canvas.height = Math.ceil(viewport.height);
                const context = canvas.getContext('2d');
                context.fillStyle = '#fff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                await pdfPage.render({ canvasContext: context, viewport, background: 'white' }).promise;
            } finally {
                pdfPage.cleanup?.();
                if (!cancelled) setLoading(false);
            }
        };
        render().catch((error) => {
            if (!cancelled) {
                setLoading(false);
                message.error(error.message || 'PDF render failed.');
            }
        });
        return () => {
            cancelled = true;
        };
    }, [page, total]);

    useEffect(() => {
        if (!pdfRef.current || total <= 1) return undefined;
        let cancelled = false;
        const renderThumbnails = async () => {
            for (let index = 0; index < total; index += 1) {
                const pdfPage = await pdfRef.current.getPage(index + 1);
                try {
                    const viewport = pdfPage.getViewport({ scale: 1 });
                    const width = 150;
                    const scale = width / viewport.width;
                    const thumbnailViewport = pdfPage.getViewport({ scale });
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.ceil(thumbnailViewport.width);
                    canvas.height = Math.ceil(thumbnailViewport.height);
                    const context = canvas.getContext('2d');
                    context.fillStyle = '#fff';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    await pdfPage.render({ canvasContext: context, viewport: thumbnailViewport, background: 'white' }).promise;
                    if (cancelled) return;
                    const url = canvas.toDataURL('image/png');
                    setThumbnails((prev) => {
                        const next = [...prev];
                        next[index] = url;
                        return next;
                    });
                } finally {
                    pdfPage.cleanup?.();
                }
            }
        };
        renderThumbnails().catch((error) => {
            if (!cancelled) message.error(error.message || 'PDF thumbnail render failed.');
        });
        return () => {
            cancelled = true;
        };
    }, [total]);

    const downloadCurrentPng = () => {
        if (!canvasRef.current) return;
        downloadCanvasPng(canvasRef.current, `${getBaseName(file.name)}-page-${page}.png`);
    };

    return (
        <div className="h-full">
            <PreviewToolbar
                label={`${copy.pdfPage || 'Page'} ${page}${total ? ` / ${total}` : ''}`}
                canPrev={page > 1}
                canNext={page < total}
                onPrev={() => setPage((value) => Math.max(1, value - 1))}
                onNext={() => setPage((value) => Math.min(total, value + 1))}
                extra={(
                    <Button size="small" icon={<Icon name="Download" />} onClick={downloadCurrentPng}>
                        {copy.downloadPng || 'Download PNG'}
                    </Button>
                )}
                copy={copy}
            />
            <div className={cn('grid gap-4', total > 1 ? 'lg:grid-cols-[196px_minmax(0,1fr)]' : 'grid-cols-1')}>
                {total > 1 && (
                    <OfficeThumbnailRail
                        thumbnails={thumbnails}
                        current={page}
                        unit={copy.pdfPage || 'Page'}
                        isFullscreen={isFullscreen}
                        onSelect={(pageNumber) => setPage(pageNumber)}
                    />
                )}
                <div className={cn(
                    'relative flex justify-center overflow-auto rounded-md border border-slate-200 bg-slate-100 p-4',
                    isFullscreen ? 'h-[calc(100vh-210px)] min-h-[480px]' : total > 1 ? 'h-[560px]' : 'min-h-[420px]'
                )}>
                    {loading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60"><Spin /></div>}
                    <canvas ref={canvasRef} className="max-w-full rounded bg-white shadow-sm" />
                </div>
            </div>
        </div>
    );
}

const renderBitmapToCanvas = (canvas, bitmap, cssWidth) => {
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.style.width = `${Math.round(cssWidth)}px`;
    canvas.style.height = `${Math.round(cssWidth * bitmap.height / bitmap.width)}px`;
    const bitmapContext = canvas.getContext('bitmaprenderer');
    if (bitmapContext) {
        bitmapContext.transferFromImageBitmap(bitmap);
        return;
    }
    const context = canvas.getContext('2d');
    context?.clearRect(0, 0, canvas.width, canvas.height);
    context?.drawImage(bitmap, 0, 0);
    bitmap.close?.();
};

const bitmapToDataUrl = (bitmap) => {
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0);
    const url = canvas.toDataURL('image/png');
    bitmap.close?.();
    return url;
};

function OfficeThumbnailRail({ thumbnails, current, unit, onSelect, isFullscreen = false }) {
    return (
        <aside className={cn(
            'shrink-0 overflow-x-hidden overflow-y-auto rounded-md border border-slate-200 bg-white p-2',
            isFullscreen ? 'h-[calc(100vh-210px)] min-h-[480px]' : 'h-[560px]'
        )}>
            <div className="flex w-[176px] flex-col gap-3">
                {thumbnails.map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        className={cn(
                            'rounded-sm border bg-white p-1 text-center text-xs text-slate-600 hover:border-blue-300',
                            current === index + 1 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-200'
                        )}
                        onClick={() => onSelect(index + 1)}
                    >
                        {item ? (
                            <img src={item} alt={`${unit} ${index + 1}`} className="mx-auto max-h-28 max-w-full object-contain" />
                        ) : (
                            <div className="flex h-24 items-center justify-center bg-slate-100 text-slate-400"><Spin size="small" /></div>
                        )}
                        <div className="mt-1">{unit} {index + 1}</div>
                    </button>
                ))}
            </div>
        </aside>
    );
}

function OfficePreview({ file, kind, copy, isFullscreen = false }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const previewFrameRef = useRef(null);
    const viewerRef = useRef(null);
    const engineRef = useRef(null);
    const [position, setPosition] = useState({ current: 1, total: 0 });
    const [previewWidth, setPreviewWidth] = useState(960);
    const [thumbnails, setThumbnails] = useState([]);
    const [loading, setLoading] = useState(false);
    const isPagedOffice = kind === 'docx' || kind === 'pptx';

    useEffect(() => {
        if (!isPagedOffice || !previewFrameRef.current) return undefined;
        const updateWidth = () => {
            const width = previewFrameRef.current?.clientWidth || 960;
            setPreviewWidth(Math.max(360, Math.min(1280, width - 48)));
        };
        updateWidth();
        const observer = new ResizeObserver(updateWidth);
        observer.observe(previewFrameRef.current);
        return () => observer.disconnect();
    }, [isPagedOffice, position.total, isFullscreen]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setPosition({ current: 1, total: 0 });
        setThumbnails([]);
        viewerRef.current?.destroy?.();
        viewerRef.current = null;
        engineRef.current?.destroy?.();
        engineRef.current = null;
        if (containerRef.current) containerRef.current.innerHTML = '';

        const load = async () => {
            const data = await file.arrayBuffer();
            if (kind === 'docx') {
                const { DocxDocument } = await import('@silurus/ooxml/docx');
                const doc = await DocxDocument.load(data, { mode: 'worker' });
                if (cancelled) {
                    doc.destroy();
                    return;
                }
                engineRef.current = doc;
                setPosition({ current: 1, total: doc.pageCount });
                setThumbnails(new Array(doc.pageCount).fill(''));
            } else if (kind === 'pptx') {
                const { PptxPresentation } = await import('@silurus/ooxml/pptx');
                const presentation = await PptxPresentation.load(data, { mode: 'worker' });
                if (cancelled) {
                    presentation.destroy();
                    return;
                }
                engineRef.current = presentation;
                setPosition({ current: 1, total: presentation.slideCount });
                setThumbnails(new Array(presentation.slideCount).fill(''));
            } else {
                const { XlsxViewer } = await import('@silurus/ooxml/xlsx');
                if (cancelled || !containerRef.current) return;
                const viewer = new XlsxViewer(containerRef.current, {
                    onReady: (sheetNames) => setPosition({ current: 1, total: sheetNames.length }),
                    onSheetChange: (index, total) => setPosition({ current: index + 1, total }),
                });
                viewerRef.current = viewer;
                await viewer.load(data);
            }
        };

        load()
            .catch((error) => message.error(error.message || 'Office preview failed.'))
            .finally(() => !cancelled && setLoading(false));

        return () => {
            cancelled = true;
            viewerRef.current?.destroy?.();
            viewerRef.current = null;
            engineRef.current?.destroy?.();
            engineRef.current = null;
            if (containerRef.current && kind === 'xlsx') containerRef.current.innerHTML = '';
        };
    }, [file, kind]);

    useEffect(() => {
        if (!isPagedOffice || !engineRef.current || !canvasRef.current || !position.total) return undefined;
        let cancelled = false;
        const render = async () => {
            setLoading(true);
            const pageIndex = position.current - 1;
            const bitmap = kind === 'docx'
                ? await engineRef.current.renderPageToBitmap(pageIndex, { width: previewWidth, dpr: window.devicePixelRatio || 1 })
                : await engineRef.current.renderSlideToBitmap(pageIndex, { width: previewWidth, dpr: window.devicePixelRatio || 1 });
            if (cancelled) {
                bitmap.close?.();
                return;
            }
            renderBitmapToCanvas(canvasRef.current, bitmap, previewWidth);
        };
        render()
            .catch((error) => message.error(error.message || 'Office preview failed.'))
            .finally(() => !cancelled && setLoading(false));
        return () => {
            cancelled = true;
        };
    }, [isPagedOffice, kind, position.current, position.total, previewWidth]);

    useEffect(() => {
        if (!isPagedOffice || !engineRef.current || !position.total) return undefined;
        let cancelled = false;
        const renderThumbnails = async () => {
            for (let index = 0; index < position.total; index += 1) {
                const bitmap = kind === 'docx'
                    ? await engineRef.current.renderPageToBitmap(index, { width: 150, dpr: 1 })
                    : await engineRef.current.renderSlideToBitmap(index, { width: 150, dpr: 1 });
                if (cancelled) {
                    bitmap.close?.();
                    return;
                }
                const url = bitmapToDataUrl(bitmap);
                setThumbnails((prev) => {
                    const next = [...prev];
                    next[index] = url;
                    return next;
                });
            }
        };
        renderThumbnails().catch((error) => message.error(error.message || 'Thumbnail render failed.'));
        return () => {
            cancelled = true;
        };
    }, [isPagedOffice, kind, position.total]);

    const unit = kind === 'pptx' ? copy.slide || 'Slide' : kind === 'xlsx' ? copy.sheet || 'Sheet' : copy.pdfPage || 'Page';
    const canNavigate = position.total > 1;
    const downloadCurrentPng = () => {
        if (kind === 'xlsx') {
            const sheetCanvas = viewerRef.current?.canvasElement || containerRef.current?.querySelector('canvas');
            if (sheetCanvas) {
                downloadCanvasPng(sheetCanvas, `${getBaseName(file.name)}-sheet-${position.current}.png`);
            } else {
                downloadElementPng(containerRef.current, `${getBaseName(file.name)}-sheet-${position.current}.png`);
            }
            return;
        }
        if (!canvasRef.current || !isPagedOffice) return;
        const pageName = kind === 'pptx' ? 'slide' : 'page';
        const fileName = `${getBaseName(file.name)}-${pageName}-${position.current}.png`;
        downloadCanvasPng(canvasRef.current, fileName);
    };

    return (
        <div className="h-full">
            <PreviewToolbar
                label={`${unit} ${position.current}${position.total ? ` / ${position.total}` : ''}`}
                canPrev={canNavigate && position.current > 1}
                canNext={canNavigate && position.current < position.total}
                onPrev={() => {
                    if (isPagedOffice) setPosition((value) => ({ ...value, current: Math.max(1, value.current - 1) }));
                    if (kind === 'xlsx') viewerRef.current?.prevSheet();
                }}
                onNext={() => {
                    if (isPagedOffice) setPosition((value) => ({ ...value, current: Math.min(value.total, value.current + 1) }));
                    if (kind === 'xlsx') viewerRef.current?.nextSheet();
                }}
                extra={isPagedOffice || kind === 'xlsx' ? (
                    <Button size="small" icon={<Icon name="Download" />} onClick={downloadCurrentPng}>
                        {copy.downloadPng || 'Download PNG'}
                    </Button>
                ) : null}
                copy={copy}
            />
            {isPagedOffice ? (
                <div className={cn('grid gap-4', position.total > 1 ? 'lg:grid-cols-[196px_minmax(0,1fr)]' : 'grid-cols-1')}>
                    {position.total > 1 && (
                        <OfficeThumbnailRail
                            thumbnails={thumbnails}
                            current={position.current}
                            unit={unit}
                            isFullscreen={isFullscreen}
                            onSelect={(pageNumber) => setPosition((value) => ({ ...value, current: pageNumber }))}
                        />
                    )}
                    <div ref={previewFrameRef} className={cn(
                        'relative flex items-start justify-center overflow-auto rounded-md border border-slate-200 bg-slate-100 p-6',
                        isFullscreen ? 'h-[calc(100vh-210px)] min-h-[480px]' : 'h-[560px]'
                    )}>
                        {loading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60"><Spin /></div>}
                        <canvas ref={canvasRef} className="max-w-full rounded bg-white shadow-sm" />
                    </div>
                </div>
            ) : (
                <div ref={containerRef} className={cn(
                    'relative overflow-auto rounded-md border border-slate-200 bg-slate-100 p-4',
                    isFullscreen ? 'h-[calc(100vh-210px)] min-h-[480px]' : 'h-[560px]'
                )}>
                    {loading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60"><Spin /></div>}
                </div>
            )}
        </div>
    );
}

function TextPreview({ file, isCsv, copy }) {
    const tableRef = useRef(null);
    const [text, setText] = useState('');

    useEffect(() => {
        let cancelled = false;
        file.text().then((value) => {
            if (!cancelled) setText(value);
        });
        return () => {
            cancelled = true;
        };
    }, [file]);

    if (isCsv) {
        const rows = parseCsv(text);
        const header = rows[0] || [];
        const body = rows.slice(1);
        return (
            <div>
                <div className="mb-3 flex justify-end">
                    <Button size="small" icon={<Icon name="Download" />} onClick={() => downloadElementPng(tableRef.current, `${getBaseName(file.name)}-csv.png`)}>
                        {copy.downloadPng || 'Download PNG'}
                    </Button>
                </div>
                <div ref={tableRef} className="overflow-auto rounded-md border border-slate-200 bg-white">
                    <table className="min-w-full border-collapse text-left text-xs">
                        <thead className="sticky top-0 bg-slate-100 text-slate-700">
                            <tr>{header.map((cell, index) => <th key={index} className="border-b border-r border-slate-200 px-3 py-2 font-bold">{cell || `Column ${index + 1}`}</th>)}</tr>
                        </thead>
                        <tbody>
                            {body.map((row, rowIndex) => (
                                <tr key={rowIndex} className="odd:bg-white even:bg-slate-50">
                                    {header.map((_, cellIndex) => <td key={cellIndex} className="border-b border-r border-slate-100 px-3 py-2 text-slate-700">{row[cellIndex] || ''}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <pre className="max-h-[520px] overflow-auto rounded-md border border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            {text || copy.loading || 'Loading preview...'}
        </pre>
    );
}

function ImagePreview({ file }) {
    const [url, setUrl] = useState('');
    useEffect(() => {
        const nextUrl = fileToUrl(file);
        setUrl(nextUrl);
        return () => URL.revokeObjectURL(nextUrl);
    }, [file]);
    return <img src={url} alt={file.name} className="mx-auto max-h-[520px] max-w-full rounded-md border border-slate-200 bg-white object-contain" />;
}

function PreviewToolbar({ label, canPrev, canNext, onPrev, onNext, copy, extra = null }) {
    return (
        <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</div>
            <div className="flex flex-wrap justify-end gap-2">
                {extra}
                <Button size="small" disabled={!canPrev} icon={<Icon name="ChevronLeft" />} onClick={onPrev}>{copy.previous || 'Previous'}</Button>
                <Button size="small" disabled={!canNext} icon={<Icon name="ChevronRight" />} onClick={onNext}>{copy.next || 'Next'}</Button>
            </div>
        </div>
    );
}

const createTree = (entries) => {
    const root = { name: 'Root', path: '', type: 'folder', children: [], open: true };
    const folderMap = new Map([['', root]]);
    entries.forEach((entry) => {
        const fullPath = `${entry.path || ''}${entry.file.name}`;
        const parts = fullPath.split('/').filter(Boolean);
        let currentPath = '';
        let parent = root;
        parts.forEach((part, index) => {
            const isFile = index === parts.length - 1;
            currentPath = currentPath ? `${currentPath}/${part}` : part;
            if (isFile) {
                parent.children.push({ name: part, path: currentPath, type: 'file', entry });
            } else {
                let folder = folderMap.get(currentPath);
                if (!folder) {
                    folder = { name: part, path: currentPath, type: 'folder', children: [], open: true };
                    folderMap.set(currentPath, folder);
                    parent.children.push(folder);
                }
                parent = folder;
            }
        });
    });
    return root;
};

function ArchiveBrowser({ archive, copy, onSelect, selectedPath }) {
    const [mode, setMode] = useState('tree');
    const [openFolders, setOpenFolders] = useState(() => new Set(['']));
    const tree = useMemo(() => createTree(archive.entries), [archive.entries]);

    const toggleFolder = (path) => {
        setOpenFolders((prev) => {
            const next = new Set(prev);
            if (next.has(path)) next.delete(path);
            else next.add(path);
            return next;
        });
    };

    const renderNode = (node, depth = 0) => {
        const isFolder = node.type === 'folder';
        const isOpen = openFolders.has(node.path);
        if (isFolder) {
            return (
                <div key={node.path || 'root'}>
                    <button
                        type="button"
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-bold text-slate-700 hover:bg-slate-100"
                        style={{ paddingLeft: `${8 + depth * 24}px` }}
                        onClick={() => toggleFolder(node.path)}
                    >
                        <Icon name={isOpen ? 'ChevronDown' : 'ChevronRight'} className="text-slate-500" />
                        <Icon name="Folder" className="text-slate-500" />
                        <span className="truncate">{node.name}</span>
                    </button>
                    {isOpen && node.children.map((child) => renderNode(child, depth + 1))}
                </div>
            );
        }

        const kind = getKind(node.entry.file);
        return (
            <button
                key={node.path}
                type="button"
                className={cn('flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-slate-100', selectedPath === node.path && 'bg-blue-50 text-blue-700')}
                style={{ paddingLeft: `${8 + depth * 24}px` }}
                onClick={() => onSelect(node.entry, node.path)}
            >
                <Icon name={getFileIcon(kind)} className="shrink-0 text-slate-500" />
                <span className="min-w-0 flex-1 truncate">{node.name}</span>
                <span className="shrink-0 text-xs text-slate-400">{formatSize(node.entry.file.size || 0)}</span>
                <Icon name="Download" className="shrink-0 text-slate-400" onClick={(event) => {
                    event.stopPropagation();
                    node.entry.file.extract().then(downloadFile);
                }} />
            </button>
        );
    };

    const currentItems = mode === 'folder' ? tree.children : [tree];

    return (
        <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-600">
                <span>{copy.view || 'View:'}</span>
                <Radio.Group size="small" value={mode} onChange={(event) => setMode(event.target.value)}>
                    <Radio.Button value="folder"><Icon name="Folder" /> {copy.folder || 'Folder'}</Radio.Button>
                    <Radio.Button value="tree"><Icon name="ListTree" /> {copy.tree || 'Tree'}</Radio.Button>
                </Radio.Group>
            </div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-700">
                <Icon name="Folder" />
                {copy.root || 'Root'}
            </div>
            <div className="rounded-md bg-white p-3">
                {currentItems.map((node) => renderNode(node, mode === 'folder' ? 0 : 0))}
            </div>
        </div>
    );
}

function FilePreview({ file, kind, copy, isFullscreen = false }) {
    if (!file) {
        return <div className={cn(
            'flex items-center justify-center rounded-md border border-dashed border-slate-200 bg-white text-sm text-slate-400',
            isFullscreen ? 'min-h-[480px]' : 'min-h-[360px]'
        )}>{copy.selectFile || 'Select a file to preview it here.'}</div>;
    }
    if (kind === 'pdf') return <PdfPreview file={file} copy={copy} isFullscreen={isFullscreen} />;
    if (officeKinds.has(kind)) return <OfficePreview file={file} kind={kind} copy={copy} isFullscreen={isFullscreen} />;
    if (kind === 'csv') return <TextPreview file={file} isCsv copy={copy} />;
    if (kind === 'text') return <TextPreview file={file} copy={copy} />;
    if (kind === 'image') return <ImagePreview file={file} />;
    return <div className="flex min-h-[360px] items-center justify-center rounded-md border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-400">{copy.unsupported || 'This file type can be downloaded, but preview is not supported yet.'}</div>;
}

const getPreviewKey = (file, kind) => {
    if (!file) return 'empty-preview';
    return [kind, file.name || 'file', file.size || 0, file.lastModified || 0].join(':');
};

export default function ViewerTool({ copy = {} }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [source, setSource] = useState(null);
    const [archive, setArchive] = useState(null);
    const [selectedArchiveFile, setSelectedArchiveFile] = useState(null);
    const [selectedPath, setSelectedPath] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const kind = source ? getKind(source) : '';
    const previewFile = selectedArchiveFile || source;
    const previewKind = previewFile ? getKind(previewFile) : '';

    useEffect(() => () => {
        archive?.reader?.close?.();
    }, [archive]);

    useEffect(() => {
        if (!isFullscreen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setIsFullscreen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isFullscreen]);

    const openArchive = async (file) => {
        setLoading(true);
        setArchive(null);
        setSelectedArchiveFile(null);
        setSelectedPath('');
        try {
            const { Archive } = await import('libarchive.js');
            Archive.init({ workerUrl: '/libarchive.js/dist/worker-bundle.js' });
            const reader = await Archive.open(file);
            const encrypted = await reader.hasEncryptedData();
            if (encrypted) messageApi.warning(copy.encryptedArchive || 'This archive appears to be encrypted and cannot be previewed without a password.');
            const files = await reader.getFilesArray();
            setArchive({ reader, entries: files.filter((entry) => entry.file && entry.file.name) });
        } catch (error) {
            messageApi.error(error.message || 'Archive load failed.');
        } finally {
            setLoading(false);
        }
    };

    const addFile = async (file) => {
        archive?.reader?.close?.();
        setSource(file);
        setArchive(null);
        setSelectedArchiveFile(null);
        setSelectedPath('');
        const nextKind = getKind(file);
        if (nextKind === 'archive') await openArchive(file);
        if (nextKind === 'legacy-office') messageApi.warning(copy.legacyOfficeNote || 'Legacy DOC, XLS, and PPT files are not supported by this viewer.');
        return false;
    };

    const clearFile = () => {
        archive?.reader?.close?.();
        setSource(null);
        setArchive(null);
        setSelectedArchiveFile(null);
        setSelectedPath('');
        setLoading(false);
        setIsFullscreen(false);
    };

    const selectArchiveEntry = async (entry, path) => {
        setLoading(true);
        setSelectedPath(path);
        try {
            const file = await entry.file.extract();
            setSelectedArchiveFile(file);
        } catch (error) {
            messageApi.error(error.message || 'Extract failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {contextHolder}
            {!source && (
                <div className="border-t border-t-gray-600 p-8 rounded-md shadow-md polka">
                    <div className="bg-white p-2 rounded-md shadow-md">
                        <Dragger
                            accept={accept}
                            beforeUpload={addFile}
                            showUploadList={false}
                            rootClassName="rounded-md bg-white shadow-md"
                            className="min-h-[160px]"
                        >
                            <div className="p-5">
                                <p className="text-2xl"><Icon name="ImagePlus" size={32} className="opacity-60" /></p>
                                <p className="px-4 text-sm">{copy.emptyTitle || 'Click or drag a document, PDF, CSV, ZIP, or RAR file here'}</p>
                                <p className="p-4 pb-0 text-sm opacity-70">{copy.emptyHint || 'DOCX / XLSX / PPTX / CSV / PDF / ZIP / RAR'}</p>
                            </div>
                        </Dragger>
                    </div>
                </div>
            )}
            {source && (
                <div className={cn(
                    'rounded-md bg-white p-4 shadow-md border-t border-t-gray-600',
                    isFullscreen && 'fixed inset-0 z-50 overflow-auto rounded-none p-4 md:p-6'
                )}>
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                                <Icon name={getFileIcon(kind)} size={22} />
                            </div>
                            <div className="min-w-0">
                                <div className="truncate text-sm font-bold text-slate-800">{source.name}</div>
                                <div className="text-xs text-slate-400">{getViewerLabel(kind)} · {formatSize(source.size || 0)}</div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                type={isFullscreen ? 'default' : 'primary'}
                                icon={<Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} />}
                                onClick={() => setIsFullscreen((value) => !value)}
                                className={cn(
                                    !isFullscreen && 'bg-indigo-600 shadow-sm hover:!bg-indigo-500',
                                    isFullscreen && 'border-indigo-200 text-indigo-600 hover:!border-indigo-400 hover:!text-indigo-700'
                                )}
                            >
                                {isFullscreen ? copy.restore || 'Restore' : copy.fullscreen || 'Full Screen'}
                            </Button>
                            <Upload accept={accept} showUploadList={false} beforeUpload={addFile}>
                                <Button icon={<Icon name="Upload" />}>{copy.addFile || 'Add File'}</Button>
                            </Upload>
                            <Button icon={<Icon name="Download" />} onClick={() => downloadFile(selectedArchiveFile || source)}>
                                {selectedArchiveFile ? copy.downloadSelected || 'Download Selected' : copy.downloadOriginal || 'Download Original'}
                            </Button>
                            <Button icon={<Icon name="Eraser" />} onClick={clearFile}>
                                {copy.clear || 'Clear'}
                            </Button>
                        </div>
                    </div>
                    {kind === 'archive' ? (
                        <div className={cn(
                            'grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]',
                            isFullscreen && 'lg:h-[calc(100vh-165px)]'
                        )}>
                            <section className="overflow-auto rounded-md bg-slate-50/80 p-4">
                                <h2 className="mb-4 text-lg font-extrabold text-slate-800">{copy.archiveContents || 'Archive Contents'}</h2>
                                {loading && !archive ? (
                                    <div className="flex min-h-[240px] items-center justify-center"><Spin tip={copy.archiveLoading || 'Reading archive...'} /></div>
                                ) : (
                                    archive && <ArchiveBrowser archive={archive} copy={copy} onSelect={selectArchiveEntry} selectedPath={selectedPath} />
                                )}
                            </section>
                            <section className="overflow-auto rounded-md bg-slate-50/80 p-4">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-extrabold text-slate-800">{copy.preview || 'Preview'}</h2>
                                    {selectedArchiveFile && <Button type="primary" icon={<Icon name="Download" />} onClick={() => downloadFile(selectedArchiveFile)}>{copy.download || 'Download'}</Button>}
                                </div>
                                <div className="relative">
                                    {loading && <div className="absolute inset-0 z-20 flex items-center justify-center rounded-md bg-white/70"><Spin /></div>}
                                    <FilePreview key={getPreviewKey(selectedArchiveFile, previewKind)} file={selectedArchiveFile} kind={previewKind} copy={copy} isFullscreen={isFullscreen} />
                                </div>
                            </section>
                        </div>
                    ) : (
                        <FilePreview key={getPreviewKey(previewFile, previewKind)} file={previewFile} kind={previewKind} copy={copy} isFullscreen={isFullscreen} />
                    )}
                    <div className="mt-4 rounded-md bg-slate-50 p-3 text-xs leading-6 text-slate-500">
                        <p>{copy.officeNote || 'Best for Office Open XML files: DOCX, XLSX, and PPTX.'}</p>
                        <p>{copy.legacyOfficeNote || 'Legacy DOC, XLS, and PPT files are not supported by this viewer.'}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
