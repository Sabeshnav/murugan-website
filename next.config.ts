import type { NextConfig } from "next";

// Static export: `npm run build` writes a fully static site to /out.
// For GitHub Pages the site lives under /<repo-name>/, so the deploy workflow sets
// NEXT_PUBLIC_BASE_PATH (e.g. "/murugan-website"). Locally it is empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
