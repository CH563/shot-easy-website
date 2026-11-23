import { defineMiddleware } from 'astro:middleware';
import { CONFIG } from './lib/config.js';
import { getLocaleRedirect, isUnknownLocalePath } from './lib/localeGuard.js';

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const localizedBlogPattern = new RegExp(`^/(${CONFIG.locals.map(escapeRegExp).join('|')})/blog(?=$|/)`, 'i');

export const onRequest = defineMiddleware(async (context, next) => {
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
    // Unknown locale spellings and the sitemap alias get a single 301 to the
    // canonical address (/en -> /, /zh-cn/ -> /zh-CN/, /sitemap.xml ->
    // /sitemap-index.xml). Anything else unknown is not a redirect.
    // Paths starting with // are left to the trailing-slash rule below,
    // which collapses the leading slashes first.
    if (!url.pathname.startsWith('//')) {
        const localeRedirect = getLocaleRedirect(url.pathname);
        if (localeRedirect) {
            return context.redirect(`${localeRedirect}${url.search}`, 301);
        }
        // A multi-segment path under an unknown locale (e.g.
        // /pricing/take-a-screenshot/) only matched a [locale] page by
        // accident: render the branded 404 page with a 404 status instead
        // of the tool in English. Single-segment paths are decided by the
        // [locale] homepage.
        if (isUnknownLocalePath(url.pathname)) {
            const notFound = await context.rewrite('/404/');
            return new Response(await notFound.text(), {
                status: 404,
                headers: { 'content-type': notFound.headers.get('content-type') ?? 'text/html; charset=utf-8' }
            });
        }
    }
    // API routes are not pages: a POST to /api/remove-bg must reach the
    // handler, not 301 to the slashed URL (a fetch follows a 301 by
    // re-issuing as GET, which the endpoint rejects with 404).
    if (!url.pathname.endsWith('/') && !url.pathname.includes('.') && !url.pathname.startsWith('/api/')) {
        url.pathname += '/';
        return redirectToPath();
    }
    return next();
});
