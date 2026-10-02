import localFont from "next/font/local";

// Self-hosted (OFL) so the site never depends on a font CDN.
export const display = localFont({
  variable: "--f-display",
  display: "swap",
  src: [
    { path: "./fonts/cinzel-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/cinzel-latin-800-normal.woff2", weight: "800" },
    { path: "./fonts/cinzel-latin-900-normal.woff2", weight: "900" },
  ],
});

export const serif = localFont({
  variable: "--f-serif",
  display: "swap",
  src: [
    { path: "./fonts/eb-garamond-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/eb-garamond-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/eb-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
    { path: "./fonts/eb-garamond-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/eb-garamond-latin-800-normal.woff2", weight: "800" },
  ],
});

export const tamil = localFont({
  variable: "--f-tamil",
  display: "swap",
  src: [
    { path: "./fonts/noto-serif-tamil-tamil-700-normal.woff2", weight: "700" },
    { path: "./fonts/noto-serif-tamil-tamil-800-normal.woff2", weight: "800" },
    { path: "./fonts/noto-serif-tamil-tamil-900-normal.woff2", weight: "900" },
  ],
});

export const ui = localFont({
  variable: "--f-ui",
  display: "swap",
  src: [
    { path: "./fonts/roboto-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/roboto-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/roboto-latin-700-normal.woff2", weight: "700" },
  ],
});
