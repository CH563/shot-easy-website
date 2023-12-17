import React, { useState, useRef, useEffect } from 'react';
import darkBlue from '../static/dark-blue.png'; 
import { cn } from '../lib/utils';

export const IphonePro = ({height, img, style, fit, shadow}) => {
    return (
        <div style={{width: `${height*608/1200}px`, fontSize: `${14*(height/1200)}px`}}>
            <div className="iphone" style={{ width: `${ height*608/1200 }px`, height: `${height }px` }}>
                <img src={darkBlue.src} alt="Iphone 15 Pro frame" className="absolute z-[1] top-0 left-0 right-0 bottom-0" />
                <div className='frame h-full w-full overflow-hidden bg-black relative z-0'>
                    <div className="h-full w-full" style={style}>
                        <img src={img} className={cn("max-w-full max-h-full block min-h-full min-w-full object-center", fit === 'cover' && "object-cover", fit === 'contain' && "object-contain", fit === 'fill' && "object-fill")} />
                    </div>
                </div>
                <div className="sd absolute -z-10" style={{opacity: shadow/10}}>
                    <div className="layer layer-1"></div>
                    <div className="layer layer-2"></div>
                    <div className="layer layer-3"></div>
                    <div className="layer layer-4"></div>
                    <div className="layer layer-5"></div>
                </div>
            </div>
        </div>
    )
}