export default {
    title: 'Video Convert online for free',
    description: 'Convert, compress, trim, extract audio, create GIFs, and run FFmpeg commands locally in your browser for free.',
    tip: 'Convert and compress videos locally with ffmpeg.wasm. No upload, no signup, no server queue.',
    localTitle: 'Local video conversion',
    localCont1: 'Video Convert runs FFmpeg directly in your browser with WebAssembly, so your media stays on your device.',
    localCont2: 'Use it for MP4, WebM, MOV, MKV, GIF, audio extraction, thumbnails, and quick compression presets.',
    workflowTitle: 'What ffmpeg.wasm does',
    workflowCont1: 'ffmpeg.wasm brings FFmpeg into the browser through WebAssembly, enabling video and audio processing without a backend conversion service.',
    workflowCont2: 'It powers format conversion, compression, trimming, GIF creation, audio extraction, frame capture, and custom FFmpeg commands while keeping files local.',
    privacyTitle: 'Private by default',
    privacyCont1: 'Files are written only into the browser FFmpeg virtual filesystem while the conversion runs.',
    privacyCont2: 'Large videos can take time because all work happens on your computer instead of a remote server.',
    tool: {
        upload: 'Click or drag video/audio here',
        uploadHint: 'Your media stays in this browser. Nothing is uploaded.',
        process: 'Process Video',
        loading: 'Loading ffmpeg',
        loadFfmpeg: 'Load ffmpeg',
        ffmpegNotLoaded: 'ffmpeg not loaded - click "Load ffmpeg" to begin',
        ffmpegLoading: 'ffmpeg core is loading',
        ffmpegReady: 'ffmpeg ready - conversions will start faster',
        ffmpegProcessing: 'ffmpeg processing media',
        ffmpegError: 'ffmpeg needs attention - check the log below',
        processing: 'Processing',
        download: 'Download'
    }
}
