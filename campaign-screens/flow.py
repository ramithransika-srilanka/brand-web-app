"""Builds campaign-flow.html: one self-contained file to click through the flow (screenshots from png/ embedded).
Run after render.js:  python3 flow.py"""
import base64, io, json, os
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__))
TYPES = {
  'a': ('Crunch Chicken', 'We’ll design it · Open campaign'),
  'b': ('Kandy opening', 'Hire an expert · Open campaign'),
  'c': ('Family Feast', 'We’ll design it · Invite only'),
}
STEPS = [  # (screen suffix, step number for the stepper, label)
  ('00-brand-page', 0, 'Brand page'), ('1-basics', 1, 'Basics'), ('2-design', 2, 'Design'), ('2-creators', 2, 'Creators'),
  ('3-budget', 3, 'Budget'), ('4-golive', 4, 'Go live'), ('4b-creator-view', 4, 'View as creator'), ('5-scheduled', 4, 'Scheduled'),
]
def img(name):
    im = Image.open(os.path.join(D, 'png', name + '.png')).convert('RGB')
    im = im.resize((1440, round(im.height * 1440 / im.width)), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, 'JPEG', quality=84, optimize=True, progressive=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode()
cache, flows = {}, {}
for k in TYPES:
    flows[k] = []
    for suf, n, label in STEPS:
        name = suf if suf.startswith('00') else k + suf
        if name not in cache: cache[name] = img(name)
        flows[k].append({'id': name, 'n': n, 'label': label})
html = '''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Create campaign — flow</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font:14px/20px -apple-system,'Inter',system-ui,sans-serif;background:#e9e9e9;color:#121212}
header{position:sticky;top:0;z-index:5;background:#121212;color:#fff;padding:10px 20px;display:flex;flex-wrap:wrap;gap:10px 24px;align-items:center}
header h1{font-size:15px;font-weight:600;margin-right:auto}
.types,.steps{display:flex;gap:6px;flex-wrap:wrap}
.types button{border:1px solid #444;background:none;color:#ddd;border-radius:100px;padding:6px 14px;font:inherit;cursor:pointer;text-align:left}
.types button small{display:block;font-size:11px;color:#999;line-height:14px}
.types button.on{background:#fff;color:#121212;border-color:#fff}
.types button.on small{color:#717171}
nav{position:sticky;top:var(--h,60px);z-index:4;background:#fff;border-bottom:1px solid #d9d9d9;padding:8px 20px;display:flex;align-items:center;gap:8px}
.steps button{border:0;background:#f1f1f1;border-radius:100px;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer;color:#414141}
.steps button b{font-weight:600;color:#1548eb;margin-right:4px}
.steps button.on{background:#1548eb;color:#fff}.steps button.on b{color:#fff}
.arrows{margin-left:auto;display:flex;gap:6px;align-items:center;color:#717171;font-size:12px}
.arrows button{width:34px;height:34px;border-radius:50%;border:1px solid #d9d9d9;background:#fff;cursor:pointer;font-size:16px}
main{display:flex;justify-content:center;padding:20px}
main img{display:block;width:100%;max-width:1440px;height:auto;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.12);background:#fff}
</style></head><body>
<header><h1>Create campaign · 4 steps</h1><div class="types" id="types"></div></header>
<nav><div class="steps" id="steps"></div><div class="arrows"><span>← →</span><button id="prev" aria-label="Previous">‹</button><button id="next" aria-label="Next">›</button></div></nav>
<main><img id="shot" alt=""></main>
<script>
const TYPES = ''' + json.dumps(TYPES, ensure_ascii=False) + ''';
const FLOWS = ''' + json.dumps(flows, ensure_ascii=False) + ''';
const IMG = ''' + json.dumps(cache) + ''';
let t = 'a', i = 0;
const $ = (id) => document.getElementById(id);
function draw(){
  $('types').innerHTML = Object.entries(TYPES).map(([k,[n,s]]) => `<button class="${k===t?'on':''}" data-t="${k}">${k.toUpperCase()} · ${n}<small>${s}</small></button>`).join('');
  $('steps').innerHTML = FLOWS[t].map((s,j) => `<button class="${j===i?'on':''}" data-i="${j}">${s.n?`<b>${s.n}</b>`:''}${s.label}</button>`).join('');
  $('shot').src = IMG[FLOWS[t][i].id]; $('shot').alt = FLOWS[t][i].label;
  location.hash = t + '/' + i;
  document.documentElement.style.setProperty('--h', document.querySelector('header').offsetHeight + 'px');
}
function go(j){ i = Math.max(0, Math.min(FLOWS[t].length - 1, j)); draw(); window.scrollTo(0, 0); }
$('types').onclick = (e) => { const b = e.target.closest('[data-t]'); if (b) { t = b.dataset.t; go(i); } };
$('steps').onclick = (e) => { const b = e.target.closest('[data-i]'); if (b) go(+b.dataset.i); };
$('prev').onclick = () => go(i - 1); $('next').onclick = () => go(i + 1);
addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); });
const m = location.hash.match(/^#([abc])\\/(\\d+)/); if (m) { t = m[1]; i = +m[2]; }
addEventListener('resize', draw); draw();
</script></body></html>'''
out = os.path.join(D, 'campaign-flow.html')
open(out, 'w').write(html)
print(out, round(os.path.getsize(out) / 1e6, 1), 'MB')
