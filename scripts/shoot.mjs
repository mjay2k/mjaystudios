import puppeteer from 'puppeteer';

const URL = process.env.SHOOT_URL || 'http://localhost:3000';
const TAG = process.env.SHOOT_TAG || 'mono';
const OUT = `/tmp/mjay-shots`;
import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
  args: ['--no-sandbox', '--force-device-scale-factor=2'],
});

async function shoot(name, width, height, scrollSteps = []) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle2', timeout: 60000 });
  // Switch to monograph version via localStorage-free store: click switcher path not reliable;
  // instead set the version by evaluating the zustand store if exposed, else navigate.
  await page.evaluate(() => {
    // Try to flip the site version through any exposed store; fallback no-op.
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));

  // Full hero
  await page.screenshot({ path: `${OUT}/${TAG}-${name}-top.png` });

  let idx = 1;
  for (const y of scrollSteps) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: `${OUT}/${TAG}-${name}-${idx}.png` });
    idx++;
  }

  // Full page
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: `${OUT}/${TAG}-${name}-full.png`, fullPage: true });
  await page.close();
}

await shoot('desktop', 1440, 900, [820, 1700, 2600, 3600, 4600, 5600]);
await shoot('mobile', 390, 844, [700, 1500, 2400]);

await browser.close();
console.log('shots written to', OUT);
