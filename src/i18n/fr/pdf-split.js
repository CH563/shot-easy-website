export default {
    title: 'Diviser un PDF en ligne gratuitement — extraire des pages | ShotEasy',
    description: 'Divisez un PDF en ligne : extrayez les pages voulues dans un nouveau fichier ou découpez le document page par page. Gratuit, traitement local : sans envoi sur un serveur, sans inscription et sans filigrane.',
    keywords: 'diviser pdf en ligne, extraire pages pdf, découper pdf en pages, séparateur pdf en ligne, diviser pdf gratuit',
    h1: 'Diviser un PDF en ligne',
    tip: 'Sans envoi : divisez vos PDF dans le navigateur',
    online: 'Diviser un PDF en ligne',
    onlineCont1: 'Un outil PDF en ligne gratuit pour le travail quotidien. Extrayez les pages dont vous avez besoin dans un nouveau PDF, ou découpez tout le document en un fichier par page — dans votre navigateur, sans envoyer vos fichiers sur un serveur.',
    onlineCont2: 'Le traitement est entièrement local : votre PDF ne quitte pas votre appareil. Ajoutez un fichier, choisissez les pages, puis téléchargez le résultat. Sans inscription, sans filigrane.',
    faqTitle: 'Questions sur la division des PDF',
    faq: [
        {
            question: 'La division d’un PDF est-elle gratuite ?',
            answer: 'Oui. Les deux modes de division sont gratuits et fonctionnent dans votre navigateur, sans inscription.'
        },
        {
            question: 'Mes PDF sont-ils envoyés sur un serveur ?',
            answer: 'Non. La division s’effectue localement dans votre navigateur : vos fichiers restent sur votre appareil.'
        },
        {
            question: 'Puis-je diviser un PDF protégé par mot de passe ?',
            answer: 'Non. Les PDF chiffrés ou protégés par mot de passe ne peuvent pas être ouverts ici, et cet outil ne supprime pas les mots de passe. Retirez d’abord le mot de passe dans une application PDF, puis divisez le fichier.'
        },
        {
            question: 'Quels numéros de page puis-je saisir ?',
            answer: 'La numérotation commence à 1. Saisissez des pages seules et des plages comme 1-3, 5, 8-10 : les doublons sont supprimés et l’ordre est conservé. Pour diviser chaque page en fichier séparé, utilisez l’onglet « Découper chaque page » : les fichiers se téléchargent ensemble dans une seule archive ZIP.'
        }
    ],
    why: 'Pourquoi diviser un PDF ?',
    whyCont1: 'Diviser un PDF permet d’extraire les pages utiles d’un long document — un chapitre, la page signée d’un contrat, un reçu parmi des pages scannées — pour partager ou archiver juste cette partie au lieu du fichier entier.',
    whyCont2: 'Découper chaque page en fichier séparé est pratique pour les lots scannés et les envois en masse : chaque page devient son propre PDF, nommé par numéro de page, dans une seule archive ZIP.',
    ui: {
        extractTab: 'Extraire des pages',
        everyPageTab: 'Découper chaque page',
        addFileTitle: 'Cliquez ou déposez un fichier PDF ici',
        addFileDesc: 'Un seul fichier PDF à la fois. Les fichiers divisés conservent les pages d’origine.',
        rangesLabel: 'Pages à extraire',
        rangesPlaceholder: 'Exemple : 1-3, 5, 8-10',
        rangesHint: 'La numérotation commence à 1. Plages et pages seules peuvent se combiner ; les doublons sont supprimés et l’ordre est conservé.',
        extractButton: 'Extraire les pages',
        extracting: 'Extraction en cours…',
        splitEveryButton: 'Diviser en fichiers séparés',
        splitting: 'Division en cours…',
        everyPageDesc: 'Chaque page devient son propre fichier PDF, nommé par numéro de page, téléchargé ensemble dans une seule archive ZIP.',
        downloadSplit: 'Télécharger le PDF divisé',
        downloadZip: 'Télécharger le ZIP',
        clearFile: 'Retirer le fichier',
        pages: 'pages',
        splitSize: 'Taille du fichier divisé',
        splitReady: 'Votre PDF divisé est prêt.',
        zipReady: 'Votre archive ZIP avec un PDF par page est prête.',
        errorNotPdf: 'Seuls les fichiers PDF sont acceptés. Ajoutez un fichier .pdf.',
        errorEncrypted: 'Ce PDF est chiffré ou protégé par mot de passe et ne peut pas être ouvert ici.',
        errorLoad: 'Ce fichier n’a pas pu être lu comme un PDF. Vérifiez le fichier et réessayez.',
        errorNoFile: 'Ajoutez d’abord un fichier PDF.',
        errorEmptyRanges: 'Indiquez les pages à extraire, par exemple 1-3, 5.',
        errorInvalidRanges: 'Vérifiez les numéros de page. Utilisez des nombres et des plages comme 1-3, 5, 8-10.',
        errorOutOfRange: 'Un des numéros de page dépasse la fin de ce PDF.',
        errorSplit: 'La division a échoué. Réessayez avec un autre fichier.'
    }
}
