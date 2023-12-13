import React, { useState, useRef } from 'react';
import { DownloadOutlined, CopyOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Slider, Radio, Select, Switch, Upload, Watermark, Input, ColorPicker } from 'antd';
import { Icons } from '../components/Icons';
import { cn } from '../lib/utils';

const { Dragger } = Upload;

export default function Beautifier() {
    const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1550859492-d5da9d8e45f3');
    const [marginValue, setMarginValue] = useState(150);
    const [paddingValue, setPaddingValue] = useState(0);
    const [roundValue, setRoundValue] = useState(10);
    const [shadowValue, setShadowValue] = useState(3);
    const [frame, setFrame] = useState('none');
    const [ratio, setRatio] = useState(4/3);
    const [bgValue, setBgValue] = useState(1);
    const [waterCont, setWaterCont] = useState('Shot Easy');
    const [waterColor, setWaterColor] = useState('rgba(0,0,0,.15)');

    const beforeUpload = (file) => {
        setPhotoUrl(window.URL.createObjectURL(file));
        return false;
    }

    const onBgChange = (e) => {
        setBgValue(e.target.value);
    };
    return (
        <div className="polka flex flex-col min-h-[500px] rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased md:flex-row md:items-center">
            <div className="w-0 flex-1 flex md:h-[660px] overflow-auto">
                <div className="min-w-full h-min-full flex items-center justify-center p-5">
                    <Watermark content={waterCont} font={{color: waterColor}}>
                        <div className={cn(
                            'relative overflow-hidden w-[340px] md:w-[600px] bg-gradient-to-r',
                            bgValue === 1 && 'from-indigo-500 via-purple-500 to-pink-500',
                            bgValue === 2 && 'from-red-500 via-pink-500 to-violet-500',
                            bgValue === 3 && 'from-violet-800 via-pink-600 to-orange-500',
                            bgValue === 4 && 'from-orange-400 to-rose-400',
                            bgValue === 5 && 'from-[#4284DB] to-[#29EAC4]',
                            bgValue === 6 && 'from-[#fc00ff] to-[#00dbde]',
                        )} style={{ aspectRatio: ratio }}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                {!photoUrl && <Dragger
                                    accept="image/jpeg,image/webp,image/png,image/gif,image/bmp,image/heic,image/heif"
                                    name="file"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    rootClassName="p-4 rounded-md bg-white"
                                >
                                    <p className="text-2xl"><UploadOutlined /></p>
                                    <p className="text-sm px-4">Click or drag image to this area</p>
                                </Dragger>}
                                {photoUrl && <div className={cn(
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
                                        "w-full h-6 flex justify-start",
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
                                        paddingLeft: `${paddingValue}px`,
                                        paddingRight: `${ paddingValue }px`,
                                        borderRadius: `${ (frame === 'light' || frame === 'dark') && roundValue - 2 > 0 ? roundValue - 2 : 0 }px`,
                                    }}>
                                        <img src={photoUrl} className="w-full" />
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </Watermark>
                </div>
            </div>
            <div className="bg-white flex flex-col gap-2 p-4 w-[340px] md:h-[660px] border-l border-l-gray-50 shadow-lg">
                <div className="flex gap-4 justify-center">
                    <Button disabled={!photoUrl} icon={<DownloadOutlined />}>Save</Button>
                    <Button disabled={!photoUrl} icon={<CopyOutlined />}>Copy</Button>
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
                    <label>Padding</label>
                    <Slider
                        min={0}
                        max={60}
                        onChange={setPaddingValue}
                        value={typeof paddingValue === 'number' ? paddingValue : 0}
                    />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm">
                    <label>Roundness</label>
                    <Slider
                        min={0}
                        max={20}
                        onChange={setRoundValue}
                        value={typeof roundValue === 'number' ? roundValue : 0}
                    />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm">
                    <label>Shadow</label>
                    <Slider
                        min={0}
                        max={6}
                        onChange={setShadowValue}
                        value={typeof shadowValue === 'number' ? shadowValue : 0}
                    />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm">
                    <label>Background</label>
                    <div className="py-3">
                        <Radio.Group onChange={onBgChange} value={bgValue}>
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
                            { value: 'macosBarLight', label: 'MacOS Light' },
                            { value: 'macosBarDark', label: 'MacOS Dark' },
                            { value: 'windowsBarLight', label: 'Windows Light' },
                            { value: 'windowsBarDark', label: 'Windows Dark' },
                        ]}
                    />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm flex gap-4 items-center">
                    <label>Watermark</label>
                    <Switch defaultChecked size="small" className="bg-slate-200" />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm grid gap-4">
                    <Input defaultValue={waterCont} placeholder="Watermark content" />
                    <div className="flex items-center justify-between">
                        <label>Color</label>
                        <ColorPicker value={waterColor} onChange={setWaterColor} size="small" />
                    </div>
                </div>
            </div>
        </div>
    )
}