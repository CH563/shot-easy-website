import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://shoteasy.fun/',
  integrations: [tailwind(), react(), sitemap()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});