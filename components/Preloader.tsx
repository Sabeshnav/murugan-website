"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { preloadVideo, scrubSrc } from "@/lib/media";
import { lockScroll, unlockScroll } from "@/lib/scroll";

/** Holds the page until the hero + Soorasamharam scrub clips are fully downloaded. */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    lockScroll("preloader");
    const parts = [0, 0];
    const update = () => setProgress((parts[0] + parts[1]) / 2);
    Promise.all([
      preloadVideo(scrubSrc("hero"), (f) => ((parts[0] = f), update())),
      preloadVideo(scrubSrc("sooras"), (f) => ((parts[1] = f), update())),
      document.fonts?.ready,
    ]).then(() => {
      setDone(true);
      window.scrollTo(0, 0);
      unlockScroll("preloader");
      ScrollTrigger.refresh();
      // Warm the next scrubbed clip while the visitor watches the hero.
      preloadVideo(scrubSrc("devas"));
    });
    return () => unlockScroll("preloader");
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
        >
          <svg className="preloader-vel" viewBox="0 0 40 160" aria-hidden>
            <path d="M20 4 C30 22 34 38 20 58 C6 38 10 22 20 4 Z" />
            <line x1="20" y1="58" x2="20" y2="156" />
          </svg>
          <div className="preloader-bar">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <p className="preloader-label">Summoning the legend · {Math.round(progress * 100)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
