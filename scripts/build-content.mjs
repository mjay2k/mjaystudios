/**
 * Pre-build script: reads content/projects/ markdown files and images,
 * syncs images to public/portfolio/ for serving, and generates
 * src/data/projects.generated.json for the client-side app.
 *
 * Run: node scripts/build-content.mjs
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sharp from 'sharp';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content/projects');
const PUBLIC_DIR = path.join(ROOT, 'public/portfolio');
const OUTPUT_FILE = path.join(ROOT, 'src/data/projects.generated.json');

const ERAS = ['agency', 'berry', 'afterberry'];
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const SYNC_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.pdf']);

/**
 * Sync images from content/projects/{era}/{id}/ to public/portfolio/{era}/{id}/
 * so Next.js can serve them. Returns the list of image filenames found.
 */
function syncAndDiscoverImages(era, projectId, hero) {
  const contentImageDir = path.join(CONTENT_DIR, era, projectId);
  const publicImageDir = path.join(PUBLIC_DIR, era, projectId);

  if (!fs.existsSync(contentImageDir)) return [];

  // Find all images in the content folder (sync PDFs too but only return images)
  const allFiles = fs.readdirSync(contentImageDir)
    .filter((f) => SYNC_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort();
  const files = allFiles.filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));

  if (allFiles.length === 0) return [];

  // Ensure public dir exists and sync all files (images + PDFs)
  fs.mkdirSync(publicImageDir, { recursive: true });
  for (const file of allFiles) {
    const src = path.join(contentImageDir, file);
    const dest = path.join(publicImageDir, file);
    // Only copy if source is newer or dest doesn't exist
    if (!fs.existsSync(dest) || fs.statSync(src).mtimeMs > fs.statSync(dest).mtimeMs) {
      fs.copyFileSync(src, dest);
    }
  }

  // Build public URL paths
  const urlBase = `/portfolio/${era}/${projectId}`;
  let images = files.map((f) => `${urlBase}/${f}`);

  // If hero is specified, move it to front
  if (hero) {
    const heroIndex = images.findIndex((img) => img.endsWith(hero));
    if (heroIndex > 0) {
      const [heroImg] = images.splice(heroIndex, 1);
      images.unshift(heroImg);
    }
  }

  return images;
}

/**
 * Resolve caption/imageLink keys from filenames to full URL paths.
 * If key already starts with /, leave it. Otherwise prepend urlBase.
 */
function resolveKeys(obj, urlBase) {
  const resolved = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = key.startsWith('/') ? key : `${urlBase}/${key}`;
    resolved[fullKey] = value;
  }
  return resolved;
}

/** Real pixel dimensions of a public image URL (for natural-aspect layout). */
async function imageSize(urlPath) {
  try {
    const file = path.join(ROOT, 'public', urlPath);
    const m = await sharp(file).metadata();
    if (m.width && m.height) return { w: m.width, h: m.height };
  } catch {
    /* non-fatal — gallery falls back to a default aspect */
  }
  return null;
}

async function parseProjectFile(filePath, era, projectId) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  if (data.draft) return null;

  // Split body content by ---extended--- and ---process--- delimiters
  const parts = content.split(/^---(\w+)---$/m);
  const description = parts[0].trim();

  let extendedDescription = '';
  let processNotes = '';

  for (let i = 1; i < parts.length; i += 2) {
    const key = parts[i];
    const value = (parts[i + 1] || '').trim();
    if (key === 'extended') extendedDescription = value;
    if (key === 'process') processNotes = value;
  }

  const urlBase = `/portfolio/${era}/${projectId}`;
  const images = syncAndDiscoverImages(era, projectId, data.hero || undefined);
  const cover = images[0] ? await imageSize(images[0]) : null;

  let caseStudy = undefined;
  if (extendedDescription) {
    caseStudy = {
      extendedDescription,
      additionalImages: [],
      ...(processNotes ? { processNotes } : {}),
    };
  }

  return {
    id: projectId,
    title: data.title,
    description,
    year: data.year,
    era,
    categories: data.categories,
    images,
    ...(cover ? { coverW: cover.w, coverH: cover.h } : {}),
    autoCycle: data.autoCycle,
    sortOrder: data.sortOrder,
    ...(caseStudy ? { caseStudy } : {}),
    ...(data.client ? { client: data.client } : {}),
    ...(data.link ? { link: data.link } : {}),
    ...(data.captions ? { captions: resolveKeys(data.captions, urlBase) } : {}),
    ...(data.concept ? { concept: true } : {}),
    ...(data.compact ? { compact: true } : {}),
    ...(data.wide ? { wide: true } : {}),
    ...(data.imageLinks ? { imageLinks: resolveKeys(data.imageLinks, urlBase) } : {}),
    ...(Array.isArray(data.multiLinks) ? { multiLinks: data.multiLinks } : {}),
  };
}

async function loadAllProjects() {
  const projects = [];

  for (const era of ERAS) {
    const eraDir = path.join(CONTENT_DIR, era);
    if (!fs.existsSync(eraDir)) continue;

    const projectDirs = fs.readdirSync(eraDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const dir of projectDirs) {
      const mdPath = path.join(eraDir, dir.name, 'project.md');
      if (!fs.existsSync(mdPath)) continue;

      const project = await parseProjectFile(mdPath, era, dir.name);
      if (project) projects.push(project);
    }
  }

  return projects;
}

/**
 * Generate small webp thumbnails for every project image. The hero wall
 * renders tiles at ~300px, so feeding it the full-res sources (~43MB total)
 * is wasted bandwidth and causes texture-minification aliasing.
 */
const THUMB_DIR = path.join(ROOT, 'public/portfolio-thumbs');
const THUMB_WIDTH = 640;

async function generateThumbs(projects) {
  let made = 0;
  let total = 0;
  for (const p of projects) {
    const imgs = [...(p.images || []), ...(p.caseStudy?.additionalImages || [])];
    for (const url of imgs) {
      total++;
      const src = path.join(ROOT, 'public', url);
      if (!fs.existsSync(src)) continue;
      const rel = url.replace(/^\/portfolio\//, '');
      const dest = path
        .join(THUMB_DIR, rel)
        .replace(/\.(jpe?g|png|webp|avif)$/i, '.webp');
      if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs >= fs.statSync(src).mtimeMs) continue;
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      await sharp(src)
        .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
        .webp({ quality: 72 })
        .toFile(dest);
      made++;
    }
  }
  console.log(`Thumbnails: ${made} generated, ${total} total → public/portfolio-thumbs`);
}

// Run
const projects = await loadAllProjects();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));
await generateThumbs(projects);
console.log(`Generated ${projects.length} projects → ${OUTPUT_FILE}`);
