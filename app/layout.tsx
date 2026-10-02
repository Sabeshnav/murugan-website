import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { display, serif, tamil, ui } from "./fonts";

export const metadata: Metadata = {
  title: "Murugan — Portfolio",
  description: "The portfolio of Lord Murugan: my deeds, my nature, my skills and what others say of me, told through painterly scroll-driven scenes.",
};

export const viewport: Viewport = { themeColor: "#0b0806" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${tamil.variable} ${ui.variable}`} data-nav-theme="dark">
      <head>
        <link rel="preload" as="image" href="/media/hero-poster.webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
