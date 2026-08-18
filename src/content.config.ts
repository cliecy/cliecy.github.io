import { readdirSync } from 'node:fs';
import path from 'node:path';

import { defineCollection } from 'astro:content';
import { glob, type Loader } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(true),
      tags: z.array(z.string()).default([]),
      lang: z.enum(['en', 'ja', 'zh-CN']),
      cover: z.string().optional(),
    })
    .superRefine((post, context) => {
      if (!post.draft && !post.description?.trim()) {
        context.addIssue({
          code: 'custom',
          message: 'Published posts require a non-empty description.',
          path: ['description'],
        });
      }
    }),
});

const projectDirectory = path.resolve('./src/content/projects');
const projectGlob = glob({ base: projectDirectory, pattern: '**/*.md' });
const emptySafeProjectLoader: Loader = {
  name: 'empty-safe-project-glob',
  async load(context) {
    const hasProjectFiles = readdirSync(projectDirectory, { withFileTypes: true }).some(
      (entry) => entry.isFile() && entry.name.endsWith('.md'),
    );

    if (!hasProjectFiles) {
      context.store.clear();
      return;
    }

    await projectGlob.load(context);
  },
};

const projects = defineCollection({
  loader: emptySafeProjectLoader,
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    repositoryUrl: z.url().optional(),
    demoUrl: z.url().optional(),
  }),
});

const site = defineCollection({
  loader: glob({ base: './src/content/site', pattern: '*.md' }),
  schema: z.object({
    name: z.literal('CLIECY'),
    role: z.literal('Developer & Creator'),
    introduction: z.string().min(1),
    githubUrl: z.literal('https://github.com/cliecy'),
    seoDescription: z.string().min(1),
  }),
});

export const collections = { blog, projects, site };
