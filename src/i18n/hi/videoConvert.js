export default {
    title: 'GIF Maker, Video to GIF और MP4 to GIF Converter | ShotEasy',
    description: 'Online GIF बनाएं, video to GIF और MP4 to GIF convert करें, video compress करें, speed बदलें, audio extract करें और FFmpeg locally चलाएं.',
    keywords: 'gif maker, video to gif, mp4 to gif, online gif maker, video converter, ffmpeg wasm, compress video, trim video, extract audio',
    h1: 'GIF Maker और Video to GIF Converter',
    tip: 'MP4 to GIF convert करें, videos से GIF बनाएं, clips compress करें और ffmpeg.wasm से locally edit करें.',
    localTitle: 'Local video conversion',
    localCont1: 'Video Convert browser में WebAssembly के साथ FFmpeg चलाता है, इसलिए media आपके device पर रहती है.',
    localCont2: 'MP4, WebM, MOV, MKV, GIF, audio extraction, thumbnails और compression presets के लिए इस्तेमाल करें.',
    workflowTitle: 'What ffmpeg.wasm does',
    workflowCont1: 'ffmpeg.wasm brings FFmpeg into the browser through WebAssembly, enabling video and audio processing without a backend conversion service.',
    workflowCont2: 'It powers format conversion, compression, trimming, GIF creation, audio extraction, frame capture, and custom FFmpeg commands while keeping files local.',
    privacyTitle: 'Private by default',
    privacyCont1: 'Files are written only into the browser FFmpeg virtual filesystem while the conversion runs.',
    privacyCont2: 'Large videos can take time because all work happens on your computer instead of a remote server.',
    seoTitle: 'Free browser GIF maker और video converter',
    seoIntro: 'ShotEasy Video Convert ffmpeg.wasm से powered local-first GIF maker, video to GIF converter और MP4 to GIF tool है.',
    featureSections: [
        {
            title: 'MP4, MOV, WebM से GIF बनाएं',
            body: 'GIF operation से short video clip को animated GIF में बदलें, width और FPS set करें.'
        },
        {
            title: 'Video formats locally convert करें',
            body: 'Videos को MP4, WebM, MKV, MOV या AVI में browser में convert करें.'
        },
        {
            title: 'Video compress, resize, crop और trim करें',
            body: 'CRF compression, output size, crop frame और trim range set करके process करें.'
        },
        {
            title: 'Speed बदलें, reverse, loop और fade जोड़ें',
            body: '0.25x से 4x speed, reverse video/audio, loop clip और fade in/out इस्तेमाल करें.'
        },
        {
            title: 'Audio extract, mute और normalize करें',
            body: 'Audio को MP3, AAC, WAV, OGG या FLAC में निकालें, mute करें या loudness normalize करें.'
        },
        {
            title: 'Frame capture और raw FFmpeg चलाएं',
            body: 'JPEG/PNG frame export करें, metadata हटाएं, padding/denoise/sharpen करें या custom FFmpeg args चलाएं.'
        }
    ],
    faqTitle: 'Video to GIF और FFmpeg FAQ',
    faqs: [
        {
            question: 'MP4 को GIF online कैसे convert करें?',
            answer: 'MP4 add करें, GIF operation चुनें, width/FPS set करें, जरूरत हो तो trim करें और GIF download करें.'
        },
        {
            question: 'क्या यह GIF maker private है?',
            answer: 'हाँ. File browser में ffmpeg.wasm से locally process होती है; video server पर upload नहीं होता.'
        },
        {
            question: 'क्या इसे general video converter की तरह इस्तेमाल कर सकते हैं?',
            answer: 'हाँ. Video to GIF के अलावा conversion, compression, crop, rotate, speed, audio extraction और raw FFmpeg support है.'
        },
        {
            question: 'Processing में समय क्यों लगता है?',
            answer: 'FFmpeg आपके device पर browser में चलता है. Large videos, high resolution और GIF generation में ज्यादा समय लग सकता है.'
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
        download: 'Download',
        ui: {
            outputFormat: 'Output format',
            width: 'Width',
            height: 'Height',
            preset: 'Preset',
            multiplier: 'Multiplier',
            preserveAudio: 'Preserve and retime audio',
            transform: 'Transform',
            audioFormat: 'Audio format',
            timestampSeconds: 'Timestamp seconds',
            imageFormat: 'Image format',
            reverseAudio: 'Reverse audio too',
            fadeMode: 'Fade mode',
            durationSeconds: 'Duration seconds',
            brightness: 'Brightness',
            contrast: 'Contrast',
            saturation: 'Saturation',
            grayscale: 'Grayscale',
            metadataHelp: 'Removes embedded metadata while stream-copying video and audio when possible.',
            volume: 'Volume',
            totalPlays: 'Total plays',
            targetRatio: 'Target ratio',
            padColor: 'Pad color',
            targetLoudness: 'Target loudness',
            strength: 'Strength',
            effect: 'Effect',
            argumentsAfterInput: 'Arguments after input',
            outputExtension: 'Output extension',
            bypassTrim: 'Bypass trim',
            muteHelp: 'The output keeps the video track and removes the audio stream.',
            clear: 'Clear',
            file: 'File',
            size: 'Size',
            duration: 'Duration',
            resolution: 'Resolution',
            trim: 'Trim',
            start: 'Start',
            end: 'End',
            commandPreview: 'Command preview',
            ffmpegLog: 'FFmpeg Log',
            settings: 'Settings',
            estimatedOutput: 'Estimated output',
            output: 'Output',
            outputEmpty: 'Process a file to preview the result.',
            outputPreviewAlt: 'Converted output preview',
            rotateOptions: {
                cw: 'Rotate 90 clockwise',
                ccw: 'Rotate 90 counter-clockwise',
                rotate180: 'Rotate 180',
                hflip: 'Flip horizontal',
                vflip: 'Flip vertical',
                both: 'Flip both axes'
            },
            fadeOptions: {
                both: 'Fade in and out',
                in: 'Fade in only',
                out: 'Fade out only'
            },
            colors: {
                black: 'Black',
                white: 'White',
                gray: 'Gray'
            },
            strengthOptions: {
                light: 'Light',
                medium: 'Medium',
                heavy: 'Heavy'
            },
            effectOptions: {
                sharpen: 'Sharpen',
                blur: 'Blur'
            }
        },
        operations: {
            convert: { title: 'Convert', desc: 'Change video format' },
            compress: { title: 'Compress', desc: 'Resize and reduce size' },
            gif: { title: 'GIF', desc: 'Create animated GIF' },
            speed: { title: 'Speed', desc: 'Change playback speed' },
            rotate: { title: 'Rotate', desc: 'Rotate or flip video' },
            crop: { title: 'Crop', desc: 'Crop video frame' },
            audio: { title: 'Audio', desc: 'Extract soundtrack' },
            mute: { title: 'Mute', desc: 'Remove audio track' },
            thumbnail: { title: 'Frame', desc: 'Export one image' },
            reverse: { title: 'Reverse', desc: 'Reverse video' },
            fade: { title: 'Fade', desc: 'Fade in and out' },
            adjust: { title: 'Adjust', desc: 'Color adjustments' },
            metadata: { title: 'Metadata', desc: 'Strip metadata' },
            volume: { title: 'Volume', desc: 'Change audio volume' },
            loop: { title: 'Loop', desc: 'Repeat the clip' },
            pad: { title: 'Pad', desc: 'Pad or letterbox' },
            normalize: { title: 'Normalize', desc: 'Normalize loudness' },
            denoise: { title: 'Denoise', desc: 'Reduce video noise' },
            sharpen: { title: 'Sharpen', desc: 'Sharpen or blur' },
            raw: { title: 'Raw', desc: 'Custom ffmpeg args' }
        }
    }
}
