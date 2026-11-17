import React, { useEffect, useRef, useState } from 'react';
import { Button, Tabs, message } from 'antd';
import { CameraOutlined, CopyOutlined, DeleteOutlined, FileImageOutlined, LinkOutlined, ScanOutlined } from '@ant-design/icons';
import { UploadDragger } from './UploadDragger';
import { formatSize } from '@lib/utils';
import { decodeQrFromImageData, isProbablyUrl, openableHref } from '@lib/qrScannerCore';

const copyText = async (text) => {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        if (!document.execCommand('copy')) throw new Error('copy failed');
    } finally {
        document.body.removeChild(textarea);
    }
};

export default function QrCodeScanner({ ui }) {
    const [messageApi, contextHolder] = message.useMessage();
    const [mode, setMode] = useState('camera');
    const [result, setResult] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);
    const [cameraStarting, setCameraStarting] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploadScanning, setUploadScanning] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);

    const stopCamera = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setCameraOn(false);
    };

    useEffect(() => () => stopCamera(), []);

    const scanLoop = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !streamRef.current) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA && video.videoWidth > 0) {
            const maxSide = 640;
            const scale = Math.min(1, maxSide / Math.max(video.videoWidth, video.videoHeight));
            canvas.width = Math.round(video.videoWidth * scale);
            canvas.height = Math.round(video.videoHeight * scale);
            const context = canvas.getContext('2d', { willReadFrequently: true });
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const text = decodeQrFromImageData(imageData.data, imageData.width, imageData.height);
            if (text) {
                setResult({ text, isUrl: isProbablyUrl(text) });
                stopCamera();
                return;
            }
        }
        rafRef.current = requestAnimationFrame(scanLoop);
    };

    const startCamera = async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            messageApi.error(ui.errorNotSupported);
            return;
        }
        setCameraStarting(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
            streamRef.current = stream;
            const video = videoRef.current;
            if (video) {
                video.srcObject = stream;
                await video.play();
            }
            setCameraOn(true);
            setCameraStarting(false);
            scanLoop();
        } catch (error) {
            setCameraStarting(false);
            if (error?.name === 'NotAllowedError') messageApi.error(ui.errorCameraDenied);
            else if (error?.name === 'NotFoundError' || error?.name === 'OverconstrainedError') messageApi.error(ui.errorNoCamera);
            else messageApi.error(ui.errorCamera);
        }
    };

    const onTabChange = (key) => {
        setMode(key);
        if (key !== 'camera') stopCamera();
    };

    const addImageFile = async (incoming) => {
        if (!incoming?.type?.startsWith('image/')) {
            messageApi.error(ui.errorNotImage);
            return Promise.reject();
        }
        setImageFile(incoming);
        setResult(null);
        return Promise.reject();
    };

    const scanUploadedImage = async () => {
        if (!imageFile) {
            messageApi.error(ui.errorNoImage);
            return;
        }
        setUploadScanning(true);
        const url = URL.createObjectURL(imageFile);
        try {
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });
            const maxSide = 1200;
            const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.naturalWidth * scale);
            canvas.height = Math.round(img.naturalHeight * scale);
            const context = canvas.getContext('2d', { willReadFrequently: true });
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const text = decodeQrFromImageData(imageData.data, imageData.width, imageData.height);
            if (text) setResult({ text, isUrl: isProbablyUrl(text) });
            else messageApi.error(ui.noCodeFound);
        } catch (error) {
            messageApi.error(ui.errorDecode);
        } finally {
            URL.revokeObjectURL(url);
            setUploadScanning(false);
        }
    };

    const copyResult = async () => {
        if (!result) return;
        try {
            await copyText(result.text);
            messageApi.success(ui.copied);
        } catch (error) {
            messageApi.error(ui.errorCopy);
        }
    };

    const resultBox = result && (
        <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm">
            <p className="font-semibold mb-1">{ui.resultTitle}</p>
            <p className="text-slate-700 break-all mb-3">{result.text}</p>
            <div className="flex flex-wrap gap-2">
                <Button icon={<CopyOutlined />} onClick={copyResult}>{ui.copyResult}</Button>
                {result.isUrl && (
                    <Button type="primary" icon={<LinkOutlined />} onClick={() => window.open(openableHref(result.text), '_blank', 'noopener')}>{ui.openLink}</Button>
                )}
            </div>
        </div>
    );

    const cameraTab = (
        <div className="grid gap-4">
            <div className="rounded-md bg-slate-50 border border-slate-100 p-4 flex flex-col items-center gap-3 min-h-[320px] justify-center">
                {cameraOn ? (
                    <video ref={videoRef} className="w-full max-w-md rounded-md bg-black" playsInline muted />
                ) : (
                    <>
                        <video ref={videoRef} className="hidden" playsInline muted />
                        <div className="text-center text-slate-500 text-sm">
                            <div className="text-4xl mb-2"><ScanOutlined /></div>
                            <p>{ui.cameraHint}</p>
                        </div>
                    </>
                )}
                <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex flex-wrap gap-2">
                {cameraOn ? (
                    <Button size="large" icon={<CameraOutlined />} onClick={stopCamera}>{ui.stopCamera}</Button>
                ) : (
                    <Button type="primary" size="large" icon={<CameraOutlined />} loading={cameraStarting} onClick={startCamera}>{cameraStarting ? ui.cameraStarting : ui.startCamera}</Button>
                )}
                {cameraOn && <span className="text-sm text-slate-500 self-center">{ui.scanning}</span>}
            </div>
            {resultBox}
        </div>
    );

    const uploadTab = (
        <div className="grid gap-4">
            <UploadDragger
                accept="image/*"
                beforeUpload={addImageFile}
                title={ui.addImageTitle}
                desc={ui.addImageDesc}
                pasteHint=""
            />
            {imageFile && (
                <div className="rounded-md bg-white shadow-md px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="text-blue-500 text-lg shrink-0"><FileImageOutlined /></span>
                        <div className="min-w-0">
                            <div className="font-semibold truncate">{imageFile.name}</div>
                            <div className="text-xs text-slate-500">{formatSize(imageFile.size)}</div>
                        </div>
                    </div>
                    <Button size="small" danger icon={<DeleteOutlined />} onClick={() => { setImageFile(null); setResult(null); }} aria-label={ui.clearFile} />
                </div>
            )}
            <div className="flex flex-wrap gap-2">
                <Button type="primary" size="large" loading={uploadScanning} disabled={!imageFile} onClick={scanUploadedImage}>{uploadScanning ? ui.scanning : ui.scanImageButton}</Button>
            </div>
            {resultBox}
        </div>
    );

    return (
        <div className="rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased polka bg-white">
            {contextHolder}
            <Tabs
                activeKey={mode}
                onChange={onTabChange}
                size="large"
                className="px-4 pt-2"
                items={[
                    { key: 'camera', label: ui.cameraTab, children: <div className="pb-6 pt-2">{cameraTab}</div> },
                    { key: 'upload', label: ui.uploadTab, children: <div className="pb-6 pt-2">{uploadTab}</div> }
                ]}
            />
        </div>
    );
}
