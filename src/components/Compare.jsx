import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactCompareImage from 'react-compare-image';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { compressorState } from '@states/compressor';
import { Icon } from './Icons';
import { cn } from '@lib/utils';

export default observer(() => {
    const containerRef = useRef(null)
    const scale = useRef(0.8);
    const bodyStyle = useRef(null);
    const [show, setShow] = useState(true);
    const [width, setWidth] = useState(620);

    
    useEffect(() => {
        const resize = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            let imageWidth;
            let imageHeight;
            if (infoRef.current.width / infoRef.current.height > rect.width / rect.height) {
                imageWidth = rect.width * scale.current;
                imageHeight = (imageWidth * infoRef.current.height) / infoRef.current.width;
            } else {
                imageHeight = rect.height * scale.current;
                imageWidth = (imageHeight * infoRef.current.width) / infoRef.current.height;
            }
            setWidth(imageWidth);
        };
    
        const wheel = (event) => {
            let newScale = -0.001 * event.deltaY + scale.current;
            if (newScale > 1) {
                newScale = 1;
            }
            if (newScale < 0.1) {
                newScale = 0.1;
            }
    
            const rect = containerRef.current?.getBoundingClientRect();
            let imageWidth;
            let imageHeight;
            if (infoRef.current.width / infoRef.current.height > rect.width / rect.height) {
                imageWidth = rect.width * newScale;
                imageHeight =
                    (imageWidth * infoRef.current.height) / infoRef.current.width;
            } else {
                imageHeight = rect.height * newScale;
                imageWidth =
                    (imageHeight * infoRef.current.width) / infoRef.current.height;
            }
            
            scale.current = newScale;
            setWidth(imageWidth);
        };
        window.addEventListener('resize', resize);
        window.addEventListener('wheel', wheel);
        bodyStyle.current = document.body.style;
        document.body.style.overflow = 'hidden';
        resize();
        return (() => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("wheel", wheel);
            document.body.style = bodyStyle.current;
        });
        
    }, [])
    
    const infoRef = useRef(compressorState.list.get(compressorState.compareId));
    const toHide = () => {
        setShow(false);
        compressorState.setCompareId(null)
    }
    return createPortal(
        <div
            ref={containerRef}
            className={cn("fixed z-50 inset-0 flex items-center justify-center transition-opacity", show ? "opacity-100 ease-in":"opacity-0 ease-out")}
        >
            <div
                className="w-[614px] relative z-[1]"
                style={{
                    width: `${width}px`
                }}
            >
                <ReactCompareImage leftImage={infoRef.current.src} rightImage={infoRef.current.compress.src} />
            </div>
            <div className="absolute inset-0 bg-black/50 z-0" onClick={toHide}></div>
            <Button onClick={toHide} type="text" icon={<Icon name="X" size={24} />} shape="circle" size="large" className="absolute opacity-90 z-[2] top-2 right-2 bg-black/50 text-white" />
        </div>,
        document.body,
    )
});