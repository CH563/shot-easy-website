import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Slider, Button, Tooltip, message, Select } from 'antd';
import { RotateLeftOutlined } from '@ant-design/icons'
import { Icon } from '@components/Icons';
import { DownBtn } from '@components/DownBtn';
import state from '@states/screenshot';
import useKeyboardShortcuts from '@lib/useKeyboardShortcuts';

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

export default observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    useKeyboardShortcuts(() => toDownload(), () => toCopy(), [state.imageSrc]);

    const toApply = async () => {
        setLoading(true);
        const img = await state.getCroppedImg();
        state.setImageSrc(img);
        state.setIsCrop(false);
        setLoading(false);
    }
    const toDownload = () => {
        state.downloadFile();
        messageApi.success('Download Success!');
    }
    const toCopy = () => {
        state.copyFile().then(() => {
            messageApi.success('Copied Success!');
        }).catch(() => {
            messageApi.error('Copy Failed!');
        });
    }
    const toRefresh = () => {
        state.setImageSrc(null);
        state.reset();
    }
    let component = (
        <>
            <div className="flex items-center justify-center gap-3">
                <Tooltip placement="top" title="Crop image">
                    <Button type="text" shape="circle" icon={<Icon name="Crop" />} onClick={() => state.setIsCrop(true)}></Button>
                </Tooltip>
                <Button type="text" shape="circle" className={state.isGrid && 'text-[#1677ff]'} icon={<Icon name="Grip" />} onClick={() => state.toggleGrid()}></Button>
            </div>
            <div className="flex gap-3 items-center justify-center">
                <DownBtn disabled={!state.imageSrc} loading={loading} toDownload={toDownload} toCopy={toCopy} />
                <Button type="text" disabled={!state.imageSrc} loading={loading} icon={<Icon name="Eraser" />} onClick={toRefresh}></Button>
            </div>
        </>
    );
    if (state.isCrop) {
        component = (
            <div className="flex w-full gap-3 justify-center items-center">
                <Tooltip placement="top" title="Zoom out image">
                    <Button type="text" shape="circle" disabled={state.zoom <= 1} icon={<Icon name="ZoomOut" />} onClick={() => state.zoomOut()}></Button>
                </Tooltip>
                <Tooltip placement="top" title="Zoom in image">
                    <Button type="text" shape="circle" disabled={state.zoom >= 3} icon={<Icon name="ZoomIn" />} onClick={() => state.zoomIn()}></Button>
                </Tooltip>
                <Tooltip placement="top" title="Rotate left 90°">
                    <Button type="text" shape="circle" icon={<RotateLeftOutlined />} onClick={() => state.rotateLeft()}></Button>
                </Tooltip>
                <div className="flex gap-2 items-center text-xs">
                    <label className="font-light">ROTATION:</label>
                    <Slider className="flex-1 w-28" defaultValue={state.rotation} value={state.rotation} min={0} max={360} step={1} onChange={(value) => state.setRotation(value)} />
                </div>
                <div className="flex gap-2 items-center text-xs">
                    <label className="font-light">ASPECT:</label>
                    <Select
                        className="w-24"
                        defaultValue={state.aspect}
                        value={state.aspect}
                        size="small"
                        onChange={(value) => state.setAspect(value)}
                        options={aspectLists}
                    />
                </div>
                <div className="flex items-center gap-2 before:w-[1px] before:block before:content-[''] before:bg-slate-300 before:h-4">
                    <Tooltip placement="top" title="Undo">
                        <Button type="link" shape="circle" icon={<Icon name="Undo" />} loading={loading} onClick={() => state.setIsCrop(false)} />
                    </Tooltip>
                    <Tooltip placement="top" title="Apply Crop">
                        <Button type="link" shape="circle" icon={<Icon name="Check" />} loading={loading} onClick={toApply} />
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