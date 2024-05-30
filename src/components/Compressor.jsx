import React, { useState, useRef } from 'react';
import { InputNumber, Button, message } from 'antd';
import { observer } from 'mobx-react-lite'
import { Icon } from './Icons'
import { DownBtn } from './DownBtn';
import { UploadCard } from './UploadCard';
import { FormatTag } from './FormatTag';
import { cn, formatSize, fileToDataURL, url2Blob, copyAsBlob, toDownloadFile, computedSize } from '../lib/utils';
import useKeyboardShortcuts from '../lib/useKeyboardShortcuts';
import usePaste from '../lib/usePaste';
import { compressorState } from "../states/compressor";
import { useWorkerHandler } from '../engines/transform';

const Compressor = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    useWorkerHandler();

    let listComponent = <UploadCard />;
    if (compressorState.list.size) {
        listComponent = (
            <div className="w-full bg-white shadow-md p-4 rounded-md grid gap-6">
                {Array.from(compressorState.list.values()).map(info => {
                    return (
                        <div key={info.key} className="flex items-center justify-between pb-5 relative after:block after:absolute after:bottom-0 after:left-16 after:right-0 after:h-[1px] after:bg-slate-200">
                            <div className="flex items-center max-w-[50%]">
                                <img src={info.src} className="w-[48px] h-[48px] flex-shrink-0 object-cover mr-4 rounded-sm aspect-[1/1]" />
                                <div className="flex-1 w-full">
                                    <div className="font-semibold mb-1.5 truncate">{info.name}</div>
                                    <div className="text-xs flex gap-1">
                                        {info.blob?.type && <span><FormatTag type={info.blob.type.replace('image/', '').toLocaleUpperCase()} /></span>}
                                        <span className="text-xs">{!info.compress?.width && !info.compress?.height ? "-" : `${info.compress.width}*${info.compress.height}`}</span>
                                        <span className="text-xs">{formatSize(info.blob.size)}</span>
                                    </div>
                                </div>
                            </div>
                            {info.compress && 
                                <div className="flex items-center">
                                    <div className="px-1 text-right">
                                        <div className="flex justify-end items-center gap-1">
                                            <span
                                                className="font-semibold text-sm"
                                            >{(Math.abs((info.compress.blob.size - info.blob.size) / info.blob.size) * 100).toFixed(2)}%</span>
                                            <Icon name={"ArrowDown"} size="0.8em" className={cn(info.blob.size > info.compress.blob.size ? "text-green-600" : "text-red-600")} />
                                        </div>
                                        <div className="text-xs">
                                            <span
                                                className={cn(info.blob.size > info.compress.blob.size ? "text-green-600" : "text-red-600")}
                                            >{formatSize(info.compress.blob.size)}</span>
                                        </div>
                                    </div>
                                    <div className="p-1">
                                        <Button
                                            type="primary"
                                            className="bg-black"
                                            icon={<Icon name="Download" />}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
        );
    }

    return (
        <>
            {contextHolder}
            <div className={cn("rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased polka")}>
                {compressorState.list.size > 0 &&
                    <div className="flex gap-4 justify-center flex-col-reverse bg-white p-2 border-b shadow-md md:flex-row md:justify-between">
                        <div className="flex gap-3 items-center justify-center">
                            <Button icon={<Icon name="ImagePlus" />}>Add Images</Button>
                            <Button icon={<Icon name="FolderPlus" />}>Add Folder</Button>
                        </div>
                        <div className="flex gap-3 items-center justify-center">
                            <DownBtn />
                            <Button type="text" icon={<Icon name="Eraser" />}></Button>
                        </div>
                    </div>
                }
                <div className="relative min-h-[200px] p-5">
                    <div className="flex w-full justify-center z-10">
                        {listComponent}
                    </div>
                </div>
            </div>
        </>
    )
})

export default Compressor;