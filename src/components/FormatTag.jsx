import React, { useState, useRef } from 'react';
import { cn } from '../lib/utils';

export const FormatTag = ({type}) => {
    return (
        <span className={cn("text-xs font-semibold text-rose-600 bg-rose-100 py-0.5 px-1 rounded-sm",
            type === 'PNG' && "text-blue-600 bg-blue-100",
            type === 'JPEG' && "text-green-600 bg-green-100",
            type === 'JPG' && "text-emerald-600 bg-emerald-100",
            type === "SVG" && "text-purple-600 bg-purple-100",
            type === "WEBP" && "text-indigo-600 bg-indigo-100",
            type === "GIF" && "text-pink-600 bg-pink-100",
        )}>{type}</span>
    )
};