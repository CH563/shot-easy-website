import React from 'react';

export default function ConvertTool({ copy = {} }) {
    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            <div className="flex gap-4 p-2 justify-center border-b border-dotted bg-white">
                <button className="rounded border border-slate-200 px-3 py-1.5 text-sm">{copy.addFiles || 'Add Files'}</button>
                <button className="rounded border border-slate-200 px-3 py-1.5 text-sm">{copy.convertAll || 'Convert All'}</button>
            </div>
            <div className="relative min-h-[240px] p-5" style={{
                backgroundImage: 'radial-gradient(circle, rgba(100,116,139,.45) 1px, transparent 1px)',
                backgroundSize: '16px 16px',
            }}>
                <div className="mx-auto flex min-h-[170px] max-w-sm items-center justify-center rounded-md border border-dashed border-slate-300 bg-white text-center text-sm text-slate-500">
                    {copy.emptyTitle || 'Click or drag images / PDFs to this area'}
                </div>
            </div>
        </div>
    );
}
