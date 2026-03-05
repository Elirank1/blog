import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';

export default defineConfig({
  site: 'https://elirank1.github.io',
  base: '/blog',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkCollapse, { test: 'Table of Contents' }],
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
