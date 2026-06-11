import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';
const OUT = '/tmp/mjay-shots';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: [
    '--no-sandbox',
    '--force-device-scale-factor=2',
    '--ignore-gpu-blocklist',
    '--enable-gpu-rasterization',
    '--enable-webgl',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const page = await browser.newPage();
const errs = [];
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
page.on('pageerror', (e) => errs.push('PAGEERR: ' + e.message));
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/?v=monograph', { waitUntil: 'networkidle2', timeout: 60000 });

const tag = process.env.TAG || 'hero';
// frames: settle, then around the first transition (~4.2s), then later
const stops = [4600,5200,5800,6400,7000,7600];
let prev = 0;
let i = 0;
for (const t of stops) {
  await new Promise((r) => setTimeout(r, t - prev));
  prev = t;
  await page.screenshot({ path: `${OUT}/${tag}-${i}.png`, clip: { x: 720, y: 0, width: 720, height: 900 } });
  i++;
}
console.log('hero frames done; console errors:', errs.length ? errs.slice(0, 8) : 'none');
await browser.close();
