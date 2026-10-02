# Murugan — Portfolio

An immersive, scroll-driven portfolio website for Lord Murugan, following Tamil tradition. Painterly AI-generated scenes play as you scroll: his projects (Soorasamharam, Leading the Devas, the Swamimalai incident), who he is, his skills, what others say of him, and how to reach him.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site → ./out (host anywhere)
```

## Stack

Next.js (App Router, static export) · GSAP + ScrollTrigger · Framer Motion · Lenis · Tailwind CSS v4.
Fonts are self-hosted in `app/fonts/` (Cinzel, EB Garamond, Noto Serif Tamil, Roboto, all under the SIL Open Font License).

## Project layout

| Path | What's there |
|---|---|
| `app/page.tsx` | Section order |
| `components/sections/` | One file per section |
| `components/` | Navbar, progress tracker, title reveals, buttons, speech bubbles |
| `lib/content.ts` | All on-site text |
| `public/media/` | Web-ready video and images |
| `Assets/` | Original source images and videos |
| `scripts/build_media.py` | Rebuilds `public/media` from `Assets/` (`npm run media`, needs ffmpeg + Python with Pillow, numpy and scipy) |

## Hosting on GitHub Pages

The repo deploys itself: `.github/workflows/deploy-pages.yml` builds the static site on every push to `main` and publishes it to GitHub Pages at `https://<user>.github.io/<repo>/`.

One-time setup: in the GitHub repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

Because Pages serves the site from a sub-path, the workflow builds with `NEXT_PUBLIC_BASE_PATH=/<repo-name>`; every media path goes through `lib/asset.ts`, so it picks that prefix up automatically. Local `npm run dev` / `npm run build` use no prefix.
