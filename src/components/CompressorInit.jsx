import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

export default function CompressorInit() {
    const loading = (
        <div className="flex items-center justify-center min-h-[250px]">
            <Spin />
        </div>
    );
    const [component, setComponent] = useState(loading);
    useEffect(() => {
        const loadList = [
            import("jszip"),
            fetch(new URL("../engines/png.wasm", import.meta.url)),
            fetch(new URL("../engines/gif.wasm", import.meta.url)),
            fetch(new URL("../engines/avif.wasm", import.meta.url)),
            import("../engines/WorkerPreview?worker"),
            import("../engines/WorkerCompress?worker"),
        ];
        Promise.all(loadList).then(async () => {
            console.log(33)
            const modules = import.meta.glob("./*.jsx")
            const importer = modules[`./Compressor.jsx`]();
            const result = await importer;
            setComponent(<result.default />);
        });
    }, []);
    return (
        <div className="rounded-md shadow-lg border-t overflow-hidden border-t-gray-600 antialiased polka">
            {component}
        </div>
    )
}