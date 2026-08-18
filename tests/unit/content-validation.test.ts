import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  markdownImages,
  PUBLISHED_SLUG,
  validateLocalImage,
  validatePost,
} from '../../src/lib/content-validation';

describe('published post validation', () => {
  it('accepts a complete published post', async () => {
    const issues = await validatePost(
      {
        slug: 'valid-post',
        description: 'A complete summary.',
        draft: false,
        body: '## Section\n\n![A useful description](https://example.com/image.jpg)',
      },
      '/tmp/public-does-not-need-to-exist',
    );

    expect(issues).toEqual([]);
  });

  it('rejects invalid slugs, missing descriptions, h1s, and empty alt text', async () => {
    const issues = await validatePost(
      {
        slug: 'Invalid Slug',
        draft: false,
        body: '# Duplicate title\n\n![](https://example.com/image.jpg)',
      },
      '/tmp/public-does-not-need-to-exist',
    );

    expect(issues).toEqual([
      'Published slug must be lowercase ASCII kebab-case.',
      'Published post requires a non-empty description.',
      'Published post body must not contain a level-one heading.',
      'Published image requires alt text: https://example.com/image.jpg',
    ]);
  });

  it('allows draft editorial issues while still checking local references', async () => {
    const issues = await validatePost(
      {
        slug: 'Editorial Draft',
        draft: true,
        body: '# Working title\n\n![](https://example.com/image.jpg)',
      },
      '/tmp/public-does-not-need-to-exist',
    );

    expect(issues).toEqual([]);
  });

  it('enforces lowercase ASCII kebab-case', () => {
    expect(PUBLISHED_SLUG.test('a-stable-slug')).toBe(true);
    expect(PUBLISHED_SLUG.test('日本語')).toBe(false);
    expect(PUBLISHED_SLUG.test('Uppercase')).toBe(false);
  });
});

describe('image references', () => {
  it('extracts Markdown image alt text and source', () => {
    expect(markdownImages('![Alt](/images/blog/a.webp)')).toEqual([
      { alt: 'Alt', source: '/images/blog/a.webp' },
    ]);
  });

  it('checks that local media exists below public', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'cliecy-content-'));
    await mkdir(path.join(directory, 'images/blog'), { recursive: true });
    await writeFile(path.join(directory, 'images/blog/valid.png'), 'test');

    await expect(validateLocalImage('/images/blog/valid.png', directory)).resolves.toBeUndefined();
    await expect(validateLocalImage('/images/blog/missing.png', directory)).resolves.toContain(
      'does not exist',
    );
    await expect(validateLocalImage('../outside.png', directory)).resolves.toContain(
      'absolute site path',
    );
  });
});
