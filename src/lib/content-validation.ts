import { stat } from 'node:fs/promises';
import path from 'node:path';

export const MAX_MEDIA_BYTES = 10 * 1024 * 1024;
export const PUBLISHED_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const ALLOWED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

export interface MarkdownImage {
  alt: string;
  source: string;
}

export interface PostForValidation {
  slug: string;
  description?: string;
  draft: boolean;
  cover?: string;
  body: string;
}

export function markdownImages(markdown: string): MarkdownImage[] {
  const images: MarkdownImage[] = [];
  const pattern = /!\[([^\]]*)\]\((?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\)/g;

  for (const match of markdown.matchAll(pattern)) {
    images.push({
      alt: (match[1] ?? '').trim(),
      source: (match[2] ?? match[3] ?? '').trim(),
    });
  }

  return images;
}

export function isRemoteImage(source: string): boolean {
  return /^(?:https?:)?\/\//i.test(source) || source.startsWith('data:');
}

export async function validateLocalImage(
  source: string,
  publicDirectory: string,
): Promise<string | undefined> {
  if (isRemoteImage(source)) return undefined;
  if (!source.startsWith('/')) {
    return `Local image must use an absolute site path: ${source}`;
  }

  const publicRoot = path.resolve(publicDirectory);
  const resolved = path.resolve(publicRoot, `.${source}`);
  if (resolved !== publicRoot && !resolved.startsWith(`${publicRoot}${path.sep}`)) {
    return `Local image escapes the public directory: ${source}`;
  }

  if (!ALLOWED_IMAGE_EXTENSIONS.has(path.extname(resolved).toLowerCase())) {
    return `Unsupported local image format: ${source}`;
  }

  try {
    const metadata = await stat(resolved);
    if (!metadata.isFile()) return `Local image is not a file: ${source}`;
    if (metadata.size > MAX_MEDIA_BYTES) return `Local image exceeds 10 MiB: ${source}`;
  } catch {
    return `Local image does not exist: ${source}`;
  }

  return undefined;
}

export async function validatePost(
  post: PostForValidation,
  publicDirectory: string,
): Promise<string[]> {
  const issues: string[] = [];
  const images = markdownImages(post.body);

  if (post.cover) {
    const coverIssue = await validateLocalImage(post.cover, publicDirectory);
    if (coverIssue) issues.push(coverIssue);
  }

  for (const image of images) {
    const imageIssue = await validateLocalImage(image.source, publicDirectory);
    if (imageIssue) issues.push(imageIssue);
  }

  if (post.draft) return issues;

  if (!PUBLISHED_SLUG.test(post.slug)) {
    issues.push('Published slug must be lowercase ASCII kebab-case.');
  }
  if (!post.description?.trim()) {
    issues.push('Published post requires a non-empty description.');
  }
  if (/^#(?!#)\s+\S/m.test(post.body)) {
    issues.push('Published post body must not contain a level-one heading.');
  }
  for (const image of images) {
    if (!image.alt) issues.push(`Published image requires alt text: ${image.source}`);
  }

  return issues;
}
