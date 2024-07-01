import React from 'react';
import { Icon, Icons } from './Icons';
import { Button, ColorPicker, Tooltip } from 'antd';
import { WidthDropdown } from './WidthDropdown';
import { EmojiSelect } from './EmojiSelect';

export const Toolbar = ({disabled, tool, toSelect, isFull, onFullChange, annotateColor, onAnnotateChange, annotateWidth, onWidthChange, toCapture, onEmojiSelect}) => {
    return (
        <div className="flex items-center">
            <Button type="text" shape="circle" icon={isFull ? <Icon name="Minimize" /> : <Icon name="Maximize" />} onClick={() => onFullChange(!isFull)}></Button>
            <div className="px-3 mx-1 border-l flex items-center">
                <Button
                    type="text"
                    shape="circle"
                    disabled={disabled}
                    className={tool === 'rect' && 'text-[#1677ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1677ff]'}
                    icon={<Icon name="Square" />}
                    onClick={() => toSelect('rect')}
                ></Button>
                <Button
                    type="text"
                    shape="circle"
                    disabled={disabled}
                    className={tool === 'filledRect' && 'text-[#1677ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1677ff]'}
                    icon={<span className="anticon align-[-1px]"><Icons.filledRect className="text-sm" /></span>}
                    onClick={() => toSelect('filledRect')}
                ></Button>
                <Button
                    type="text"
                    shape="circle"
                    disabled={disabled}
                    className={tool === 'circle' && 'text-[#1677ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1677ff]'}
                    icon={<Icon name="Circle" />}
                    onClick={() => toSelect('circle')}
                ></Button>
                <Button
                    type="text"
                    shape="circle"
                    disabled={disabled}
                    className={tool === 'line' && 'text-[#1677ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1677ff]'}
                    icon={<span className="anticon align-[-1px]"><Icons.line className="text-sm" /></span>}
                    onClick={() => toSelect('line')}
                ></Button>
                <Button
                    type="text"
                    shape="circle"
                    disabled={disabled}
                    className={tool === 'arrow' && 'text-[#1677ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1677ff]'}
                    icon={<Icon name="MoveDownLeft" />}
                    onClick={() => toSelect('arrow')}
                ></Button>
                <Button
                    type="text"
                    shape="circle"
                    disabled={disabled}
                    className={tool === 'pencil' && 'text-[#1677ff] bg-sky-100/50 hover:bg-sky-100 hover:text-[#1677ff]'}
                    icon={<Icon name="Pencil" />}
                    onClick={() => toSelect('pencil')}
                ></Button>
                <EmojiSelect
                    disabled={disabled}
                    toSelect={onEmojiSelect}
                />
            </div>
            <div className="px-3 border-l flex gap-1 items-center">
                <ColorPicker size="small" presets={[{ label: 'Recommended', colors: ['#ffffff', '#444444', '#df4b26', '#1677ff', '#52C41A', '#FA8C16', '#FADB14', '#EB2F96', '#722ED1'] }]} value={annotateColor} onChange={onAnnotateChange} />
                <WidthDropdown defaultValue={annotateWidth} onClick={onWidthChange} />
            </div>
            <div className="px-3 border-l flex gap-1 items-center">
                <Tooltip placement="bottom" title="Use webRTC to capture screen">
                    <Button
                        type="text"
                        shape="circle"
                        icon={<Icon name="Camera" />}
                        onClick={toCapture}
                    ></Button>
                </Tooltip>
            </div>
        </div>
    )
}