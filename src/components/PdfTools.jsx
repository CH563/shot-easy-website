import React, { useState } from 'react';
import { Button, Tabs, message } from 'antd';
import { UpOutlined, DownOutlined, DeleteOutlined, DownloadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { UploadDragger } from './UploadDragger';
import { formatSize, toDownloadFile } from '@lib/utils';
import { isPdfFile, loadPdfInfo, describeLoadError, mergePdfBytes, compressPdfBytes } from '@lib/pdfToolsCore';

const downloadPdfBytes = (bytes, name) => {
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    toDownloadFile(url, name);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
};

export default function PdfTools({ ui }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [mode, setMode] = useState('merge');
    const [mergeFiles, setMergeFiles] = useState([]);
    const [merging, setMerging] = useState(false);
    const [mergedResult, setMergedResult] = useState(null);
    const [compressFile, setCompressFile] = useState(null);
    const [compressing, setCompressing] = useState(false);
    const [compressedResult, setCompressedResult] = useState(null);

    const addMergeFiles = async (file) => {
        if (!isPdfFile(file)) {
            messageApi.error(ui.errorNotPdf);
            return Promise.reject();
        }
        try {
            const info = await loadPdfInfo(file);
            setMergeFiles((prev) => [...prev, info]);
            setMergedResult(null);
        } catch (error) {
            messageApi.error(describeLoadError(error, ui));
        }
        return Promise.reject();
    };

    const addCompressFile = async (file) => {
        if (!isPdfFile(file)) {
            messageApi.error(ui.errorNotPdf);
            return Promise.reject();
        }
        try {
            const info = await loadPdfInfo(file);
            setCompressFile(info);
            setCompressedResult(null);
        } catch (error) {
            messageApi.error(describeLoadError(error, ui));
        }
        return Promise.reject();
    };

    const moveFile = (index, direction) => {
        setMergeFiles((prev) => {
            const next = [...prev];
            const target = index + direction;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
        setMergedResult(null);
    };

    const removeFile = (id) => {
        setMergeFiles((prev) => prev.filter((item) => item.id !== id));
        setMergedResult(null);
    };

    const mergePdfs = async () => {
        if (mergeFiles.length < 2) {
            messageApi.error(ui.errorNeedTwo);
            return;
        }
        setMerging(true);
        try {
            const result = await mergePdfBytes(mergeFiles);
            setMergedResult(result);
        } catch (error) {
            messageApi.error(ui.errorMerge);
        } finally {
            setMerging(false);
        }
    };

    const compressPdf = async () => {
        if (!compressFile) {
            messageApi.error(ui.errorNoFile);
            return;
        }
        setCompressing(true);
        try {
            const result = await compressPdfBytes(compressFile.bytes);
            setCompressedResult(result);
        } catch (error) {
            messageApi.error(ui.errorCompress);
        } finally {
            setCompressing(false);
        }
    };

    const mergeTab = (
        <div className="grid gap-4">
            <UploadDragger
                accept=".pdf,application/pdf"
                multiple
                beforeUpload={addMergeFiles}
                title={ui.addFilesTitle}
                desc={ui.addFilesDesc}
                pasteHint=""
            />
            {mergeFiles.length > 0 && (
                <div className="rounded-md bg-white shadow-md overflow-hidden">
                    {mergeFiles.map((item, index) => (
                        <div key={item.id} className="flex items-center justify-between gap-2 px-4 py-3 border-b border-slate-100 last:border-b-0">
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-red-500 text-lg shrink-0"><FilePdfOutlined /></span>
                                <div className="min-w-0">
                                    <div className="font-semibold truncate">{item.name}</div>
                                    <div className="text-xs text-slate-500">{item.pages} {ui.pages} · {formatSize(item.size)}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <Button size="small" icon={<UpOutlined />} disabled={index === 0} onClick={() => moveFile(index, -1)} aria-label={ui.moveUp} />
                                <Button size="small" icon={<DownOutlined />} disabled={index === mergeFiles.length - 1} onClick={() => moveFile(index, 1)} aria-label={ui.moveDown} />
                                <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeFile(item.id)} aria-label={ui.remove} />
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-50">
                        <span className="text-sm text-slate-600">{mergeFiles.length} PDF · {mergeFiles.reduce((sum, item) => sum + item.pages, 0)} {ui.pages} · {formatSize(mergeFiles.reduce((sum, item) => sum + item.size, 0))}</span>
                        <Button size="small" onClick={() => { setMergeFiles([]); setMergedResult(null); }}>{ui.clearAll}</Button>
                    </div>
                </div>
            )}
            <div className="flex flex-wrap gap-2">
                <Button type="primary" size="large" loading={merging} disabled={mergeFiles.length < 2} onClick={mergePdfs}>{merging ? ui.merging : ui.mergeButton}</Button>
            </div>
            {mergedResult && (
                <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm">
                    <p className="font-semibold mb-1">{ui.mergedReady}</p>
                    <p className="text-slate-600 mb-3">{ui.mergedSize}: {formatSize(mergedResult.size)} · {mergedResult.pages} {ui.pages}</p>
                    <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadPdfBytes(mergedResult.bytes, 'merged.pdf')}>{ui.downloadMerged}</Button>
                </div>
            )}
        </div>
    );

    const compressTab = (
        <div className="grid gap-4">
            <UploadDragger
                accept=".pdf,application/pdf"
                beforeUpload={addCompressFile}
                title={ui.addOneTitle}
                desc={ui.addOneDesc}
                pasteHint=""
            />
            {compressFile && (
                <div className="rounded-md bg-white shadow-md px-4 py-3 flex items-center gap-3">
                    <span className="text-red-500 text-lg shrink-0"><FilePdfOutlined /></span>
                    <div className="min-w-0">
                        <div className="font-semibold truncate">{compressFile.name}</div>
                        <div className="text-xs text-slate-500">{compressFile.pages} {ui.pages} · {formatSize(compressFile.size)}</div>
                    </div>
                </div>
            )}
            <div className="flex flex-wrap gap-2">
                <Button type="primary" size="large" loading={compressing} disabled={!compressFile} onClick={compressPdf}>{compressing ? ui.compressing : ui.compressButton}</Button>
            </div>
            {compressedResult && compressFile && (
                <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm">
                    <p className="font-semibold mb-1">{ui.compressedReady}</p>
                    <p className="text-slate-600">{ui.originalSize}: {formatSize(compressFile.size)}</p>
                    <p className="text-slate-600">{ui.compressedSize}: {formatSize(compressedResult.size)}</p>
                    <p className="text-slate-600 mb-1">{ui.savedBytes}: {formatSize(Math.max(0, compressFile.size - compressedResult.size))}</p>
                    {compressedResult.size >= compressFile.size * 0.95 && (
                        <p className="text-slate-600 mb-3">{ui.noSavings}</p>
                    )}
                    <Button type="primary" icon={<DownloadOutlined />} onClick={() => downloadPdfBytes(compressedResult.bytes, compressFile.name.replace(/\.pdf$/i, '') + '-compressed.pdf')}>{ui.downloadCompressed}</Button>
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
                    { key: 'merge', label: ui.mergeTab, children: <div className="pb-6 pt-2">{mergeTab}</div> },
                    { key: 'compress', label: ui.compressTab, children: <div className="pb-6 pt-2">{compressTab}</div> }
                ]}
            />
        </div>
    );
}
