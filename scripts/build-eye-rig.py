"""Build the hero avatar eye-tracking layers (face with eye holes + iris sprites).
Usage: python scripts/build-eye-rig.py src/assets/mark-portrait.png src/assets/avatar <preview_dir>"""
import sys, math
from PIL import Image, ImageFilter, ImageDraw

src, out_dir, prev_dir = sys.argv[1:4]
im = Image.open(src).convert('RGBA')
W, H = im.size
px = im.load()

EYES = {
    'left':  dict(c=(345.5, 520), r=28, box=(270, 484, 404, 556)),
    'right': dict(c=(530.5, 520), r=28, box=(486, 488, 590, 554)),
}

def hull(points):
    pts = sorted(set(points))
    if len(pts) < 3: return pts
    def cross(o, a, b): return (a[0]-o[0])*(b[1]-o[1]) - (a[1]-o[1])*(b[0]-o[0])
    lower, upper = [], []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0: lower.pop()
        lower.append(p)
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0: upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]

hole = Image.new('L', (W, H), 0)
hp = hole.load()
draw = ImageDraw.Draw(hole)
for name, e in EYES.items():
    cx, cy = e['c']; r = e['r']; x0, y0, x1, y1 = e['box']
    ex, ey = (x0 + x1) / 2, (y0 + y1) / 2; ax, ay = (x1 - x0) / 2, (y1 - y0) / 2
    pts = []
    for y in range(y0, y1):
        for x in range(x0, x1):
            if ((x - ex) / ax) ** 2 + ((y - ey) / ay) ** 2 > 1:
                continue
            R, G, B, A = px[x, y]
            d = math.hypot(x - cx, y - cy)
            sclera = G > 125 and (R - B) < 65 and d > r + 1
            core = d <= r - 3
            if sclera or core:
                pts.append((x, y))
    draw.polygon(hull(pts), fill=255)
    # whole iris disk too, except eyeliner (dark, above) and lower-lid skin
    for y in range(int(cy - r - 2), int(cy + r + 3)):
        for x in range(int(cx - r - 2), int(cx + r + 3)):
            d = math.hypot(x - cx, y - cy)
            if d > r + 1.5: continue
            R, G, B, A = px[x, y]
            liner = max(R, G, B) < 100 and y < cy - 15
            skin = R > 150 and (R - B) >= 55
            if not liner and not skin:
                hp[x, y] = 255
hole = hole.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
hole = hole.filter(ImageFilter.MinFilter(3))  # pull 1px inside the lids
hole = hole.filter(ImageFilter.GaussianBlur(0.7))

# Front layer: original with eye openings made transparent
front = im.copy()
alpha = front.getchannel('A')
inv = Image.eval(hole, lambda v: 255 - v)
front.putalpha(Image.composite(Image.new('L', (W, H), 0), alpha, hole))
front.save(f'{out_dir}/face.webp', 'WEBP', quality=88, method=6)

# Iris sprites: circular crops of the original iris (with its highlight)
for name, e in EYES.items():
    cx, cy = e['c']; r = e['r'] + 2
    box = (int(cx - r), int(cy - r), int(cx + r), int(cy + r))
    sprite = im.crop(box)
    m = Image.new('L', sprite.size, 0)
    ImageDraw.Draw(m).ellipse((1, 1, sprite.size[0] - 2, sprite.size[1] - 2), fill=255)
    m = m.filter(ImageFilter.GaussianBlur(0.8))
    sprite.putalpha(m)
    sprite.save(f'{out_dir}/iris-{name}.webp', 'WEBP', quality=92, method=6)
    print(name, 'sprite box', box)

# ---------- Preview: composite the rig at several gaze offsets ----------
def sclera_layer():
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    for e in EYES.values():
        x0, y0, x1, y1 = e['box']
        g = Image.new('RGBA', (x1 - x0, y1 - y0))
        gp = g.load()
        for y in range(g.size[1]):
            for x in range(g.size[0]):
                nx = (x - g.size[0] / 2) / (g.size[0] / 2); ny = (y - g.size[1] / 2) / (g.size[1] / 2)
                t = min(1, math.hypot(nx, ny * 0.9))
                top = max(0, -ny) * 0.35  # upper-lid shadow
                k = 1 - 0.28 * t ** 2 - top
                gp[x, y] = (int(228 * k), int(214 * k), int(200 * k), 255)
        layer.paste(g, (x0, y0))
    return layer

face = Image.open(f'{out_dir}/face.webp').convert('RGBA')
sprites = {n: Image.open(f'{out_dir}/iris-{n}.webp').convert('RGBA') for n in EYES}
frames = []
for dx, dy in [(0, 0), (-8, 0), (8, 0), (0, -3), (6, 3)]:
    canvas = Image.new('RGBA', (W, H), (12, 12, 12, 255))
    canvas.alpha_composite(sclera_layer())
    for n, e in EYES.items():
        s = sprites[n]; cx, cy = e['c']
        canvas.alpha_composite(s, (int(cx - s.size[0] / 2 + dx), int(cy - s.size[1] / 2 + dy)))
    canvas.alpha_composite(face)
    frames.append(canvas.crop((240, 430, 640, 600)).resize((800, 340), Image.LANCZOS))
sheet = Image.new('RGB', (800, 340 * len(frames)))
for i, f in enumerate(frames):
    sheet.paste(f.convert('RGB'), (0, 340 * i))
sheet.save(f'{prev_dir}/preview.png')
ov = im.copy(); red = Image.new('RGBA',(W,H),(255,0,0,255)); ov = Image.composite(Image.blend(ov, red, 0.55), ov, hole)
ov.crop((240,430,640,600)).resize((1200,510),Image.LANCZOS).save(f'{prev_dir}/hole.png')
print('ok')
