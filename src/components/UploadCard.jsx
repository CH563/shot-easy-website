import React, { useState, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { UploadDragger } from './UploadDragger';
import { Mimes } from '@lib/mimes';
import { createImage } from '@engines/transform';
import usePaste from '@lib/usePaste';
import { getFilesFromEntry, getFilesFromHandle } from '@lib/utils';

export const UploadCard = observer(() => {
    usePaste(async (file) => {
        createImage(file);
    });

    const beforeUpload = async (file) => {
        createImage(file);
        return Promise.reject();
    };

    const onDrop = async (event) => {
        event.preventDefault();
        const files = [];
        if (event.dataTransfer?.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                const item = event.dataTransfer.items[i];
                if (typeof item.getAsFileSystemHandle === 'function') {
                    const handle = await item.getAsFileSystemHandle();
                    if (handle.kind === 'file') continue;
                    const result = await getFilesFromHandle(handle);
                    files.push(...result);
                    continue;
                }
                if (typeof item.webkitGetAsEntry === 'function') {
                    const entry = await item.webkitGetAsEntry();
                    if (entry) {
                        if (entry.isFile) continue;
                        const result = await getFilesFromEntry(entry);
                        files.push(...result);
                        continue;
                    }
                }
            }
        } else if (event.dataTransfer?.files) {
            const list = event.dataTransfer?.files;
            for (let index = 0; index < list.length; index++) {
                const file = list.item(index);
                file && files.push(file);
                if (file) {
                    files.push(file);
                }
            }
        }
        files.map(file => {
            createImage(file);
            return file;
        });
    };

    return (
        <UploadDragger
            beforeUpload={beforeUpload}
            multiple={true}
            onDrop={onDrop}
            customRequest={(e) => console.log('upload', e)}
            accept={Object.keys(Mimes).map((item) => '.' + item).join(',')}
            desc={'JPG / JPEG / PNG / WEBP / GIF / SVG / AVIF'}
        />
    );
});
