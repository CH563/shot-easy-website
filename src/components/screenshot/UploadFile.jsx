import React, { useState } from 'react';
import { Button, Upload } from 'antd';
import { observer } from 'mobx-react-lite';
import { Mimes } from '@lib/mimes';
import usePaste from '@lib/usePaste';
import state from '@states/screenshot';
import { fileToDataURL } from '@lib/utils';

export default observer(() => {
    usePaste(async (file) => {
        fileToDataURL(file).then(img => {
            state.setImageSrc(img.src);
        }).catch(error => console.error(error));
    });
    const beforeUpload = async (file) => {
        const img = await fileToDataURL(file);
        state.setImageSrc(img.src);
        return Promise.reject();
    }
    return (
        <Upload
            accept={Object.keys(Mimes).map((item) => '.' + item).join(',')}
            beforeUpload={beforeUpload}
        >
            <Button type="link" size="small">Upload / Paste image</Button>
        </Upload>
    )
});