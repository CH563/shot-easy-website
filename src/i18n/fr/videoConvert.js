import en from '../en/videoConvert';

export default {
    ...en,
    title: 'Créateur de GIF, Video to GIF et MP4 to GIF | ShotEasy',
    description: 'Créateur de GIF gratuit et convertisseur video to GIF. Convertissez MP4 en GIF, compressez, changez la vitesse, extrayez audio, recadrez et utilisez FFmpeg dans le navigateur.',
    keywords: 'gif maker, créateur de gif, video to gif, vidéo en gif, mp4 to gif, mp4 en gif, convertisseur vidéo, ffmpeg wasm, compresser vidéo, recadrer vidéo, extraire audio vidéo',
    h1: 'Créateur de GIF et convertisseur vidéo en GIF',
    tip: 'Convertissez MP4 en GIF, créez des GIF depuis une vidéo, compressez des clips et éditez localement avec ffmpeg.wasm. Aucun envoi, aucune inscription, aucune file.',
    localTitle: 'Conversion vidéo locale',
    localCont1: 'Video Convert exécute FFmpeg directement dans votre navigateur avec WebAssembly, vos médias restent donc sur votre appareil.',
    localCont2: 'Utilisez-le pour MP4, WebM, MOV, MKV, GIF, extraction audio, vignettes et préréglages de compression rapides.',
    workflowTitle: 'Ce que fait ffmpeg.wasm',
    workflowCont1: 'ffmpeg.wasm apporte FFmpeg dans le navigateur via WebAssembly pour traiter vidéo et audio sans service de conversion côté serveur.',
    workflowCont2: 'Il prend en charge conversion, compression, découpe, création de GIF, extraction audio, capture d’image et commandes FFmpeg personnalisées localement.',
    privacyTitle: 'Privé par défaut',
    privacyCont1: 'Les fichiers sont écrits uniquement dans le système de fichiers virtuel FFmpeg du navigateur pendant la conversion.',
    privacyCont2: 'Les grandes vidéos peuvent prendre du temps car tout se fait sur votre ordinateur plutôt que sur un serveur distant.',
    seoTitle: 'Créateur de GIF et convertisseur vidéo gratuit dans le navigateur',
    seoIntro: 'ShotEasy Video Convert est un créateur de GIF local, un convertisseur video to GIF et un outil MP4 to GIF propulsé par ffmpeg.wasm. Il reprend les flux pratiques de ffmpeg-webCLI tout en gardant les fichiers dans le navigateur.',
    featureSections: [
        {
            title: 'Créez des GIF depuis MP4, MOV, WebM et autres vidéos',
            body: 'Utilisez l’opération GIF pour transformer un court clip en GIF animé. Réglez la largeur et la fréquence d’images, puis FFmpeg génère une palette de qualité.'
        },
        {
            title: 'Convertissez les formats vidéo localement',
            body: 'Réencodez ou remuxez vers MP4, WebM, MKV, MOV ou AVI. MP4 utilise H.264 et AAC pour une large compatibilité, WebM convient bien au web.'
        },
        {
            title: 'Compressez, redimensionnez, recadrez et découpez',
            body: 'Réduisez le poids avec la compression CRF, modifiez les dimensions, recadrez l’image ou choisissez une plage de temps avant le traitement.'
        },
        {
            title: 'Changez la vitesse, inversez, bouclez et ajoutez des fondus',
            body: 'Accélérez ou ralentissez de 0,25x à 4x, inversez vidéo et audio, répétez un clip ou ajoutez des fondus d’entrée et de sortie.'
        },
        {
            title: 'Extrayez, coupez, normalisez et ajustez l’audio',
            body: 'Exportez l’audio en MP3, AAC, WAV, OGG ou FLAC, supprimez-le, changez le volume ou normalisez la sonie avec loudnorm.'
        },
        {
            title: 'Capturez des images, retirez les métadonnées et utilisez FFmpeg',
            body: 'Exportez une image JPEG ou PNG, supprimez les métadonnées, ajoutez des bandes, réduisez le bruit, accentuez ou floutez, ou lancez des arguments Raw FFmpeg.'
        }
    ],
    faqTitle: 'FAQ video to GIF et FFmpeg',
    faqs: [
        {
            question: 'Comment convertir un MP4 en GIF en ligne ?',
            answer: 'Déposez un MP4, choisissez GIF, réglez la largeur et les FPS, découpez le clip si besoin, puis lancez le traitement et téléchargez le GIF.'
        },
        {
            question: 'Ce créateur de GIF est-il privé ?',
            answer: 'Oui. Le fichier est traité localement dans votre navigateur avec ffmpeg.wasm. ShotEasy n’envoie pas votre vidéo vers un serveur de conversion.'
        },
        {
            question: 'Puis-je l’utiliser comme convertisseur vidéo général ?',
            answer: 'Oui. En plus de video to GIF et MP4 to GIF, la page gère conversion, compression, recadrage, rotation, vitesse, inversion, audio, image fixe et commandes FFmpeg.'
        },
        {
            question: 'Pourquoi le traitement peut-il être long ?',
            answer: 'Le navigateur exécute FFmpeg sur votre appareil via WebAssembly. Les grandes vidéos, GIF, inversions et réductions de bruit peuvent prendre plus de temps.'
        }
    ],
    tool: {
        ...en.tool,
        upload: 'Cliquez ou déposez une vidéo/audio ici',
        uploadHint: 'Vos médias restent dans ce navigateur. Rien n’est envoyé.',
        process: 'Traiter la vidéo',
        loading: 'Chargement de ffmpeg',
        loadFfmpeg: 'Charger ffmpeg',
        ffmpegNotLoaded: 'ffmpeg non chargé - cliquez sur "Charger ffmpeg" pour commencer',
        ffmpegLoading: 'le cœur ffmpeg se charge',
        ffmpegReady: 'ffmpeg prêt - les conversions démarreront plus vite',
        ffmpegProcessing: 'ffmpeg traite le média',
        ffmpegError: 'ffmpeg demande votre attention - consultez le journal',
        processing: 'Traitement',
        download: 'Télécharger',
        ui: {
            outputFormat: 'Format de sortie',
            width: 'Largeur',
            height: 'Hauteur',
            preset: 'Préréglage',
            multiplier: 'Multiplicateur',
            preserveAudio: 'Conserver et resynchroniser l’audio',
            transform: 'Transformation',
            audioFormat: 'Format audio',
            timestampSeconds: 'Horodatage en secondes',
            imageFormat: 'Format d’image',
            reverseAudio: 'Inverser aussi l’audio',
            fadeMode: 'Mode de fondu',
            durationSeconds: 'Durée en secondes',
            brightness: 'Luminosité',
            contrast: 'Contraste',
            saturation: 'Saturation',
            grayscale: 'Niveaux de gris',
            metadataHelp: 'Supprime les métadonnées intégrées en copiant les flux vidéo et audio quand c’est possible.',
            volume: 'Volume',
            totalPlays: 'Lectures totales',
            targetRatio: 'Ratio cible',
            padColor: 'Couleur des bordures',
            targetLoudness: 'Sonie cible',
            strength: 'Intensité',
            effect: 'Effet',
            argumentsAfterInput: 'Arguments après l’entrée',
            outputExtension: 'Extension de sortie',
            bypassTrim: 'Ignorer le découpage',
            muteHelp: 'La sortie conserve la piste vidéo et supprime le flux audio.',
            clear: 'Effacer',
            file: 'Fichier',
            size: 'Taille',
            duration: 'Durée',
            resolution: 'Résolution',
            trim: 'Découpage',
            start: 'Début',
            end: 'Fin',
            commandPreview: 'Aperçu de la commande',
            ffmpegLog: 'Journal FFmpeg',
            settings: 'Réglages',
            estimatedOutput: 'Sortie estimée',
            output: 'Sortie',
            outputEmpty: 'Traitez un fichier pour prévisualiser le résultat.',
            outputPreviewAlt: 'Aperçu de la sortie convertie',
            rotateOptions: {
                cw: 'Rotation 90 degrés horaire',
                ccw: 'Rotation 90 degrés antihoraire',
                rotate180: 'Rotation 180 degrés',
                hflip: 'Retourner horizontalement',
                vflip: 'Retourner verticalement',
                both: 'Retourner les deux axes'
            },
            fadeOptions: {
                both: 'Fondu d’entrée et de sortie',
                in: 'Fondu d’entrée seulement',
                out: 'Fondu de sortie seulement'
            },
            colors: {
                black: 'Noir',
                white: 'Blanc',
                gray: 'Gris'
            },
            strengthOptions: {
                light: 'Léger',
                medium: 'Moyen',
                heavy: 'Fort'
            },
            effectOptions: {
                sharpen: 'Accentuer',
                blur: 'Flouter'
            }
        },
        operations: {
            convert: { title: 'Convertir', desc: 'Changer le format' },
            compress: { title: 'Compresser', desc: 'Réduire la taille' },
            gif: { title: 'GIF', desc: 'Créer un GIF animé' },
            speed: { title: 'Vitesse', desc: 'Changer la lecture' },
            rotate: { title: 'Rotation', desc: 'Tourner ou retourner' },
            crop: { title: 'Recadrer', desc: 'Recadrer l’image' },
            audio: { title: 'Audio', desc: 'Extraire la piste' },
            mute: { title: 'Muet', desc: 'Supprimer l’audio' },
            thumbnail: { title: 'Image', desc: 'Exporter une image' },
            reverse: { title: 'Inverser', desc: 'Lire à l’envers' },
            fade: { title: 'Fondu', desc: 'Entrée et sortie' },
            adjust: { title: 'Ajuster', desc: 'Corriger les couleurs' },
            metadata: { title: 'Métadonnées', desc: 'Supprimer les infos' },
            volume: { title: 'Volume', desc: 'Changer le volume' },
            loop: { title: 'Boucle', desc: 'Répéter le clip' },
            pad: { title: 'Bordures', desc: 'Ajouter des bandes' },
            normalize: { title: 'Normaliser', desc: 'Normaliser l’audio' },
            denoise: { title: 'Denoise', desc: 'Réduire le bruit' },
            sharpen: { title: 'Netteté', desc: 'Accentuer ou flouter' },
            raw: { title: 'Raw', desc: 'Arguments FFmpeg' }
        }
    }
}
