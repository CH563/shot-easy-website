import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Input } from 'antd';
import { Icon } from '@components/Icons';
import { captureScreen } from '@lib/utils';
import { requestUrlScreenshot } from '@lib/urlScreenshot';
import UploadFile from './UploadFile';
import state from '@states/screenshot';
import { getScreenshotToolCopy, getCaptureErrorKey } from '@lib/screenshotToolCopy';

const URL_COOLDOWN_SECONDS = 10;


/** @param {{ copy?: ReturnType<typeof getScreenshotToolCopy> }} props */
function Screenshot({ copy = getScreenshotToolCopy() }) {
    const [ImageBox, setImageBox] = useState(null);
    const [loading, setLoading] = useState(true);
    const [capturing, setCapturing] = useState(false);
    const [error, setError] = useState('');
    const [url, setUrl] = useState('');
    const [urlLoading, setUrlLoading] = useState(false);
    const [urlError, setUrlError] = useState('');
    const [cooldown, setCooldown] = useState(0);
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
    useEffect(() => {
        if (cooldown <= 0) return undefined;
        const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);
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
    const toCaptureUrl = async () => {
        if (urlLoading || cooldown > 0) return;
        setUrlError('');
        setUrlLoading(true);
        try {
            const blob = await requestUrlScreenshot(url);
            state.setIsCrop(false);
            state.setImageSrc(URL.createObjectURL(blob));
        } catch (error) {
            if (error?.code === 'invalid_url') setUrlError(copy.urlInvalid);
            else if (error?.code === 'rate_limited') setUrlError(copy.urlRateLimited.replace('{s}', String(error.retryAfterSeconds ?? 60)));
            else if (error?.code === 'insufficient_credits' || error?.code === 'missing_api_key') setUrlError(copy.urlUnavailable);
            else setUrlError(copy.urlFailed);
        } finally {
            setUrlLoading(false);
            setCooldown(URL_COOLDOWN_SECONDS);
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
            <div className="pt-4 mt-4 border-t border-slate-200 max-w-lg mx-auto text-left">
                <p className="font-semibold text-sm text-slate-700 mb-2">{copy.urlTitle}</p>
                <div className="flex gap-2">
                    <Input
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                        onPressEnter={toCaptureUrl}
                        placeholder={copy.urlPlaceholder}
                        disabled={urlLoading}
                        aria-label={copy.urlTitle}
                    />
                    <Button
                        type="primary"
                        loading={urlLoading}
                        disabled={urlLoading || cooldown > 0 || !url.trim()}
                        onClick={toCaptureUrl}
                    >
                        {cooldown > 0 ? copy.urlCooldown.replace('{s}', String(cooldown)) : copy.urlCapture}
                    </Button>
                </div>
                <p className="text-slate-500 text-xs mt-2">{copy.urlHint}</p>
                {urlError && <p role="alert" className="text-red-600 text-sm mt-2">{urlError}</p>}
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
