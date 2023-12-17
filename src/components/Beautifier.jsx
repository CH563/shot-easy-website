import React, { useState, useRef, useEffect } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { DownloadOutlined, CopyOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Slider, Radio, Select, Switch, Upload, Watermark, Input, ColorPicker, message } from 'antd';
import { Icons } from '../components/Icons';
import { cn, supportImg } from '../lib/utils';
import { MacbookPro } from './MacbookPro';
import { IphonePro } from './IphonePro';

const modelFrame = ['macbookPro', 'iphonePro'];

const { Dragger } = Upload;

export default function Beautifier() {
    const [messageApi, contextHolder] = message.useMessage();
    const boxRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1682685797208-c741d58c2eff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTY5OTZ8MXwxfGFsbHw2fHx8fHx8Mnx8MTcwMjcyMjY2MHw&ixlib=rb-4.0.3&q=80&w=600');
    const [marginValue, setMarginValue] = useState(150);
    const [paddingValue, setPaddingValue] = useState(0);
    const [paddingBg, setPaddingBg] = useState('rgba(255,255,255,.85)');
    const [roundValue, setRoundValue] = useState(10);
    const [shadowValue, setShadowValue] = useState(3);
    const [frame, setFrame] = useState('none');
    const [ratio, setRatio] = useState(4/3);
    const [bgValue, setBgValue] = useState(1);
    const [useWater, setUseWater] = useState(false);
    const [waterCont, setWaterCont] = useState('Shot Easy');
    const [waterColor, setWaterColor] = useState('rgba(0,0,0,.15)');
    const [waterIndex, setWaterIndex] = useState(11);
    const [direction, setDirection] = useState(-22);
    const [fit, setFit] = useState('cover');

    useEffect(() => {
        const getPaste = (e) => {
            const data = e.clipboardData;
            if (!data || !data.items) return;
            const items = Array.from(data.items).filter(e => supportImg.includes(e.type));
            if (!items.length) return;
            const file = items[0].getAsFile();
            setPhotoUrl(window.URL.createObjectURL(file));
        }
        document.addEventListener('paste', getPaste, false);
        return (() => {
            document.removeEventListener('paste', getPaste);
        })
    }, [document])

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
            pixelRatio: 1
        }).then((dataUrl) => {
            let tmpLink = document.createElement('a');
            tmpLink.href = dataUrl;
            tmpLink.download = 'shotEasy.png';
            tmpLink.style = 'position: absolute; z-index: -111; visibility: none;';
            document.body.appendChild(tmpLink);
            tmpLink.click();
            document.body.removeChild(tmpLink);
            tmpLink = null;
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
            console.log(error);
            messageApi.error('Copy Failed!');
        }).finally(() => {
            setLoading(false);
        });
    }

    const toRefresh = () => {
        setPhotoUrl('');
    }

    return (
        <>
            {contextHolder}
            <div className="polka flex flex-col min-h-[500px] rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased md:flex-row md:items-center">
                <div className="md:w-0 md:flex-1 md:h-[660px] overflow-auto select-none p-5">
                    <div className="min-w-full md:min-w-[600px] min-h-full flex items-center justify-center">
                        <div ref={boxRef} className={cn(
                            'relative overflow-hidden w-full md:w-[600px] bg-gradient-to-r',
                            bgValue === 1 && 'from-indigo-500 via-purple-500 to-pink-500',
                            bgValue === 2 && 'from-red-500 via-pink-500 to-violet-500',
                            bgValue === 3 && 'from-violet-800 via-pink-600 to-orange-500',
                            bgValue === 4 && 'from-orange-400 to-rose-400',
                            bgValue === 5 && 'from-[#4284DB] to-[#29EAC4]',
                            bgValue === 6 && 'from-[#fc00ff] to-[#00dbde]',
                        )} style={{ aspectRatio: ratio }}>
                            <Watermark rootClassName="w-full md:w-[600px] h-full" content={useWater ? waterCont : ''} font={{color: waterColor}} rotate={direction} zIndex={waterIndex}>
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    {!photoUrl && <Dragger
                                        accept={supportImg.join(',')}
                                        name="file"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        rootClassName="p-4 rounded-md bg-white"
                                    >
                                        <p className="text-2xl"><UploadOutlined /></p>
                                        <p className="text-sm px-4">Click or Drag image to this area<br/>or Paste image</p>
                                    </Dragger>}
                                    {(photoUrl && frame === 'macbookPro') && <MacbookPro width={600 - marginValue} img={photoUrl} fit={fit} style={{
                                            padding: `${ paddingValue }px`,
                                            backgroundColor: paddingBg
                                        }}
                                    />}
                                    {(photoUrl && frame === 'iphonePro') && <IphonePro height={600/ratio - marginValue} img={photoUrl} shadow={shadowValue} fit={fit} style={{
                                            padding: `${ paddingValue }px`,
                                            backgroundColor: paddingBg
                                        }}
                                    />}
                                    {(photoUrl && !modelFrame.includes(frame)) && <div className={cn(
                                        "overflow-hidden translate-x-0",
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
                                        width: `${ 600 - marginValue }px`,
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
                <div className="bg-white flex flex-col gap-2 p-4 md:w-[340px] md:h-[660px] border-l border-l-gray-50 shadow-lg">
                    <div className="flex gap-4 justify-center">
                        <Button disabled={!photoUrl} loading={loading} icon={<DownloadOutlined />} onClick={toDownload}>Save</Button>
                        <Button disabled={!photoUrl} loading={loading} icon={<CopyOutlined />} onClick={toCopy}>Copy</Button>
                        <Button type="text" disabled={!photoUrl} loading={loading} icon={<DeleteOutlined />} onClick={toRefresh}></Button>
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
                        <label>Background</label>
                        <div className="py-3">
                            <Radio.Group onChange={(e) => setBgValue(e.target.value)} value={bgValue}>
                                <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={1}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                </Radio>
                                <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={2}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-violet-500"></div>
                                </Radio>
                                <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={3}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-800 via-pink-600 to-orange-500"></div>
                                </Radio>
                                <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={4}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-rose-400"></div>
                                </Radio>
                                <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={5}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#4284DB] to-[#29EAC4]"></div>
                                </Radio>
                                <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={6}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#fc00ff] to-[#00dbde]"></div>
                                </Radio>
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
                                        <Radio.Button value={-22}><Icons.arrowUp className="mt-[3px]" /></Radio.Button>
                                    <Radio.Button value={22}><Icons.arrowDown className="mt-[3px]" /></Radio.Button>
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