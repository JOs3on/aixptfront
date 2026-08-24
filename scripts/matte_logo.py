#!/usr/bin/env python3
"""Remove the baked near-black background from logo2.png (the AIXPT mark).

Two passes:
1. Flood-fill from the image borders, removing all background pixels that are
   within `tol` (Manhattan RGB distance) of the border color. This cleans the
   main field AND interior gaps enclosed by the mark's strokes.
2. Luma-key on the remaining pixels so anti-aliased edges fade softly instead
   of carrying a gray halo.

Output: public/logo2-transparent.png (original file untouched).
"""
from collections import deque

import numpy as np
from PIL import Image

SRC = "public/logo2.png"
OUT = "public/logo2-transparent.png"
TOL = 70  # Manhattan RGB distance for flood-fill background detection
LUMA_BLACK = 34  # luminance below this => fully transparent
LUMA_WHITE = 190  # luminance above this => fully opaque

im = Image.open(SRC).convert("RGBA")
arr = np.array(im)
h, w = arr.shape[:2]
rgb = arr[:, :, :3].astype(int)

# Border color: sample the mean of the 4 corners
corners = np.array(
    [rgb[2, 2], rgb[2, w - 3], rgb[h - 3, 2], rgb[h - 3, w - 3]], dtype=int
)
bg = corners.mean(axis=0).astype(int)
print(f"background color: rgb{bg}")

# Flood fill
dist = np.abs(rgb - bg).sum(axis=2)
visited = np.zeros((h, w), dtype=bool)
q = deque()

def seed(y, x):
    if not visited[y, x] and dist[y, x] <= TOL:
        visited[y, x] = True
        q.append((y, x))

for x in range(w):
    seed(0, x)
    seed(h - 1, x)
for y in range(h):
    seed(y, 0)
    seed(y, w - 1)

while q:
    y, x = q.popleft()
    for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and dist[ny, nx] <= TOL:
            visited[ny, nx] = True
            q.append((ny, nx))

filled = int(visited.sum())
print(f"flood-filled background pixels: {filled} ({100*filled/(h*w):.1f}%)")

# Luma-key pass (soft anti-aliased edges + any unconnected dark pixels)
lum = (0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]).astype(float)
alpha = np.clip((lum - LUMA_BLACK) / (LUMA_WHITE - LUMA_BLACK), 0, 1)
alpha[visited] = 0  # flooded background -> fully transparent
arr[:, :, 3] = (alpha * 255).astype(np.uint8)

out = Image.fromarray(arr)
out.save(OUT)
print(f"saved {OUT} ({out.size})")

# Crop to the content bounding box (+ small padding) so the mark fills the
# frame instead of floating in a big square.
PAD = 10
a = np.array(out)[:, :, 3]
ys, xs = np.nonzero(a > 40)
if len(xs):
    x0, x1 = max(0, xs.min() - PAD), min(w, xs.max() + PAD)
    y0, y1 = max(0, ys.min() - PAD), min(h, ys.max() + PAD)
    out = out.crop((x0, y0, x1, y1))
    out.save(OUT)
    print(f"cropped to {out.size}")

# Quick verification
a = np.array(out)[:, :, 3]
transparent = (a == 0).sum()
print(f"transparent: {100*transparent/(out.size[0]*out.size[1]):.1f}%  fully-opaque: {100*(a==255).sum()/(out.size[0]*out.size[1]):.1f}%")
