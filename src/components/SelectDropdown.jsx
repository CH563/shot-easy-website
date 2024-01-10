import React, { useState, useRef, useEffect } from 'react';
import { Dropdown, Button } from 'antd';
import { Icon, Icons } from '../components/Icons';

const items = [
    {
        label: <div className="flex items-center justify-between"><span>Auto</span></div>,
        key: 'auto',
        icon: <Icon name="Scan" size={16} />,
    },
    {
        label: <div className="flex items-center justify-between"><span>1 : 1</span></div>,
        key: '1_1',
        icon: <Icon name="Square"  size={16} />,
        width: 1200,
        height: 1200
    },
    {
        label: <div className="flex items-center justify-between"><span>4 : 3</span></div>,
        key: '4_3',
        icon: <Icon name="Square" className="[&_rect]:w-[20px]" size={16} />,
        width: 1200,
        height: 900
    },
    {
        label: <div className="flex items-center justify-between"><span>16 : 9</span></div>,
        key: '16_9',
        icon: <Icon name="RectangleHorizontal" size={16} />,
        width: 1200,
        height: 675
    },
    {
        label: <div className="flex items-center justify-between"><span>X Post</span><span className="text-xs opacity-60">1200 x 675</span></div>,
        key: 'x_post',
        icon: <span className="anticon"><Icons.x className="text-[16px]" /></span>,
        width: 1200,
        height: 675
    },
    {
        label: <div className="flex items-center justify-between"><span>小红书</span><span className="text-xs opacity-60">960 x 1280</span></div>,
        key: 'xhs',
        icon: <span className="anticon fill-red-600"><Icons.xhs className="text-[16px]" /></span>,
        width: 960,
        height: 1280
    },
    {
        label: <div className="flex items-center justify-between"><span>Facebook Post</span><span className="text-xs opacity-60">1200 x 630</span></div>,
        key: 'facebook_post',
        icon: <Icon name="Facebook" size={16} />,
        width: 1200,
        height: 630
    },
    {
        label: <div className="flex items-center justify-between"><span>Instagram Post</span><span className="text-xs opacity-60">1080 x 1350</span></div>,
        key: 'instagram_post',
        icon: <Icon name="Instagram" size={16} />,
        width: 1080,
        height: 1350
    },
    {
        label: <div className="flex items-center justify-between"><span>Instagram Story</span><span className="text-xs opacity-60">1080 x 1920</span></div>,
        key: 'instagram_story',
        icon: <Icon name="Instagram" size={16} />,
        width: 1080,
        height: 1920
    },
    {
        label: <div className="flex items-center justify-between"><span>LinkedIn Post</span><span className="text-xs opacity-60">1200 x 627</span></div>,
        key: 'linkedin_Post',
        icon: <Icon name="Linkedin" size={16} />,
        width: 1200,
        height: 627
    },
    {
        label: <div className="flex items-center justify-between"><span>Reddit</span><span className="text-xs opacity-60">606 x 606</span></div>,
        key: 'reddit',
        icon: <span className="anticon"><Icons.reddit className="text-[16px]" /></span>,
        width: 606,
        height: 606
    },
    {
        label: <div className="flex items-center justify-between"><span>Youtube</span><span className="text-xs opacity-60">1280 x 720</span></div>,
        key: 'youtube',
        icon: <Icon name="Youtube" size={16} />,
        width: 1280,
        height: 720
    },
    {
        label: <div className="flex items-center justify-between"><span>Dribble</span><span className="text-xs opacity-60">2800 x 2100</span></div>,
        key: 'dribble',
        icon: <Icon name="Dribbble" size={16} />,
        width: 2800,
        height: 2100
    },
    {
        label: <div className="flex items-center justify-between"><span>Product Hunt</span><span className="text-xs opacity-60">1270 x 760</span></div>,
        key: 'product_hunt',
        icon: <span className="anticon"><Icons.productHunt className="text-[16px]" /></span>,
        width: 1270,
        height: 760
    },
    {
        label: <div className="flex items-center justify-between"><span>App Store</span><span className="text-xs opacity-60">1284 x 2778</span></div>,
        key: 'app_store',
        icon: <span className="anticon"><Icons.appStore className="text-[16px]" /></span>,
        width: 1284,
        height: 2778
    },
]

export const SelectDropdown = ({ defaultValue, onClick }) => {
    const handleClick = ({ key }) => {
        const item = items.find(e => e.key === key);
        onClick(item);
    }
    return (
        <Dropdown menu={{ items, style: {width: '300px'}, onClick: handleClick, selectedKeys: [defaultValue.key] }} trigger={['click']} placement="bottomLeft">
            <Button icon={defaultValue.icon}><div className="inline-block [&_.text-xs]:hidden">{defaultValue.label}</div></Button>
        </Dropdown>
    );
}