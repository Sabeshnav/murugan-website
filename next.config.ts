import type { NextConfig } from "next";

// Static export: `npm run build` writes a fully static site to /out that can be hosted
// anywhere (Netlify, Vercel, GitHub Pages, any static file server).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
