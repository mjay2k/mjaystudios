"""Trace the LabraDon client logo into SVG lockups with potrace.

usage: python3 scripts/trace-labradon-logo.py   (needs: brew install potrace; pip pillow numpy)

Splits Black-and-white-logo.jpg into its four ink bands (mark, "LabraDon",
"PROPERTIES", "LLC"), traces each at 4x, then composes stacked, horizontal,
mark-only and wordmark layouts. Writes public/labradon/brand/logo-*.svg and the
inline-able src/app/labradon/_lab/logo-paths.ts.
"""
import json, re, subprocess, tempfile
import numpy as np
from PIL import Image, ImageFilter

SRC = 'public/labradon/assets/Black-and-white-logo.jpg'
S = 4
BANDS = {'mark': (154, 579), 'word': (612, 727), 'props': (765, 822), 'llc': (857, 899)}

im = Image.open(SRC).convert('L')
big = im.resize((im.width * S, im.height * S), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2))
P = {}
tmp = tempfile.mkdtemp()
for name, (y0, y1) in BANDS.items():
    pad = 6
    crop = big.crop((0, (y0 - pad) * S, big.width, (y1 + pad) * S))
    bw = crop.point(lambda v: 0 if v < 140 else 255).convert('1')
    pbm = f'{tmp}/{name}.pbm'
    bw.save(pbm)
    svg = subprocess.run(['potrace', pbm, '-s', '-o', '-', '--flat', '-t', '8', '-a', '1.0', '-O', '0.4', '-u', '10'],
                         capture_output=True, text=True, check=True).stdout
    m = re.search(r'<g transform="([^"]+)"[^>]*>\s*<path d="([^"]+)"', svg, re.S)
    ink = np.array(bw) == False
    ys, xs = np.where(ink.any(1))[0], np.where(ink.any(0))[0]
    P[name] = dict(tr=m.group(1), d=m.group(2), y0=y0 - pad,
                   bbox=(xs.min() / S, y0 - pad + ys.min() / S, xs.max() / S, y0 - pad + ys.max() / S))


def part(name, x, y, scale):
    p = P[name]
    inner = f'scale({1 / S}) translate(0,{p["y0"] * S}) {p["tr"]}'
    outer = f'translate({x - p["bbox"][0] * scale:.2f},{y - p["bbox"][1] * scale:.2f}) scale({scale:.4f})'
    return outer + ' ' + inner, p['d']


def size(name):
    b = P[name]['bbox']
    return b[2] - b[0], b[3] - b[1]


L = {}
pad = 4
b = [min(P[n]['bbox'][0] for n in P), min(P[n]['bbox'][1] for n in P),
     max(P[n]['bbox'][2] for n in P), max(P[n]['bbox'][3] for n in P)]
L['stacked'] = dict(vb=f'0 0 {b[2] - b[0] + 2 * pad:.1f} {b[3] - b[1] + 2 * pad:.1f}',
                    parts=[part(n, P[n]['bbox'][0] - b[0] + pad, P[n]['bbox'][1] - b[1] + pad, 1) for n in BANDS])
mw, mh = size('mark')
L['mark'] = dict(vb=f'0 0 {mw + 8:.1f} {mh + 8:.1f}', parts=[part('mark', 4, 4, 1)])
ww, wh = size('word'); pw, ph = size('props'); lw, lh = size('llc')
row_gap, llc_gap = 30, 38
text_h = wh + row_gap + ph
row_w = pw + llc_gap + lw
mark_h = text_h * 1.12
ms = mark_h / mh
tx, ty = mw * ms + 52, (mark_h - text_h) / 2
row_x = tx + (ww - row_w) / 2
L['horizontal'] = dict(vb=f'-4 -4 {tx + ww + 8:.1f} {mark_h + 8:.1f}', parts=[
    part('mark', 0, 0, ms), part('word', tx, ty, 1),
    part('props', row_x, ty + wh + row_gap, 1), part('llc', row_x + pw + llc_gap, ty + wh + row_gap + (ph - lh) / 2, 1)])
L['wordmark'] = dict(vb=f'-4 -4 {ww + 8:.1f} {text_h + 8:.1f}', parts=[
    part('word', 0, 0, 1), part('props', (ww - row_w) / 2, wh + row_gap, 1),
    part('llc', (ww - row_w) / 2 + pw + llc_gap, wh + row_gap + (ph - lh) / 2, 1)])

for k, v in L.items():
    paths = ''.join(f'<path transform="{t}" d="{d}"/>' for t, d in v['parts'])
    open(f'public/labradon/brand/logo-{k}.svg', 'w').write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{v["vb"]}" fill="#111">{paths}</svg>')

ts = ('// Generated from the client logo (Black-and-white-logo.jpg) with potrace.\n'
      '// Regenerate rather than hand-edit; see scripts/trace-labradon-logo.py.\n\n'
      'export type LogoPart = { transform: string; d: string };\n'
      'export type LogoLayout = { viewBox: string; parts: LogoPart[] };\n\n'
      "export const logoLayouts: Record<'stacked' | 'horizontal' | 'mark' | 'wordmark', LogoLayout> = {\n")
for k, v in L.items():
    ts += f'  {k}: {{\n    viewBox: {json.dumps(v["vb"])},\n    parts: [\n'
    for t, d in v['parts']:
        ts += f'      {{ transform: {json.dumps(t)}, d: {json.dumps(d)} }},\n'
    ts += '    ],\n  },\n'
ts += '};\n'
open('src/app/labradon/_lab/logo-paths.ts', 'w').write(ts)
print({k: v['vb'] for k, v in L.items()})
