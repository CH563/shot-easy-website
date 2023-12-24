import React, { useState, useRef, useMemo, useEffect } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { Icon } from './Icons';
import { Button, Slider, Radio, Select, Switch, Upload, Watermark, Input, ColorPicker, Drawer, message } from 'antd';
import { Icons } from '../components/Icons';
import { cn, supportImg, toDownloadFile, copyAsBlob, getBackground } from '../lib/utils';
import backgroundConfig from '../lib/backgroundConfig';
import { MacbookPro } from './MacbookPro';
import { IphonePro } from './IphonePro';
import useKeyboardShortcuts from '../lib/useKeyboardShortcuts';
import usePaste from '../lib/usePaste';
import useImageColor from '../lib/useImageColor';
import { DrawerSide } from './DrawerSide';
import { DownBtn } from './DownBtn';

const modelFrame = ['macbookPro', 'iphonePro'];

const { Dragger } = Upload;

export default function Beautifier() {
    const [messageApi, contextHolder] = message.useMessage();
    const boxRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('');
    const [marginValue, setMarginValue] = useState(150);
    const [paddingValue, setPaddingValue] = useState(0);
    const [paddingBg, setPaddingBg] = useState('rgba(255,255,255,.85)');
    const [roundValue, setRoundValue] = useState(10);
    const [shadowValue, setShadowValue] = useState(3);
    const [frame, setFrame] = useState('none');
    const [ratio, setRatio] = useState(4/3);
    const [bgValue, setBgValue] = useState('default_1');
    const [useWater, setUseWater] = useState(false);
    const [waterCont, setWaterCont] = useState('Shot Easy');
    const [waterColor, setWaterColor] = useState('rgba(0,0,0,.15)');
    const [waterIndex, setWaterIndex] = useState(11);
    const [direction, setDirection] = useState(-22);
    const [fit, setFit] = useState('cover');
    const [showMore, setShowMore] = useState(false);
    const { imgColors, imgSize } = useImageColor(photoUrl);
    const [imgwidth, setImgWidth] = useState(600 - marginValue);

    const boxStyle = useMemo(() => {
        let style = {};
        if (backgroundConfig[bgValue]) return style;
        try {
            style = JSON.parse(bgValue)
        } catch (error) {
            //
        }
        return style;
    }, [bgValue]);

    useEffect(() => {
        setImgWidth(600 - marginValue);
        if (!imgSize?.width) return;
        if (imgSize.width > imgSize.height) {
            return;
        }
        const height = 600 / ratio - marginValue;
        setImgWidth(height * imgSize.width / imgSize.height);
    }, [marginValue, imgSize, ratio]);

    usePaste((file) => {
        setPhotoUrl(window.URL.createObjectURL(file));
    });

    useKeyboardShortcuts(() => toDownload(), () => toCopy(), [photoUrl]);

    const beforeUpload = (file) => {
        setPhotoUrl(window.URL.createObjectURL(file));
        return false;
    }

    const handleColorChange = (color) => {
        setWaterColor(typeof color === 'string' ? color : color.toRgbString());
    }

    const toDownload = () => {
        setLoading(true);
        toPng(boxRef.current, {
            cacheBust: false,
            pixelRatio: 2
        }).then((dataUrl) => {
            toDownloadFile(dataUrl, 'shotEasy.png');
            messageApi.success('Download Success!');
        }).catch(error => {
            console.log(error);
            messageApi.error('Download Failed!');
        }).finally(() => {
            setLoading(false);
        });
    }

    const toCopy = () => {
        setLoading(true);
        toBlob(boxRef.current, {
            cacheBust: false,
            pixelRatio: 2
        }).then((value) => {
            copyAsBlob(value).then(() => {
                messageApi.success('Copied Success!');
            }).catch(() => {
                messageApi.error('Copy Failed!');
            });
        }).catch(error => {
            console.log(error);
            messageApi.error('Copy Failed!');
        }).finally(() => {
            setLoading(false);
        });
    }

    const toRefresh = () => {
        setPhotoUrl('');
        if (!backgroundConfig[bgValue]) setBgValue('default_1');
    }

    return (
        <>
            {contextHolder}
            <div className="polka flex flex-col min-h-[500px] rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased md:flex-row md:items-center">
                <div className="md:w-0 md:flex-1 md:h-[660px] overflow-auto select-none p-5">
                    <div className="min-w-full md:min-w-[600px] min-h-full flex items-center justify-center">
                        <div ref={boxRef} className={cn(
                            'relative overflow-hidden w-full md:w-[600px]',
                            getBackground(bgValue),
                        )} style={{
                            aspectRatio: ratio,
                            ...boxStyle
                        }}>
                            {bgValue.includes('_img_') && <img src={`${backgroundConfig[bgValue]}&w=1200`} className="w-full h-full absolute z-0 object-cover object-center" />}
                            <Watermark
                                rootClassName="w-full md:w-[600px] h-full"
                                content={useWater ? waterCont : ''}
                                font={{ color: waterColor }}
                                rotate={direction}
                                zIndex={waterIndex}
                            >
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    {!photoUrl && <Dragger
                                        accept={supportImg.join(',')}
                                        name="file"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        rootClassName="p-4 rounded-md bg-white"
                                    >
                                        <p className="text-2xl"><Icon name="ImagePlus" /></p>
                                        <p className="text-sm px-4">Click or Drag image to this area<br/>or Paste image</p>
                                    </Dragger>}
                                    {(photoUrl && frame === 'macbookPro') &&
                                        <MacbookPro
                                            width={600 - marginValue}
                                            img={photoUrl}
                                            fit={fit}
                                            style={{
                                                padding: `${ paddingValue }px`,
                                                backgroundColor: paddingBg
                                            }}
                                        />
                                    }
                                    {(photoUrl && frame === 'iphonePro') &&
                                        <IphonePro
                                            height={600 / ratio - marginValue}
                                            img={photoUrl}
                                            shadow={shadowValue}
                                            fit={fit}
                                            style={{
                                                padding: `${ paddingValue }px`,
                                                backgroundColor: paddingBg
                                            }}
                                        />
                                    }
                                    {(photoUrl && !modelFrame.includes(frame)) && <div className={cn(
                                        "overflow-hidden translate-x-0 transition-all opacity-100",
                                        shadowValue === 0 && 'shadow-none',
                                        shadowValue === 1 && 'shadow',
                                        shadowValue === 2 && 'shadow-sm',
                                        shadowValue === 3 && 'shadow-md',
                                        shadowValue === 4 && 'shadow-lg',
                                        shadowValue === 5 && 'shadow-xl',
                                        shadowValue === 6 && 'shadow-2xl',
                                        frame === 'light' && 'bg-white/40 p-1.5',
                                        frame === 'dark' && 'bg-black/30 p-1.5',
                                    )} style={{
                                        width: `${ imgwidth }px`,
                                        borderRadius: `${ roundValue }px`,
                                    }}>
                                        {frame.includes('sBar') && <div className={cn(
                                            "w-full px-2 h-8 flex justify-start",
                                            frame === 'macosBarLight' && 'bg-[#f0f0f0] border-b border-b-[#e0e0e0]',
                                            frame === 'macosBarDark' && 'bg-[#3a3a3c] border-b border-b-[#4a4a4c]',
                                            frame.includes('windows') && 'justify-end',
                                            frame === 'windowsBarLight' && 'bg-white text-black',
                                            frame === 'windowsBarDark' && 'bg-gray-700 text-white'
                                        )}>
                                            {frame.includes('macos') && <Icons.macos className="h-full" />}
                                            {frame.includes('windows') && <Icons.windows className="h-full" />}
                                        </div>}
                                        <div className="overflow-hidden w-full flex items-center" style={{
                                            padding: `${paddingValue}px`,
                                            borderRadius: `${ (frame === 'light' || frame === 'dark') && roundValue - 2 > 0 ? roundValue - 2 : 0 }px`,
                                            backgroundColor: paddingBg
                                        }}>
                                            <img src={photoUrl} className="w-full" />
                                        </div>
                                    </div>}
                                </div>
                            </Watermark>
                        </div>
                    </div>
                </div>
                <div className="bg-white flex flex-col gap-2 p-4 md:w-[340px] md:h-[660px] border-l border-l-gray-50 shadow-lg relative">
                    <DrawerSide
                        value={bgValue}
                        showMore={showMore}
                        onChange={setShowMore}
                        onSelectChange={setBgValue}
                        photoUrl={photoUrl}
                        imgColors={imgColors}
                        imgSize={imgSize}
                    />
                    <div className="flex gap-4 justify-center">
                        <DownBtn disabled={!photoUrl} loading={loading} toDownload={toDownload} toCopy={toCopy} />
                        <Button type="text" disabled={!photoUrl} loading={loading} icon={<Icon name="Eraser" />} onClick={toRefresh}></Button>
                    </div>
                    <div className="[&_label]:font-semibold [&_label]:text-sm">
                        <label>Margin</label>
                        <Slider
                            min={0}
                            max={300}
                            onChange={setMarginValue}
                            value={typeof marginValue === 'number' ? marginValue : 0}
                        />
                    </div>
                    <div className="[&_label]:font-semibold [&_label]:text-sm">
                        <div className="flex justify-between">
                            <label>Padding</label>
                            <ColorPicker value={paddingBg} onChange={(e) => setPaddingBg(e.toRgbString())} size="small" />
                        </div>
                        <Slider
                            min={0}
                            max={60}
                            onChange={setPaddingValue}
                            value={typeof paddingValue === 'number' ? paddingValue : 0}
                        />
                    </div>
                    {!modelFrame.includes(frame) &&
                            <div className="[&_label]:font-semibold [&_label]:text-sm">
                                <label>Roundness</label>
                                <Slider
                                    min={0}
                                    max={20}
                                    onChange={setRoundValue}
                                    value={typeof roundValue === 'number' ? roundValue : 0}
                                />
                            </div>
                    }
                    {
                        frame !== 'macbookPro' &&
                        <div className="[&_label]:font-semibold [&_label]:text-sm">
                            <label>Shadow</label>
                            <Slider
                                min={0}
                                max={6}
                                onChange={setShadowValue}
                                value={typeof shadowValue === 'number' ? shadowValue : 0}
                            />
                        </div>
                    }
                    <div className="[&_label]:font-semibold [&_label]:text-sm">
                        <div className="flex justify-between items-center">
                            <label>Background</label>
                            <Button
                                type="text"
                                size="small"
                                className="text-xs flex items-center opacity-80 m-0"
                                onClick={() => setShowMore(true)}
                            >More<Icon name="ChevronRight" style={{ marginLeft: 0 }} /></Button>
                        </div>
                        <div className="py-3">
                            <Radio.Group onChange={(e) => setBgValue(e.target.value)} value={bgValue} rootClassName="grid grid-cols-7 [&_span]:ps-0">
                                <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value='default_1'>
                                    <div className={cn("w-8 h-8 rounded-full", backgroundConfig.default_1)}></div>
                                </Radio>
                                {Object.keys(backgroundConfig).map((key, index) => {
                                    if (key.includes('default') && key !== 'default_1') return (
                                        <Radio key={key} className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={key}>
                                            <div className={cn("w-8 h-8 rounded-full", backgroundConfig[key])}></div>
                                        </Radio>
                                    )
                                })}
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="[&_label]:font-semibold [&_label]:text-sm flex justify-between items-center">
                        <label>Canvas</label>
                        <Select
                            defaultValue={ratio}
                            style={{ width: '50%' }}
                            onChange={setRatio}
                            options={[
                                { value: 1/1, label: '1 : 1' },
                                { value: 4/3, label: '4 : 3' },
                                { value: 16/9, label: '16 : 9' },
                            ]}
                        />
                    </div>
                    <div className="[&_label]:font-semibold [&_label]:text-sm flex justify-between items-center">
                        <label>Frame</label>
                        <Select
                            defaultValue={frame}
                            style={{ width: '50%' }}
                            onChange={setFrame}
                            options={[
                                { value: 'none', label: 'None' },
                                { value: 'light', label: 'Light Glass' },
                                { value: 'dark', label: 'Dark Glass' },
                                { value: 'macbookPro', label: 'Macbook Pro M3' },
                                { value: 'iphonePro', label: 'Iphone 15 Pro' },
                                { value: 'macosBarLight', label: 'MacOS Light' },
                                { value: 'macosBarDark', label: 'MacOS Dark' },
                                { value: 'windowsBarLight', label: 'Windows Light' },
                                { value: 'windowsBarDark', label: 'Windows Dark' },
                            ]}
                        />
                    </div>
                    {modelFrame.includes(frame) &&
                        <div className="flex items-center justify-between text-xs">
                            <label></label>
                            <div>
                                <Radio.Group defaultValue={fit} onChange={(e) => setFit(e.target.value)} size="small">
                                    <Radio.Button value="contain" className="text-xs">Contain</Radio.Button>
                                    <Radio.Button value="cover" className="text-xs">Cover</Radio.Button>
                                    <Radio.Button value="fill" className="text-xs">Fill</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>
                    }
                    <div className="[&_label]:font-semibold [&_label]:text-sm flex gap-4 items-center">
                        <label>Watermark</label>
                        <Switch defaultChecked={useWater} onChange={(checked) => setUseWater(checked)} size="small" className="bg-slate-200" />
                    </div>
                    {useWater && 
                        <div className="[&_label]:font-semibold [&_label]:text-xs grid gap-2 pl-4">
                            <Input defaultValue={waterCont} placeholder="Watermark content" onChange={(e) => setWaterCont(e.target.value)} />
                            <div className="flex items-center justify-between">
                                <label>Color</label>
                                <ColorPicker value={waterColor} onChange={handleColorChange} size="small" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label>Direction</label>
                                <div>
                                <Radio.Group defaultValue={direction} onChange={(e) => setDirection(e.target.value)} size="small">
                                    <Radio.Button value={-22}><Icon name="ArrowUpRight" className="mt-[3px]" /></Radio.Button>
                                    <Radio.Button value={22}><Icon name="ArrowDownRight" className="mt-[3px]" /></Radio.Button>
                                </Radio.Group>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <label>Only Background</label>
                                <Switch size="small" onChange={(checked) => setWaterIndex(checked ? 9 : 11)} className="bg-slate-200" />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}