import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

import { entrySlug, publishedOnly, sortByNewest } from '../lib/content';

export async function GET(context: { site: URL }) {
  const posts = sortByNewest(publishedOnly(await getCollection('blog')));

  return rss({
    title: 'CLIECY Writing',
    description: 'Notes and essays from CLIECY across code, design, and the evolving web.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: post.data.pubDate,
      link: `/blog/${entrySlug(post.id)}/`,
      categories: post.data.tags,
      customData: `<language>${post.data.lang}</language>`,
    })),
  });
}
