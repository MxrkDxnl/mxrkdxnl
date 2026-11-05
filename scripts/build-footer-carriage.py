"""Build the footer road + carriage sprite from the original 1920x1080 carriage video.

Outputs (in public/images/):
  footer-road.webp      clean fence/road strip (carriage removed), tiles horizontally
  footer-carriage.webp  animated carriage + horses galloping in place, transparent background

Usage: python scripts/build-footer-carriage.py <frames_dir> <preview_dir> [sprite_width]
  <frames_dir> must contain the video frames as f_001.png ..., cropped to the road band, e.g.
    ffmpeg -i video.mp4 -vf "crop=1920:336:0:408,scale=1211:212:flags=lanczos,format=rgb24" f_%03d.png
  (rows 408-744 of the 1080p source hold the full carriage, driver and whip, plus railing and deck)
Requires Pillow + numpy.
"""
import glob
import sys

import numpy as np
from PIL import Image

frames_dir, prev_dir = sys.argv[1:3]
SPRITE_W = int(sys.argv[3]) if len(sys.argv) > 3 else 720  # carriage + horses + a little dust
files = sorted(glob.glob(f'{frames_dir}/f_*.png'))
rgb = np.stack([np.asarray(Image.open(f).convert('RGB'), dtype=np.int16) for f in files])
gray = rgb.mean(axis=3)
N, H, W = gray.shape

# 1) Clean plate: per-pixel median over all frames (the carriage is only ever in a few)
plate_rgb = np.median(rgb, axis=0).astype(np.uint8)
plate_gray = plate_rgb.astype(np.int16).mean(axis=2)
Image.fromarray(plate_rgb).save('public/images/footer-road.webp', 'WEBP', quality=82, method=6)

# 2) Track the horses' nose (rightmost changed column) and fit straight-line motion
def nose_x(i):
    d = np.abs(gray[i] - plate_gray)
    cols = np.where((d > 40).sum(axis=0) > 3)[0]
    return cols.max() if len(cols) else None

idx = [i for i in range(N) if (x := nose_x(i)) is not None and SPRITE_W + 10 <= x <= W - 12]
xs = np.array([nose_x(i) for i in idx], dtype=float)
v, a = np.polyfit(np.array(idx, dtype=float), xs, 1)
print(f'frames usable {idx[0]}..{idx[-1]}, speed {v:.2f}px/frame')


def crop(i):
    right = int(round(a + v * i)) + 8
    left = right - SPRITE_W
    d = np.abs(gray[i, :, left:right] - plate_gray[:, left:right])
    alpha = np.clip((d - 16) * 7, 0, 255)
    # fade the trailing dust out over the sprite's left edge so it has no hard vertical cut
    ramp = np.clip(np.arange(SPRITE_W) / 110.0, 0, 1)
    alpha = (alpha * ramp[None, :]).astype(np.uint8)
    rgba = np.dstack([rgb[i, :, left:right].astype(np.uint8), alpha])
    return rgba


# 3) Choose a seamless loop: two frames ≥ 28 apart (about 2 strides) whose horses look most alike
crops = {i: crop(i) for i in idx}
best = None
for s in idx:
    for e in idx:
        if e - s < 28:
            continue
        # compare the horses only (top 120 rows, front 330px): their stride is the loop
        diff = np.abs(
            crops[s][10:120, -330:, :3].astype(int) - crops[e][10:120, -330:, :3].astype(int)
        ).mean()
        if best is None or diff < best[0]:
            best = (diff, s, e)
_, s, e = best
print(f'loop frames {s}..{e} ({e - s} frames, diff {best[0]:.2f})')

seq = [Image.fromarray(crops[i], 'RGBA') for i in range(s, e)]
seq[0].save(
    'public/images/footer-carriage.webp',
    'WEBP',
    save_all=True,
    append_images=seq[1:],
    duration=int(1000 / 24),
    loop=0,
    quality=70,
    method=6,
    lossless=False,
)
print('speed px/s at source scale:', round(v * 24, 1), 'sprite', SPRITE_W, 'x', H, 'road', W, 'x', H)

# 4) Preview: road tiled to 2 widths, sprite composited at 3 positions, then inverted like the site
road = Image.open('public/images/footer-road.webp').convert('RGB')
canvas = Image.new('RGB', (W * 2, H), 'white')
canvas.paste(road, (0, 0))
canvas.paste(road, (W, 0))
sprite = seq[len(seq) // 2]
for x in (-200, 900, 1900):
    canvas.paste(sprite, (x, 0), sprite)
from PIL import ImageOps

ImageOps.invert(canvas).resize((W, H // 2)).save(f'{prev_dir}/footer_preview.png')
print('ok')
