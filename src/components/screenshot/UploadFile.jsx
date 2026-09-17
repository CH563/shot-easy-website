import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { observer } from 'mobx-react-lite';
import { Mimes } from '@lib/mimes';
import usePaste from '@lib/usePaste';
import state from '@states/screenshot';
import { fileToDataURL } from '@lib/utils';
import { getScreenshotToolCopy } from '@lib/screenshotToolCopy';

export default observer(({ copy = getScreenshotToolCopy() }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const openImage = async file => {
        try {
            const img = await fileToDataURL(file);
            state.setIsCrop(false);
            state.setImageSrc(img.src);
        } catch {
            messageApi.error(copy.imageFailed);
        }
    };
    usePaste(openImage, [copy]);
    const beforeUpload = async (file) => {
        await openImage(file);
        return false;
    }
    return (
        <>
        {contextHolder}
        <Upload
            accept={Object.keys(Mimes).map((item) => '.' + item).join(',')}
            beforeUpload={beforeUpload}
            showUploadList={false}
        >
            <Button type="link" size="small">{copy.openImage}</Button>
        </Upload>
        <p className="text-slate-500 text-xs mt-1">{copy.pasteHint}</p>
        </>
    )
});
