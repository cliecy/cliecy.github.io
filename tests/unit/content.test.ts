import { describe, expect, it } from 'vitest';

import {
  collectLanguages,
  collectTags,
  entrySlug,
  navigationItems,
  publishedOnly,
  readingTimeMinutes,
  sortByNewest,
  tagSlug,
  visibleEntries,
} from '../../src/lib/content';

function post(
  id: string,
  draft: boolean,
  pubDate: string,
  lang: 'en' | 'ja' | 'zh-CN' = 'en',
  tags: string[] = [],
) {
  return {
    id,
    body: '',
    collection: 'blog' as const,
    data: {
      title: id,
      pubDate: new Date(`${pubDate}T00:00:00Z`),
      draft,
      lang,
      tags,
    },
  };
}

describe('content visibility and sorting', () => {
  const entries = [
    post('draft.md', true, '2026-01-03'),
    post('older.md', false, '2026-01-01'),
    post('newer.md', false, '2026-01-02'),
  ];

  it('filters drafts from public content', () => {
    expect(publishedOnly(entries).map((entry) => entry.id)).toEqual(['older.md', 'newer.md']);
  });

  it('shows drafts only when development is explicit', () => {
    expect(visibleEntries(entries, false)).toHaveLength(2);
    expect(visibleEntries(entries, true)).toHaveLength(3);
  });

  it('sorts posts newest first without mutating the input', () => {
    expect(sortByNewest(entries).map((entry) => entry.id)).toEqual([
      'draft.md',
      'newer.md',
      'older.md',
    ]);
    expect(entries[0]?.id).toBe('draft.md');
  });
});

describe('facets and route segments', () => {
  const entries = [
    post('english.md', false, '2026-01-01', 'en', ['Three.js', 'Design Systems']),
    post('japanese.md', false, '2026-01-02', 'ja', ['Three.js']),
    post('draft-chinese.md', true, '2026-01-03', 'zh-CN', ['Hidden']),
  ];

  it('builds language routes only from published languages', () => {
    expect(collectLanguages(entries)).toEqual(['en', 'ja']);
  });

  it('builds normalized tags with public counts only', () => {
    expect(collectTags(entries)).toEqual([
      { label: 'Design Systems', slug: 'design-systems', count: 1 },
      { label: 'Three.js', slug: 'three-js', count: 2 },
    ]);
    expect(tagSlug('  日本 語  ')).toBe('日本-語');
  });

  it('uses filenames as stable slugs', () => {
    expect(entrySlug('nested/my-post.md')).toBe('nested/my-post');
  });
});

describe('reading time', () => {
  it('uses English word count', () => {
    expect(readingTimeMinutes(Array.from({ length: 201 }, () => 'word').join(' '))).toBe(2);
  });

  it('uses CJK character count', () => {
    expect(readingTimeMinutes('文'.repeat(401))).toBe(2);
  });

  it('always reports at least one minute', () => {
    expect(readingTimeMinutes('Short note.')).toBe(1);
  });
});

describe('conditional navigation', () => {
  it('hides Projects when there are no public projects', () => {
    expect(navigationItems(false).map((item) => item.label)).toEqual([
      'Home',
      'Writing',
      'GitHub',
    ]);
  });

  it('adds Projects when public work exists', () => {
    expect(navigationItems(true).map((item) => item.label)).toContain('Projects');
  });
});
