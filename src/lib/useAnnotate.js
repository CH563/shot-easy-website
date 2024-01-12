import React, { useState, useRef, useEffect } from 'react';
import { tinykeys } from "tinykeys"

const toolTypes = ['rect', 'filledRect', 'circle', 'line', 'arrow', 'pencil'];

export default function useAnnotate() {
    const [tool, setTool] = useState('');
    const isDrawing = useRef(false);
    const [shapes, setShapes] = useState([]);
    const [annotateColor, setAnnotateColor] = useState('#df4b26');
    const [annotateWidth, setAnnotateWidth] = useState(4);
    const [selectedId, setSelectedId] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const unsubscribe = tinykeys(window, {
            "Backspace": event => {
                event.preventDefault()
                if (!selectedId) return;
                setShapes(shapes.filter(e => e.id !== selectedId));
                setSelectedId(null);
            },
            "Delete": event => {
                event.preventDefault()
                if (!selectedId) return;
                setShapes(shapes.filter(e => e.id !== selectedId));
                setSelectedId(null);
            },
            "Escape": event => {
                event.preventDefault()
                if (selectedId) setSelectedId(null);
                setTool('');
            },
        })
        return () => {
            unsubscribe();
        }
    }, [selectedId, shapes]);

    const toSelect = (type) => {
        setSelectedId(null);
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
        if (!toolTypes.includes(tool)) return;
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        const id = `${ tool }-${ new Date().getTime() }`
        const newShape = { id, type: tool, points: [pos.x, pos.y], color: annotateColor, strokeWidth: annotateWidth };
        if (['rect', 'filledRect'].includes(tool)) {
            newShape.width = 0;
            newShape.height = 0;
        }
        if (tool === 'circle') {
            newShape.radius = 0;
        }
        if (tool === 'arrow') {
            newShape.x = pos.x;
            newShape.y = pos.y;
            newShape.pointerLength = 12;
            newShape.pointerWidth = 12;
        }
        setShapes([...shapes, newShape]);
        // setSelectedId(id);
    };
    const handleMouseMove = (e) => {
        if (!toolTypes.includes(tool)) return;
        if (!isDrawing.current) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastShape = shapes[shapes.length - 1];
        if (lastShape.type === 'pencil') lastShape.points = lastShape.points.concat([point.x, point.y]);
        if (['line', 'arrow'].includes(lastShape.type)) lastShape.points = lastShape.points = [lastShape.points[0], lastShape.points[1], point.x, point.y]
        if (['rect', 'filledRect'].includes(lastShape.type)) {
            lastShape.width = point.x - lastShape.points[0];
            lastShape.height = point.y - lastShape.points[1];
        }
        if (lastShape.type === 'circle') {
            const x = Math.pow(point.x - lastShape.points[0], 2);
            const y = Math.pow(point.y - lastShape.points[1], 2);
            lastShape.radius = Math.sqrt(x + y);
        }
        // replace last
        shapes.splice(shapes.length - 1, 1, lastShape);
        setShapes(shapes.concat());
    };
    const handleMouseUp = () => {
        if (isDrawing.current) {
            isDrawing.current = false;
            if (tool !== 'pencil') setTool('');
        }
    };
    const onAnnotateChange = (e) => {
        const color = e.toHexString();
        setAnnotateColor(color);
        if (selectedId) {
            const currentShaps = shapes.find(e => e.id === selectedId);
            if (currentShaps && currentShaps.color) currentShaps.color = color;
        }
    }
    const onAnnotateWidthChange = (e) => {
        setAnnotateWidth(e);
        if (selectedId) {
            const currentShaps = shapes.find(e => e.id === selectedId);
            if (currentShaps && currentShaps.strokeWidth) currentShaps.strokeWidth = e;
        }
    }
    const onEmojiSelect = (emoji) => {
        const x = canvasRef.current.width() / 2 - 90;
        const y = canvasRef.current.height() / 2 - 90;
        setShapes([...shapes, { id: `emoji-${new Date().getTime()}`, text: emoji, fontSize: 960, type: 'emoji', x, y, scale: {x: 0.1875, y: 0.1875} }])
    }
    const toClearAll = () => {
        setShapes([]);
    }
    const toRest = () => {
        setTool('');
        setSelectedId(null);
    }

    return {
        canvasRef,
        shapes,
        setShapes,
        annotateWidth,
        onAnnotateWidthChange,
        tool,
        toSelect,
        toClearAll,
        toRest,
        annotateColor,
        onAnnotateChange,
        setSelectedId,
        selectedId,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        onEmojiSelect
    }
}