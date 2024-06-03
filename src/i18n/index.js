import { CONFIG } from '@lib/config';
import en from '@i18n/en/index';
import es from '@i18n/es/index';
import fr from '@i18n/fr/index';
import ja from '@i18n/ja/index';
import zhCn from '@i18n/zh-CN/index';

export const languages = {
    en,
    es,
    fr,
    ja,
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