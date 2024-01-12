import React, { useState, useRef } from 'react';
import { Button, Popover } from 'antd';
import { Icon } from './Icons';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const EmojiSelect = ({disabled, toSelect}) => {
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const onEmojiSelect = (e) => {
        toSelect(e.native);
        hide();
    }
    return (
        <Popover
        content={<Picker data={data} onEmojiSelect={onEmojiSelect} />}
        title=""
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        >
            <Button
                type="text"
                shape="circle"
                disabled={disabled}
                icon={<Icon name="Smile" />}
            ></Button>
        </Popover>
    )
}