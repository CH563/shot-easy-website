import React, { useState, useMemo } from 'react';
import { Button, Drawer } from 'antd';
import { Icon } from './Icons';
import { BackgroundSelect } from './BackgroundSelect';
import { cn, computedSize, scatterArray } from '../lib/utils';

export const DrawerSide = ({ showMore, onChange, onSelectChange, value, photoUrl, imgColors, imgSize }) => {
    const realWidth = useMemo(() => {
        if (!imgSize?.width) return '96';
        const { width } = computedSize(imgSize.width, imgSize.height, 64, 48);
        return width;
    }, [imgSize]);
    const {options, lists} = useMemo(() => {
        const options = [];
        const lists = [];
        if (!imgColors?.length) return {options,lists};
        imgColors.map(item => {
            options.push({
                key: JSON.stringify({ background: item })
            });
        });
        scatterArray(imgColors).map(item => {
            lists.push({
                key: JSON.stringify({ backgroundImage: `url("data:image/svg+xml,${ encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 900" fill="none" style="background: ${ item[0] };"><path fill="${ item[1] }" d="M999.7 129.2c180.6-46 277.6-156.1 461-123.1 424.7 76.4 369.8 882.1 0 1104.5-222.4 133.8-426.7 103.7-664.7 0C563.8 1009.4 474 921 345.5 702.7 298.8 623.4 244 474.5 273 367.8c33-121.6 127.4-178 251-203 127.2-25.7 251.5 21.6 475.6-35.6Z" style="filter: blur(300px);"></path><path fill="${ item[2] }" d="M1108.4 282.7c154.7-39.5 237.9-133.8 395-105.5 363.8 65.5 316.8 756 0 946.5-190.5 114.7-365.6 88.9-569.5 0C735 1037 658 961.2 548 774.2c-40-68-86.8-195.6-62-287 28.4-104.2 109.2-152.6 215-174 109-22 215.5 18.5 407.5-30.5Z" style="filter: blur(200px);"></path><ellipse fill="${ item[3] }" cx="1319.7" cy="799.3" rx="556.5" ry="379" transform="rotate(22 1319.7 799.3)" style="filter: blur(200px);"></ellipse></svg>`) }")`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' })
            });
        })
        return {options,lists};
    },[imgColors]);
    const onMoreClose = () => {
        onChange(false);
    }
    return (
        <Drawer
            title=""
            placement="right"
            closable={false}
            mask={false}
            onClose={onMoreClose}
            open={showMore}
            getContainer={false}
            width="100%"
            className="[&_.ant-drawer-body]:p-0"
        >
            <div className="flex flex-col gap-2 h-full overflow-hidden">
                <div className="shrink-0 pt-4 px-4">
                    <Button
                        type="text"
                        size="small"
                        className="text-xs flex items-center opacity-80 m-0"
                        icon={<Icon name="ChevronLeft"/>}
                        onClick={() => onChange(false)}
                    >Back</Button>
                </div>
                <div className="h-0 flex-1 overflow-y-auto px-4 py-2">
                    <h4 className="text-sm font-bold py-2">Image Colors</h4>
                    {!photoUrl && <div className="text-xs p-1 text-center text-gray-400">✨ Generate Colors from your image</div>}
                    {photoUrl && (
                        <>
                            <div className="flex gap-3 items-center mb-2">
                                <div className="overflow-hidden p-[1px] border" style={{width: `${realWidth}px`}}>
                                    <img src={photoUrl} className="w-full" />
                                </div>
                                <BackgroundSelect type="style" options={options} onChange={onSelectChange} value={value} />
                            </div>
                            <BackgroundSelect type="svg" options={lists} onChange={onSelectChange} value={value} />
                        </>
                    )
                    }
                    <h4 className="text-sm font-bold py-2">Solid Colors</h4>
                    <BackgroundSelect type="solid" onChange={onSelectChange} value={value} />
                    <h4 className="text-sm font-bold pb-1 pt-2">Gradients</h4>
                    <BackgroundSelect type="gradient" onChange={onSelectChange} value={value} />
                    <h4 className="text-sm font-bold py-2">Cosmic Gradients</h4>
                    <BackgroundSelect type="cosmic" onChange={onSelectChange} value={value} />
                    <h4 className="text-sm font-bold py-2">Desktop</h4>
                    <BackgroundSelect type="desktop" onChange={onSelectChange} value={value} />
                </div>
            </div>
        </Drawer>
    )
}