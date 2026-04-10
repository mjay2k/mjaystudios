/**
 * Pre-build script: reads content/projects/ markdown files and generates
 * src/data/projects.generated.json for the client-side app to import.
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

function discoverImages(era, projectId, hero) {
  const imageDir = era === 'agency' && projectId === 'logo-designs'
    ? path.join(PUBLIC_DIR, 'logos', projectId)
    : path.join(PUBLIC_DIR, era, projectId);

  if (!fs.existsSync(imageDir)) return [];

  const files = fs.readdirSync(imageDir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort();

  const urlBase = era === 'agency' && projectId === 'logo-designs'
    ? `/portfolio/logos/${projectId}`
    : `/portfolio/${era}/${projectId}`;

  let images = files.map((f) => `${urlBase}/${f}`);

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

  const images = discoverImages(era, projectId, data.hero || undefined);

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
