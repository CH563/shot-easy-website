import React, { useState, useRef } from 'react';
import { Button, Drawer } from 'antd';
import { Icon } from './Icons';
import { BackgroundSelect } from './BackgroundSelect';
import { cn } from '../lib/utils';

export const DrawerSide = ({ showMore, onChange, onSelectChange, value }) => {
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
            className="[&_.ant-drawer-body]:p-4"
        >
            <div className="flex flex-col gap-2">
                <div>
                    <Button
                        type="text"
                        size="small"
                        className="text-xs flex items-center opacity-80 m-0"
                        icon={<Icon name="ChevronLeft"/>}
                        onClick={() => onChange(false)}
                    >Back</Button>
                </div>
                <h4 className="text-sm font-bold pb-1 pt-2">Solid Colors</h4>
                <BackgroundSelect type="solid" onChange={onSelectChange} value={value} />
                <h4 className="text-sm font-bold pb-1 pt-2">Gradients</h4>
                <BackgroundSelect type="gradient" onChange={onSelectChange} value={value} />
                <h4 className="text-sm font-bold pb-1 pt-2">Cosmic Gradients</h4>
                <BackgroundSelect type="cosmic" onChange={onSelectChange} value={value} />
                <h4 className="text-sm font-bold pb-1 pt-2">Desktop</h4>
                <BackgroundSelect type="desktop" onChange={onSelectChange} value={value} />
            </div>
        </Drawer>
    )
}