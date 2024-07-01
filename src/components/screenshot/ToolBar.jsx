import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Slider, Button, Tooltip } from 'antd';
import { RotateLeftOutlined } from '@ant-design/icons'
import { Icon } from '@components/Icons';
import { cn, captureScreen } from '@lib/utils';
import state from '@states/screenshot';

export default observer(() => {
    let component = (
        <div className="flex items-center justify-center gap-3">
            <Button type="text" shape="circle" icon={<Icon name="Crop" />} onClick={() => state.setIsCrop(true)}></Button>
            <Button type="text" shape="circle" className={state.isGrid && 'text-[#1677ff]'} icon={<Icon name="Grip" />} onClick={() => state.toggleGrid()}></Button>
        </div>
    );
    if (state.isCrop) {
        component = (
            <div className="flex w-full gap-3 justify-center items-center">
                <Tooltip placement="top" title="Zoom in image">
                    <Button type="text" shape="circle" disabled={state.zoom === 3} icon={<Icon name="ZoomIn" />} onClick={() => state.zoomIn()}></Button>
                </Tooltip>
                <Tooltip placement="top" title="Zoom out image">
                    <Button type="text" shape="circle" disabled={state.zoom === 1} icon={<Icon name="ZoomOut" />} onClick={() => state.zoomOut()}></Button>
                </Tooltip>
                <Tooltip placement="top" title="Rotate left 90°">
                    <Button type="text" shape="circle" icon={<RotateLeftOutlined />} onClick={() => state.rotateLeft()}></Button>
                </Tooltip>
                <div className="flex gap-2 items-center text-xs">
                    <label className="font-light">ROTATION:</label>
                    <Slider className="flex-1 w-28" defaultValue={state.rotation} value={state.rotation} min={0} max={360} step={1} onChange={(value) => state.setRotation(value)} />
                </div>
            </div>
        );
    }
    return (
        <div className="flex gap-4 justify-center flex-col-reverse bg-white p-2 border-b shadow-md md:flex-row md:justify-between">
            {component}
        </div>
    )
});