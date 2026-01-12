// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";

import { APP_LOCALES, DEFAULT_LOCALE } from "./src/i18n/constants";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    AstroPWA({
      mode: "production",
      base: "/",
      scope: "/",
      includeAssets: ["favicon.png"],
      registerType: "autoUpdate",
      manifest: {
        name: "Coldtivate Knowledge Hub",
        short_name: "Coldtivate KH",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        description: "Knowledge Hub for Coldtivate",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/",
        runtimeCaching: [
          {
            urlPattern: /\.(?:css|js|html|svg|png|ico|txt|avif)$/,
            handler: "StaleWhileRevalidate",
          },
        ],
        maximumFileSizeToCacheInBytes: 128 * 1024 * 1024,
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: Object.values(APP_LOCALES),
  },
  base: "/",
  output: "static",
});
