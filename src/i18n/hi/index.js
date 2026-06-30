import nav from './nav';
import editor from './editor';
import beautifier from './beautifier';
import rounded from './rounded';
import remover from './remover';
import compressor from './compressor';
import longImage from './longImage';
import screenshot from './screenshot';
import videoConvert from './videoConvert';
import convert from './convert';
import viewer from './viewer';

export default {
    title: 'मुफ्त ऑनलाइन फोटो एडिटर',
    description: 'फोटो ऑनलाइन मुफ्त में एडिट करें, resize और filter करें, images को JPG/PNG/JPEG/WebP में convert करें, और selected area या full page screenshot लें.',
    keywords: 'ShotEasy, ऑनलाइन स्क्रीनशॉट, फोटो एडिट, फोटो कन्वर्टर, इमेज कन्वर्टर, ऑनलाइन एडिटर, इमेज फॉर्मेट ऑनलाइन कन्वर्ट, image to jpg, jpg to webp, jpg to png',
    privacy: 'Privacy',
    terms: 'Terms',
    blog: 'Blog',
    footerToolsTitle: 'मुख्य ShotEasy टूल्स',
    footerToolsIntro: 'Screenshot, image, video और browser-local tools के लिए quick links.',
    localProcessing: {
        title: 'Upload नहीं, local processing',
        cont1: 'आपकी files आपके browser में locally process होती हैं. इन tools के लिए ShotEasy images या videos को server पर upload नहीं करता.',
        cont2: 'इसे screenshots, private photos, documents, tutorials, product images और quick notes के लिए बेहतर privacy के साथ इस्तेमाल करें.'
    },
    nav,
    editor,
    beautifier,
    rounded,
    remover,
    compressor,
    longImage,
    screenshot,
    videoConvert,
    convert,
    viewer
}
