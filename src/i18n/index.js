import { CONFIG } from '@lib/config';
import en from '@i18n/en/index';
import es from '@i18n/es/index';
import fr from '@i18n/fr/index';
import ja from '@i18n/ja/index';
import inEn from '@i18n/in/index';
import vn from '@i18n/vn/index';
import ru from '@i18n/ru/index';
import zhCn from '@i18n/zh-CN/index';

export const languages = {
    en,
    es,
    fr,
    ja,
    in: inEn,
    vn,
    ru,
    'zh-CN': zhCn
}

export const getLocale = (locale) => {
    let defaultLang = 'en';
    if (!locale) return defaultLang;
    for (const item of CONFIG.locals) {
        if (item.toLocaleLowerCase() === locale.toLocaleLowerCase()) {
            return item;
        }
    }
    return defaultLang;
}

export const getLang = (locale) => {
    let defaultLang = 'en';
    if (!locale) return languages[defaultLang];
    for (const item of CONFIG.locals) {
        if (item.toLocaleLowerCase() === locale.toLocaleLowerCase()) {
            return languages[item];
            
        }
    }
    return languages[defaultLang];
}

export const getBrowserType = (userAgent) => {
    if (!userAgent) return 'Unknown';
    const browserRegexes = [
        { name: 'Edge', regex: /Edg\/(\d+)/ },
        { name: 'Chrome', regex: /Chrome\/(\d+)/ },
        { name: 'Safari', regex: /Safari\/(\d+)/ },
        { name: 'Firefox', regex: /Firefox\/(\d+)/ },
        { name: 'Opera', regex: /OPR\/(\d+)/ },
        { name: 'IE', regex: /Trident\/(\d+)/ },
    ];
    if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
        return 'Safari';
    }
    for (let i = 0; i < browserRegexes.length; i++) {
        const match = userAgent.match(browserRegexes[i].regex);
        if (match) {
            return browserRegexes[i].name;
        }
    }
    return 'Unknown';
}