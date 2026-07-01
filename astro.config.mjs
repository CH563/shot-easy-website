import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
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
  'archive-viewer',
  'long-image',
  'video-convert',
  'background-remover',
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
    i18n: {
      defaultLocale: "en",
      locales: LANGUAGES_CODE
    }
  })],
  output: "server",
  vite: {
    plugins: [wasm()]
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});
