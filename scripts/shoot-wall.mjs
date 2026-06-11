import puppeteer from 'puppeteer';

const URL = 'http://localhost:3000/?v=monograph';
const OUT = '/tmp';

const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--no-sandbox',
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console.error: ' + m.text());
});
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });

// wait for the monograph hero to mount (client sets version from ?v=)
await page.waitForFunction(
  () => document.body.innerText.includes('Strategy you can'),
  { timeout: 30000 }
);
await page.waitForSelector('canvas', { timeout: 30000 });

// shot right after canvas appears (catch any reflow)
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: `${OUT}/wall-early.png` });

// shot after textures decode + settle
await new Promise((r) => setTimeout(r, 3500));
await page.screenshot({ path: `${OUT}/wall-settled.png` });

// report canvas box + a drag test (does offset change tiles?)
const box = await page.evaluate(() => {
  const c = document.querySelector('canvas');
  const r = c.getBoundingClientRect();
  return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) };
});

// simulate a drag fling on the canvas
await page.mouse.move(box.x + box.w * 0.6, box.y + box.h * 0.5);
await page.mouse.down();
for (let i = 0; i < 12; i++) {
  await page.mouse.move(box.x + box.w * 0.6 - i * 18, box.y + box.h * 0.5 - i * 6);
  await new Promise((r) => setTimeout(r, 8));
}
await page.mouse.up();
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: `${OUT}/wall-after-drag.png` });

console.log('canvas box:', JSON.stringify(box));
console.log('errors:', errors.length ? '\n' + errors.join('\n') : 'none');

await browser.close();
