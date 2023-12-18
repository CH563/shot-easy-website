import React from 'react';
import { Button, Tooltip } from 'antd';
import { Icon } from './Icons'
import { modKey } from '../lib/utils';

export const DownBtn = ({ disabled, loading, toDownload, toCopy }) => {
    const key = modKey();
    return (
        <div className="ant-space-compact">
            <Tooltip placement="top" title={<span>Download {key} + S</span>}>
                <Button type="primary" className="rounded-se-none rounded-ee-none me-[-1px] hover:z-[1] border-r-white/30 bg-black" disabled={disabled} loading={loading} icon={<Icon name="Download" />} onClick={toDownload}>Download</Button>
            </Tooltip>
            <Tooltip placement="top" title={<span>Copy {key} + C</span>}>
                <Button type="primary" className="rounded-ss-none rounded-es-none border-l-white/30 bg-black" disabled={disabled} loading={loading} icon={<Icon name="Copy" />} onClick={toCopy}></Button>
            </Tooltip>
        </div>
    )
}