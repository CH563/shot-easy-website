import React, { useState, useRef, useEffect } from 'react';
import { ColorPicker, Button, message, Spin, Modal } from 'antd';
import { Icon } from './Icons'
import { DownBtn } from './DownBtn';
import { UploadDragger } from './UploadDragger';
import { cn, fileToDataURL, url2Blob, copyAsBlob, toDownloadFile, computedSize } from '../lib/utils';
import { generateSignature } from '../lib/auth';
import useKeyboardShortcuts from '../lib/useKeyboardShortcuts';
import usePaste from '../lib/usePaste';

export default function Remover() {
    const [messageApi, contextHolder] = message.useMessage();
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [bgColor, setBgColor] = useState('rgba(255,255,255, 0)');
    const [photoUrl, setPhotoUrl] = useState('');
    const [transparentUrl, setTransparentUrl] = useState('');
    const [photoData, setPhotoData] = useState('');
    const [isGrid, setIsGrid] = useState(false);
    const [showOrigin, setShowOrigin] = useState(false);
    const [controller, setController] = useState(null);

    usePaste(async (file) => {
        if (loading) return messageApi.info('Working hard, please wait!');
        fileToDataURL(file).then(img => {
            const imgbase64 = toDraw(img);
            setPhotoUrl(imgbase64);
            setPhotoData(img);
        }).catch(error => console.error(error));
    }, [loading]);

    useKeyboardShortcuts(() => toDownload(), () => toCopy(), [photoData, bgColor, loading]);

    useEffect(() => {
        const removeReq = async () => {
            if (photoUrl) {
                const controllerSignal = new AbortController()
                setController(controllerSignal);
                setLoading(true);
                const timestamp = Date.now()
                const formData = new FormData();
                const file = await url2Blob(photoUrl);
                const sign = await generateSignature({ t: timestamp, m: file.size });
                formData.append('image', file);
                formData.append('time', timestamp);
                formData.append('sign', sign);
                try {
                    const response = await fetch('/api/remove-bg', {
                        method: 'POST',
                        body: formData,
                        signal: controllerSignal.signal,
                    });
                    if (response.ok) {
                        const resFile = await response.blob();
                        const image = await fileToDataURL(resFile);
                        setPhotoData(image);
                        const imgbase64 = toDraw(image, bgColor);
                        setTransparentUrl(imgbase64);
                    } else {
                        Modal.warning({
                            title: response.statusText,
                            content: <>The API usage limit. Please go to <a className="underline text-blue-600" href="https://www.remove.bg/" target="_blank" referrerPolicy="no-referrer">RemoveBg</a> to use</>,
                        });
                    }
                } catch (error) {
                    messageApi.error('Remove error!');
                }
                setLoading(false);
                setController(null);
            }
        }
        removeReq();
        return (() => {
            if (controller && controller.abort) controller.abort();
        })
    }, [photoUrl]);

    const beforeUpload = async (file) => {
        const img = await fileToDataURL(file);
        setPhotoData(img);
        const imgbase64 = toDraw(img);
        setPhotoUrl(imgbase64);
        return Promise.reject();
    }

    const toDraw = (image, bgColor) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height } = image;
        const reSize = computedSize(width, height);
        canvas.width = reSize.width;
        canvas.height = reSize.height;
        if (bgColor) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, reSize.width, reSize.height);
        }
        ctx.drawImage(image, 0, 0, reSize.width, reSize.height);
        // 导出图片
        const imgbase64 = canvas.toDataURL("image/png");
        return imgbase64;
    }

    const onBgChange = (e) => {
        const color = e.toRgbString();
        setBgColor(color);
    }

    const toDownload = () => {
        if (loading) return messageApi.info('Working hard, please wait!');
        const imgbase64 = toDraw(photoData, bgColor);
        toDownloadFile(imgbase64, 'shotEasy.png');
        messageApi.success('Download Success!');
    }
    const toCopy = () => {
        if (loading) return messageApi.info('Working hard, please wait!');
        setLoading(true);
        const imgbase64 = toDraw(photoData, bgColor);
        url2Blob(imgbase64).then(value => {
            copyAsBlob(value).then(() => {
                messageApi.success('Copied Success!');
            }).catch(() => {
                messageApi.error('Copy Failed!');
            });
        }).catch(error => {
            messageApi.error('Copy Failed!');
        }).finally(() => {
            setLoading(false);
        });
    }
    
    const toRefresh = () => {
        if (loading) return messageApi.info('Working hard, please wait!');
        setPhotoUrl('');
        setPhotoData('');
        setTransparentUrl('')
    }

    return (
        <>
            {contextHolder}
            <div className={cn("rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased", isGrid ? 'tr':'polka')}>
                <div className="flex gap-4 justify-center flex-col-reverse bg-white p-2 border-b shadow-md md:flex-row md:justify-between">
                    <div className="flex items-center justify-center gap-3">
                        <ColorPicker allowClear size="small" value={bgColor} onChange={onBgChange} />
                        <Button type="text" shape="circle" className={isGrid && 'text-[#1677ff]'} icon={<Icon name="Grip" />} onClick={() => setIsGrid(!isGrid)}></Button>
                        <div className="active:[&_.ant-btn:not(:disabled)]:bg-[#1677ff]/20">
                            <Button type="text" shape="circle" className="[&_span]:active:text-[#1677ff]" icon={<Icon name="SplitSquareHorizontal" />} onMouseDown={() => setShowOrigin(true)} onMouseLeave={() => setShowOrigin(false)} onMouseUp={() => setShowOrigin(false)}></Button>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                        {photoData && <div className="text-xs opacity-60">{photoData.width} x {photoData.height} px</div>}
                        <DownBtn disabled={!transparentUrl} loading={loading} toDownload={toDownload} toCopy={toCopy} />
                        <Button type="text" disabled={!transparentUrl} loading={loading} icon={<Icon name="Eraser" />} onClick={toRefresh}></Button>
                    </div>
                </div>
                <div className="relative min-h-[200px] p-10">
                    <div className="flex w-full items-center justify-center relative z-10">
                        {!photoUrl && <UploadDragger beforeUpload={beforeUpload} />}
                        <Spin spinning={loading} delay={500}>
                            {photoUrl && <div className={cn("overflow-hidden w-auto", transparentUrl && 'opacity-0 absolute top-0 left-0 transition-all z-10', showOrigin && 'opacity-100')}><img src={photoUrl} className="w-full object-cover" /></div>}
                            {transparentUrl && <div className="overflow-hidden w-auto relative z-[9]"><img src={transparentUrl} className="w-full" /></div>}
                            {transparentUrl && <div className="absolute z-0 w-full h-full top-0 left-0" style={{
                                background: bgColor
                            }}></div>}
                        </Spin>
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
        </>
    )
} 