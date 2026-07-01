import { defineMiddleware } from 'astro:middleware';
import { CONFIG } from './lib/config.js';

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const localizedBlogPattern = new RegExp(`^/(${CONFIG.locals.map(escapeRegExp).join('|')})/blog(?=$|/)`, 'i');

export const onRequest = defineMiddleware((context, next) => {
    const url = new URL(context.request.url);
    const localizedBlogMatch = url.pathname.match(localizedBlogPattern);
    if (localizedBlogMatch) {
        url.pathname = url.pathname.slice(localizedBlogMatch[1].length + 1) || '/blog';
        return context.redirect(url.toString(), 301);
    }
    if (url.pathname === '/in' || url.pathname.startsWith('/in/')) {
        url.pathname = url.pathname.replace(/^\/in(?=\/|$)/, '/en-in');
        return context.redirect(url.toString(), 301);
    }
    if (/^\/pt-br(?=\/|$)/i.test(url.pathname) && !url.pathname.startsWith('/pt-br')) {
        url.pathname = url.pathname.replace(/^\/pt-br(?=\/|$)/i, '/pt-br');
        return context.redirect(url.toString(), 301);
    }
    if (/^\/en-in(?=\/|$)/i.test(url.pathname) && !url.pathname.startsWith('/en-in')) {
        url.pathname = url.pathname.replace(/^\/en-in(?=\/|$)/i, '/en-in');
        return context.redirect(url.toString(), 301);
    }
    if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
        url.pathname += '/';
        return context.redirect(url.toString(), 301);
    }
    return next();
});
