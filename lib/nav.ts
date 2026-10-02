"use client";
import { getLenis } from "./scroll";

export const NAV_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;

export type NavId = (typeof NAV_SECTIONS)[number]["id"];

/** Document scroll position where a section starts (pin-spacer aware). */
export function sectionTop(id: string) {
  if (id === "home") return 0;
  const el = document.getElementById(id);
  if (!el) return 0;
  const box = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
  return Math.max(0, box.getBoundingClientRect().top + window.scrollY);
}

export function scrollToSection(id: string) {
  const y = sectionTop(id);
  const lenis = getLenis();
  const distance = Math.abs(window.scrollY - y);
  if (lenis) lenis.scrollTo(y, { duration: Math.min(2.4, 0.8 + distance / 9000), force: true });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/** Navbar + progress tracker switch to dark ink when they sit over a light scene. */
export function setNavTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (root.dataset.navTheme !== theme) root.dataset.navTheme = theme;
}
