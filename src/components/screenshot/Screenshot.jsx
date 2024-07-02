import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { Icon } from '@components/Icons';
import { captureScreen } from '@lib/utils';
import UploadFile from './UploadFile';
import state from '@states/screenshot';


export default observer(() => {
    const imageBox = useRef(<></>);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const modules = import.meta.glob("./*.jsx");
            const importBox = modules[`./ImageBox.jsx`]();
            const result = await importBox;
            setLoading(false);
            imageBox.current = <result.default />;
        })()
    }, []);
    const toCapture = () => {
        captureScreen().then((value) => {
            if (!value) return;
            state.setImageSrc(value);
        });
    }
    let component = (
        <div className="text-center py-16">
            <Button className="[&_span]:align-middle" style={{
                width: '320px',
                height: '54px'
            }} size="large" type="primary" icon={<Icon name="Camera" size={25} />} loading={loading} onClick={toCapture}>Screenshot</Button>
            <p className="text-slate-400 text-xs mt-2">* If required window can't be selected, scroll down or maximize the required window and retry</p>
            <div className="pt-1">
                <UploadFile />
            </div>
        </div>
    );
    if (state.imageSrc && !loading) {
        component = imageBox.current;
    }
    return (
        <div>
            {component}
        </div>
    )
});
