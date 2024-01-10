import React, { useState, useRef, useEffect } from 'react';
import { tinykeys } from "tinykeys"

export default function useAnnotate() {
    const [tool, setTool] = useState('');
    const isDrawing = useRef(false);
    const [lines, setLines] = useState([]);
    const [annotateColor, setAnnotateColor] = useState('#df4b26');
    const [annotateWidth, setAnnotateWidth] = useState(4);
    const [selectedId, setSelectedId] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const unsubscribe = tinykeys(window, {
            "Backspace": event => {
                event.preventDefault()
                if (!selectedId) return;
                setLines(lines.filter(e => e.id !== selectedId));
                setSelectedId(null);
            }
        })
        return () => {
            unsubscribe();
        }
    }, [selectedId, lines]);

    const toSelect = (type) => {
        if (tool === type) return setTool('');
        setTool(type);
    }

    const handleMouseDown = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        } else {
            return;
        }
        if (tool !== 'pencil') return;
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { id: `line-${new Date().getTime()}`, points: [pos.x, pos.y], color: annotateColor, width: annotateWidth }]);
    };
    const handleMouseMove = (e) => {
        if (tool !== 'pencil') return;
        if (!isDrawing.current) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };
    const handleMouseUp = () => {
        if (isDrawing.current) isDrawing.current = false;
    };
    const onAnnotateChange = (e) => {
        const color = e.toHexString();
        setAnnotateColor(color);
    }
    const toClearAll = () => {
        setTool('');
        setLines([]);
    }

    return {
        canvasRef,
        lines,
        annotateWidth,
        setAnnotateWidth,
        tool,
        toSelect,
        toClearAll,
        annotateColor,
        onAnnotateChange,
        setSelectedId,
        selectedId,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    }
}