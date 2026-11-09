export default {
    title: 'Générateur de QR code en ligne gratuit | ShotEasy',
    description: 'Créez des QR codes en ligne gratuitement dans votre navigateur. Transformez un texte ou un lien en QR code avec vos couleurs et un niveau de correction d’erreur au choix — en local, sans envoi, sans inscription.',
    keywords: 'générateur qr code en ligne, créer qr code gratuit, qr code en ligne, générer qr code pour lien, qr code sans inscription',
    h1: 'Générateur de QR code en ligne',
    tip: 'Sans envoi : votre texte ne quitte pas le navigateur',
    online: 'Générateur de QR code en ligne',
    onlineCont1: 'Générateur de QR code en ligne gratuit pour le quotidien. Transformez un lien, un texte, une adresse e-mail ou un numéro de téléphone en QR code à scanner en quelques secondes — directement dans votre navigateur, sans rien envoyer à un serveur.',
    onlineCont2: 'Le traitement est entièrement local : ce que vous tapez reste sur votre appareil. Réglez le niveau de correction d’erreur, la taille, la zone de silence et les couleurs, puis téléchargez le code en PNG ou en SVG, ou copiez-le dans le presse-papiers. Sans inscription ni filigrane.',
    faqTitle: 'Questions sur le générateur de QR code',
    faq: [
        {
            question: 'Le générateur de QR code est-il gratuit ?',
            answer: 'Oui. La création de QR codes est gratuite dans votre navigateur, sans inscription.'
        },
        {
            question: 'Ce que je tape est-il envoyé sur un serveur ?',
            answer: 'Non. Le QR code est généré localement dans votre navigateur, donc votre texte ou votre lien reste sur votre appareil.'
        },
        {
            question: 'Pourquoi mon QR code ne se scanne pas ?',
            answer: 'Essayez une taille plus grande et un code noir sur fond blanc. Les très petits codes et les couleurs peu contrastées se scannent mal, et un code abîmé ou partiellement masqué a besoin d’un niveau de correction d’erreur plus élevé.'
        },
        {
            question: 'Combien de texte un QR code peut-il contenir ?',
            answer: 'Cela dépend du texte et du niveau de correction d’erreur. Les liens courts tiennent facilement ; un texte très long peut dépasser la capacité. Dans ce cas, l’outil vous le signale : raccourcissez le texte ou choisissez un niveau de correction plus faible.'
        }
    ],
    why: 'Pourquoi créer un QR code ?',
    whyCont1: 'Un QR code transforme un long lien en quelque chose que l’appareil photo d’un téléphone ouvre en une seconde : un menu, les identifiants Wi-Fi, la page d’un événement, le lien d’un produit ou une carte de visite. Imprimez-le sur une affiche, un ticket ou une carte de visite et vos visiteurs arrivent sur la bonne page sans rien taper.',
    whyCont2: 'Le code est généré dans votre navigateur, donc ce que vous tapez n’est envoyé nulle part. Choisissez des couleurs assorties à votre image, mais gardez un bon contraste : un code assorti à la page mais illisible est pire qu’un simple code noir et blanc.',
    ui: {
        inputLabel: 'Texte ou lien',
        inputPlaceholder: 'Tapez ou collez un texte, un lien, une adresse e-mail…',
        inputHint: 'Aperçu en direct : le code se met à jour pendant la saisie.',
        emptyHint: 'Saisissez un texte ou un lien ci-dessus pour générer votre QR code.',
        errorCorrection: 'Correction d’erreur',
        size: 'Taille (px)',
        margin: 'Zone de silence',
        foreground: 'Couleur du code',
        background: 'Arrière-plan',
        presetWebsite: 'Site web',
        presetEmail: 'E-mail',
        presetPhone: 'Téléphone',
        downloadPng: 'Télécharger PNG',
        downloadSvg: 'Télécharger SVG',
        copyPng: 'Copier PNG',
        copied: 'QR code copié dans le presse-papiers.',
        errorTooLong: 'Ce texte est trop long pour un QR code. Raccourcissez-le ou choisissez un niveau de correction d’erreur plus faible.',
        errorGenerate: 'Le QR code n’a pas pu être généré. Essayez un texte plus court.',
        errorDownload: 'Le téléchargement a échoué. Veuillez réessayer.',
        errorCopy: 'La copie a échoué. Votre navigateur bloque peut-être l’accès au presse-papiers — essayez de télécharger le PNG.',
        errorCopyUnsupported: 'La copie n’est pas prise en charge dans ce navigateur. Téléchargez le PNG.',
        errorSameColor: 'La couleur du code et celle de l’arrière-plan sont identiques — le code ne se scannera pas. Choisissez des couleurs différentes.'
    }
}
