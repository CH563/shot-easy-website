export default {
    title: 'GIF Maker, Video zu GIF und MP4 zu GIF Konverter | ShotEasy',
    description: 'GIF online erstellen, Video zu GIF und MP4 zu GIF konvertieren, Video komprimieren, Tempo ändern, Audio extrahieren und FFmpeg lokal im Browser nutzen.',
    keywords: 'gif maker, video zu gif, mp4 zu gif, gif online erstellen, video konverter, ffmpeg wasm, video komprimieren, video schneiden, audio aus video extrahieren',
    h1: 'GIF Maker und Video-zu-GIF-Konverter',
    tip: 'MP4 zu GIF konvertieren, GIFs aus Videos erstellen, Clips komprimieren und Medien lokal mit ffmpeg.wasm bearbeiten.',
    localTitle: 'Lokale Videokonvertierung',
    localCont1: 'Video Convert führt FFmpeg per WebAssembly im Browser aus, sodass Medien auf Ihrem Gerät bleiben.',
    localCont2: 'Geeignet für MP4, WebM, MOV, MKV, GIF, Audioextraktion, Thumbnails und schnelle Komprimierung.',
    workflowTitle: 'What ffmpeg.wasm does',
    workflowCont1: 'ffmpeg.wasm brings FFmpeg into the browser through WebAssembly, enabling video and audio processing without a backend conversion service.',
    workflowCont2: 'It powers format conversion, compression, trimming, GIF creation, audio extraction, frame capture, and custom FFmpeg commands while keeping files local.',
    privacyTitle: 'Private by default',
    privacyCont1: 'Files are written only into the browser FFmpeg virtual filesystem while the conversion runs.',
    privacyCont2: 'Large videos can take time because all work happens on your computer instead of a remote server.',
    seoTitle: 'Kostenloser Browser GIF Maker und Videokonverter',
    seoIntro: 'ShotEasy Video Convert ist ein lokaler GIF Maker, Video-zu-GIF-Konverter und MP4-zu-GIF-Tool mit ffmpeg.wasm.',
    featureSections: [
        {
            title: 'GIFs aus MP4, MOV, WebM und anderen Videos erstellen',
            body: 'Kurze Clips in animierte GIFs umwandeln, Breite und FPS einstellen und eine hochwertige Palette erzeugen.'
        },
        {
            title: 'Videoformate lokal konvertieren',
            body: 'Videos zu MP4, WebM, MKV, MOV oder AVI konvertieren, ohne Cloud-Warteschlange.'
        },
        {
            title: 'Video komprimieren, skalieren, zuschneiden und trimmen',
            body: 'Dateigröße mit CRF reduzieren, Abmessungen ändern, Bildausschnitt wählen oder einen Zeitbereich setzen.'
        },
        {
            title: 'Tempo ändern, rückwärts abspielen, loopen und Fades hinzufügen',
            body: 'Geschwindigkeit von 0.25x bis 4x ändern, Video/Audio umkehren, Clips wiederholen oder Fade in/out ergänzen.'
        },
        {
            title: 'Audio extrahieren, stummschalten, normalisieren und anpassen',
            body: 'Audio als MP3, AAC, WAV, OGG oder FLAC exportieren, Ton entfernen oder Lautheit normalisieren.'
        },
        {
            title: 'Frames exportieren, Metadaten entfernen und Raw FFmpeg nutzen',
            body: 'JPEG/PNG-Frame exportieren, Metadaten entfernen, Padding, Denoise, Sharpen/Blur oder eigene FFmpeg-Argumente verwenden.'
        }
    ],
    faqTitle: 'Video zu GIF und FFmpeg FAQ',
    faqs: [
        {
            question: 'Wie konvertiere ich MP4 online zu GIF?',
            answer: 'MP4 hinzufügen, GIF auswählen, Breite und FPS setzen, optional trimmen und das GIF herunterladen.'
        },
        {
            question: 'Ist dieser GIF Maker privat?',
            answer: 'Ja. Die Datei wird lokal mit ffmpeg.wasm verarbeitet und nicht auf einen Konvertierungsserver hochgeladen.'
        },
        {
            question: 'Kann ich ihn auch als Videokonverter nutzen?',
            answer: 'Ja. Zusätzlich zu Video zu GIF unterstützt die Seite Konvertierung, Komprimierung, Crop, Rotation, Tempo, Audio und Raw FFmpeg.'
        },
        {
            question: 'Warum dauert die Verarbeitung?',
            answer: 'Der Browser führt FFmpeg auf Ihrem Gerät aus. Große Videos, hohe Auflösung und GIF-Erstellung können länger dauern.'
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
