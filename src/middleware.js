import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
    const url = new URL(context.request.url);
    if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
        url.pathname += '/';
        return context.redirect(url.toString(), 301);
    }
    return next();
});
