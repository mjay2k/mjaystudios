"""Archive the public client assets, preserving URLs in a local manifest."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import json
import subprocess
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/labradon/assets'
OUT.mkdir(parents=True, exist_ok=True)
paths = '''2026/04/Black-and-white-logo.jpg
2026/06/IMG_8600-1-rotated.jpeg
2026/06/IMG_9584-1.jpeg
2026/06/IMG_8594-1-rotated.jpeg
2026/06/IMG_9581.jpeg
2026/06/Better-Entrance-After-2.jpeg
2026/06/IMG_9568-rotated.jpeg
2026/06/IMG_8611-1-rotated.jpeg
2026/06/IMG_9572-rotated.jpeg
2026/06/IMG_7778-rotated.jpeg
2026/06/IMG_9808-768x1024.jpeg
2026/06/IMG_7780-1.jpeg
2026/06/IMG_9796-768x1024.jpeg
2026/06/IMG_7781-rotated.jpeg
2026/06/IMG_9812-768x1024.jpeg
2026/06/IMG_7734.jpeg
2026/06/IMG_9813-1024x768.jpeg
2026/06/IMG_9814-768x1024.jpeg
2026/06/IMG_7768-rotated.jpeg
2026/06/IMG_9807-768x1024.jpeg
2026/06/IMG_9297-1-rotated.jpeg
2025/11/Seth-Cover.webp
2026/01/IMG_3871.webp
2026/04/Collage-for-Services-Page.png
2026/01/Rent-Read.png
2026/05/C306D6D5-AC3F-4180-AE42-B6606158DF15-1.png
2026/01/APARTMENT-CLEAN-scaled.jpeg
2026/01/Master-bedroom-clean-1-1024x768.jpeg
2026/01/721F1D2D-DEEE-4758-8853-843674566884.jpg
2026/01/IMG_0545-scaled.jpeg
2026/01/ChatGPT-Image-Jan-20-2026-10_36_30-PM.png
2026/01/ChatGPT-Image-Jan-22-2026-07_40_25-PM.png'''.splitlines()
snapshots = ROOT / 'docs/labradon/source-content.json'
if snapshots.exists():
    for page in json.loads(snapshots.read_text()):
        for url in page['images']:
            path = unquote(urlsplit(url).path).split('/wp-content/uploads/')[-1]
            if path not in paths:
                paths.append(path)

def collect(path):
    url = 'https://i0.wp.com/labradonllc.com/wp-content/uploads/' + path + '?ssl=1'
    target = OUT / Path(path).name
    if target.exists() and target.stat().st_size:
        return {'file': target.name, 'url': url, 'ok': True, 'error': None}
    result = subprocess.run(['curl', '-L', '--fail', '--silent', '--show-error', url, '-o', str(target)], capture_output=True, text=True)
    return {'file': target.name, 'url': url, 'ok': result.returncode == 0, 'error': result.stderr if result.returncode else None}

with ThreadPoolExecutor(max_workers=6) as pool:
    results = list(pool.map(collect, paths))
(ROOT / 'docs/labradon').mkdir(parents=True, exist_ok=True)
(ROOT / 'docs/labradon/asset-manifest.json').write_text(json.dumps(results, indent=2))
print(f"Downloaded {sum(r['ok'] for r in results)}/{len(results)} assets")
for r in results:
    if not r['ok']:
        print(r['file'], r['error'])
