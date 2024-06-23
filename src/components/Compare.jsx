import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactCompareImage from 'react-compare-image';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { compressorState } from '@states/compressor';
import { Icon } from './Icons';
import { cn } from '@lib/utils';

export default observer(() => {
    const [show, setShow] = useState(true);
    const infoRef = useRef(compressorState.list.get(compressorState.compareId));
    const toHide = () => {
        setShow(false);
        compressorState.setCompareId(null)
    }
    return createPortal(
        <div
            className={cn("fixed z-50 inset-0 flex items-center justify-center transition-opacity", show ? "opacity-100 ease-in":"opacity-0 ease-out")}
        >
            <div className="w-[614px] relative z-[1]">
                <ReactCompareImage leftImage={infoRef.current.src} rightImage={infoRef.current.compress.src} />
            </div>
            <div className="absolute inset-0 bg-black/50 z-0" onClick={toHide}></div>
            <Button onClick={toHide} type="text" icon={<Icon name="X" size={24} />} shape="circle" size="large" className="absolute opacity-90 z-[2] top-2 right-2 bg-black/50 text-white" />
        </div>,
        document.body,
    )
});