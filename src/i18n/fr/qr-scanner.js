export default {
    title: 'Scanner un QR code en ligne gratuitement — par caméra ou image | ShotEasy',
    description: 'Scannez des QR codes en ligne gratuitement dans votre navigateur. Pointez votre caméra vers un code ou envoyez-en une photo — traitement local, sans envoi sur un serveur et sans inscription.',
    keywords: 'scanner qr code en ligne, scan qr code gratuit, lecteur qr code, lire qr code depuis image, scanner qr code avec caméra',
    h1: 'Scanner un QR code en ligne',
    tip: 'Sans envoi : la lecture se fait dans votre navigateur',
    online: 'Scanner un QR code en ligne',
    onlineCont1: 'Lecteur de QR codes en ligne gratuit pour le quotidien. Pointez votre caméra vers un QR code ou envoyez-en une photo ou une capture d’écran, et lisez ce qu’il contient — un lien, un texte, un mot de passe Wi-Fi ou un contact — directement dans votre navigateur.',
    onlineCont2: 'Le traitement est entièrement local : le flux de la caméra et vos images ne quittent pas votre appareil. Sans inscription, sans filigrane.',
    faqTitle: 'Questions sur le lecteur de QR codes',
    faq: [
        {
            question: 'La lecture des QR codes est-elle gratuite ?',
            answer: 'Oui. La lecture par caméra et l’envoi d’image sont gratuits et fonctionnent dans votre navigateur, sans inscription.'
        },
        {
            question: 'Mes photos ou le flux de ma caméra sont-ils envoyés sur un serveur ?',
            answer: 'Non. La lecture s’effectue localement dans votre navigateur : le flux de la caméra et les images envoyées restent sur votre appareil.'
        },
        {
            question: 'Pourquoi mon QR code n’est-il pas détecté ?',
            answer: 'Assurez-vous que le code est entièrement visible, bien éclairé et net. Les codes flous, petits ou partiellement masqués se lisent mal ; essayez une image plus grande ou rapprochez la caméra, et gardez le code bien droit.'
        },
        {
            question: 'Puis-je ouvrir un lien depuis un code scanné ?',
            answer: 'Oui. Quand le contenu ressemble à un lien web, la page affiche un bouton Ouvrir le lien. Vérifiez toujours l’adresse avant de l’ouvrir : un QR code peut mener n’importe où.'
        }
    ],
    why: 'Pourquoi scanner un QR code ?',
    whyCont1: 'Les QR codes cachent liens, mots de passe Wi-Fi, billets et contacts derrière un carré de pixels. Les scanner sur votre ordinateur évite de retaper — ou de chercher votre téléphone — quand le code est déjà à l’écran.',
    whyCont2: 'Envoyer une capture ou une photo du code est le moyen le plus rapide de le lire quand on ne peut pas pointer une caméra dessus : un code dans un e-mail, un message ou une photo d’affiche.',
    ui: {
        cameraTab: 'Caméra',
        uploadTab: 'Envoyer une image',
        startCamera: 'Démarrer la caméra',
        stopCamera: 'Arrêter la caméra',
        cameraHint: 'Pointez votre caméra vers le QR code. La lecture s’arrête automatiquement dès qu’un code est trouvé.',
        cameraStarting: 'Démarrage de la caméra…',
        scanning: 'Lecture en cours…',
        addImageTitle: 'Cliquez ou déposez une image de QR code ici',
        addImageDesc: 'Une photo, une capture d’écran ou une image contenant un QR code.',
        scanImageButton: 'Scanner l’image',
        resultTitle: 'Contenu scanné',
        copyResult: 'Copier le texte',
        copied: 'Copié !',
        openLink: 'Ouvrir le lien',
        clearFile: 'Retirer le fichier',
        noCodeFound: 'Aucun QR code trouvé dans cette image. Essayez une image plus grande ou plus nette.',
        errorNoCamera: 'Aucune caméra trouvée sur cet appareil.',
        errorCameraDenied: 'L’accès à la caméra a été refusé. Autorisez l’accès à la caméra dans votre navigateur et réessayez.',
        errorCamera: 'La caméra n’a pas pu démarrer. Essayez d’envoyer une image à la place.',
        errorNotSupported: 'La lecture par caméra n’est pas prise en charge par ce navigateur. Essayez d’envoyer une image à la place.',
        errorNoImage: 'Ajoutez d’abord une image.',
        errorDecode: 'Cette image n’a pas pu être lue. Essayez une autre image.',
        errorCopy: 'La copie a échoué. Sélectionnez et copiez le texte manuellement.',
        errorNotImage: 'Seuls les fichiers image sont acceptés. Ajoutez un fichier PNG, JPG ou similaire.'
    }
}
