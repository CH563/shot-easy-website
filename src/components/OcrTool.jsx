import React, { useEffect, useMemo, useRef, useState } from 'react';
import { message } from 'antd';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { Icon } from './Icons';
import usePaste from '@lib/usePaste';
import { modKey } from '@lib/utils';

const FONT_URL = 'https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf';
const imageTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp'];
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const baseName = (name = 'ocr-document') => name.replace(/\.[^.]+$/, '') || 'ocr-document';
const polyBounds = (poly = []) => {
  const points = Array.isArray(poly[0]) ? poly : [];
  const xs = points.map((p) => Number(p[0]) || 0);
  const ys = points.map((p) => Number(p[1]) || 0);
  if (!xs.length) return { x: 0, y: 0, right: 0, bottom: 0 };
  return { x: Math.min(...xs), y: Math.min(...ys), right: Math.max(...xs), bottom: Math.max(...ys) };
};
const fitTextSize = (font, text, preferredSize, maxWidth) => {
  let size = preferredSize;
  try {
    const width = font.widthOfTextAtSize(text, size);
    if (width > maxWidth && width > 0) size = Math.max(4, size * (maxWidth / width));
  } catch { /* drawText will surface unsupported glyphs */ }
  return size;
};
const toBlob = (canvas, type = 'image/jpeg', quality = .92) => new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Canvas export failed')), type, quality));

async function loadPdfPages(file, onProgress) {
  const pdfjs = await import('pdfjs-dist');
  const worker = await import('pdfjs-dist/build/pdf.worker.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages = [];
  for (let index = 1; index <= pdf.numPages; index += 1) {
    onProgress?.(index, pdf.numPages);
    const page = await pdf.getPage(index);
    const baseViewport = page.getViewport({ scale: 1 });
    const scale = Math.min(2, 2200 / Math.max(baseViewport.width, baseViewport.height));
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff'; context.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: context, viewport, background: 'white' }).promise;
    const blob = await toBlob(canvas);
    pages.push({ id: crypto.randomUUID(), name: `${baseName(file.name)}-${index}.jpg`, blob, url: URL.createObjectURL(blob), width: canvas.width, height: canvas.height, items: [], status: 'ready' });
    page.cleanup();
  }
  await pdf.destroy();
  return pages;
}

async function imagePage(file) {
  const bitmap = await createImageBitmap(file);
  const page = { id: crypto.randomUUID(), name: file.name, blob: file, url: URL.createObjectURL(file), width: bitmap.width, height: bitmap.height, items: [], status: 'ready' };
  bitmap.close();
  return page;
}

export default function OcrTool({ lang = 'en' }) {
  const zh = lang === 'zh-CN';
  const t = useMemo(() => zh ? {
    drop: '拖入图片、扫描 PDF，或直接粘贴图片', choose: '选择文件', support: '支持 JPG、PNG、WebP、BMP、PDF · 单文件处理', paste: '粘贴剪贴板图片', pasteBusy: '请等待当前识别完成后再粘贴', copy: '复制全文', copied: '全文已复制', copyFailed: '复制失败，请重试', local: '文件不会离开此设备', ready: '待识别', recognizing: '正在识别', done: '已识别', failed: '识别失败', start: '开始 OCR', export: '导出可搜索 PDF', reset: '重新导入', page: '页面', result: '识别文本', empty: '识别后可在这里逐行校对', model: '首次使用需下载 OCR 模型，之后浏览器会缓存', loadingModel: '正在加载 PaddleOCR 模型…', importing: '正在解析 PDF', allText: '全文编辑', overlay: '页面校对', confidence: '置信度', noText: '未识别到文字', exportWait: '正在生成 PDF…', fontWait: '正在准备中文字体…', add: '更换文件', remove: '删除本页', privacy: '本地 OCR · 无文件上传',
  } : {
    drop: 'Drop an image or scanned PDF, or paste an image', choose: 'Choose file', support: 'JPG, PNG, WebP, BMP, PDF · one file at a time', paste: 'Paste an image', pasteBusy: 'Wait for the current OCR to finish before pasting', copy: 'Copy full text', copied: 'Full text copied', copyFailed: 'Copy failed. Please try again.', local: 'Files never leave this device', ready: 'Ready', recognizing: 'Recognizing', done: 'Recognized', failed: 'Failed', start: 'Start OCR', export: 'Export searchable PDF', reset: 'Start over', page: 'Page', result: 'Recognized text', empty: 'Run OCR, then correct each line here', model: 'The OCR model downloads once and is cached by your browser', loadingModel: 'Loading PaddleOCR model…', importing: 'Rendering PDF', allText: 'Full text', overlay: 'Page review', confidence: 'Confidence', noText: 'No text was detected', exportWait: 'Creating PDF…', fontWait: 'Preparing document font…', add: 'Replace file', remove: 'Remove page', privacy: 'Local OCR · no file upload',
  }, [zh]);

  const inputRef = useRef(null);
  const ocrRef = useRef(null);
  const pagesRef = useRef([]);
  const [pages, setPages] = useState([]);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [mode, setMode] = useState('overlay');
  const [drag, setDrag] = useState(false);
  const [copied, setCopied] = useState(false);
  const pasteKey = modKey();
  pagesRef.current = pages;

  useEffect(() => () => {
    pagesRef.current.forEach((page) => URL.revokeObjectURL(page.url));
    ocrRef.current?.dispose?.();
  }, []);

  const importFiles = async (fileList) => {
    const file = [...fileList].find((item) => item.type === 'application/pdf' || imageTypes.includes(item.type) || /\.(png|jpe?g|webp|bmp|pdf)$/i.test(item.name));
    if (!file) return message.warning(zh ? '请选择图片或 PDF 文件' : 'Choose an image or a PDF');
    setBusy(true);
    try {
      const next = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
        ? await loadPdfPages(file, (current, total) => setProgress(`${t.importing} ${current}/${total}`))
        : [await imagePage(file)];
      pagesRef.current.forEach((page) => URL.revokeObjectURL(page.url));
      pagesRef.current = next;
      setPages(next);
      setActive(0);
      await recognize(next, true);
    } catch (error) { message.error(error.message || 'Import failed'); }
    finally { setBusy(false); setProgress(''); }
  };

  usePaste((file) => {
    if (!file) return;
    if (busy) {
      message.info(t.pasteBusy);
      return;
    }
    importFiles([file]);
  }, [busy, zh]);

  const getOcr = async () => {
    if (ocrRef.current) return ocrRef.current;
    setProgress(t.loadingModel);
    const { PaddleOCR } = await import('@paddleocr/paddleocr-js');
    ocrRef.current = await PaddleOCR.create({
      lang: zh ? 'ch' : 'en',
      ocrVersion: 'PP-OCRv5',
      ortOptions: {
        backend: 'wasm',
        wasmPaths: 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/',
        numThreads: 1,
        simd: true,
      },
    });
    return ocrRef.current;
  };

  const recognize = async (targetPages = pages, allowWhileImporting = false) => {
    if (!targetPages.length || (busy && !allowWhileImporting)) return;
    setBusy(true);
    try {
      const ocr = await getOcr();
      for (let index = 0; index < targetPages.length; index += 1) {
        const target = targetPages[index];
        const pageIndex = pagesRef.current.findIndex((page) => page.id === target.id);
        if (pageIndex < 0) continue;
        setActive(pageIndex); setProgress(`${t.recognizing} ${index + 1}/${targetPages.length}`);
        setPages((old) => old.map((page) => page.id === target.id ? { ...page, status: 'recognizing' } : page));
        try {
          const [result] = await ocr.predict(target.blob, { textRecScoreThresh: .35 });
          const items = (result?.items || []).map((item, itemIndex) => ({ ...item, id: `${target.id}-${itemIndex}`, text: item.text || '' }));
          setPages((old) => old.map((page) => page.id === target.id ? { ...page, items, status: 'done' } : page));
        } catch (error) {
          setPages((old) => old.map((page) => page.id === target.id ? { ...page, status: 'failed', error: error.message } : page));
          message.error(error.message || (zh ? '当前页面识别失败' : 'Page recognition failed'));
        }
      }
    } catch (error) { message.error(error.message || 'OCR initialization failed'); }
    finally { setBusy(false); setProgress(''); }
  };

  const updateItem = (pageIndex, id, text) => setPages((old) => old.map((page, index) => index === pageIndex ? { ...page, items: page.items.map((item) => item.id === id ? { ...item, text } : item) } : page));
  const updateFullText = (value) => {
    const lines = value.split('\n');
    setPages((old) => old.map((page, index) => index === active ? { ...page, items: page.items.map((item, i) => ({ ...item, text: lines[i] ?? '' })) } : page));
  };
  const copyFullText = async () => {
    const text = page.items.map((item) => item.text).join('\n').trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      message.success(t.copied);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      message.error(t.copyFailed);
    }
  };
  const removePage = (index) => {
    URL.revokeObjectURL(pages[index].url);
    setPages((old) => old.filter((_, i) => i !== index)); setActive((old) => Math.max(0, Math.min(old, pages.length - 2)));
  };

  const exportPdf = async () => {
    if (!pages.length || busy) return;
    setBusy(true); setProgress(t.exportWait);
    try {
      const pdf = await PDFDocument.create();
      pdf.registerFontkit(fontkit);
      pdf.setTitle(`${baseName(pages[0].name)} OCR`);
      pdf.setCreator('ShotEasy OCR');
      pdf.setProducer('ShotEasy PDF Editor');
      let font;
      const needsUnicodeFont = pages.some((source) => source.items.some((item) => /[^\u0000-\u00ff]/.test(item.text || '')));
      try {
        setProgress(t.fontWait);
        if (!needsUnicodeFont) font = await pdf.embedFont(StandardFonts.Helvetica);
        else {
          const bytes = await fetch(FONT_URL).then((response) => { if (!response.ok) throw new Error('Font download failed'); return response.arrayBuffer(); });
          font = await pdf.embedFont(bytes, { subset: false });
        }
      } catch { font = await pdf.embedFont(StandardFonts.Helvetica); }
      for (let index = 0; index < pages.length; index += 1) {
        setProgress(`${t.exportWait} ${index + 1}/${pages.length}`);
        const source = pages[index];
        const maxSide = 842; const scale = Math.min(1, maxSide / Math.max(source.width, source.height));
        const width = source.width * scale; const height = source.height * scale;
        const page = pdf.addPage([width, height]);
        page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 1, 1) });
        source.items.forEach((item) => {
          if (!item.text?.trim()) return;
          const box = polyBounds(item.poly);
          const boxHeight = Math.max(7, (box.bottom - box.y) * scale);
          const boxWidth = Math.max(8, (box.right - box.x) * scale);
          const lines = item.text.split(/\r?\n/).filter((line) => line.trim());
          const lineHeight = boxHeight / Math.max(1, lines.length);
          lines.forEach((line, lineIndex) => {
            const preferredSize = clamp(lineHeight * .78, 5, 36);
            const size = fitTextSize(font, line, preferredSize, boxWidth);
            const x = clamp(box.x * scale, 0, Math.max(0, width - 4));
            const y = clamp(height - box.bottom * scale + (lines.length - lineIndex - 1) * lineHeight + Math.max(0, (lineHeight - size) * .35), 0, Math.max(0, height - size));
            page.drawText(line, { x, y, size, font, color: rgb(.08, .1, .14) });
          });
        });
      }
      const blob = new Blob([await pdf.save()], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${baseName(pages[0].name)}-ocr.pdf`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (error) { message.error(error.message || 'PDF export failed'); }
    finally { setBusy(false); setProgress(''); }
  };

  if (!pages.length) return <section className="mx-auto max-w-5xl">
    <div onDragEnter={() => setDrag(true)} onDragLeave={() => setDrag(false)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); setDrag(false); importFiles(event.dataTransfer.files); }} className={`group relative flex min-h-[390px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-white/80 px-6 text-center shadow-sm transition ${drag ? 'border-blue-500 bg-blue-50/80' : 'border-slate-200 hover:border-blue-400 hover:shadow-md'}`} onClick={() => inputRef.current?.click()}>
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#bfdbfe_1px,transparent_1px)] [background-size:18px_18px]"></div>
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-[0_16px_40px_rgba(37,99,235,.28)] transition group-hover:-translate-y-1"><Icon name="ScanText" size={36} /></div>
      <h2 className="relative text-2xl font-bold text-slate-800">{t.drop}</h2><p className="relative mt-2 text-sm text-slate-500">{t.support}</p>
      <button className="relative mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700">{t.choose}</button>
      <div className="relative mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500"><span>{zh ? '或' : 'or'}</span><kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-1 font-semibold text-slate-600 shadow-sm">{pasteKey}</kbd><span>+</span><kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-1 font-semibold text-slate-600 shadow-sm">V</kbd><span>{t.paste}</span></div>
      <div className="relative mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-700"><Icon name="ShieldCheck" size={15} />{t.local}</div>
      <input ref={inputRef} className="hidden" type="file" accept="image/png,image/jpeg,image/webp,image/bmp,application/pdf" onChange={(event) => importFiles(event.target.files)} />
    </div>
    <p className="mt-3 text-center text-xs text-slate-400">{t.model}</p>
  </section>;

  const page = pages[active];
  return <section className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,.08)]">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700"><Icon name="ShieldCheck" size={15} />{t.privacy}</div>
      <div className="flex flex-wrap gap-2">
        <span className="hidden items-center gap-1 text-[11px] text-slate-400 md:inline-flex"><kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-1 font-semibold">{pasteKey}</kbd>+<kbd className="rounded border border-slate-200 bg-slate-50 px-1.5 py-1 font-semibold">V</kbd>{t.paste}</span>
        <button onClick={() => inputRef.current?.click()} disabled={busy} className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs font-bold leading-none text-slate-600 hover:bg-slate-50 disabled:opacity-50"><span className="text-sm leading-none">＋</span>{t.add}</button>
        <button onClick={() => recognize()} disabled={busy} className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-xs font-bold leading-none text-white hover:bg-blue-700 disabled:opacity-50"><Icon name="ScanText" size={14} /> <span>{progress || t.start}</span></button>
        <button onClick={exportPdf} disabled={busy || !pages.some((item) => item.status === 'done')} className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-xs font-bold leading-none text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-35"><Icon name="Download" size={14} /> <span>{t.export}</span></button>
        <input ref={inputRef} className="hidden" type="file" accept="image/png,image/jpeg,image/webp,image/bmp,application/pdf" onChange={(event) => { importFiles(event.target.files); event.target.value = ''; }} />
      </div>
    </div>
    {busy && <div className="h-0.5 overflow-hidden bg-blue-100"><div className="h-full w-1/3 animate-[ocrprogress_1.2s_ease-in-out_infinite] bg-blue-600"></div></div>}
    <div className="grid min-h-[620px] lg:grid-cols-[150px_minmax(0,1fr)_310px]">
      <aside className="border-b border-slate-100 bg-slate-50/70 p-3 lg:border-b-0 lg:border-r">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">{pages.length} {t.page}</div>
        <div className="flex gap-2 overflow-x-auto lg:max-h-[575px] lg:flex-col lg:overflow-y-auto">
          {pages.map((item, index) => <button key={item.id} onClick={() => setActive(index)} className={`relative min-w-[92px] overflow-hidden rounded-md border-2 bg-white text-left transition ${index === active ? 'border-blue-500 shadow-sm' : 'border-transparent hover:border-blue-200'}`}>
            <img src={item.url} className="h-24 w-full object-contain bg-white" alt="" /><span className="block truncate border-t px-2 py-1 text-[10px] text-slate-500">{index + 1}. {item.status === 'done' ? t.done : item.status === 'recognizing' ? t.recognizing : item.status === 'failed' ? t.failed : t.ready}</span>
          </button>)}
        </div>
      </aside>
      <div className="min-w-0 bg-slate-100/70 p-4 md:p-6">
        <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2"><div className="flex rounded-md bg-white p-1 text-xs shadow-sm"><button onClick={() => setMode('overlay')} className={`rounded px-3 py-1.5 font-semibold ${mode === 'overlay' ? 'bg-blue-50 text-blue-700' : 'text-slate-500'}`}>{t.overlay}</button><button onClick={() => setMode('text')} className={`rounded px-3 py-1.5 font-semibold ${mode === 'text' ? 'bg-blue-50 text-blue-700' : 'text-slate-500'}`}>{t.allText}</button></div>{mode === 'text' && <button type="button" onClick={copyFullText} disabled={!page.items.some((item) => item.text?.trim())} title={copied ? t.copied : t.copy} aria-label={copied ? t.copied : t.copy} className={`inline-flex h-8 w-8 items-center justify-center rounded-md border shadow-sm transition ${copied ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-600'} disabled:cursor-not-allowed disabled:opacity-35`}><Icon name={copied ? 'Check' : 'Copy'} size={15} /></button>}</div><button onClick={() => removePage(active)} className="text-xs text-slate-400 hover:text-red-500">{t.remove}</button></div>
        {mode === 'overlay' ? <div className="relative mx-auto w-fit max-w-full overflow-hidden rounded-sm bg-white shadow-lg" style={{ aspectRatio: `${page.width}/${page.height}`, width: `min(100%, ${page.width}px)` }}>
          <img src={page.url} className="block h-full w-full object-contain" alt={page.name} />
          {page.items.map((item) => { const b = polyBounds(item.poly); return <textarea key={item.id} value={item.text} onChange={(event) => updateItem(active, item.id, event.target.value)} title={`${t.confidence}: ${Math.round((item.score || 0) * 100)}%`} className="absolute resize-none overflow-hidden border border-transparent bg-blue-50/10 px-0.5 text-transparent caret-blue-600 outline-none transition hover:border-blue-400 hover:bg-blue-50/80 hover:text-slate-900 focus:z-10 focus:border-blue-600 focus:bg-white/95 focus:text-slate-900" style={{ left: `${b.x / page.width * 100}%`, top: `${b.y / page.height * 100}%`, width: `${Math.max(2, (b.right - b.x) / page.width * 100)}%`, height: `${Math.max(1.6, (b.bottom - b.y) / page.height * 100)}%`, fontSize: `${clamp((b.bottom - b.y) / page.height * 620 * .65, 8, 24)}px`, lineHeight: 1.05 }} />; })}
          {!page.items.length && <div className="absolute inset-0 flex items-center justify-center bg-slate-900/25"><span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-600 shadow">{page.status === 'done' ? t.noText : t.empty}</span></div>}
        </div> : <textarea value={page.items.map((item) => item.text).join('\n')} onChange={(event) => updateFullText(event.target.value)} placeholder={t.empty} className="min-h-[520px] w-full resize-none rounded-md border border-slate-200 bg-white p-5 font-mono text-sm leading-7 text-slate-700 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />}
      </div>
      <aside className="border-t border-slate-100 p-4 lg:border-l lg:border-t-0">
        <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold text-slate-800">{t.result}</h3><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] text-slate-500">{page.items.length}</span></div>
        <div className="max-h-[555px] space-y-2 overflow-y-auto pr-1">{page.items.length ? page.items.map((item) => <label key={item.id} className="block rounded-md border border-slate-100 bg-slate-50/70 p-2 focus-within:border-blue-300 focus-within:bg-white"><textarea rows={Math.max(1, Math.ceil(item.text.length / 22))} value={item.text} onChange={(event) => updateItem(active, item.id, event.target.value)} className="w-full resize-none bg-transparent text-xs leading-5 text-slate-700 outline-none" /><span className="mt-1 block text-[9px] text-slate-400">{t.confidence} {Math.round((item.score || 0) * 100)}%</span></label>) : <div className="rounded-md border border-dashed border-slate-200 px-4 py-10 text-center text-xs leading-6 text-slate-400">{t.empty}</div>}</div>
      </aside>
    </div>
    <style>{`@keyframes ocrprogress{0%{transform:translateX(-100%)}50%{transform:translateX(150%)}100%{transform:translateX(400%)}}`}</style>
  </section>;
}
