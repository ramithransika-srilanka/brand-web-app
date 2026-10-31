/* Screenshots every screen in screens.js to png/<id>.png:  node render.js */
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const dir = __dirname, out = path.join(dir, 'png'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.error('ERR', e.message));
  await p.goto('file://' + dir + '/screens.html');
  const ids = await p.evaluate(() => window.SCREEN_IDS);
  for (const id of ids) {
    await p.goto('file://' + dir + '/screens.html?s=' + id);
    await p.evaluate(() => document.fonts.ready);
    await p.addStyleTag({ content: '*{animation:none !important}' });
    await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(out, id + '.png'), fullPage: true });
    console.log(id);
  }
  await b.close();
})();
