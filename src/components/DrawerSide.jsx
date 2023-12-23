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
                key: JSON.stringify({ background: `rgb(${item.join(',')})` })
            });
        });
        scatterArray(imgColors).map(item => {
            lists.push({
                key: JSON.stringify({ backgroundImage: item, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' })
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