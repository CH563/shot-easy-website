import en from '../en/videoConvert';

export default {
    ...en,
    title: 'Creador de GIF, Video a GIF y MP4 a GIF | ShotEasy',
    description: 'Creador de GIF gratis y convertidor de video a GIF. Convierte MP4 a GIF, comprime video, cambia velocidad, extrae audio, recorta y usa FFmpeg en tu navegador.',
    keywords: 'gif maker, creador de gif, video to gif, video a gif, mp4 to gif, mp4 a gif, convertidor de video, ffmpeg wasm, comprimir video, recortar video, extraer audio de video',
    h1: 'Creador de GIF y convertidor de video a GIF',
    tip: 'Convierte MP4 a GIF, crea GIF desde video, comprime clips y edita medios localmente con ffmpeg.wasm. Sin subir archivos, sin registro y sin cola.',
    localTitle: 'Conversión local de video',
    localCont1: 'Video Convert ejecuta FFmpeg directamente en tu navegador con WebAssembly, por lo que tus archivos permanecen en tu dispositivo.',
    localCont2: 'Úsalo para MP4, WebM, MOV, MKV, GIF, extracción de audio, miniaturas y ajustes rápidos de compresión.',
    workflowTitle: 'Qué hace ffmpeg.wasm',
    workflowCont1: 'ffmpeg.wasm lleva FFmpeg al navegador mediante WebAssembly para procesar video y audio sin un servicio de conversión en backend.',
    workflowCont2: 'Permite conversión de formatos, compresión, recorte, creación de GIF, extracción de audio, captura de fotogramas y comandos FFmpeg personalizados con archivos locales.',
    privacyTitle: 'Privado por defecto',
    privacyCont1: 'Los archivos solo se escriben en el sistema de archivos virtual de FFmpeg dentro del navegador durante la conversión.',
    privacyCont2: 'Los videos grandes pueden tardar más porque todo el trabajo se realiza en tu ordenador, no en un servidor remoto.',
    seoTitle: 'Creador de GIF y convertidor de video gratis en el navegador',
    seoIntro: 'ShotEasy Video Convert es un creador de GIF local, un convertidor de video a GIF y una herramienta MP4 a GIF basada en ffmpeg.wasm. Cubre flujos comunes inspirados en ffmpeg-webCLI y mantiene los archivos dentro del navegador.',
    featureSections: [
        {
            title: 'Crea GIF desde MP4, MOV, WebM y otros videos',
            body: 'Usa la operación GIF para convertir un clip corto en un GIF animado. Ajusta el ancho y los FPS, y FFmpeg generará una paleta de calidad para colores más suaves.'
        },
        {
            title: 'Convierte formatos de video localmente',
            body: 'Recodifica o remultiplexa videos a MP4, WebM, MKV, MOV o AVI. MP4 usa H.264 y AAC para una compatibilidad amplia, mientras que WebM es útil para la web.'
        },
        {
            title: 'Comprime, redimensiona, recorta y corta video',
            body: 'Reduce el tamaño con compresión CRF, cambia dimensiones, recorta el encuadre o selecciona un intervalo de tiempo antes de procesar.'
        },
        {
            title: 'Cambia velocidad, invierte, repite y añade fundidos',
            body: 'Acelera o ralentiza de 0.25x a 4x, invierte video y audio, repite un clip o añade efectos de entrada y salida.'
        },
        {
            title: 'Extrae, silencia, normaliza y ajusta audio',
            body: 'Extrae audio como MP3, AAC, WAV, OGG o FLAC; elimina el audio; cambia el volumen; o normaliza la sonoridad con loudnorm.'
        },
        {
            title: 'Captura fotogramas, limpia metadatos y usa FFmpeg avanzado',
            body: 'Exporta JPEG o PNG, elimina metadatos, añade relleno, reduce ruido, enfoca o desenfoca, y usa argumentos Raw FFmpeg para comandos personalizados.'
        }
    ],
    faqTitle: 'Preguntas sobre video a GIF y FFmpeg',
    faqs: [
        {
            question: 'Cómo convierto MP4 a GIF online?',
            answer: 'Sube o arrastra un MP4, elige GIF, ajusta el ancho y los FPS, recorta el clip si hace falta, procesa y descarga el GIF.'
        },
        {
            question: 'Este creador de GIF es privado?',
            answer: 'Sí. El archivo se procesa localmente en tu navegador con ffmpeg.wasm. ShotEasy no sube tu video a un servidor de conversión.'
        },
        {
            question: 'También sirve como convertidor de video general?',
            answer: 'Sí. Además de video a GIF y MP4 a GIF, admite conversión de formatos, compresión, recorte, rotación, velocidad, inversión, audio, miniaturas y comandos FFmpeg.'
        },
        {
            question: 'Por qué tarda el procesamiento?',
            answer: 'El navegador ejecuta FFmpeg en tu dispositivo mediante WebAssembly. Videos grandes, GIF, inversión y reducción de ruido pueden tardar más, pero los archivos permanecen locales.'
        }
    ],
    tool: {
        ...en.tool,
        upload: 'Haz clic o arrastra video/audio aquí',
        uploadHint: 'Tus archivos permanecen en este navegador. No se suben.',
        process: 'Procesar video',
        loading: 'Cargando ffmpeg',
        loadFfmpeg: 'Cargar ffmpeg',
        ffmpegNotLoaded: 'ffmpeg no está cargado - haz clic en "Cargar ffmpeg" para empezar',
        ffmpegLoading: 'el núcleo de ffmpeg se está cargando',
        ffmpegReady: 'ffmpeg listo - las conversiones empezarán más rápido',
        ffmpegProcessing: 'ffmpeg está procesando el archivo',
        ffmpegError: 'ffmpeg requiere atención - revisa el registro',
        processing: 'Procesando',
        download: 'Descargar',
        ui: {
            outputFormat: 'Formato de salida',
            width: 'Ancho',
            height: 'Alto',
            preset: 'Preajuste',
            multiplier: 'Multiplicador',
            preserveAudio: 'Conservar y ajustar audio',
            transform: 'Transformación',
            audioFormat: 'Formato de audio',
            timestampSeconds: 'Tiempo en segundos',
            imageFormat: 'Formato de imagen',
            reverseAudio: 'Invertir también el audio',
            fadeMode: 'Modo de fundido',
            durationSeconds: 'Duración en segundos',
            brightness: 'Brillo',
            contrast: 'Contraste',
            saturation: 'Saturación',
            grayscale: 'Escala de grises',
            metadataHelp: 'Elimina metadatos incrustados y copia video y audio cuando sea posible.',
            volume: 'Volumen',
            totalPlays: 'Reproducciones',
            targetRatio: 'Proporción objetivo',
            padColor: 'Color de relleno',
            targetLoudness: 'Sonoridad objetivo',
            strength: 'Intensidad',
            effect: 'Efecto',
            argumentsAfterInput: 'Argumentos después del archivo',
            outputExtension: 'Extensión de salida',
            bypassTrim: 'Omitir recorte',
            muteHelp: 'La salida conserva la pista de video y elimina el audio.',
            clear: 'Limpiar',
            file: 'Archivo',
            size: 'Tamaño',
            duration: 'Duración',
            resolution: 'Resolución',
            trim: 'Recorte',
            start: 'Inicio',
            end: 'Fin',
            commandPreview: 'Vista del comando',
            ffmpegLog: 'Registro FFmpeg',
            settings: 'Ajustes',
            estimatedOutput: 'Salida estimada',
            output: 'Salida',
            outputEmpty: 'Procesa un archivo para previsualizar el resultado.',
            outputPreviewAlt: 'Vista previa del resultado convertido',
            rotateOptions: {
                cw: 'Rotar 90 grados horario',
                ccw: 'Rotar 90 grados antihorario',
                rotate180: 'Rotar 180 grados',
                hflip: 'Voltear horizontal',
                vflip: 'Voltear vertical',
                both: 'Voltear ambos ejes'
            },
            fadeOptions: {
                both: 'Entrada y salida',
                in: 'Solo entrada',
                out: 'Solo salida'
            },
            colors: {
                black: 'Negro',
                white: 'Blanco',
                gray: 'Gris'
            },
            strengthOptions: {
                light: 'Suave',
                medium: 'Medio',
                heavy: 'Fuerte'
            },
            effectOptions: {
                sharpen: 'Enfocar',
                blur: 'Desenfocar'
            }
        },
        operations: {
            convert: { title: 'Convertir', desc: 'Cambiar formato' },
            compress: { title: 'Comprimir', desc: 'Reducir tamaño' },
            gif: { title: 'GIF', desc: 'Crear GIF animado' },
            speed: { title: 'Velocidad', desc: 'Cambiar reproducción' },
            rotate: { title: 'Rotar', desc: 'Rotar o voltear' },
            crop: { title: 'Recortar', desc: 'Recortar encuadre' },
            audio: { title: 'Audio', desc: 'Extraer pista' },
            mute: { title: 'Silenciar', desc: 'Quitar audio' },
            thumbnail: { title: 'Fotograma', desc: 'Exportar imagen' },
            reverse: { title: 'Invertir', desc: 'Reproducir al revés' },
            fade: { title: 'Fundido', desc: 'Entrada y salida' },
            adjust: { title: 'Ajustar', desc: 'Color del video' },
            metadata: { title: 'Metadatos', desc: 'Eliminar datos' },
            volume: { title: 'Volumen', desc: 'Cambiar volumen' },
            loop: { title: 'Bucle', desc: 'Repetir clip' },
            pad: { title: 'Relleno', desc: 'Añadir bordes' },
            normalize: { title: 'Normalizar', desc: 'Nivelar audio' },
            denoise: { title: 'Reducir ruido', desc: 'Limpiar video' },
            sharpen: { title: 'Enfocar', desc: 'Enfocar o suavizar' },
            raw: { title: 'Raw', desc: 'Args FFmpeg' }
        }
    }
}
