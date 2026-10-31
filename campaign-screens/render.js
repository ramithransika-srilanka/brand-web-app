/* Screenshots every screen in screens.js to png/<id>.png:  node render.js [path-to-Polysocial-mobile]
   Step 2 (Creators) embeds the creator map from Polysocial-mobile (site/creator-map/celeste) unchanged,
   so its site/ folder is served on localhost:8765 while rendering. */
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs'), http = require('http');
const SITE = path.resolve(process.argv[2] || path.join(__dirname, '../../Polysocial-mobile'), 'site');
const TYPES = {'.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json', '.mp4': 'video/mp4'};
const server = http.createServer((req, res) => {
  let f = path.join(SITE, decodeURIComponent(req.url.split('?')[0]));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  else if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f += '.html';
  if (!f.startsWith(SITE) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, {'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream'});
  fs.createReadStream(f).pipe(res);
});
(async () => {
  if (!fs.existsSync(path.join(SITE, 'creator-map/celeste/index.html'))) throw new Error('Creator map not found under ' + SITE);
  await new Promise(r => server.listen(8765, r));
  const MAP = 'http://localhost:8765/creator-map/celeste';
  const dir = __dirname, out = path.join(dir, 'png'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  // Height of the map page at the width it gets inside step 2 (the 1128px content column)
  const m = await b.newPage({ viewport: { width: 1128, height: 900 } });
  await m.goto(MAP, { waitUntil: 'networkidle' }); await m.waitForTimeout(500);
  const mapH = await m.evaluate(() => document.documentElement.scrollHeight); await m.close();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  p.on('pageerror', e => console.error('ERR', e.message));
  await p.goto('file://' + dir + '/screens.html');
  const ids = await p.evaluate(() => window.SCREEN_IDS);
  for (const id of ids) {
    await p.goto(`file://${dir}/screens.html?s=${id}&map=${encodeURIComponent(MAP)}&mapH=${mapH}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.addStyleTag({ content: '*{animation:none !important}' });
    // Creator view: open the brand web app's own "View as creator" drawer, with this campaign's data
    const inject = await p.evaluate(() => window.CV_INJECT || null);
    if (inject) {
      const f = p.frames().find(fr => fr.url().includes('/brand-web-app/index.html'));
      await f.waitForFunction(() => typeof openCampaignDrawer === 'function');
      await f.evaluate(({ id, data, assets }) => {
        Object.assign(A, assets); C[id] = data;
        const st = document.createElement('style');
        st.textContent = 'html,body{background:transparent !important} body>*:not(#cdrawer){visibility:hidden !important} #cdrawer *{transition:none !important}';
        document.head.appendChild(st);
        openCampaignDrawer(id);
      }, inject);
    }
    // The map reveals its sections as they scroll into view, so show the whole page at once
    let h = await p.evaluate(() => document.documentElement.scrollHeight);
    if (inject) h = Math.max(h, 52 + await p.frames().find(fr => fr.url().includes('/brand-web-app/index.html')).evaluate(() => document.getElementById('cd-body').scrollHeight));
    await p.setViewportSize({ width: 1440, height: h });
    await p.waitForTimeout(id.includes('creators') ? 1500 : 150);
    await p.screenshot({ path: path.join(out, id + '.png'), fullPage: true });
    await p.setViewportSize({ width: 1440, height: 900 });
    console.log(id);
  }
  await b.close(); server.close();
})();
