import React, { useState, useRef } from 'react';
import ReactCompareImage from 'react-compare-image';
import bear from '../static/bear.png'
import bearRemoved from '../static/bear-removebg.png'

export default function CompareImage() {
    return (
        <div className="tr w-full max-w-[614px] mx-auto">
            <ReactCompareImage leftImage={bear.src} rightImage={bearRemoved.src} />
        </div>
    )
}