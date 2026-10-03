// Build the LabraDon preview photo set from the client's originals.
// usage: node scripts/prepare-labradon-photos.mjs
//
// Sources live in public/labradon/assets/ (vercelignored, provenance in
// docs/labradon/asset-manifest.json). Output is web-ready WebP in
// public/labradon/photos/, named by what the photo shows. One mild grade is
// applied to every color photo so phone shots from different days sit together;
// "before" photos are kept in color here and turned grayscale in CSS.
import sharp from 'sharp';
import { mkdirSync } from 'fs';

const SRC = 'public/labradon/assets';
const OUT = 'public/labradon/photos';
mkdirSync(OUT, { recursive: true });

// [output slug, source file, options]
const photos = [
  // Chesapeake home turnover for Keyrenter PM of Hampton Roads
  ['chesapeake-living-before', 'IMG_7734.jpeg'],
  ['chesapeake-living-after', 'IMG_9813-full.jpeg'],
  ['chesapeake-bed1-before', 'IMG_7778-rotated.jpeg'],
  ['chesapeake-bed1-after', 'IMG_9808-rotated.jpeg'],
  ['chesapeake-bed2-before', 'IMG_7780.jpeg'],
  ['chesapeake-bed2-after', 'IMG_9796-rotated.jpeg'],
  ['chesapeake-bed3-before', 'IMG_7781-rotated.jpeg'],
  ['chesapeake-bed3-after', 'IMG_9812-rotated.jpeg'],
  ['chesapeake-bath-before', 'IMG_7768-rotated.jpeg'],
  ['chesapeake-bath-after', 'IMG_9807-rotated.jpeg'],
  ['chesapeake-hall-after', 'IMG_9814-rotated.jpeg'],
  // Five-day apartment turnover
  ['apt-living-before', 'Better-Entrance-After-2.jpeg'],
  ['apt-living-after', 'IMG_9568-rotated.jpeg'],
  ['apt-kitchen-before', 'IMG_8600-1-rotated.jpeg'],
  ['apt-kitchen-after', 'IMG_9584-1.jpeg'],
  ['apt-counter-before', 'IMG_8594-1-rotated.jpeg'],
  ['apt-counter-after', 'IMG_9581.jpeg'],
  ['apt-bed-before', 'IMG_8611-1-rotated.jpeg'],
  ['apt-bed-after', 'IMG_9572-rotated.jpeg'],
  ['apt-bath-after', 'IMG_9574-1-rotated.jpeg'],
  // Finished rooms from his turnover page
  ['kitchen-finished', 'IMG_0545-full.jpeg'],
  ['apartment-finished', 'APARTMENT-CLEAN-full.jpeg'],
  ['bedroom-finished', 'Master-bedroom-clean-full.jpeg'],
  // People
  ['seth-donnie-beach', 'IMG_3871.jpg'],
  ['donnie', 'IMG_4341.png', { crop: { left: 0, top: 492, width: 1179, height: 1560 } }],
  ['crew-painting', 'IMG_9299.jpg'],
  ['seth-crew', 'IMG_9297-rotated.jpeg'],
  ['seth-portrait', 'Seth-Cover.webp'],
];

for (const [slug, file, opts = {}] of photos) {
  let img = sharp(`${SRC}/${file}`).rotate();
  if (opts.crop) img = img.extract(opts.crop);
  const out = await img
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    // Gentle, shared grade: a touch of contrast and saturation, nothing stylized.
    .linear(1.06, -6)
    .modulate({ saturation: 1.04 })
    .webp({ quality: 82, effort: 5 })
    .toFile(`${OUT}/${slug}.webp`);
  console.log(`${slug}.webp ${out.width}x${out.height} ${Math.round(out.size / 1024)}KB`);
}
