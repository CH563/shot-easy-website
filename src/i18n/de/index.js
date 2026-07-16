import nav from './nav';
import editor from './editor';
import beautifier from './beautifier';
import rounded from './rounded';
import remover from './remover';
import blurBackground from './blurBackground';
import compressor from './compressor';
import longImage from './longImage';
import screenshot from './screenshot';
import videoConvert from './videoConvert';
import convert from './convert';
import viewer from './viewer';

export default {
    title: 'Kostenloser Online-Fotoeditor',
    description: 'Fotos kostenlos online bearbeiten, skalieren und filtern, Bilder in JPG/PNG/JPEG/WebP konvertieren und Screenshots von Bereichen oder ganzen Seiten erstellen.',
    keywords: 'ShotEasy, screenshot online, foto bearbeiten, foto konverter, bild konverter, online editor, bildformat online konvertieren, bild in jpg konvertieren, jpg zu webp, jpg zu png',
    privacy: 'Datenschutz',
    terms: 'Bedingungen',
    blog: 'Blog',
    footerToolsTitle: 'Wichtige ShotEasy-Tools',
    footerToolsIntro: 'Schnellzugriff auf Screenshot-, Bild-, Video- und lokale Browser-Tools.',
    localProcessing: {
        title: 'Kein Upload, lokale Verarbeitung',
        cont1: 'Ihre Dateien werden lokal im Browser verarbeitet. ShotEasy muss Bilder oder Videos für diese Tools nicht auf einen Server hochladen.',
        cont2: 'Geeignet für Screenshots, private Fotos, Dokumente, Tutorials, Produktbilder und schnelle Notizen mit mehr Privatsphäre.'
    },
    nav,
    editor,
    beautifier,
    rounded,
    remover,
    blurBackground,
    compressor,
    longImage,
    screenshot,
    videoConvert,
    convert,
    viewer
}
