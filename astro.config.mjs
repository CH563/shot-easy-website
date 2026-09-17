import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import wasm from "vite-plugin-wasm";

import sitemap from "@astrojs/sitemap";
import { CONFIG, LANGUAGES_CODE } from "./src/lib/config";

const localizedPages = [
  '',
  'take-a-screenshot',
  'screenshot-beautifier',
  'image-compressor',
  'convert',
  'viewer',
  'doc-viewer',
  'ppt-viewer',
  'excel-viewer',
  'csv-viewer',
  'pdf-viewer',
  'ocr-pdf',
  'archive-viewer',
  'long-image',
  'video-convert',
  'background-remover',
  'blur-background-online',
  'photo-to-rounded',
  'privacy-policy',
  'terms-of-service'
];

const ruScreenshotClusterPages = [
  'kak-sdelat-skrinshot',
  'obrezat-skrinshot-online',
  'redaktor-skrinshotov-online'
];

const toAbsoluteUrl = (path) => new URL(path, CONFIG.website).toString();
const toLocalizedPath = (locale, page) => page ? `/${locale}/${page}/` : `/${locale}/`;
const sitemapCustomPages = [
  ...CONFIG.locals
    .filter((locale) => locale !== 'en')
    .flatMap((locale) => localizedPages.map((page) => toAbsoluteUrl(toLocalizedPath(locale, page)))),
  ...ruScreenshotClusterPages.map((page) => toAbsoluteUrl(`/ru/${page}/`))
];

// https://astro.build/config
export default defineConfig({
  site: CONFIG.website,
  trailingSlash: 'ignore',
  compressHTML: false,
  integrations: [tailwind(), react(), sitemap({
    customPages: sitemapCustomPages,
    // The existing localized privacy routes serve the same English policy.
    // Keep them accessible, but list only its canonical URL, without translations.
    filter: (page) => !page.endsWith('/privacy-policy/') || new URL(page).pathname === '/privacy-policy/',
    serialize: (item) => item.url.endsWith('/privacy-policy/') ? { ...item, links: [] } : item,
    i18n: {
      defaultLocale: "en",
      locales: LANGUAGES_CODE
    }
  })],
  output: "server",
  vite: {
    plugins: [wasm()]
  },
  adapter: vercel()
});
