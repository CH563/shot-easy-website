import { CONFIG } from './config.js';

const normalizePath = (path = '/') => {
    if (!path || path === '/') return '';
    return `/${path.replace(/^\/+|\/+$/g, '')}`;
};

export const getRelativeLocaleUrl = (locale = 'en', path = '/') => {
    const normalizedLocale = CONFIG.locals.find(item => item.toLowerCase() === String(locale).toLowerCase()) || 'en';
    const normalizedPath = normalizePath(path);
    const localizedPath = normalizedLocale === 'en' ? (normalizedPath || '/') : `/${normalizedLocale}${normalizedPath || '/'}`;
    return localizedPath.endsWith('/') ? localizedPath : `${localizedPath}/`;
};

// Internal links must not inherit the SSR proxy's request origin.
export const getLocaleSwitcherPath = (pathname = '/', targetLocale = 'en') => {
    const parts = pathname.split('/').filter(Boolean);
    if (CONFIG.locals.some(locale => locale.toLowerCase() === parts[0]?.toLowerCase())) {
        parts.shift();
    }
    return getRelativeLocaleUrl(targetLocale, parts.join('/'));
};
