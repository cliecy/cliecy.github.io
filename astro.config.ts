import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';

import { rehypeImageAttributes } from './src/lib/rehype-image-attributes';

export default defineConfig({
  site: 'https://cliecy.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeImageAttributes] }),
  },
  vite: { build: { cssMinify: 'lightningcss' } },
});
