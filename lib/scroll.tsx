"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./gsap";

// One shared Lenis instance drives smooth scrolling and feeds ScrollTrigger.
let lenis: Lenis | null = null;
const locks = new Set<string>();

export function getLenis() {
  return lenis;
}

/** Freeze page scrolling under a named key (several features can lock independently). */
export function lockScroll(key: string) {
  locks.add(key);
  lenis?.stop();
  document.documentElement.classList.add("scroll-locked");
}

export function unlockScroll(key: string) {
  locks.delete(key);
  if (locks.size === 0) {
    lenis?.start();
    document.documentElement.classList.remove("scroll-locked");
  }
}

export function isScrollLocked() {
  return locks.size > 0;
}

export function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
    lenis = instance;
    if (locks.size) instance.stop();
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, []);
  return null;
}
