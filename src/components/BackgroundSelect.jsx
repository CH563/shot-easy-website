import React, { useState, useRef } from 'react';
import { Radio } from 'antd';
import backgroundConfig from '../lib/backgroundConfig';
import { Icons } from './Icons';
import { cn } from '../lib/utils';


export const BackgroundSelect = ({ type, options, onChange, value }) => {
    let lists = [];
    if (options && options.length) {
        lists = options;
    } else {
        const arr = [];
        Object.keys(backgroundConfig).map(key => {
            if (key.includes(type)) {
                arr.push({
                    key,
                    value: backgroundConfig[key]
                });
            }
        });
        lists = arr;
    }
    return (
        <Radio.Group onChange={(e) => onChange(e.target.value)} value={value} rootClassName="grid grid-cols-7 gap-y-3 [&_span]:ps-0">
            {lists.map(item => (
                <Radio key={item.key} className="[&_.ant-radio]:hidden [&_span]:p-0 mr-0" value={item.key}>
                    {type !== 'cosmic' ?
                        <div className={cn("w-8 h-8 rounded-full overflow-hidden", item.value)}>
                            {item.key == 'solid_1' && <Icons.transparent className="text-[32px]" />}
                        </div> :
                        <div className={cn("w-8 h-8 rounded-full overflow-hidden")}>
                            <img src={`${item.value}&w=32`} className="w-full h-full object-cover object-center" />
                        </div>
                    }
                </Radio>
            ))}
        </Radio.Group>
    )
}