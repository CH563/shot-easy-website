import { CONFIG } from './config.js';

// Top-level URL prefixes that are real routes, not locale routes.
const NON_LOCALE_PREFIXES = ['api', 'blog'];

const splitPath = (pathname = '/') => String(pathname).split('/').filter(Boolean);

const canonicalLocale = (segment) => {
    if (!segment) return null;
    return CONFIG.locals.find((item) => item.toLowerCase() === String(segment).toLowerCase()) || null;
};

export const isKnownLocale = (segment) => CONFIG.locals.includes(segment);

// Redirect target (path only, without query) for locale/sitemap mistakes, or null.
// - /sitemap.xml -> /sitemap-index.xml (the real sitemap)
// - /en -> / (the English homepage lives at the root, /en/ is a duplicate)
// - a locale spelled with the wrong case -> its canonical spelling, rest kept
//   (/zh-cn/take-a-screenshot/ -> /zh-CN/take-a-screenshot/)
// Valid localized pages return null and render as usual.
export const getLocaleRedirect = (pathname = '/') => {
    const parts = splitPath(pathname);
    if (parts.length === 0) return null;
    const [first, ...rest] = parts;
    if (parts.length === 1 && first.toLowerCase() === 'sitemap.xml') return '/sitemap-index.xml';
    const canonical = canonicalLocale(first);
    if (!canonical) return null;
    if (canonical === 'en') {
        if (rest.length === 0) return '/';
        if (first !== 'en') return `/en/${rest.join('/')}/`;
        return null;
    }
    if (first !== canonical) return `/${canonical}${rest.length ? `/${rest.join('/')}` : ''}/`;
    return null;
};

// Multi-segment paths whose first segment is neither a known locale nor a
// real top-level route (api/blog) can only have matched a [locale] page by
// accident, so they are dead links (e.g. /foo/take-a-screenshot/).
// Single-segment paths are left alone: the [locale] homepage decides those.
export const isUnknownLocalePath = (pathname = '/') => {
    const parts = splitPath(pathname);
    if (parts.length < 2) return false;
    const [first] = parts;
    if (canonicalLocale(first)) return false;
    if (NON_LOCALE_PREFIXES.includes(first)) return false;
    return true;
};
