import { CONFIG } from './config.js';

const normalizePath = (path = '/') => {
    if (!path || path === '/') return '';
    return `/${path.replace(/^\/+|\/+$/g, '')}`;
};

export const getRelativeLocaleUrl = (locale = 'en', path = '/') => {
    const normalizedLocale = CONFIG.locals.find(item => item.toLowerCase() === String(locale).toLowerCase()) || 'en';
    const normalizedPath = normalizePath(path);
    return normalizedLocale === 'en' ? (normalizedPath || '/') : `/${normalizedLocale}${normalizedPath || '/'}`;
};
