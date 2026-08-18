import { describe, expect, it } from 'vitest';

import { rehypeImageAttributes } from '../../src/lib/rehype-image-attributes';

describe('Markdown image rendering', () => {
  it('adds lazy loading and async decoding to rendered body images', () => {
    const image = {
      type: 'element',
      tagName: 'img',
      properties: { src: '/images/blog/example.webp', alt: 'Example' },
      children: [],
    };
    const tree = { type: 'root', children: [{ type: 'element', tagName: 'p', children: [image] }] };

    rehypeImageAttributes()(tree);

    expect(image.properties).toMatchObject({
      src: '/images/blog/example.webp',
      alt: 'Example',
      loading: 'lazy',
      decoding: 'async',
    });
  });
});
