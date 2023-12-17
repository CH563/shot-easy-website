import React, { useState, useRef, useEffect } from 'react';
import midnight from '../static/midnight.png'; 
import { cn } from '../lib/utils';

export const MacbookPro = ({width, img, style, fit}) => {
    return (
        <div style={{width: `${width}px`}}>
            <div className="macbook" style={{ width: `${ width }px`, height: `${ width * 969 / 1602 }px` }}>
                <img src={midnight.src} alt="Macbook Pro frame" className="absolute top-0 left-0 right-0 bottom-0" />
                <div className='h-full w-full overflow-hidden bg-black'>
                    <div className="h-full w-full" style={style}>
                        <img src={img} className={cn("max-w-full max-h-full block min-h-full min-w-full object-center", fit === 'cover' && "object-cover", fit === 'contain' && "object-contain", fit === 'fill' && "object-fill")} />
                    </div>
                </div>
            </div>
        </div>
    )
}