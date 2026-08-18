import { readdir, rename, unlink } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const imageDirectory = path.resolve('dist/images');
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

async function filesBelow(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await filesBelow(entryPath)));
    if (entry.isFile() && supported.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }
  return files;
}

async function optimize(file) {
  const extension = path.extname(file).toLowerCase();
  const format = extension === '.jpg' ? 'jpeg' : extension.slice(1);
  const temporary = `${file}.optimized`;
  let pipeline = sharp(file)
    .rotate()
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true });

  if (format === 'jpeg') pipeline = pipeline.jpeg({ quality: 84, mozjpeg: true });
  if (format === 'png') pipeline = pipeline.png({ compressionLevel: 9 });
  if (format === 'webp') pipeline = pipeline.webp({ quality: 82 });
  if (format === 'avif') pipeline = pipeline.avif({ quality: 56, effort: 4 });

  await pipeline.toFile(temporary);
  await rename(temporary, file);
}

const files = await filesBelow(imageDirectory);
await Promise.all(files.map(optimize));
await Promise.all(
  ['dist/images/blog/.gitkeep', 'dist/images/projects/.gitkeep'].map((marker) =>
    unlink(marker).catch((error) => {
      if (error?.code !== 'ENOENT') throw error;
    }),
  ),
);
console.log(`Optimized ${files.length} image(s) in dist.`);
