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
    title: 'ShotEasy - онлайн-інструменти для скриншотів і зображень',
    description: 'Безкоштовні онлайн-інструменти для України: скриншот онлайн, редактор фото, стиснення зображень, склейка довгих зображень, видалення фону та конвертація відео. Файли обробляються локально в браузері.',
    keywords: 'скриншот онлайн, зробити скриншот, редактор скриншотів онлайн, стиснути зображення онлайн, склеїти зображення онлайн, pdf у довге зображення, онлайн редактор фото Україна, screenshot online',
    privacy: 'Конфіденційність',
    terms: 'Умови',
    blog: 'Блог',
    footerToolsTitle: 'Основні інструменти ShotEasy',
    footerToolsIntro: 'Найважливіші сторінки для скриншотів, зображень і локальної обробки файлів.',
    localProcessing: {
        title: 'Без завантаження на сервер',
        cont1: 'Файли обробляються локально у вашому браузері. ShotEasy не потребує завантаження зображень або відео на сервер для цих інструментів.',
        cont2: 'Це зручно для робочих скриншотів, приватних фото, документів, інструкцій і швидкої підготовки матеріалів.'
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
};
