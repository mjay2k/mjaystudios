// Scrapes jesusanoints.com into a structured dataset for the /jaministries preview.
//   text  -> src/data/ja/content.json
//   media -> public/jaministries/scraped/
//
// Usage: node scripts/scrape-ja.mjs
import puppeteer from 'puppeteer';
import { mkdirSync, writeFileSync, createWriteStream } from 'fs';
import { resolve } from 'path';
import https from 'https';
import http from 'http';

const ROOT = 'https://www.jesusanoints.com';
const DATA_DIR = resolve('src/data/ja');
const MEDIA_DIR = resolve('public/jaministries/scraped');
mkdirSync(DATA_DIR, { recursive: true });
mkdirSync(MEDIA_DIR, { recursive: true });

const CHROME =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
});

const sameHost = (href) => {
  try {
    const u = new URL(href, ROOT);
    return u.hostname.endsWith('jesusanoints.com');
  } catch {
    return false;
  }
};

const norm = (href) => {
  try {
    const u = new URL(href, ROOT);
    u.hash = '';
    return u.href.replace(/\/$/, '');
  } catch {
    return null;
  }
};

async function scrapePage(url) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  } catch (e) {
    console.warn('  ! goto failed:', url, e.message);
    await page.close();
    return null;
  }
  // Let lazy content settle.
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollTo(0, y);
        y += 800;
        if (y > document.body.scrollHeight) {
          clearInterval(t);
          r();
        }
      }, 100);
    });
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));

  const data = await page.evaluate(() => {
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const title = document.title;
    const metaDesc =
      document.querySelector('meta[name="description"]')?.content || '';
    // Visible text blocks
    const blocks = [];
    document
      .querySelectorAll('h1,h2,h3,h4,p,li,blockquote')
      .forEach((el) => {
        const tag = el.tagName.toLowerCase();
        const text = (el.innerText || '').replace(/\s+/g, ' ').trim();
        if (text && text.length > 1) blocks.push({ tag, text });
      });
    // Images
    const images = [];
    document.querySelectorAll('img').forEach((img) => {
      const src = img.currentSrc || img.src;
      if (src && /^https?:/.test(src))
        images.push({
          src,
          alt: clean(img.alt),
          w: img.naturalWidth,
          h: img.naturalHeight,
        });
    });
    // Links
    const links = [];
    document.querySelectorAll('a[href]').forEach((a) => {
      links.push({ href: a.href, text: clean(a.textContent) });
    });
    return { title, metaDesc, blocks, images, links };
  });

  await page.close();
  return data;
}

// 1. Crawl: start at root, gather same-host links, visit up to N pages.
const queue = [norm(ROOT)];
const visited = new Set();
const pages = {};
const MAX = 25;

while (queue.length && Object.keys(pages).length < MAX) {
  const url = queue.shift();
  if (!url || visited.has(url)) continue;
  visited.add(url);
  console.log('-> scraping', url);
  const data = await scrapePage(url);
  if (!data) continue;
  pages[url] = data;
  for (const l of data.links) {
    const n = norm(l.href);
    if (n && sameHost(n) && !visited.has(n) && !queue.includes(n)) {
      // Skip obvious asset / external-ish paths
      if (/\.(pdf|jpg|png|zip|mp4)$/i.test(n)) continue;
      queue.push(n);
    }
  }
}

// 2. Collect a deduped image manifest across all pages.
const imgMap = new Map();
for (const [url, d] of Object.entries(pages)) {
  for (const img of d.images) {
    if (!imgMap.has(img.src)) imgMap.set(img.src, { ...img, fromPage: url });
  }
}

// 3. Download the largest images (skip tiny icons / spacers).
function download(url, dest) {
  return new Promise((res) => {
    const lib = url.startsWith('https') ? https : http;
    const file = createWriteStream(dest);
    lib
      .get(url, (r) => {
        if (r.statusCode !== 200) {
          file.close();
          res(false);
          return;
        }
        r.pipe(file);
        file.on('finish', () => file.close(() => res(true)));
      })
      .on('error', () => {
        file.close();
        res(false);
      });
  });
}

const downloaded = [];
let i = 0;
for (const [src, meta] of imgMap) {
  if ((meta.w || 0) < 200 && (meta.h || 0) < 200) continue; // skip tiny
  const extMatch = src.split('?')[0].match(/\.(jpe?g|png|webp|gif|svg)$/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
  const name = `img-${String(i).padStart(3, '0')}.${ext}`;
  const ok = await download(src, resolve(MEDIA_DIR, name));
  if (ok) {
    downloaded.push({ file: `/jaministries/scraped/${name}`, ...meta });
    console.log('   saved', name, `${meta.w}x${meta.h}`, meta.alt || '');
    i++;
  }
}

// 4. Write the structured dataset.
const out = {
  scrapedAt: new Date().toISOString(),
  source: ROOT,
  pages,
  images: downloaded,
};
writeFileSync(resolve(DATA_DIR, 'content.json'), JSON.stringify(out, null, 2));
console.log(
  `\nDone. ${Object.keys(pages).length} pages, ${downloaded.length} images.`,
);

await browser.close();
