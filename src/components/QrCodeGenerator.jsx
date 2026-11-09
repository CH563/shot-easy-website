import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Select, message } from 'antd';
import { DownloadOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons';
import { toDownloadFile } from '@lib/utils';
import { drawQrToCanvas, generateQrSvg, isOverCapacityError } from '@lib/qrCodeCore';

const EC_OPTIONS = [
    { value: 'L', label: 'L · 7%' },
    { value: 'M', label: 'M · 15%' },
    { value: 'Q', label: 'Q · 25%' },
    { value: 'H', label: 'H · 30%' }
];
const SIZE_OPTIONS = [256, 512, 1024];
const MARGIN_OPTIONS = [0, 2, 4, 6, 8];

export default function QrCodeGenerator({ ui }) {
    const [messageApi, contextHolder] = message.useMessage();
    const canvasRef = useRef(null);
    const drawIdRef = useRef(0);
    const [text, setText] = useState('');
    const [ecLevel, setEcLevel] = useState('M');
    const [size, setSize] = useState(512);
    const [margin, setMargin] = useState(4);
    const [dark, setDark] = useState('#000000');
    const [light, setLight] = useState('#ffffff');
    const [hasCode, setHasCode] = useState(false);
    const [error, setError] = useState('');

    const sameColor = dark.toLowerCase() === light.toLowerCase();
    const options = { errorCorrectionLevel: ecLevel, margin, width: size, dark, light };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const drawId = ++drawIdRef.current;
        if (!text.trim()) {
            const context = canvas.getContext('2d');
            if (context) context.clearRect(0, 0, canvas.width, canvas.height);
            setHasCode(false);
            setError('');
            return;
        }
        drawQrToCanvas(canvas, text, options)
            .then(() => {
                if (drawId !== drawIdRef.current) return;
                setHasCode(true);
                setError('');
            })
            .catch((err) => {
                if (drawId !== drawIdRef.current) return;
                const context = canvas.getContext('2d');
                if (context) context.clearRect(0, 0, canvas.width, canvas.height);
                setHasCode(false);
                setError(isOverCapacityError(err) ? ui.errorTooLong : ui.errorGenerate);
            });
    }, [text, ecLevel, size, margin, dark, light]);

    const downloadPng = () => {
        const canvas = canvasRef.current;
        if (!canvas || !hasCode || typeof canvas.toBlob !== 'function') {
            messageApi.error(ui.errorDownload);
            return;
        }
        // Issue #28: canvas.toBlob MUST be called with the MIME type argument.
        canvas.toBlob((blob) => {
            if (!blob) {
                messageApi.error(ui.errorDownload);
                return;
            }
            const url = URL.createObjectURL(blob);
            toDownloadFile(url, 'qr-code.png');
            setTimeout(() => URL.revokeObjectURL(url), 10000);
        }, 'image/png');
    };

    const downloadSvg = async () => {
        if (!text.trim()) return;
        try {
            const svg = await generateQrSvg(text, options);
            const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
            toDownloadFile(url, 'qr-code.svg');
            setTimeout(() => URL.revokeObjectURL(url), 10000);
        } catch (err) {
            messageApi.error(isOverCapacityError(err) ? ui.errorTooLong : ui.errorDownload);
        }
    };

    const copyPng = async () => {
        const canvas = canvasRef.current;
        if (!canvas || !hasCode || typeof canvas.toBlob !== 'function') {
            messageApi.error(ui.errorCopy);
            return;
        }
        if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
            messageApi.error(ui.errorCopyUnsupported);
            return;
        }
        try {
            // Issue #28: canvas.toBlob MUST be called with the MIME type argument.
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
            if (!blob) {
                messageApi.error(ui.errorCopy);
                return;
            }
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            messageApi.success(ui.copied);
        } catch (err) {
            messageApi.error(ui.errorCopy);
        }
    };

    return (
        <div className="rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased polka bg-white">
            {contextHolder}
            <div className="grid gap-4 p-4 md:p-6">
                <div>
                    <label className="block text-sm font-semibold mb-1">{ui.inputLabel}</label>
                    <Input.TextArea
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        placeholder={ui.inputPlaceholder}
                        autoSize={{ minRows: 2, maxRows: 5 }}
                    />
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Button size="small" onClick={() => setText('https://')}>{ui.presetWebsite}</Button>
                        <Button size="small" onClick={() => setText('mailto:')}>{ui.presetEmail}</Button>
                        <Button size="small" onClick={() => setText('tel:')}>{ui.presetPhone}</Button>
                        <span className="text-xs text-slate-500">{ui.inputHint}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm font-semibold mb-1">{ui.errorCorrection}</label>
                        <Select className="w-full" value={ecLevel} onChange={setEcLevel} options={EC_OPTIONS} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">{ui.size}</label>
                        <Select className="w-full" value={size} onChange={setSize} options={SIZE_OPTIONS.map((value) => ({ value, label: String(value) }))} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">{ui.margin}</label>
                        <Select className="w-full" value={margin} onChange={setMargin} options={MARGIN_OPTIONS.map((value) => ({ value, label: String(value) }))} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">{ui.foreground}</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={dark} onChange={(event) => setDark(event.target.value)} className="w-10 h-8 cursor-pointer bg-white border border-slate-200 rounded" aria-label={ui.foreground} />
                            <span className="text-sm text-slate-600">{dark}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">{ui.background}</label>
                        <div className="flex items-center gap-2">
                            <input type="color" value={light} onChange={(event) => setLight(event.target.value)} className="w-10 h-8 cursor-pointer bg-white border border-slate-200 rounded" aria-label={ui.background} />
                            <span className="text-sm text-slate-600">{light}</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-md bg-slate-50 border border-slate-100 p-4 flex flex-col items-center gap-2 min-h-[320px] justify-center">
                    {hasCode ? (
                        <canvas ref={canvasRef} className="max-w-full h-auto" style={{ width: 280, height: 280 }} />
                    ) : (
                        <canvas ref={canvasRef} className="hidden" />
                    )}
                    {!hasCode && !error && (
                        <div className="text-center text-slate-500 text-sm">
                            <div className="text-4xl mb-2"><QrcodeOutlined /></div>
                            <p>{ui.emptyHint}</p>
                        </div>
                    )}
                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}
                    {sameColor && hasCode && (
                        <p className="text-sm text-amber-600 text-center">{ui.errorSameColor}</p>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button type="primary" size="large" icon={<DownloadOutlined />} disabled={!hasCode} onClick={downloadPng}>{ui.downloadPng}</Button>
                    <Button size="large" icon={<DownloadOutlined />} disabled={!hasCode} onClick={downloadSvg}>{ui.downloadSvg}</Button>
                    <Button size="large" icon={<CopyOutlined />} disabled={!hasCode} onClick={copyPng}>{ui.copyPng}</Button>
                </div>
            </div>
        </div>
    );
}
