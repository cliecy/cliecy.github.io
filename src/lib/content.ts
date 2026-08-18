import type { CollectionEntry } from 'astro:content';

export const languageLabels = {
  en: 'English',
  ja: '日本語',
  'zh-CN': '简体中文',
} as const;

export type BlogLanguage = keyof typeof languageLabels;

type DraftEntry = { data: { draft: boolean } };
type DatedEntry = DraftEntry & { data: { draft: boolean; pubDate: Date } };

export function publishedOnly<T extends DraftEntry>(entries: readonly T[]): T[] {
  return entries.filter((entry) => !entry.data.draft);
}

export function visibleEntries<T extends DraftEntry>(
  entries: readonly T[],
  development: boolean,
): T[] {
  return development ? [...entries] : publishedOnly(entries);
}

export function sortByNewest<T extends DatedEntry>(entries: readonly T[]): T[] {
  return [...entries].sort(
    (left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime(),
  );
}

export function entrySlug(id: string): string {
  return id.replace(/\.(?:md|mdx)$/i, '').replace(/^\/+|\/+$/g, '');
}

export function tagSlug(tag: string): string {
  return tag
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function collectLanguages(
  entries: readonly CollectionEntry<'blog'>[],
): BlogLanguage[] {
  const present = new Set(publishedOnly(entries).map((entry) => entry.data.lang));
  return (Object.keys(languageLabels) as BlogLanguage[]).filter((language) =>
    present.has(language),
  );
}

export interface TagFacet {
  label: string;
  slug: string;
  count: number;
}

export function collectTags(entries: readonly CollectionEntry<'blog'>[]): TagFacet[] {
  const tags = new Map<string, TagFacet>();

  for (const post of publishedOnly(entries)) {
    for (const label of post.data.tags) {
      const slug = tagSlug(label);
      if (!slug) continue;

      const existing = tags.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tags.set(slug, { label, slug, count: 1 });
      }
    }
  }

  return [...tags.values()].sort((left, right) =>
    left.label.localeCompare(right.label, 'en'),
  );
}

export function readingTimeMinutes(markdown: string): number {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|\-]+/g, ' ');

  const cjkCharacters = plainText.match(
    /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu,
  )?.length ?? 0;
  const withoutCjk = plainText.replace(
    /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu,
    ' ',
  );
  const words = withoutCjk.match(/[\p{Letter}\p{Number}]+(?:['’][\p{Letter}]+)*/gu)?.length ?? 0;

  return Math.max(1, Math.ceil(words / 200 + cjkCharacters / 400));
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export function navigationItems(hasPublicProjects: boolean): NavigationItem[] {
  const items: NavigationItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Writing', href: '/blog/' },
  ];

  if (hasPublicProjects) items.push({ label: 'Projects', href: '/projects/' });
  items.push({ label: 'GitHub', href: 'https://github.com/cliecy', external: true });
  return items;
}
