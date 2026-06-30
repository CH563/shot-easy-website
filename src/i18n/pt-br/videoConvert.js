export default {
    title: 'Criador de GIF, Vídeo para GIF e MP4 para GIF | ShotEasy',
    description: 'Crie GIF online, converta vídeo para GIF, MP4 para GIF, comprima vídeo, altere velocidade, extraia áudio, corte e rode FFmpeg localmente no navegador.',
    keywords: 'criador de gif, video para gif, mp4 para gif, gif maker online, conversor de video, ffmpeg wasm, comprimir video, cortar video, extrair audio de video',
    h1: 'Criador de GIF e conversor de vídeo para GIF',
    tip: 'Converta MP4 para GIF, crie GIFs de vídeos, comprima clips e edite mídia localmente com ffmpeg.wasm. Sem upload.',
    localTitle: 'Conversão de vídeo local',
    localCont1: 'Video Convert roda FFmpeg no navegador com WebAssembly, mantendo sua mídia no dispositivo.',
    localCont2: 'Use para MP4, WebM, MOV, MKV, GIF, extração de áudio, thumbnails e compressão rápida.',
    workflowTitle: 'What ffmpeg.wasm does',
    workflowCont1: 'ffmpeg.wasm brings FFmpeg into the browser through WebAssembly, enabling video and audio processing without a backend conversion service.',
    workflowCont2: 'It powers format conversion, compression, trimming, GIF creation, audio extraction, frame capture, and custom FFmpeg commands while keeping files local.',
    privacyTitle: 'Private by default',
    privacyCont1: 'Files are written only into the browser FFmpeg virtual filesystem while the conversion runs.',
    privacyCont2: 'Large videos can take time because all work happens on your computer instead of a remote server.',
    seoTitle: 'Criador de GIF e conversor de vídeo grátis no navegador',
    seoIntro: 'ShotEasy Video Convert é um gif maker local-first, conversor de vídeo para GIF e ferramenta MP4 para GIF com ffmpeg.wasm.',
    featureSections: [
        {
            title: 'Criar GIF de MP4, MOV, WebM e outros vídeos',
            body: 'Use a operação GIF para transformar um trecho curto em GIF animado, ajustar largura e FPS e gerar uma paleta de qualidade.'
        },
        {
            title: 'Converter formatos de vídeo localmente',
            body: 'Reencode ou remuxe vídeos para MP4, WebM, MKV, MOV ou AVI sem fila na nuvem.'
        },
        {
            title: 'Comprimir, redimensionar, cortar e aparar vídeo',
            body: 'Reduza tamanho com CRF, ajuste dimensões, corte quadro ou defina intervalo antes de processar.'
        },
        {
            title: 'Alterar velocidade, inverter, repetir e adicionar fades',
            body: 'Acelere ou desacelere de 0.25x a 4x, inverta vídeo/áudio, repita clips ou adicione fade in/out.'
        },
        {
            title: 'Extrair, silenciar, normalizar e ajustar áudio',
            body: 'Extraia áudio em MP3, AAC, WAV, OGG ou FLAC, remova áudio, altere volume ou normalize loudness.'
        },
        {
            title: 'Capturar frames, remover metadata e usar FFmpeg raw',
            body: 'Exporte JPEG/PNG, remova metadata, adicione padding, reduza ruído, aplique sharpen/blur ou rode argumentos FFmpeg personalizados.'
        }
    ],
    faqTitle: 'FAQ de vídeo para GIF e FFmpeg',
    faqs: [
        {
            question: 'Como converter MP4 para GIF online?',
            answer: 'Adicione o MP4, escolha GIF, defina largura e FPS, corte o trecho se quiser e baixe o GIF gerado.'
        },
        {
            question: 'Este criador de GIF é privado?',
            answer: 'Sim. O arquivo é processado localmente com ffmpeg.wasm; o ShotEasy não envia seu vídeo para servidor.'
        },
        {
            question: 'Também funciona como conversor de vídeo geral?',
            answer: 'Sim. Além de vídeo para GIF, suporta conversão, compressão, corte, rotação, velocidade, áudio, frames e comandos FFmpeg.'
        },
        {
            question: 'Por que o processamento demora?',
            answer: 'O navegador executa FFmpeg no seu dispositivo. Vídeos grandes, alta resolução e GIFs podem demorar mais, mas os arquivos ficam locais.'
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
