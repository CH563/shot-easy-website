import React, { useState } from 'react';
import { Button, Input, Tabs, message } from 'antd';
import { DeleteOutlined, DownloadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { UploadDragger } from './UploadDragger';
import { formatSize, toDownloadFile } from '@lib/utils';
import { isPdfFile, loadPdfInfo, describeLoadError, parsePageRanges, splitPdfBytes, splitPdfEveryPage } from '@lib/pdfToolsCore';

const downloadPdfBytes = (bytes, name) => {
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    toDownloadFile(url, name);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
};

const baseName = (name) => name.replace(/\.pdf$/i, '');

export default function PdfSplit({ ui }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [mode, setMode] = useState('extract');
    const [file, setFile] = useState(null);
    const [ranges, setRanges] = useState('');
    const [splitting, setSplitting] = useState(false);
    const [extractResult, setExtractResult] = useState(null);
    const [zipDone, setZipDone] = useState(false);

    const addFile = async (incoming) => {
        if (!isPdfFile(incoming)) {
            messageApi.error(ui.errorNotPdf);
            return Promise.reject();
        }
        try {
            const info = await loadPdfInfo(incoming);
            setFile(info);
            setExtractResult(null);
            setZipDone(false);
        } catch (error) {
            messageApi.error(describeLoadError(error, ui));
        }
        return Promise.reject();
    };

    const clearFile = () => {
        setFile(null);
        setRanges('');
        setExtractResult(null);
        setZipDone(false);
    };

    const rangeErrorMessage = (error) => {
        if (error?.message === 'empty') return ui.errorEmptyRanges;
        if (error?.message === 'outOfRange') return ui.errorOutOfRange;
        if (error?.message === 'invalid') return ui.errorInvalidRanges;
        return ui.errorSplit;
    };

    const extractPages = async () => {
        if (!file) {
            messageApi.error(ui.errorNoFile);
            return;
        }
        let indices;
        try {
            indices = parsePageRanges(ranges, file.pages);
        } catch (error) {
            messageApi.error(rangeErrorMessage(error));
            return;
        }
        setSplitting(true);
        try {
            const result = await splitPdfBytes(file.bytes, indices);
            setExtractResult(result);
        } catch (error) {
            messageApi.error(ui.errorSplit);
        } finally {
            setSplitting(false);
        }
    };

    const splitEveryPage = async () => {
        if (!file) {
            messageApi.error(ui.errorNoFile);
            return;
        }
        setSplitting(true);
        try {
            const pages = await splitPdfEveryPage(file.bytes);
            const jszip = await import('jszip');
            const zip = new jszip.default();
            pages.forEach((page) => {
                zip.file(`${baseName(file.name)}-page-${String(page.page).padStart(2, '0')}.pdf`, page.bytes);
            });
            const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
            toDownloadFile(URL.createObjectURL(blob), `${baseName(file.name)}-pages.zip`);
            setZipDone(true);
        } catch (error) {
            messageApi.error(ui.errorSplit);
        } finally {
            setSplitting(false);
        }
    };

    const fileCard = file && (
        <div className="rounded-md bg-white shadow-md px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
                <span className="text-red-500 text-lg shrink-0"><FilePdfOutlined /></span>
                <div className="min-w-0">
                    <div className="font-semibold truncate">{file.name}</div>
                    <div className="text-xs text-slate-500">{file.pages} {ui.pages} · {formatSize(file.size)}</div>
                </div>
            </div>
            <Button size="small" danger icon={<DeleteOutlined />} onClick={clearFile} aria-label={ui.clearFile} />
        </div>
    );

    const extractTab = (
        <div className="grid gap-4">
            <UploadDragger
                accept=".pdf,application/pdf"
                beforeUpload={addFile}
                title={ui.addFileTitle}
                desc={ui.addFileDesc}
                pasteHint=""
            />
            {fileCard}
            {file && (
                <div className="grid gap-1">
                    <label className="text-sm font-semibold">{ui.rangesLabel}</label>
                    <Input value={ranges} onChange={(event) => setRanges(event.target.value)} placeholder={ui.rangesPlaceholder} size="large" />
                    <p className="text-xs text-slate-500">{ui.rangesHint}</p>
                </div>
            )}
            <div className="flex flex-wrap gap-2">
                <Button type="primary" size="large" loading={splitting} disabled={!file} onClick={extractPages}>{splitting ? ui.extracting : ui.extractButton}</Button>
            </div>
            {extractResult && file && (
                <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm">
                    <p className="font-semibold mb-1">{ui.splitReady}</p>
                    <p className="text-slate-600 mb-3">{ui.splitSize}: {formatSize(extractResult.size)} · {extractResult.pages} {ui.pages}</p>
                    <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadPdfBytes(extractResult.bytes, `${baseName(file.name)}-split.pdf`)}>{ui.downloadSplit}</Button>
                </div>
            )}
        </div>
    );

    const everyPageTab = (
        <div className="grid gap-4">
            <UploadDragger
                accept=".pdf,application/pdf"
                beforeUpload={addFile}
                title={ui.addFileTitle}
                desc={ui.addFileDesc}
                pasteHint=""
            />
            {fileCard}
            {file && <p className="text-sm text-slate-600">{ui.everyPageDesc}</p>}
            <div className="flex flex-wrap gap-2">
                <Button type="primary" size="large" loading={splitting} disabled={!file} onClick={splitEveryPage}>{splitting ? ui.splitting : ui.splitEveryButton}</Button>
            </div>
            {zipDone && (
                <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm">
                    <p className="font-semibold">{ui.zipReady}</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased polka bg-white">
            {contextHolder}
            <Tabs
                activeKey={mode}
                onChange={(key) => setMode(key)}
                size="large"
                className="px-4 pt-2"
                items={[
                    { key: 'extract', label: ui.extractTab, children: <div className="pb-6 pt-2">{extractTab}</div> },
                    { key: 'everyPage', label: ui.everyPageTab, children: <div className="pb-6 pt-2">{everyPageTab}</div> }
                ]}
            />
        </div>
    );
}
