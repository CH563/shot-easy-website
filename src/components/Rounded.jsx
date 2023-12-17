import React, { useState, useRef, useEffect } from 'react';
import { InputNumber, Button, Upload, message } from 'antd';
import { DeleteOutlined, DownloadOutlined, CopyOutlined, UploadOutlined, RadiusUpleftOutlined, RadiusUprightOutlined, RadiusBottomleftOutlined, RadiusBottomrightOutlined } from '@ant-design/icons';
import { cn, supportImg, fileToDataURL } from '../lib/utils';

const { Dragger } = Upload;

export default function Rounded() {
    const [messageApi, contextHolder] = message.useMessage();
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoData, setPhotoData] = useState('');
    const [roundValue, setRoundValue] = useState(30);
    const [radius, setRadius] = useState(['tl', 'tr', 'bl', 'br']);

    useEffect(() => {
        const getPaste = async (e) => {
            const data = e.clipboardData;
            if (!data || !data.items) return;
            const items = Array.from(data.items).filter(e => supportImg.includes(e.type));
            if (!items.length) return;
            const file = items[0].getAsFile();
            const img = await fileToDataURL(file);
            toDraw(img);
            setPhotoData(img);
        }
        document.addEventListener('paste', getPaste, false);
        return (() => {
            document.removeEventListener('paste', getPaste);
        })
    }, [document]);

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
        canvas.width = width;
        canvas.height = height;

        ctx.save();
        ctx.moveTo(0, roundValue);
        ctx.beginPath();

        // 绘制圆角矩形的路径
        if (radius.includes('tr')) {
            ctx.lineTo(width - roundValue, 0);
            ctx.arc(width - roundValue, roundValue, roundValue, 1.5 * Math.PI, 2 * Math.PI);
        } else {
            ctx.lineTo(width, 0);
        }
        if (radius.includes('br')) {
            ctx.lineTo(width, height - roundValue);
            ctx.arc(width - roundValue, height - roundValue, roundValue, 0, 0.5 * Math.PI)
        } else {
            ctx.lineTo(width, height);
        }
        if (radius.includes('bl')) {
            ctx.lineTo(roundValue, height);
            ctx.arc(roundValue, height - roundValue, roundValue, 0.5 * Math.PI, 1 * Math.PI);
        } else {
            ctx.lineTo(0, height);
        }
        if (radius.includes('tl')) {
            ctx.lineTo(0, roundValue)
            ctx.arc(roundValue, roundValue, roundValue, 1 * Math.PI, 1.5 * Math.PI)
        } else {
            ctx.lineTo(0, 0);
        }
        
        // 剪切和绘制图片
        ctx.clip();
        ctx.drawImage(image, 0, 0, image.width, image.height);
        ctx.restore();
        // 导出图片
        const imgbase64 = canvas.toDataURL("image/png");
        setPhotoUrl(imgbase64);
    }

    const handleRadiusChange = (key) => {
        radius.includes(key) ? setRadius(radius.filter(e => e !== key)) : setRadius([key, ...radius]);
        toDraw(photoData);
    }

    const toDownload = () => {}
    const toCopy = () => {}
    const toRefresh = () => {
        setPhotoUrl('');
        setPhotoData('')
    }

    return (
        <>
            {contextHolder}
            <div className="polka rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased">
                <div className="flex gap-4 justify-between bg-white p-2 border-b shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="w-32">
                            <InputNumber min={0} keyboard defaultValue={roundValue} addonAfter="px" onChange={(e) => setRoundValue(e.target.value)} />
                        </div>
                        <Button size="small" type={radius.includes('tl')?'primary':'dashed'} shape="circle" onClick={() => handleRadiusChange('tl')} icon={<RadiusUpleftOutlined />} />
                        <Button size="small" type={radius.includes('tr')?'primary':'dashed'} shape="circle" onClick={() => handleRadiusChange('tr')} icon={<RadiusUprightOutlined />} />
                        <Button size="small" type={radius.includes('bl')?'primary':'dashed'} shape="circle" onClick={() => handleRadiusChange('bl')} icon={<RadiusBottomleftOutlined />} />
                        <Button size="small" type={radius.includes('br')?'primary':'dashed'} shape="circle" onClick={() => handleRadiusChange('br')} icon={<RadiusBottomrightOutlined />} />
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        {photoData && <div className="text-xs opacity-60">{photoData.width} x {photoData.height} px</div>}
                        <Button disabled={!photoUrl} loading={loading} icon={<DownloadOutlined />} onClick={toDownload}>Save</Button>
                        <Button disabled={!photoUrl} loading={loading} icon={<CopyOutlined />} onClick={toCopy}>Copy</Button>
                        <Button type="text" disabled={!photoUrl} loading={loading} icon={<DeleteOutlined />} onClick={toRefresh}></Button>
                    </div>
                </div>
                <div className="relative min-h-[200px] p-10">
                    <div className="flex w-full items-center justify-center z-10">
                        {!photoUrl && <Dragger
                            accept={supportImg.join(',')}
                            name="file"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            rootClassName="p-4 rounded-md bg-white shadow-md"
                        >
                            <p className="text-2xl"><UploadOutlined /></p>
                            <p className="text-sm px-4">Click or Drag image to this area<br/>or Paste image</p>
                        </Dragger>}
                        {photoUrl && <div className="overflow-hidden"><img src={photoUrl} className="w-full" /></div>}
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
        </>
    )
} 