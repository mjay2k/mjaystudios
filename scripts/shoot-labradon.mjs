// Screenshot the /labradon routes at phone + desktop widths.
// usage: node scripts/shoot-labradon.mjs [route-filter] [outdir] [phone|desktop]
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';

const filter = process.argv[2] ?? '';
const OUT = process.argv[3] ?? '/tmp/labradon-shots';
const only = process.argv[4];
const BASE = process.env.BASE ?? 'http://localhost:3000';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox'],
});

const routes = [
  ['hub', '/labradon'],
  ['rr-home', '/labradon/rent-ready'],
  ['tf-home', '/labradon/the-finish'],
  ['rr-work', '/labradon/rent-ready/work'],
  ['tf-work', '/labradon/the-finish/work'],
  ['rr-services', '/labradon/rent-ready/services'],
  ['tf-services', '/labradon/the-finish/services'],
  ['rr-about', '/labradon/rent-ready/about'],
  ['tf-about', '/labradon/the-finish/about'],
  ['rr-request', '/labradon/rent-ready/request'],
  ['tf-request', '/labradon/the-finish/request?for=agent'],
  ['standard', '/labradon/standard'],
  ['partner', '/labradon/partner'],
  ['work', '/labradon/work'],
].filter(([n]) => n.includes(filter));

async function shoot(name, path, w, h, tag) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle2', timeout: 120000 });
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollTo(0, y);
        y += 700;
        if (y > document.body.scrollHeight) { clearInterval(t); r(); }
      }, 60);
    });
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 900));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: `${OUT}/${name}-${tag}.png`, fullPage: true });
  await page.close();
  console.log(`${name}-${tag}.png${overflow > 0 ? `  OVERFLOW ${overflow}px` : ''}`);
}

for (const [name, path] of routes) {
  if (only !== 'desktop') await shoot(name, path, 390, 844, 'phone');
  if (only !== 'phone') await shoot(name, path, 1440, 900, 'desktop');
}
await browser.close();
