import React, { useState, useRef } from 'react';
import { Upload } from 'antd';
import { Icon } from './Icons'
import { supportImg, modKey } from '../lib/utils';

const { Dragger } = Upload;

export const UploadDragger = ({beforeUpload, accept, desc, ...props}) => {
    const key = modKey();
    return (
        <Dragger
            accept={accept || supportImg.join(',')}
            name="file"
            showUploadList={false}
            beforeUpload={beforeUpload}
            {...props}
            rootClassName="p-4 rounded-md bg-white shadow-md"
        >
            <div className="p-4">
                <p className="text-2xl"><Icon name="ImagePlus" size={32} className="opacity-60" /></p>
                <p className="text-sm px-4">Click or Drag image to this area<br />or <span className="bg-slate-200 inline-block rounded-md px-1">{key}</span> <span className="bg-slate-200 inline-block rounded-md px-1">C</span> Paste here</p>
                {desc && <p className="text-sm p-4 pb-0 opacity-70">{desc}</p>}
            </div>
        </Dragger>
    )
};
