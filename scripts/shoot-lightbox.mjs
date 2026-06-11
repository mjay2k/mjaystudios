import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

await page.goto('http://localhost:3000/?v=monograph', { waitUntil: 'networkidle2' });
await page.waitForFunction(() => document.body.innerText.includes('Strategy you can'));
await page.waitForSelector('canvas');
await new Promise((r) => setTimeout(r, 3500));

const box = await page.evaluate(() => {
  const r = document.querySelector('canvas').getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});

// open a project (pure click, no drag)
await page.mouse.click(box.x + box.w * 0.6, box.y + box.h * 0.45);
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: '/tmp/lb-open.png' });

// read counter "NN / NN" total
const total = await page.evaluate(() => {
  const m = document.body.innerText.match(/\b(\d{2})\s*\/\s*(\d{2})\b/);
  return m ? parseInt(m[2], 10) : 1;
});

// trigger liquid transition with arrow key
await page.keyboard.press('ArrowRight');
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: '/tmp/lb-mid.png' }); // mid-wipe
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: '/tmp/lb-after.png' }); // settled on next

// pointer ripple
await page.mouse.move(box.x + box.w * 0.5, box.y + box.h * 0.5);
for (let i = 0; i < 10; i++) {
  await page.mouse.move(720 + i * 12, 450 + Math.sin(i) * 30);
  await new Promise((r) => setTimeout(r, 12));
}
await page.screenshot({ path: '/tmp/lb-ripple.png' });

console.log('project image count:', total);
console.log('errors:', errors.length ? '\n' + errors.join('\n') : 'none');
await browser.close();
