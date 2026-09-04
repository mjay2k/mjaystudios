// Screenshot the /kyd routes at phone + desktop widths.
// usage: node scripts/shoot-kyd.mjs [route-filter] [outdir]
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';

const filter = process.argv[2] ?? '';
const OUT = process.argv[3] ?? '/tmp/kyd-shots';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
});

const routes = [
  ['hub', '/kyd'],
  ['unapologetic', '/kyd/unapologetic'],
  ['front-porch', '/kyd/front-porch'],
  ['nashville', '/kyd/nashville'],
  ['music', '/kyd/music'],
  ['store', '/kyd/store'],
  ['product', '/kyd/store/camo-dom-shirt'],
  ['about', '/kyd/about'],
  ['book', '/kyd/book'],
].filter(([n]) => n.includes(filter));

async function shoot(name, path, w, h, tag) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:3000${path}`, { waitUntil: 'networkidle2', timeout: 90000 });
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollTo(0, y);
        y += 900;
        if (y > document.body.scrollHeight) { clearInterval(t); r(); }
      }, 50);
    });
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: `${OUT}/${name}-${tag}.png`, fullPage: true });
  await page.close();
  console.log(`${name}-${tag}.png`);
}

for (const [name, path] of routes) {
  await shoot(name, path, 390, 844, 'phone');
  await shoot(name, path, 1440, 900, 'desktop');
}
await browser.close();
