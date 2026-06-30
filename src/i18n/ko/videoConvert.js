export default {
    title: 'GIF Maker, Video to GIF & MP4 to GIF 변환기 | ShotEasy',
    description: '온라인 GIF 만들기, video to GIF, MP4 to GIF 변환, 비디오 압축, 속도 변경, 오디오 추출, FFmpeg 로컬 실행을 지원합니다.',
    keywords: 'gif maker, video to gif, mp4 to gif, online gif maker, video converter, ffmpeg wasm, compress video, trim video, extract audio',
    h1: 'GIF Maker와 Video to GIF 변환기',
    tip: 'MP4를 GIF로 변환하고, 비디오에서 GIF를 만들고, ffmpeg.wasm으로 미디어를 로컬 편집하세요.',
    localTitle: '로컬 비디오 변환',
    localCont1: 'Video Convert는 WebAssembly로 브라우저 안에서 FFmpeg를 실행해 미디어가 기기에 남아 있습니다.',
    localCont2: 'MP4, WebM, MOV, MKV, GIF, 오디오 추출, 썸네일, 빠른 압축에 사용할 수 있습니다.',
    workflowTitle: 'What ffmpeg.wasm does',
    workflowCont1: 'ffmpeg.wasm brings FFmpeg into the browser through WebAssembly, enabling video and audio processing without a backend conversion service.',
    workflowCont2: 'It powers format conversion, compression, trimming, GIF creation, audio extraction, frame capture, and custom FFmpeg commands while keeping files local.',
    privacyTitle: 'Private by default',
    privacyCont1: 'Files are written only into the browser FFmpeg virtual filesystem while the conversion runs.',
    privacyCont2: 'Large videos can take time because all work happens on your computer instead of a remote server.',
    seoTitle: '무료 브라우저 GIF Maker와 비디오 변환기',
    seoIntro: 'ShotEasy Video Convert는 ffmpeg.wasm 기반의 로컬 우선 GIF maker, video to GIF, MP4 to GIF 도구입니다.',
    featureSections: [
        {
            title: 'MP4, MOV, WebM에서 GIF 만들기',
            body: 'GIF 기능으로 짧은 비디오 클립을 애니메이션 GIF로 변환하고 width와 FPS를 설정할 수 있습니다.'
        },
        {
            title: '비디오 형식 로컬 변환',
            body: '브라우저에서 MP4, WebM, MKV, MOV, AVI로 비디오를 변환합니다.'
        },
        {
            title: '비디오 압축, 리사이즈, 자르기, 트림',
            body: 'CRF 압축, 출력 크기, 프레임 crop, trim 구간을 설정해 처리합니다.'
        },
        {
            title: '속도 변경, reverse, loop, fade 추가',
            body: '0.25x부터 4x까지 속도 변경, reverse, loop, fade in/out을 사용할 수 있습니다.'
        },
        {
            title: '오디오 추출, 음소거, 정규화',
            body: 'MP3, AAC, WAV, OGG, FLAC으로 오디오를 추출하거나 음소거 및 loudness normalize를 적용합니다.'
        },
        {
            title: '프레임 캡처 및 raw FFmpeg',
            body: 'JPEG/PNG 프레임을 저장하고 metadata 제거, padding, denoise, sharpen 또는 custom FFmpeg args를 실행합니다.'
        }
    ],
    faqTitle: 'Video to GIF 및 FFmpeg FAQ',
    faqs: [
        {
            question: 'MP4를 GIF로 온라인 변환하려면?',
            answer: 'MP4를 추가하고 GIF 기능을 선택한 뒤 width/FPS를 설정하고 필요하면 trim 후 GIF를 다운로드하세요.'
        },
        {
            question: '이 GIF maker는 private한가요?',
            answer: '네. 파일은 ffmpeg.wasm으로 브라우저에서 로컬 처리되며 서버로 업로드되지 않습니다.'
        },
        {
            question: '일반 비디오 변환기로도 쓸 수 있나요?',
            answer: '네. video to GIF 외에도 변환, 압축, crop, rotate, speed, audio extraction, raw FFmpeg를 지원합니다.'
        },
        {
            question: '처리가 오래 걸리는 이유는?',
            answer: 'FFmpeg 작업이 기기 브라우저에서 실행됩니다. 큰 비디오, 고해상도, GIF 생성은 시간이 더 걸릴 수 있습니다.'
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
