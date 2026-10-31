"""Builds one overview image per flow from png/<id>.png:  python3 overview.py"""
import glob, os
from PIL import Image, ImageDraw, ImageFont
D = os.path.dirname(os.path.abspath(__file__)); P = os.path.join(D, 'png')
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'; BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(p, s):
    try: return ImageFont.truetype(p, s)
    except OSError: return ImageFont.load_default()
FLOWS = {'self': ('a', 'Open campaign'), 'pick': ('c', 'Invite only')}
W, PAD, GAP, COLS = 720, 60, 40, 4
for key, (pre, name) in FLOWS.items():
    files = sorted(glob.glob(os.path.join(P, pre + '*.png')))
    thumbs = []
    for f in files:
        im = Image.open(f).convert('RGB'); h = int(im.height * W / im.width); thumbs.append((os.path.basename(f)[:-4], im.resize((W, h), Image.LANCZOS)))
    rows = [thumbs[i:i + COLS] for i in range(0, len(thumbs), COLS)]
    rh = [max(t.height for _, t in r) for r in rows]
    width = PAD * 2 + COLS * W + (COLS - 1) * GAP
    height = PAD + 110 + sum(h + 70 + GAP for h in rh) + PAD
    sheet = Image.new('RGB', (width, height), '#f6f6f6'); d = ImageDraw.Draw(sheet)
    d.text((PAD, PAD), f'Create campaign · {name}', fill='#121212', font=font(BOLD, 44))
    d.text((PAD, PAD + 58), f'{len(thumbs)} screens, left to right', fill='#717171', font=font(FONT, 24))
    y = PAD + 110
    for r, h in zip(rows, rh):
        for i, (sid, t) in enumerate(r):
            x = PAD + i * (W + GAP)
            d.text((x, y), f'{sid.split("-")[0].upper()} · {sid.split("-", 1)[1].replace("-", " ")}', fill='#1548eb', font=font(BOLD, 24))
            sheet.paste(t, (x, y + 40)); d.rectangle([x - 1, y + 39, x + W, y + 40 + t.height], outline='#d9d9d9')
        y += h + 70 + GAP
    sheet.save(os.path.join(P, f'overview-{key}.png'), optimize=True)
    print(key, sheet.size)
