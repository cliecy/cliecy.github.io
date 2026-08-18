import { readdir } from 'node:fs/promises';
import path from 'node:path';

import { getCollection, type CollectionEntry } from 'astro:content';

export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const directory = path.resolve('src/content/projects');
  const entries = await readdir(directory, { withFileTypes: true });
  const hasMarkdown = entries.some((entry) => entry.isFile() && entry.name.endsWith('.md'));

  return hasMarkdown ? getCollection('projects') : [];
}
