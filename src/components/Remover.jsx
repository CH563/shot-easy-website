import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ColorPicker, Button, message, Spin, Modal } from 'antd';
import {
    env,
    AutoModel,
    AutoProcessor,
    RawImage,
    PreTrainedModel,
    Processor
} from '@huggingface/transformers';
import { Icon } from './Icons'
import { DownBtn } from './DownBtn';
import { UploadDragger } from './UploadDragger';
import { cn, fileToDataURL, url2Blob, canvas2Blob, copyAsBlob, toDownloadFile, computedSize } from '../lib/utils';
import useKeyboardShortcuts from '../lib/useKeyboardShortcuts';
import usePaste from '../lib/usePaste';

const REMOVE_BACKGROUND_STATUS = {
    LOADING: 0, // 模型加载中
    NO_SUPPORT_WEBGPU: 1, // 不支持
    LOAD_ERROR: 2, // 加载失败
    LOAD_SUCCESS: 3, // 加载成功
    PROCESSING: 4, // 处理中
    PROCESSING_SUCCESS: 5 // 处理成功
};

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

    const [removeBgStatus, setRemoveBgStatus] = useState();
    const modelRef = useRef(null);
    const processorRef = useRef(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                if (removeBgStatus === REMOVE_BACKGROUND_STATUS.LOADING) return;
                setRemoveBgStatus(REMOVE_BACKGROUND_STATUS.LOADING);
                // 检查是否支持 WebGPU
                if (!navigator?.gpu) {
                    setRemoveBgStatus(REMOVE_BACKGROUND_STATUS.NO_SUPPORT_WEBGPU);
                    Modal.warning({
                        title: 'WebGPU is not supported',
                        content: <>WebGPU is not supported in this browser, to use the image segmentation function, please use the latest version of Google Chrome.</>,
                    });
                    return;
                }
        
                const modelId = 'Xenova/modnet';
                if (env.backends.onnx.wasm) {
                    env.backends.onnx.wasm.proxy = false
                }
                modelRef.current = await AutoModel.from_pretrained(modelId, { device: 'webgpu', quantized: false });
                processorRef.current = await AutoProcessor.from_pretrained(modelId);
                setRemoveBgStatus(REMOVE_BACKGROUND_STATUS.LOAD_SUCCESS);
            } catch (error) {
                setRemoveBgStatus(REMOVE_BACKGROUND_STATUS.LOAD_ERROR);
                messageApi.error({
                    content: 'Failed to load model, please try again later!',
                    onClick: () => loadModel()
                });
                console.error('Failed to load model:', error);
            }
        }
        loadModel();
    }, []);

    usePaste(async (file) => {
        if (removeBgStatus === REMOVE_BACKGROUND_STATUS.LOADING) return messageApi.info('"Remove background function loading!');
        if (removeBgStatus === REMOVE_BACKGROUND_STATUS.NO_SUPPORT_WEBGPU) return messageApi.info('WebGPU is not supported in this browser, to use the image segmentation function, please use the latest version of Google Chrome.');
        if (loading) return messageApi.info('Working hard, please wait!');
        fileToDataURL(file).then(img => {
            const imgbase64 = toDraw(img);
            setPhotoUrl(imgbase64);
            setPhotoData(img);
        }).catch(error => console.error(error));
    }, [loading]);

    useKeyboardShortcuts(() => toDownload(), () => toCopy(), [photoData, bgColor, loading]);

    const imageSize = useMemo(() => computedSize(photoData.width, photoData.height), [photoData]);

    useEffect(() => {
        const processImage = async () => {
            const model = modelRef.current;
            const processor = processorRef.current;
            if (!model || !processor || !photoUrl) return;
            setLoading(true);
            setRemoveBgStatus(REMOVE_BACKGROUND_STATUS.PROCESSING);
            const img = await RawImage.fromURL(photoUrl);

            // 预处理图像
            const { pixel_values } = await processor(img);

            // 生成图像蒙版
            const { output } = await model({ input: pixel_values });
            const maskData = (
                await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(
                    img.width,
                    img.height
                )
            ).data;

            // 创建一个新的 canvas
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // 绘制原始图像
            ctx.drawImage(img.toCanvas(), 0, 0);
            // 更新蒙版区域
            const pixelData = ctx.getImageData(0, 0, img.width, img.height);
            for (let i = 0; i < maskData.length; ++i) {
                pixelData.data[4 * i + 3] = maskData[i];
            }
            ctx.putImageData(pixelData, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            setTransparentUrl(imgData);
            const imgFile = await canvas2Blob(canvas);
            const image = await fileToDataURL(imgFile);
            setPhotoData(image);
            setLoading(false);
            setRemoveBgStatus(REMOVE_BACKGROUND_STATUS.PROCESSING_SUCCESS);
        };
        processImage();
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
        canvas.width = width;
        canvas.height = height;
        if (bgColor) {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);
        }
        ctx.drawImage(image, 0, 0, width, height);
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
            <Spin spinning={removeBgStatus === REMOVE_BACKGROUND_STATUS.LOADING} tip="Loading the model and run it locally...">
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
                                {photoUrl && <div className={cn("overflow-hidden w-auto", transparentUrl && 'opacity-0 absolute top-0 left-0 transition-all z-10', showOrigin && 'opacity-100')}><img src={photoUrl} width={imageSize.width} height={imageSize.height} className="w-full object-cover" /></div>}
                                {transparentUrl && <div className="overflow-hidden w-auto relative z-[9]"><img src={transparentUrl} className="w-full" /></div>}
                                {transparentUrl && <div className="absolute z-0 w-full h-full top-0 left-0" style={{
                                    background: bgColor
                                }}></div>}
                            </Spin>
                        </div>
                    </div>
                </div>
            </Spin>
            <canvas ref={canvasRef} className="hidden"></canvas>
        </>
    )
} 