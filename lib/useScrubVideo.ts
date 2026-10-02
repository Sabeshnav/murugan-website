"use client";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { preloadVideo, scrubSrc } from "./media";

/**
 * Binds a <video> to a target time that scroll code updates every frame. A rAF loop
 * issues one seek at a time (never queueing seeks), so scrubbing stays responsive in
 * both directions. Scrubbed clips are encoded all-intra, so every seek is instant.
 * The clip is downloaded in full (blob URL) once it comes within ~2 screens.
 */
export function useScrubVideo(ref: RefObject<HTMLVideoElement | null>, name: string) {
  const target = useRef(0);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let alive = true;
    const load = () =>
      preloadVideo(scrubSrc(name)).then((src) => {
        if (!alive || !ref.current) return;
        ref.current.src = src;
        ref.current.load();
      });
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          load();
        }
      },
      { rootMargin: "250% 0px 250% 0px" },
    );
    io.observe(v);

    let raf = 0;
    const loop = () => {
      const el = ref.current;
      if (el && el.readyState >= 1 && !el.seeking) {
        const t = Math.min(target.current, (el.duration || Infinity) - 0.04);
        if (Math.abs(el.currentTime - t) > 0.008) el.currentTime = Math.max(0, t);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, name]);

  return useCallback((t: number) => {
    target.current = t;
  }, []);
}
