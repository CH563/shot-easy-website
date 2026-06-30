export default {
    title: 'GIF Maker, Video ke GIF & MP4 ke GIF Converter | ShotEasy',
    description: 'Buat GIF online, konversi video ke GIF, MP4 ke GIF, kompres video, ubah speed, ekstrak audio, crop, trim, dan jalankan FFmpeg lokal.',
    keywords: 'gif maker, video ke gif, mp4 ke gif, gif maker online, konverter video, ffmpeg wasm, kompres video, trim video, ekstrak audio',
    h1: 'GIF Maker dan Konverter Video ke GIF',
    tip: 'Konversi MP4 ke GIF, buat GIF dari video, kompres klip, dan edit media lokal dengan ffmpeg.wasm.',
    localTitle: 'Konversi video lokal',
    localCont1: 'Video Convert menjalankan FFmpeg di browser dengan WebAssembly, sehingga media tetap di perangkat.',
    localCont2: 'Gunakan untuk MP4, WebM, MOV, MKV, GIF, ekstraksi audio, thumbnail, dan kompresi cepat.',
    workflowTitle: 'What ffmpeg.wasm does',
    workflowCont1: 'ffmpeg.wasm brings FFmpeg into the browser through WebAssembly, enabling video and audio processing without a backend conversion service.',
    workflowCont2: 'It powers format conversion, compression, trimming, GIF creation, audio extraction, frame capture, and custom FFmpeg commands while keeping files local.',
    privacyTitle: 'Private by default',
    privacyCont1: 'Files are written only into the browser FFmpeg virtual filesystem while the conversion runs.',
    privacyCont2: 'Large videos can take time because all work happens on your computer instead of a remote server.',
    seoTitle: 'GIF maker dan konverter video gratis di browser',
    seoIntro: 'ShotEasy Video Convert adalah GIF maker local-first, video to GIF converter, dan MP4 to GIF tool berbasis ffmpeg.wasm.',
    featureSections: [
        {
            title: 'Buat GIF dari MP4, MOV, WebM, dan video lain',
            body: 'Gunakan operasi GIF untuk mengubah klip pendek menjadi GIF animasi, lalu atur width dan FPS.'
        },
        {
            title: 'Konversi format video secara lokal',
            body: 'Konversi video ke MP4, WebM, MKV, MOV, atau AVI langsung di browser.'
        },
        {
            title: 'Kompres, resize, crop, dan trim video',
            body: 'Kurangi ukuran dengan CRF, atur dimensi output, crop frame, atau pilih rentang trim.'
        },
        {
            title: 'Ubah speed, reverse, loop, dan tambah fade',
            body: 'Ubah speed 0.25x sampai 4x, reverse video/audio, loop klip, atau tambah fade in/out.'
        },
        {
            title: 'Ekstrak, mute, normalize, dan atur audio',
            body: 'Ekstrak audio ke MP3, AAC, WAV, OGG, FLAC; mute; ubah volume; atau normalize loudness.'
        },
        {
            title: 'Capture frame dan jalankan raw FFmpeg',
            body: 'Export frame JPEG/PNG, hapus metadata, tambah padding, denoise, sharpen, atau pakai argumen FFmpeg custom.'
        }
    ],
    faqTitle: 'FAQ Video ke GIF dan FFmpeg',
    faqs: [
        {
            question: 'Bagaimana konversi MP4 ke GIF online?',
            answer: 'Tambahkan MP4, pilih GIF, atur width/FPS, trim jika perlu, lalu download GIF.'
        },
        {
            question: 'Apakah GIF maker ini private?',
            answer: 'Ya. File diproses lokal di browser dengan ffmpeg.wasm dan tidak diunggah ke server.'
        },
        {
            question: 'Bisakah dipakai sebagai konverter video umum?',
            answer: 'Ya. Selain video ke GIF, mendukung konversi, kompresi, crop, rotate, speed, audio extraction, dan raw FFmpeg.'
        },
        {
            question: 'Mengapa proses bisa lama?',
            answer: 'FFmpeg berjalan di browser perangkat Anda. Video besar, resolusi tinggi, dan pembuatan GIF bisa memakan waktu.'
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
