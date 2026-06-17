import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';

const OUT = '/tmp/ja-shots';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--force-device-scale-factor=2'],
});

const routes = [
  ['chooser', '/jaministries'],
  ['living-water', '/jaministries/living-water'],
  ['anointed', '/jaministries/anointed'],
  ['the-evangelist', '/jaministries/the-evangelist'],
  ['sanctuary', '/jaministries/sanctuary'],
];

async function shoot(name, path, w, h, tag) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.goto(`http://localhost:3000${path}`, {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });
  // trigger any scroll/lazy reveals, then return to top
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const t = setInterval(() => {
        window.scrollTo(0, y);
        y += 900;
        if (y > document.body.scrollHeight) {
          clearInterval(t);
          r();
        }
      }, 60);
    });
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `${OUT}/${name}-${tag}-top.png` });
  await page.screenshot({ path: `${OUT}/${name}-${tag}-full.png`, fullPage: true });
  await page.close();
  console.log('shot', name, tag);
}

for (const [name, path] of routes) {
  await shoot(name, path, 1440, 900, 'desktop');
  await shoot(name, path, 390, 844, 'mobile');
}

await browser.close();
console.log('done ->', OUT);
