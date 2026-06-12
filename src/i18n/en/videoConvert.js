export default {
    title: 'GIF Maker, Video to GIF & MP4 to GIF Converter | ShotEasy',
    description: 'Free online gif maker and video to gif converter. Convert MP4 to GIF, compress video, change speed, extract audio, crop, trim, and run FFmpeg locally in your browser.',
    keywords: 'gif maker, video to gif, mp4 to gif, online gif maker, convert video to gif, mp4 gif converter, video converter, ffmpeg wasm, browser video editor, compress video, trim video, extract audio from video',
    h1: 'GIF Maker and Video to GIF Converter',
    tip: 'Convert MP4 to GIF, make GIFs from video, compress clips, and edit media locally with ffmpeg.wasm. No upload, no signup, no server queue.',
    localTitle: 'Local video conversion',
    localCont1: 'Video Convert runs FFmpeg directly in your browser with WebAssembly, so your media stays on your device.',
    localCont2: 'Use it for MP4, WebM, MOV, MKV, GIF, audio extraction, thumbnails, and quick compression presets.',
    workflowTitle: 'What ffmpeg.wasm does',
    workflowCont1: 'ffmpeg.wasm brings FFmpeg into the browser through WebAssembly, enabling video and audio processing without a backend conversion service.',
    workflowCont2: 'It powers format conversion, compression, trimming, GIF creation, audio extraction, frame capture, and custom FFmpeg commands while keeping files local.',
    privacyTitle: 'Private by default',
    privacyCont1: 'Files are written only into the browser FFmpeg virtual filesystem while the conversion runs.',
    privacyCont2: 'Large videos can take time because all work happens on your computer instead of a remote server.',
    seoTitle: 'Free browser GIF maker and video converter',
    seoIntro: 'ShotEasy Video Convert is a local-first gif maker, video to gif converter, and MP4 to GIF tool powered by ffmpeg.wasm. It covers common video editing jobs from ffmpeg-webCLI-style workflows while keeping files inside your browser.',
    featureSections: [
        {
            title: 'Make GIFs from MP4, MOV, WebM, and other videos',
            body: 'Use the GIF operation to turn a short video clip into an animated GIF. Set the output width and frame rate, then let FFmpeg generate a high-quality palette for smoother colors. This is the main path for video to gif, mp4 to gif, and quick social GIF maker workflows.'
        },
        {
            title: 'Convert video formats locally',
            body: 'Re-encode or remux videos to MP4, WebM, MKV, MOV, or AVI. MP4 uses H.264 and AAC for broad compatibility, while WebM is useful for web-first publishing. The conversion runs in your browser instead of a cloud queue.'
        },
        {
            title: 'Compress, resize, crop, and trim video',
            body: 'Reduce file size with CRF-based compression, resize output dimensions, crop the frame, or set a precise trim range before processing. Trim can be combined with GIF creation, compression, speed changes, filters, and most other operations.'
        },
        {
            title: 'Change speed, reverse, loop, and add fades',
            body: 'Speed up or slow down playback from 0.25x to 4x, reverse video and audio, repeat a clip with stream copy, or add fade in and fade out effects. These controls are useful for short launch clips, demos, memes, and looping social media assets.'
        },
        {
            title: 'Extract, mute, normalize, and adjust audio',
            body: 'Pull audio out as MP3, AAC, WAV, OGG, or FLAC; remove audio entirely; change volume; or normalize loudness with FFmpeg loudnorm targets for YouTube, podcasts, and broadcast-style output.'
        },
        {
            title: 'Capture frames, strip metadata, pad, denoise, sharpen, or run raw FFmpeg',
            body: 'Export a single JPEG or PNG frame, remove embedded metadata, add letterbox or pillarbox padding, reduce noise, sharpen or blur, and use Raw FFmpeg arguments when you need custom commands beyond the presets.'
        }
    ],
    faqTitle: 'Video to GIF and FFmpeg FAQ',
    faqs: [
        {
            question: 'How do I convert MP4 to GIF online?',
            answer: 'Upload or drag an MP4 file into Video Convert, choose the GIF operation, set the GIF width and FPS, optionally trim the clip, then process and download the GIF.'
        },
        {
            question: 'Is this gif maker private?',
            answer: 'Yes. The file is processed locally in your browser with ffmpeg.wasm. ShotEasy does not upload your video to a conversion server.'
        },
        {
            question: 'Can I use it as a general video converter too?',
            answer: 'Yes. Besides video to gif and mp4 to gif, the page supports video format conversion, compression, crop, rotate, speed change, reverse, audio extraction, mute, normalize audio, frame export, and raw FFmpeg commands.'
        },
        {
            question: 'Why does processing take time?',
            answer: 'The browser is doing the FFmpeg work on your own device through WebAssembly. Large videos, high resolutions, GIF generation, reverse, and denoise operations can take longer than cloud tools, but your files stay local.'
        }
    ],
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
