import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';

const source = new URL('../public/labradon/assets/', import.meta.url);
const dest = new URL('../public/labradon/images/', import.meta.url);
await mkdir(dest, { recursive: true });
for (const file of await readdir(source)) {
  if (!/\.(jpg|jpeg|png|webp)$/.test(file)) continue;
  await sharp(new URL(file, source).pathname).rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(new URL(file.replace(/\.[^.]+$/, '.webp'), dest).pathname);
}
console.log('Prepared optimized Labradon images; originals retained.');
