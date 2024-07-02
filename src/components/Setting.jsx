import React, { useState } from 'react';
import { Slider, Select, InputNumber, Button, ColorPicker, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { compressorState } from '@states/compressor';

const showTip = (num) => {
    if (num < 30) return 'Low';
    if (num < 60) return 'Mid';
    if (num < 90) return 'Optimal';
    return 'High';
};

const defaultOption = {
    quality: 75,
    format: 'auto',
    color: '#FFFFFF',
    sizeType: 'auto',
    size: undefined
}

const convertOptions = [
    { value: 'auto', label: <span>Auto</span> },
    { value: 'jpg', label: <span>JPG</span> },
    { value: 'jpeg', label: <span>JPEG</span> },
    { value: 'png', label: <span>PNG</span> },
    { value: 'webp', label: <span>WEBP</span> },
    { value: 'avif', label: <span>AVIF</span> }
];
const sizeOption = [
    { value: 'auto', label: <span>Auto</span> },
    { value: 'fitWidth', label: <span>Width</span> },
    { value: 'fitHeight', label: <span>Hight</span> },
];

export default observer(() => {
    const [quality, setQuality] = useState(defaultOption.quality);
    const [format, setFormat] = useState(defaultOption.format);
    const [color, setColor] = useState(defaultOption.color);
    const [sizeType, setSizeType] = useState(defaultOption.sizeType);
    const [size, setSize] = useState(defaultOption.size);

    const reset = () => {
        compressorState.resetOption();
        setQuality(defaultOption.quality);
        setFormat(defaultOption.format);
        setColor(defaultOption.color);
        setSizeType(defaultOption.sizeType);
        setSize(defaultOption.size);
    }
    const onQualityChange = (value) => {
        setQuality(value);
        compressorState.setQuality(value);
    }
    const onFormatChange = (value) => {
        setFormat(value);
        compressorState.setFormat(value, color);
    }
    const onColorChange = (value) => {
        const col = "#" + value.toHex().toUpperCase();
        setColor(col);
        compressorState.setFormat(format, col);
    }
    const onSizeTypeChange = (value) => {
        setSizeType(value);
        setSize(defaultOption.size);
        compressorState.setSizeType(value);
    }
    const onSizeChange = (value) => {
        setSize(value);
        compressorState.setSizeType(sizeType, value);
    }
    return (
        <div className="py-1 px-2 flex items-center gap-4 border-t border-dotted bg-slate-50 text-xs select-none">
            <div className="flex gap-2 items-center">
                <label className="font-semibold">Quality:</label>
                <Slider className="flex-1 w-52" defaultValue={quality} value={quality} min={0} max={100} step={1} onChange={onQualityChange} />
                <span className="w-12 text-blue-500">{showTip(quality)}</span>
            </div>
            <div className="flex gap-2 items-center">
                <label className="font-semibold">Convert:</label>
                <Select
                    className="flex-1 w-32"
                    defaultValue="auto"
                    value={format}
                    size="small"
                    onChange={onFormatChange}
                    options={convertOptions}
                />
            </div>
            {
                ['jpg', 'jpeg'].includes(format) &&
                <Tooltip placement="top" title="The transparent fill color">
                    <ColorPicker
                        showText
                        disabledAlpha
                        value={color}
                        size="small"
                        onChangeComplete={onColorChange}
                    />
                </Tooltip>
            }
            <div className="flex gap-2 items-center">
                <label className="font-semibold">Size:</label>
                <Select
                    className="w-24"
                    defaultValue="auto"
                    value={sizeType}
                    size="small"
                    onChange={onSizeTypeChange}
                    options={sizeOption}
                />
                {
                    sizeType !== 'auto' &&
                    <InputNumber className="w-48" size="small" value={size} addonAfter={`px, ${sizeType == 'fitWidth' ? 'H':'W'} auto`} min={1} max={100000} onChange={onSizeChange} />
                }
            </div>
            <div className="flex-1 text-right">
                <Button size="small" type="link" onClick={reset}>Reset</Button>
            </div>
        </div>
    )
})