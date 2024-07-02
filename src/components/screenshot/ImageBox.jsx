import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Cropper from 'react-easy-crop';
import { cn } from '@lib/utils';
import ToolBar from './ToolBar';
import state from '@states/screenshot';

export default observer(() => {
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        state.onCropCompleteEvent(croppedArea, croppedAreaPixels);
    }
    return (
        <div className={cn("rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased", state.isGrid ? 'tr' : 'polka')}>
            <ToolBar />
            <div className="relative h-[420px]">
                {!state.isCrop ? <img src={state.imageSrc} className="w-full h-full object-scale-down" /> :
                    <Cropper
                        image={state.imageSrc}
                        crop={state.crop}
                        rotation={state.rotation}
                        zoom={state.zoom}
                        aspect={state.aspect}
                        onCropChange={(location) => state.setCrop(location)}
                        onRotationChange={(rotation) => state.setRotation(rotation)}
                        onCropComplete={onCropComplete}
                        onZoomChange={(zoom) => state.setZoom(zoom)}
                        classes={{
                            mediaClassName: 'transition-transform opacity-100',
                            cropAreaClassName: 'transition-all opacity-100'
                        }}
                    />
                }
            </div>
        </div>
    )
});