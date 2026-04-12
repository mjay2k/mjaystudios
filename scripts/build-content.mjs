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

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content/projects');
const PUBLIC_DIR = path.join(ROOT, 'public/portfolio');
const OUTPUT_FILE = path.join(ROOT, 'src/data/projects.generated.json');

const ERAS = ['agency', 'berry', 'afterberry'];
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

/**
 * Sync images from content/projects/{era}/{id}/ to public/portfolio/{era}/{id}/
 * so Next.js can serve them. Returns the list of image filenames found.
 */
function syncAndDiscoverImages(era, projectId, hero) {
  const contentImageDir = path.join(CONTENT_DIR, era, projectId);
  const publicImageDir = path.join(PUBLIC_DIR, era, projectId);

  if (!fs.existsSync(contentImageDir)) return [];

  // Find all images in the content folder
  const files = fs.readdirSync(contentImageDir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) return [];

  // Ensure public dir exists and sync images
  fs.mkdirSync(publicImageDir, { recursive: true });
  for (const file of files) {
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

function parseProjectFile(filePath, era, projectId) {
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

  const images = syncAndDiscoverImages(era, projectId, data.hero || undefined);

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
    autoCycle: data.autoCycle,
    sortOrder: data.sortOrder,
    ...(caseStudy ? { caseStudy } : {}),
    ...(data.client ? { client: data.client } : {}),
    ...(data.link ? { link: data.link } : {}),
    ...(data.captions ? { captions: data.captions } : {}),
    ...(data.concept ? { concept: true } : {}),
  };
}

function loadAllProjects() {
  const projects = [];

  for (const era of ERAS) {
    const eraDir = path.join(CONTENT_DIR, era);
    if (!fs.existsSync(eraDir)) continue;

    const projectDirs = fs.readdirSync(eraDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const dir of projectDirs) {
      const mdPath = path.join(eraDir, dir.name, 'project.md');
      if (!fs.existsSync(mdPath)) continue;

      const project = parseProjectFile(mdPath, era, dir.name);
      if (project) projects.push(project);
    }
  }

  return projects;
}

// Run
const projects = loadAllProjects();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));
console.log(`Generated ${projects.length} projects → ${OUTPUT_FILE}`);
