import React, { useState, useRef } from 'react';
import { ColorPicker, Button, message } from 'antd';
import { Icon } from './Icons'
import { DownBtn } from './DownBtn';
import { UploadDragger } from './UploadDragger';
import { cn, fileToDataURL, url2Blob, copyAsBlob, toDownloadFile, computedSize } from '../lib/utils';
import useKeyboardShortcuts from '../lib/useKeyboardShortcuts';
import usePaste from '../lib/usePaste';

export default function Remover() {
    const [messageApi, contextHolder] = message.useMessage();
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [bgColor, setBgColor] = useState('rgba(255,255,255, 0)');
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoData, setPhotoData] = useState('');
    const [isGrid, setIsGrid] = useState(false);
    const [showOrigin, setShowOrigin] = useState(false);

    usePaste(async (file) => {
        if (loading) return messageApi.info('Working hard, please wait!');
        fileToDataURL(file).then(img => {
            toDraw(img);
            setPhotoData(img);
        }).catch(error => console.error(error));
    }, [loading]);

    useKeyboardShortcuts(() => toDownload(), () => toCopy(), [photoUrl, loading]);

    const beforeUpload = async (file) => {
        const img = await fileToDataURL(file);
        toDraw(img);
        setPhotoData(img);
        return Promise.reject();
    }

    const toDraw = (image) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height } = image;
        const reSize = computedSize(width, height);
        canvas.width = reSize.width;
        canvas.height = reSize.height;
        ctx.drawImage(image, 0, 0, reSize.width, reSize.height);
        // 导出图片
        const imgbase64 = canvas.toDataURL("image/png");
        setPhotoUrl(imgbase64);
    }

    const toDownload = () => {
        if (loading) return messageApi.info('Working hard, please wait!');
        toDownloadFile(photoUrl, 'shotEasy.png');
        messageApi.success('Download Success!');
    }
    const toCopy = () => {
        if (loading) return messageApi.info('Working hard, please wait!');
        setLoading(true);
        url2Blob(photoUrl).then(value => {
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
    }

    return (
        <>
            {contextHolder}
            <div className={cn("rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased", isGrid ? 'tr':'polka')}>
                <div className="flex gap-4 justify-center flex-col-reverse bg-white p-2 border-b shadow-md md:flex-row md:justify-between">
                    <div className="flex items-center justify-center gap-3">
                        <ColorPicker allowClear size="small" value={bgColor} onChange={(e) => setBgColor(e.toRgbString())} />
                        <Button type="text" shape="circle" className={isGrid && 'text-[#1677ff]'} icon={<Icon name="Grip" />} onClick={() => setIsGrid(!isGrid)}></Button>
                        <div className="active:[&_.ant-btn:not(:disabled)]:bg-[#1677ff]/20">
                            <Button type="text" shape="circle" className="[&_span]:active:text-[#1677ff]" icon={<Icon name="SplitSquareHorizontal" />} onMouseDown={() => setShowOrigin(true)} onMouseLeave={() => setShowOrigin(false)} onMouseUp={() => setShowOrigin(false)}></Button>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                        {photoData && <div className="text-xs opacity-60">{photoData.width} x {photoData.height} px</div>}
                        <DownBtn disabled={!photoUrl} loading={loading} toDownload={toDownload} toCopy={toCopy} />
                        <Button type="text" disabled={!photoUrl} loading={loading} icon={<Icon name="Eraser" />} onClick={toRefresh}></Button>
                    </div>
                </div>
                <div className="relative min-h-[200px] p-10">
                    <div className="flex w-full items-center justify-center z-10">
                        {!photoUrl && <UploadDragger beforeUpload={beforeUpload} />}
                        {photoUrl && <div className="overflow-hidden w-auto"><img src={photoUrl} className="w-full" /></div>}
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
        </>
    )
} 