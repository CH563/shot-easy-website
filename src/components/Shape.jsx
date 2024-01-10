import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Text, Transformer } from 'react-konva';

export const ShapeLine = ({ line, isSelected, onSelect, ...props }) => {
    const shapeRef = useRef(null);
    const trRef = useRef(null);
    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    return (
        <>
            <Line
                {...props}
                ref={shapeRef}
                points={line.points}
                stroke={line.color}
                strokeWidth={+line.width}
                id={line.id}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                draggable={true}
                globalCompositeOperation={'source-over'}
                onClick={onSelect}
                onTap={onSelect}
            />
            {isSelected && <Transformer
                ref={trRef}
                flipEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                    return oldBox;
                    }
                    return newBox;
                }}
                anchorStyleFunc={(anchor) => {
                    anchor.cornerRadius(10);
                    if (anchor.hasName('top-center') || anchor.hasName('bottom-center')) {
                        anchor.height(6);
                        anchor.offsetY(3);
                        anchor.width(30);
                        anchor.offsetX(15);
                    }
                    if (anchor.hasName('middle-left') || anchor.hasName('middle-right')) {
                        anchor.height(30);
                        anchor.offsetY(15);
                        anchor.width(6);
                        anchor.offsetX(3);
                    }
                }}
            />}
        </>
    )
}