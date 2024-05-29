import React, { useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite'
import { UploadDragger } from './UploadDragger';
import { Mimes } from '../lib/mimes';
import { createImage } from '../engines/transform';

export const UploadCard = observer(() => {
    const beforeUpload = async (file) => {
        createImage(file)
        return Promise.reject();
    }
    return (
        <UploadDragger
            beforeUpload={beforeUpload}
            multiple={true}
            customRequest={(e) => console.log('upload', e)}
            accept={Object.keys(Mimes).map((item) => "." + item).join(",")}
            desc={"JPG / JPEG / PNG / WEBP / GIF / SVG / AVIF"}
        />
    )
})