import React, { useState, useRef, useEffect } from 'react';
import { InputNumber, Button, Upload, message } from 'antd';
import { DeleteOutlined, DownloadOutlined, CopyOutlined, UploadOutlined, RadiusUpleftOutlined, RadiusUprightOutlined, RadiusBottomleftOutlined, RadiusBottomrightOutlined } from '@ant-design/icons';
import { DownBtn } from './DownBtn';
import { cn, supportImg, fileToDataURL, url2Blob, toDownloadFile, computedSize } from '../lib/utils';
import useKeyboardShortcuts from '../lib/useKeyboardShortcuts';
import usePaste from '../lib/usePaste';

const { Dragger } = Upload;

export default function Rounded() {
    const [messageApi, contextHolder] = message.useMessage();
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoData, setPhotoData] = useState('');
    const [roundValue, setRoundValue] = useState(30);
    const [radius, setRadius] = useState(['tl', 'tr', 'bl', 'br']);

    usePaste(async (file) => {
        fileToDataURL(file).then(img => {
            toDraw(img, roundValue, radius);
            setPhotoData(img);
        }).catch(error => console.error(error));
    });

    useKeyboardShortcuts(() => toDownload(), () => toCopy(), [photoUrl]);

    const beforeUpload = async (file) => {
        const img = await fileToDataURL(file);
        toDraw(img, roundValue, radius);
        setPhotoData(img);
        return Promise.reject();
    }

    const toDraw = (image, r = 0, type = []) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height } = image;
        canvas.width = width;
        canvas.height = height;

        ctx.save();
        ctx.moveTo(0, r);
        ctx.beginPath();

        // 绘制圆角矩形的路径
        if (type.includes('tr')) {
            ctx.lineTo(width - r, 0);
            ctx.arc(width - r, r, r, 1.5 * Math.PI, 2 * Math.PI);
        } else {
            ctx.lineTo(width, 0);
        }
        if (type.includes('br')) {
            ctx.lineTo(width, height - r);
            ctx.arc(width - r, height - r, r, 0, 0.5 * Math.PI)
        } else {
            ctx.lineTo(width, height);
        }
        if (type.includes('bl')) {
            ctx.lineTo(r, height);
            ctx.arc(r, height - r, r, 0.5 * Math.PI, 1 * Math.PI);
        } else {
            ctx.lineTo(0, height);
        }
        if (type.includes('tl')) {
            ctx.lineTo(0, r)
            ctx.arc(r, r, r, 1 * Math.PI, 1.5 * Math.PI)
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
        const type = radius.includes(key) ? radius.filter(e => e !== key) : [key, ...radius];
        setRadius(type);
        if (photoData) toDraw(photoData, roundValue, type);
    }

    const handleInput = (value) => {
        setRoundValue(value)
        if (photoData) toDraw(photoData, value, radius);
    }

    const toDownload = () => {
        toDownloadFile(photoUrl, 'shotEasy.png');
        messageApi.success('Download Success!');
    }
    const toCopy = () => {
        setLoading(true);
        url2Blob(photoUrl).then(value => {
            navigator.clipboard.write([
                new ClipboardItem({
                    [value.type]: value
                })
            ]).then(() => {
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
        setPhotoUrl('');
        setPhotoData('');
    }

    return (
        <>
            {contextHolder}
            <div className="polka rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased">
                <div className="flex gap-4 justify-center flex-col-reverse bg-white p-2 border-b shadow-md md:flex-row md:justify-between">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-32">
                            <InputNumber min={0} keyboard defaultValue={roundValue} addonAfter="px" onChange={handleInput} />
                        </div>
                        <Button size="small" type={radius.includes('tl')?'primary':'dashed'} shape="circle" onClick={() => handleRadiusChange('tl')} icon={<RadiusUpleftOutlined />} />
                        <Button size="small" type={radius.includes('tr')?'primary':'dashed'} shape="circle" onClick={() => handleRadiusChange('tr')} icon={<RadiusUprightOutlined />} />
                        <Button size="small" type={radius.includes('bl')?'primary':'dashed'} shape="circle" onClick={() => handleRadiusChange('bl')} icon={<RadiusBottomleftOutlined />} />
                        <Button size="small" type={radius.includes('br')?'primary':'dashed'} shape="circle" onClick={() => handleRadiusChange('br')} icon={<RadiusBottomrightOutlined />} />
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                        {photoData && <div className="text-xs opacity-60">{photoData.width} x {photoData.height} px</div>}
                        <DownBtn disabled={!photoUrl} loading={loading} toDownload={toDownload} toCopy={toCopy} />
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
                        {photoUrl && <div className="overflow-hidden max-w-[80%]" style={{
                            width: computedSize(photoData.width, photoData.height).width + 'px'
                        }}><img src={photoUrl} className="w-full" /></div>}
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
        </>
    )
} 