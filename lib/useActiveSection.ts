"use client";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "./gsap";
import { NAV_SECTIONS, sectionTop, type NavId } from "./nav";

type Marker = { id: NavId; label: string; top: number };

let markers: Marker[] = [];
let maxScroll = 1;
const listeners = new Set<() => void>();

function measure() {
  maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  markers = NAV_SECTIONS.map((s) => ({ ...s, top: sectionTop(s.id) }));
  listeners.forEach((l) => l());
}

let wired = false;
function wire() {
  if (wired || typeof window === "undefined") return;
  wired = true;
  ScrollTrigger.addEventListener("refresh", measure);
  window.addEventListener("scroll", () => listeners.forEach((l) => l()), { passive: true });
  requestAnimationFrame(measure);
}

export function getMarkers() {
  return { markers, maxScroll };
}

function currentId(): NavId {
  const y = window.scrollY + window.innerHeight * 0.45;
  let id: NavId = "home";
  for (const m of markers) if (m.top <= y) id = m.id;
  return id;
}

/** Which nav section the viewport is in (shared by the navbar and progress tracker). */
export function useActiveSection() {
  const [active, setActive] = useState<NavId>("home");
  useEffect(() => {
    wire();
    const l = () => setActive(currentId());
    listeners.add(l);
    l();
    return () => {
      listeners.delete(l);
    };
  }, []);
  return active;
}

export function useScrollListener(fn: () => void) {
  useEffect(() => {
    wire();
    listeners.add(fn);
    fn();
    return () => {
      listeners.delete(fn);
    };
  }, [fn]);
}
