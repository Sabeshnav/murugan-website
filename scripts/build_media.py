#!/usr/bin/env python3
"""Build web-ready media in public/media from the raw files in ../Assets (or ./Assets).

Requirements: ffmpeg on PATH, Python 3 with Pillow + numpy + scipy.
  pip install pillow numpy scipy
Usage:  python3 scripts/build_media.py [path/to/Assets]

Scrubbed videos (hero, sooras, devas) are encoded ALL-INTRA (every frame a keyframe) so
scroll-scrubbing seeks instantly in both directions. Each also gets a 1280px "-sm"
variant for phones. Everything else is a normal web encode.
"""
import json, os, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = Path(__file__).resolve().parent.parent
ASSETS = Path(sys.argv[1]) if len(sys.argv) > 1 else next(
    p for p in [ROOT / "Assets", ROOT.parent / "Assets"] if p.exists())
OUT = ROOT / "public" / "media"
OUT.mkdir(parents=True, exist_ok=True)

def ff(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)

def scrub(src, name):
    for suffix, w, crf in (("", 1920, 24), ("-sm", 1280, 25)):
        ff("-i", ASSETS / src, "-an", "-vf", f"scale={w}:-2:flags=lanczos",
           "-c:v", "libx264", "-preset", "slow", "-crf", str(crf), "-g", "1", "-bf", "0",
           "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT / f"{name}{suffix}.mp4")
    poster(src, name)

def normal(src, name, w=1920, crf=24):
    ff("-i", ASSETS / src, "-an", "-vf", f"scale={w}:-2:flags=lanczos",
       "-c:v", "libx264", "-preset", "slow", "-crf", str(crf), "-g", "24",
       "-pix_fmt", "yuv420p", "-movflags", "+faststart", OUT / f"{name}.mp4")
    poster(src, name)

def poster(src, name, at="0"):
    ff("-ss", at, "-i", ASSETS / src, "-frames:v", "1", "-vf", "scale=1600:-2:flags=lanczos",
       "-c:v", "libwebp", "-quality", "80", OUT / f"{name}-poster.webp")

def webp(src, name, max_w=None, max_h=None, q=84, img=None):
    im = img if img is not None else Image.open(ASSETS / src)
    im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
    w, h = im.size
    s = min((max_w or w) / w, (max_h or h) / h, 1)
    if s < 1:
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    im.save(OUT / f"{name}.webp", "WEBP", quality=q, method=6)

# ---- white-background removal for the About Me panels (2.png, 3.png) ----
def cutout(src, keep_boxes, thr=232, defringe=10):
    im = np.array(Image.open(ASSETS / src).convert("RGB")).astype(np.float32)
    h, w, _ = im.shape
    mn = im.min(axis=2)
    lab, n = ndi.label(mn > thr)
    ids = set(np.unique(lab[0, :])) | set(np.unique(lab[:, 0])) | set(np.unique(lab[:, -1]))
    sizes = ndi.sum(np.ones_like(mn), lab, range(1, n + 1))
    means = ndi.mean(mn, lab, range(1, n + 1))
    coms = ndi.center_of_mass(np.ones_like(mn), lab, range(1, n + 1))
    for i in range(n):  # enclosed white pockets (gaps in hair) outside the garland/face
        if sizes[i] < 60 or means[i] < 247:
            continue
        r, c = coms[i][0] / h, coms[i][1] / w
        if any(x0 <= c <= x1 and y0 <= r <= y1 for x0, y0, x1, y1 in keep_boxes):
            continue
        ids.add(i + 1)
    ids.discard(0)
    bg = np.isin(lab, list(ids))
    band = ndi.binary_dilation(bg, iterations=4) & ~bg
    a = np.ones((h, w), np.float32)
    a[bg] = 0
    ca = np.clip(((255 - im) / 255).max(axis=2) / ((255 - thr) / 255), 0, 1)
    a[band] = ca[band]
    out = im.copy()
    m = band & (a > 0.01)
    for c in range(3):
        ch = out[:, :, c]
        ch[m] = np.clip((im[:, :, c][m] - 255 * (1 - a[m])) / a[m], 0, 255)
    # defringe: light, unsaturated pixels hugging the background are leftover white
    # halo between hair strands — fade them out too
    near = ndi.binary_dilation(bg, iterations=defringe) & ~bg
    sat = im.max(axis=2) - im.min(axis=2)
    halo = near & (mn > 165) & (sat < 34)
    ha = np.clip(((255 - im) / 255).max(axis=2) / ((255 - 165) / 255), 0, 1)
    a[halo] = np.minimum(a[halo], ha[halo])
    m2 = halo & (a > 0.01)
    for c in range(3):
        ch = out[:, :, c]
        ch[m2] = np.clip((im[:, :, c][m2] - 255 * (1 - a[m2])) / a[m2], 0, 255)
    a = ndi.gaussian_filter(a, 0.6)
    a[~ndi.binary_dilation(bg, iterations=max(6, defringe + 2))] = 1
    return Image.fromarray(np.dstack([out, a * 255]).astype(np.uint8), "RGBA")

def spear(src):
    """Crop the Vel out of 8.png (white background) as a transparent, tightly cropped image."""
    im = np.array(Image.open(ASSETS / src).convert("RGB")).astype(np.float32)
    mn = im.min(axis=2)
    lab, n = ndi.label(mn > 238)
    ids = set(np.unique(lab[0, :])) | set(np.unique(lab[:, 0])) | set(np.unique(lab[:, -1])) | set(np.unique(lab[-1, :]))
    ids.discard(0)
    bg = np.isin(lab, list(ids))
    # anything faint (the misty cloud wash) also counts as background
    bg |= (mn > 200) & ((im.max(axis=2) - mn) < 18)
    bg = ndi.binary_opening(bg, iterations=1)
    fg = ~bg
    lab2, n2 = ndi.label(fg)
    if n2:
        sizes = ndi.sum(fg, lab2, range(1, n2 + 1))
        fg = lab2 == (int(np.argmax(sizes)) + 1)  # keep the Vel only
        fg = ndi.binary_fill_holes(fg)
    a = ndi.gaussian_filter(fg.astype(np.float32), 0.8)
    ys, xs = np.where(fg)
    pad = 12
    y0, y1, x0, x1 = max(0, ys.min() - pad), ys.max() + pad, max(0, xs.min() - pad), xs.max() + pad
    rgba = np.dstack([im, a * 255]).astype(np.uint8)[y0:y1, x0:x1]
    return Image.fromarray(rgba, "RGBA")

def avatar(src, name, cx, cy, size):
    im = Image.open(ASSETS / src).convert("RGB")
    W, H = im.size
    S = int(W * size)
    x, y = int(W * cx - S / 2), int(H * cy - S / 2)
    im.crop((x, y, x + S, y + S)).resize((480, 480), Image.LANCZOS).save(
        OUT / f"{name}.webp", "WEBP", quality=86, method=6)

if __name__ == "__main__":
    only = set(os.environ.get("ONLY", "").split(",")) - {""}
    def want(k): return not only or k in only
    if want("video"):
        scrub("1.mp4", "hero")
        scrub("2.mp4", "sooras")
        scrub("3.mp4", "devas")
        for i in range(4, 9):  # Swamimalai clips are scroll-scrubbed too
            scrub(f"{i}.mp4", f"swami-{i - 3}")
        normal("10.mp4", "contact")
        normal("11.mp4", "about-calm", w=1600, crf=26)
        normal("12.mp4", "about-wrath", w=1600, crf=26)
    if want("images"):
        webp("1.png", "about-1", max_h=2000)
        webp(None, "about-2", max_w=1400, img=cutout("2.png", [[.28, .44, .66, 1], [.40, .12, .66, .45]]))
        webp(None, "about-3", max_w=1024, img=cutout("3.png", [[.27, .44, .68, 1], [.40, .15, .66, .45]]))
        webp("4.png", "skills-bg", max_w=2400, q=82)
        webp(None, "finale-spear", max_h=1800, q=88, img=spear("8.png"))
        avatar("7a.png", "review-shiva", .5, .37, .85)
        avatar("7b.png", "review-tamil", .5, .47, 1.0)
        avatar("7c.png", "review-brahma", .5, .40, 1.0)
    print(json.dumps(sorted(p.name for p in OUT.iterdir())))
