import React, { useState } from 'react';
import { Spin, Button, message, Upload, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { Icon, Icons } from './Icons';
import { UploadCard } from './UploadCard';
import { ProgressHint } from './ProgressHint';
import { FormatTag } from './FormatTag';
import { cn, formatSize, toDownloadFile, getOutputFileName, getUniqNameOnNames, getFilesHandleFromHandle, createImageBatch } from '@lib/utils';
import { compressorState } from '@states/compressor';
import { useWorkerHandler, createImage } from '@engines/transform';
import Setting from './Setting';
import Compare from './Compare';

const Compressor = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [showSetting, setShowSetting] = useState(false);
    const disabled = compressorState.hasTaskRunning();

    useWorkerHandler();

    const beforeUpload = async (file) => {
        createImage(file);
        return Promise.reject();
    };

    const toDownload = (url, name) => {
        toDownloadFile(url, name);
        messageApi.success('Download Success!');
    };

    const toZip = async () => {
        const jszip = await import('jszip');
        const zip = new jszip.default();
        const names = new Set();
        for (const [_, info] of compressorState.list) {
            const fileName = getOutputFileName(info, compressorState.option);
            const uniqName = getUniqNameOnNames(names, fileName);
            names.add(uniqName);
            if (info.compress?.blob) {
                zip.file(uniqName, info.compress.blob);
            }
        }
        const result = await zip.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: {
                level: 6,
            },
        });
        return result;
    }

    const toDownloadZip = async () => {
        setLoading(true);
        const result = await toZip();
        toDownloadFile(URL.createObjectURL(result), "shoteasy.zip");
        setLoading(false);
        messageApi.success('Download Success!');
    }

    const addFolder = async () => {
        const handle = await window.showDirectoryPicker();
        await getFilesHandleFromHandle(handle)
        if (!handle.children || !handle.children[0]) return;
        createImageBatch(handle.children, createImage, handle.name)
    }

    let listComponent = <UploadCard />;
    if (compressorState.list.size) {
        listComponent = (
            <div className="w-full bg-white shadow-md rounded-md overflow-hidden">
                <ProgressHint />
                <div className="p-4 grid gap-6">
                    {Array.from(compressorState.list.values()).reverse().map(info => {
                        return (
                            <div key={info.key} className="flex items-center justify-between pb-5 relative after:block after:absolute after:bottom-0 after:left-16 after:right-0 after:h-[1px] after:bg-slate-200">
                                <div className="flex items-center max-w-[50%]">
                                    <div className="overflow-hidden w-[48px] h-[48px] mr-4 rounded-md relative cursor-pointer [&_div]:hover:flex select-none">
                                        <img src={info.preview?.src || info.src} className="w-full h-full flex-shrink-0 object-cover aspect-[1/1] relative z-0" />
                                        {info.compress?.src && 
                                            <div
                                                className="absolute hidden top-0 left-0 right-0 bottom-0 bg-[#00000050] items-center justify-center text-white"
                                                onClick={() => compressorState.setCompareId(info.key)}
                                            >
                                                <Icons.comparer />
                                            </div>
                                        }
                                    </div>
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
                                                    className="font-bold text-sm"
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
                                                onClick={() => {
                                                    const fileName = getOutputFileName(info, compressorState.option);
                                                    toDownload(info.compress.src, fileName);
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                                {!info.compress && <div className="px-3"><Spin /></div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }

    return (
        <>
            {contextHolder}
            <div className="bg-white border-b shadow-md">
                <div className="flex gap-4 p-2 justify-center flex-col-reverse md:flex-row md:justify-between">
                    <div className="flex gap-3 items-center justify-center">
                        <Upload name="file" multiple={true} beforeUpload={beforeUpload} showUploadList={false}>
                            <Button disabled={disabled} icon={<Icon name="ImagePlus" />}>Add Images</Button>
                        </Upload>
                        {!!window.showDirectoryPicker && <Button disabled={disabled} icon={<Icon name="FolderPlus" />} onClick={addFolder}>Add Folder</Button>}
                        <Button
                            type={showSetting ? "primary" : "text"}
                            icon={<Icon name="Settings2" />}
                            onClick={() => setShowSetting(!showSetting)}
                        ></Button>
                        {(showSetting && compressorState.list.size > 0) && <span className="text-xs text-slate-500">Use Recompress to apply the new settings</span>}
                    </div>
                    {compressorState.list.size > 0 &&
                        <div className="flex gap-3 items-center justify-center">
                            <Tooltip placement="top" title="Recompress">
                                <Button
                                    type="text"
                                    icon={<Icon name="RotateCw" />}
                                    onClick={() => compressorState.reCompress()}
                                ></Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Download all using zip">
                                <Button
                                    type="primary"
                                    className="bg-black"
                                    disabled={disabled}
                                    loading={loading}
                                    icon={<Icon name="Download" />}
                                    onClick={toDownloadZip}
                                >Download All</Button>
                            </Tooltip>
                            <Tooltip placement="top" title="Clear all">
                                <Button
                                    type="text"
                                    loading={loading}
                                    icon={<Icon name="Eraser" />}
                                    onClick={() => {
                                        compressorState.list.clear();
                                    }}
                                ></Button>
                            </Tooltip>
                        </div>
                    }
                </div>
                {showSetting && <Setting />}
            </div>
            <div className="relative min-h-[200px] p-5">
                <div className="flex w-full justify-center z-10">
                    {listComponent}
                </div>
            </div>
            {compressorState.compareId!== null && <Compare />}
        </>
    )
})

export default Compressor;