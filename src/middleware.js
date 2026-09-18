import { defineMiddleware } from 'astro:middleware';
import { CONFIG } from './lib/config.js';

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const localizedBlogPattern = new RegExp(`^/(${CONFIG.locals.map(escapeRegExp).join('|')})/blog(?=$|/)`, 'i');

export const onRequest = defineMiddleware((context, next) => {
    const url = new URL(context.request.url);
    // Exactly one leading slash also prevents protocol-relative redirects.
    const redirectToPath = () => context.redirect(`/${url.pathname.replace(/^\/+/, '')}${url.search}`, 301);
    const localizedBlogMatch = url.pathname.match(localizedBlogPattern);
    if (localizedBlogMatch) {
        url.pathname = url.pathname.slice(localizedBlogMatch[1].length + 1) || '/blog';
        return redirectToPath();
    }
    if (url.pathname === '/in' || url.pathname.startsWith('/in/')) {
        url.pathname = url.pathname.replace(/^\/in(?=\/|$)/, '/en-in');
        return redirectToPath();
    }
    if (/^\/pt-br(?=\/|$)/i.test(url.pathname) && !url.pathname.startsWith('/pt-br')) {
        url.pathname = url.pathname.replace(/^\/pt-br(?=\/|$)/i, '/pt-br');
        return redirectToPath();
    }
    if (/^\/en-in(?=\/|$)/i.test(url.pathname) && !url.pathname.startsWith('/en-in')) {
        url.pathname = url.pathname.replace(/^\/en-in(?=\/|$)/i, '/en-in');
        return redirectToPath();
    }
    if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
        url.pathname += '/';
        return redirectToPath();
    }
    return next();
});
