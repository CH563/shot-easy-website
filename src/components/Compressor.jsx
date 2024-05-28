import React, { useState, useRef } from 'react';
import { InputNumber, Button, message } from 'antd';
import { RadiusUpleftOutlined, RadiusUprightOutlined, RadiusBottomleftOutlined, RadiusBottomrightOutlined } from '@ant-design/icons';
import { Icon } from './Icons'
import { DownBtn } from './DownBtn';
import { UploadDragger } from './UploadDragger';
import { cn, fileToDataURL, url2Blob, copyAsBlob, toDownloadFile, computedSize } from '../lib/utils';
import useKeyboardShortcuts from '../lib/useKeyboardShortcuts';
import usePaste from '../lib/usePaste';

export default function Compressor() {
    const [messageApi, contextHolder] = message.useMessage();
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoData, setPhotoData] = useState('');

    const beforeUpload = async (file) => {
        const img = await fileToDataURL(file);
        setPhotoData(img);
        return Promise.reject();
    }

    return (
        <>
            {contextHolder}
            <div className={cn("rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased polka")}>
                {/* <div className="flex gap-4 justify-center flex-col-reverse bg-white p-2 border-b shadow-md md:flex-row md:justify-between">
                    <div className="flex gap-3 items-center justify-center"></div>
                </div> */}
                <div className="relative min-h-[200px] p-10">
                    <div className="flex w-full items-center justify-center z-10">
                        {!photoUrl && <UploadDragger desc={"JPG/JPEG/PNG/WEBP/GIF/SVG/AVIF"} beforeUpload={beforeUpload} />}
                    </div>
                </div>
            </div>
        </>
    )
}