import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Slider, Button, Tooltip, message, Select } from 'antd';
import { RotateLeftOutlined } from '@ant-design/icons'
import { Icon } from '@components/Icons';
import { DownBtn } from '@components/DownBtn';
import state from '@states/screenshot';
import useKeyboardShortcuts from '@lib/useKeyboardShortcuts';
import { getScreenshotToolCopy } from '@lib/screenshotToolCopy';

const aspectLists = [
    {
        label: <span>Landscape</span>,
        title: 'Landscape',
        options: [
            { label: <span>1:1</span>, value: 1/1 },
            { label: <span>2:1</span>, value: 2/1 },
            { label: <span>3:2</span>, value: 3/2 },
            { label: <span>4:3</span>, value: 4/3 },
            { label: <span>5:4</span>, value: 5/4 },
            { label: <span>16:10</span>, value: 16/10 },
            { label: <span>16:9</span>, value: 16/9 }
        ],
    },
    {
        label: <span>Portrait</span>,
        title: 'Portrait',
        options: [
            { label: <span>1:2</span>, value: 1/2 },
            { label: <span>2:3</span>, value: 2/3 },
            { label: <span>3:4</span>, value: 3/4 },
            { label: <span>4:5</span>, value: 4/5 },
            { label: <span>10:16</span>, value: 10/16 },
            { label: <span>9:16</span>, value: 9/16 }
        ],
    },
]

export default observer(({ copy = getScreenshotToolCopy() }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    useKeyboardShortcuts(() => toDownload(), () => toCopy(), [state.imageSrc]);

    const toApply = async () => {
        setLoading(true);
        try {
            const img = await state.getCroppedImg();
            if (!img) throw new Error('No cropped image');
            state.setImageSrc(img);
            state.setIsCrop(false);
        } catch {
            messageApi.error(copy.cropFailed);
        } finally {
            setLoading(false);
        }
    }
    const toDownload = () => {
        try {
            state.downloadFile();
            messageApi.success(copy.downloadSuccess);
        } catch {
            messageApi.error(copy.downloadFailed);
        }
    }
    const toCopy = () => {
        state.copyFile().then(() => {
            messageApi.success(copy.copySuccess);
        }).catch(() => {
            messageApi.error(copy.copyFailed);
        });
    }
    const toRefresh = () => {
        state.setImageSrc(null);
        state.setIsCrop(false);
        state.reset();
    }
    let component = (
        <>
            <div className="flex items-center justify-center gap-3">
                <Tooltip placement="top" title={copy.crop}>
                    <Button type="text" aria-label={copy.crop} shape="circle" icon={<Icon name="Crop" />} onClick={() => state.setIsCrop(true)}></Button>
                </Tooltip>
                <Tooltip placement="top" title={copy.grid}>
                    <Button type="text" aria-label={copy.grid} aria-pressed={state.isGrid} shape="circle" className={state.isGrid && 'text-[#1677ff]'} icon={<Icon name="Grip" />} onClick={() => state.toggleGrid()}></Button>
                </Tooltip>
            </div>
            <div className="flex gap-3 items-center justify-center">
                <DownBtn copy={copy} disabled={!state.imageSrc} loading={loading} toDownload={toDownload} toCopy={toCopy} />
                <Tooltip placement="top" title={copy.clear}>
                    <Button type="text" aria-label={copy.clear} disabled={!state.imageSrc} loading={loading} icon={<Icon name="Eraser" />} onClick={toRefresh}></Button>
                </Tooltip>
            </div>
        </>
    );
    if (state.isCrop) {
        component = (
            <div className="flex flex-wrap w-full gap-3 justify-center items-center">
                <Tooltip placement="top" title={copy.zoomOut}>
                    <Button type="text" aria-label={copy.zoomOut} shape="circle" disabled={state.zoom <= 1} icon={<Icon name="ZoomOut" />} onClick={() => state.zoomOut()}></Button>
                </Tooltip>
                <Tooltip placement="top" title={copy.zoomIn}>
                    <Button type="text" aria-label={copy.zoomIn} shape="circle" disabled={state.zoom >= 3} icon={<Icon name="ZoomIn" />} onClick={() => state.zoomIn()}></Button>
                </Tooltip>
                <Tooltip placement="top" title={copy.rotateLeft}>
                    <Button type="text" aria-label={copy.rotateLeft} shape="circle" icon={<RotateLeftOutlined />} onClick={() => state.rotateLeft()}></Button>
                </Tooltip>
                <div className="flex gap-2 items-center text-xs">
                    <label className="font-light">{copy.rotation}:</label>
                    <Slider className="flex-1 w-28" defaultValue={state.rotation} value={state.rotation} min={0} max={360} step={1} onChange={(value) => state.setRotation(value)} />
                </div>
                <div className="flex gap-2 items-center text-xs">
                    <label className="font-light">{copy.aspect}:</label>
                    <Select
                        className="w-24"
                        defaultValue={state.aspect}
                        value={state.aspect}
                        size="small"
                        onChange={(value) => state.setAspect(value)}
                        aria-label={copy.aspect}
                        options={aspectLists.map((group, index) => ({ ...group, label: index === 0 ? copy.landscape : copy.portrait, title: index === 0 ? copy.landscape : copy.portrait }))}
                    />
                </div>
                <div className="flex items-center gap-2 before:w-[1px] before:block before:content-[''] before:bg-slate-300 before:h-4">
                    <Tooltip placement="top" title={copy.cancel}>
                        <Button type="link" aria-label={copy.cancel} shape="circle" icon={<Icon name="Undo" />} loading={loading} onClick={() => state.setIsCrop(false)} />
                    </Tooltip>
                    <Tooltip placement="top" title={copy.apply}>
                        <Button type="link" aria-label={copy.apply} shape="circle" icon={<Icon name="Check" />} loading={loading} onClick={toApply} />
                    </Tooltip>
                </div>
            </div>
        );
    }
    return (
        <div className="flex gap-4 justify-center flex-col-reverse bg-white p-2 border-b shadow-md md:flex-row md:justify-between">
            {component}
            {contextHolder}
        </div>
    )
});
