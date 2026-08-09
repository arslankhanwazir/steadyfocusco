// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// Canonical production URL. Used by @astrojs/sitemap and Open Graph tags.
// Update this to the custom domain once confirmed; the Cloudflare Pages
// preview (*.pages.dev) will still work regardless of this value.
const SITE_URL = process.env.SITE_URL || "https://steadyfocusco.com";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [react(), sitemap()],
});
