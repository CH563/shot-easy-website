import React from 'react';
import { Button, Tooltip } from 'antd';
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons';
import { modKey } from '../lib/utils';

export const DownBtn = ({ disabled, loading, toDownload, toCopy }) => {
    const key = modKey();
    return (
        <div className="ant-space-compact">
            <Tooltip placement="top" title={<span>Download {key} + S</span>}>
                <Button className="rounded-se-none rounded-ee-none me-[-1px]" disabled={disabled} loading={loading} icon={<DownloadOutlined />} onClick={toDownload}>Download</Button>
            </Tooltip>
            <Tooltip placement="top" title={<span>Copy {key} + C</span>}>
                <Button className="rounded-ss-none rounded-es-none" disabled={disabled} loading={loading} icon={<CopyOutlined />} onClick={toCopy}></Button>
            </Tooltip>
        </div>
    )
}