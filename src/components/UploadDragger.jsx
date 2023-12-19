import React, { useState, useRef } from 'react';
import { Upload } from 'antd';
import { Icon } from './Icons'
import { supportImg, modKey } from '../lib/utils';

const { Dragger } = Upload;

export const UploadDragger = ({beforeUpload}) => {
    const key = modKey();
    return (
        <Dragger
            accept={supportImg.join(',')}
            name="file"
            showUploadList={false}
            beforeUpload={beforeUpload}
            rootClassName="p-4 rounded-md bg-white shadow-md"
        >
            <p className="text-2xl"><Icon name="ImagePlus" size={32} className="opacity-60" /></p>
            <p className="text-sm px-4">Click or Drag image to this area<br />or <span className="bg-slate-200 inline-block rounded-md px-1">{key}</span> <span className="bg-slate-200 inline-block rounded-md px-1">C</span> Paste here</p>
        </Dragger>
    )
};
