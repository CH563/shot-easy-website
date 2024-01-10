import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Button } from 'antd';

const items = [
    {
        label: <div className='w-4 h-3 mt-1.5 items-center cursor-pointer'><i className="block w-full origin-center rounded-lg bg-slate-600 rotate-45 h-[1px]"></i></div>,
        key: 1
    },
    {
        label: <div className='w-4 h-3 mt-1.5 items-center cursor-pointer'><i className="block w-full origin-center rounded-lg bg-slate-600 rotate-45 h-[2px]"></i></div>,
        key: 2
    },
    {
        label: <div className='w-4 h-3 mt-1.5 items-center cursor-pointer'><i className="block w-full origin-center rounded-lg bg-slate-600 rotate-45 h-[4px]"></i></div>,
        key: 4
    },
    {
        label: <div className='w-4 h-3 mt-1.5 items-center cursor-pointer'><i className="block w-full origin-center rounded-lg bg-slate-600 rotate-45 h-[6px]"></i></div>,
        key: 6
    },
    {
        label: <div className='w-4 h-3 mt-1.5 items-center cursor-pointer'><i className="block w-full origin-center rounded-lg bg-slate-600 rotate-45 h-[8px]"></i></div>,
        key: 8
    }
];

export const WidthDropdown = ({ defaultValue, onClick }) => {
    const handleClick = ({ key }) => {
        onClick(key);
    }
    return (
        <Dropdown menu={{ items, onClick: handleClick, selectedKeys: [defaultValue] }} trigger={['click']} placement="bottom">
            <Button type="text" shape="circle" className="px-1.5 py-0 flex items-center justify-center"><div className='w-4 h-4 flex items-center cursor-pointer'><i className="block w-full origin-center rounded-lg bg-slate-600 rotate-45" style={{
                height: defaultValue + 'px'
            }}></i></div></Button>
        </Dropdown>
    )
}