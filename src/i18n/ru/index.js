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
    title: 'Скриншот онлайн и фоторедактор в браузере | ShotEasy',
    description:
        'Бесплатный онлайн-редактор фотографий, изменение размера и фильтрация любых фотографий, редактирование фото в браузере, конвертация изображений в jpg/png/jpeg/webp, легкое создание скриншотов области или всей страницы',
    keywords:
        'Shot Easy, easy shot, скриншот, редактор фото, конвертер фото, конвертер изображений, онлайн-редактор, изменение формата изображения онлайн, конвертация изображения в jpg, jpg в webp, jpg в png',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    blog: 'Блог',
    footerToolsTitle: 'Основные инструменты ShotEasy',
    footerToolsIntro: 'Быстрые ссылки на скриншоты, изображения, видео и локальную обработку в браузере.',
    localProcessing: {
        title: 'Без загрузки на сервер',
        cont1: 'Файлы обрабатываются локально в вашем браузере. ShotEasy не требует загрузки изображений или видео на сервер для этих инструментов.',
        cont2: 'Это удобно для рабочих скриншотов, приватных фото, документов, инструкций и быстрых заметок.'
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
