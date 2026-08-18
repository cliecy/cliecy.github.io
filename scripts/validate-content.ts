import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';

import {
  ALLOWED_IMAGE_EXTENSIONS,
  MAX_MEDIA_BYTES,
  validateLocalImage,
  validatePost,
} from '../src/lib/content-validation.ts';

const root = process.cwd();
const publicDirectory = path.join(root, 'public');

async function filesBelow(directory: string, extension?: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await filesBelow(entryPath, extension)));
    if (entry.isFile() && (!extension || entry.name.endsWith(extension))) files.push(entryPath);
  }

  return files;
}

async function validatePosts(): Promise<string[]> {
  const issues: string[] = [];
  const directory = path.join(root, 'src/content/blog');

  for (const file of await filesBelow(directory, '.md')) {
    const parsed = matter.read(file);
    const slug = path.relative(directory, file).replace(/\.md$/i, '').split(path.sep).join('/');
    const draft = parsed.data.draft;

    if (typeof draft !== 'boolean') {
      issues.push(`${path.relative(root, file)}: draft must be a boolean.`);
      continue;
    }

    const postIssues = await validatePost(
      {
        slug,
        draft,
        body: parsed.content,
        ...(typeof parsed.data.description === 'string' && {
          description: parsed.data.description,
        }),
        ...(typeof parsed.data.cover === 'string' && { cover: parsed.data.cover }),
      },
      publicDirectory,
    );

    issues.push(...postIssues.map((issue) => `${path.relative(root, file)}: ${issue}`));
  }

  return issues;
}

async function validateProjects(): Promise<string[]> {
  const issues: string[] = [];
  const directory = path.join(root, 'src/content/projects');

  for (const file of await filesBelow(directory, '.md')) {
    const parsed = matter.read(file);
    if (typeof parsed.data.image !== 'string') continue;
    const issue = await validateLocalImage(parsed.data.image, publicDirectory);
    if (issue) issues.push(`${path.relative(root, file)}: ${issue}`);
  }

  return issues;
}

async function validateMedia(): Promise<string[]> {
  const issues: string[] = [];

  for (const relativeDirectory of ['images/blog', 'images/projects']) {
    const directory = path.join(publicDirectory, relativeDirectory);
    for (const file of await filesBelow(directory)) {
      if (path.basename(file) === '.gitkeep') continue;
      const extension = path.extname(file).toLowerCase();
      if (!ALLOWED_IMAGE_EXTENSIONS.has(extension)) {
        issues.push(`${path.relative(root, file)}: unsupported media extension.`);
        continue;
      }
      if ((await stat(file)).size > MAX_MEDIA_BYTES) {
        issues.push(`${path.relative(root, file)}: media file exceeds 10 MiB.`);
      }
    }
  }

  return issues;
}

const issues = [
  ...(await validatePosts()),
  ...(await validateProjects()),
  ...(await validateMedia()),
];

if (issues.length > 0) {
  console.error(`Content validation failed with ${issues.length} issue(s):`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  console.log('Content validation passed.');
}
