import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));

await page.goto('http://localhost:3000/?v=monograph', { waitUntil: 'networkidle2' });
await page.waitForFunction(() => document.body.innerText.includes('Strategy you can'));
await page.waitForSelector('canvas');
await new Promise((r) => setTimeout(r, 4000));

// 1) hero with contain cards + lighter palette
await page.screenshot({ path: '/tmp/r-hero.png' });

// 2) marquee + capabilities (scroll down past hero)
await page.evaluate(() => window.scrollTo(0, window.innerHeight - 60));
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: '/tmp/r-marquee.png' });

// 3) hover a capability card → spotlight glow
const card = await page.evaluate(() => {
  const els = [...document.querySelectorAll('.mono-spot')];
  // pick the first capability card in view
  for (const e of els) {
    const r = e.getBoundingClientRect();
    if (r.top > 0 && r.top < window.innerHeight && r.width > 200) {
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
  }
  return null;
});
if (card) {
  await page.mouse.move(card.x - 40, card.y - 30);
  await page.mouse.move(card.x, card.y);
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: '/tmp/r-hover.png' });
}

console.log('spotlight card found:', !!card);
console.log('errors:', errors.length ? '\n' + errors.join('\n') : 'none');
await browser.close();
