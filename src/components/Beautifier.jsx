import React, { useState, useRef } from 'react';
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, Slider, Radio } from 'antd';

export default function Beautifier() {
    const [marginValue, setMarginValue] = useState(1);
    const [bgValue, setBgValue] = useState(1);

    const onChange = (newValue) => {
        setMarginValue(newValue);
    };
    const onBgChange = (e) => {
        setBgValue(e.target.value);
    };
    return (
        <div className="polka flex flex-col min-h-[500px] rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased md:flex-row md:items-center">
            <div className="flex-1 w-full h-full flex justify-center md:items-center">
                <div className="h-fit w-fit rounded-lg overflow-clip">
                    <div className="relative w-[340px] md:w-[600px] bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600" style={{ aspectRatio: 4 / 3 }}>
                        <div className="absolute inset-0 flex items-center justify-center">222</div>
                    </div>
                </div>
            </div>
            <div className="bg-white flex flex-col gap-2 p-4 w-[340px] md:h-[600px] border-l border-l-gray-50 shadow-lg">
                <div className="flex gap-4 justify-center">
                    <Button icon={<DownloadOutlined />}>Save</Button>
                    <Button icon={<CopyOutlined />}>Copy</Button>
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm">
                    <label>Margin</label>
                    <Slider
                        min={1}
                        max={30}
                        tooltip={{open:false}}
                        onChange={onChange}
                        value={typeof marginValue === 'number' ? marginValue : 0}
                    />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm">
                    <label>Padding</label>
                    <Slider
                        min={1}
                        max={30}
                        tooltip={{open:false}}
                        onChange={onChange}
                        value={typeof marginValue === 'number' ? marginValue : 0}
                    />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm">
                    <label>Roundness</label>
                    <Slider
                        min={1}
                        max={30}
                        tooltip={{open:false}}
                        onChange={onChange}
                        value={typeof marginValue === 'number' ? marginValue : 0}
                    />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm">
                    <label>Shadow</label>
                    <Slider
                        min={1}
                        max={30}
                        tooltip={{open:false}}
                        onChange={onChange}
                        value={typeof marginValue === 'number' ? marginValue : 0}
                    />
                </div>
                <div className="[&_label]:font-semibold [&_label]:text-sm">
                    <label>Background</label>
                    <div className="py-3">
                        <Radio.Group onChange={onBgChange} value={bgValue}>
                            <Radio className="[&_.ant-radio]:hidden [&_span]:p-0 []" value={1}>
                                <div className="ring-0 ring-offset-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600"></div>
                            </Radio>
                            <Radio value={2}>B</Radio>
                            <Radio value={3}>C</Radio>
                            <Radio value={4}>D</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        </div>
    )
}