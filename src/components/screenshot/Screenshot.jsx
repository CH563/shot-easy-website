import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { Icon } from '@components/Icons';
import { captureScreen } from '@lib/utils';
import UploadFile from './UploadFile';
import state from '@states/screenshot';
import { getScreenshotToolCopy, getCaptureErrorKey } from '@lib/screenshotToolCopy';


/** @param {{ copy?: ReturnType<typeof getScreenshotToolCopy> }} props */
function Screenshot({ copy = getScreenshotToolCopy() }) {
    const [ImageBox, setImageBox] = useState(null);
    const [loading, setLoading] = useState(true);
    const [capturing, setCapturing] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        let active = true;
        import('./ImageBox.jsx').then(result => {
            if (active) setImageBox(() => result.default);
        }).catch(() => {
            if (active) setError(copy.loadFailed);
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, [copy]);
    const toCapture = async () => {
        setError('');
        if (!navigator.mediaDevices?.getDisplayMedia) {
            setError(copy.captureUnsupported);
            return;
        }
        setCapturing(true);
        try {
            const value = await captureScreen({ throwOnError: true });
            if (value) state.setImageSrc(value);
        } catch (error) {
            setError(copy[getCaptureErrorKey(error)]);
        } finally {
            setCapturing(false);
        }
    }
    let component = (
        <div className="text-center py-16">
            <Button className="[&_span]:align-middle" style={{
                width: 'min(320px, 100%)',
                height: '54px'
            }} size="large" type="primary" icon={<Icon name="Camera" size={25} />} loading={loading || capturing} disabled={!ImageBox} onClick={toCapture}>{copy.capture}</Button>
            <p className="text-slate-500 text-xs mt-2 max-w-lg mx-auto">{copy.captureHint}</p>
            {error && <p role="alert" className="text-red-600 text-sm mt-3 max-w-lg mx-auto">{error}</p>}
            <div className="pt-1">
                <UploadFile copy={copy} />
            </div>
        </div>
    );
    if (state.imageSrc && ImageBox) {
        component = <ImageBox copy={copy} />;
    }
    return (
        <div>
            {component}
        </div>
    )
}

export default observer(Screenshot);
