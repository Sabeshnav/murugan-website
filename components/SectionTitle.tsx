"use client";
import { useMemo, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { VelIcon } from "./Icons";
import Rangoli from "./Rangoli";

const DWELL_VH = 70;

function Mandala() {
  return (
    <div className="ts-mandala" aria-hidden>
      <Rangoli className="ts-mandala-svg" />
    </div>
  );
}

/**
 * Full-screen section title reveal. It pins in place, its letters rise as it scrolls in,
 * it holds for a beat, then the section that follows slides up over it.
 */
export default function SectionTitle({
  id,
  index,
  title,
  tamil,
  kicker,
  accent,
}: {
  id: string;
  index: string;
  title: string;
  tamil: string;
  kicker: string;
  accent: "gold" | "indigo" | "maroon" | "dawn";
}) {
  const section = useRef<HTMLElement>(null);
  const letters = useMemo(() => Array.from(title), [title]);
  const motes = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i * 0.53) % 6}s`,
        dur: `${7 + ((i * 13) % 7)}s`,
        size: `${2 + ((i * 7) % 4)}px`,
      })),
    [],
  );

  useGSAP(
    () => {
      const el = section.current!;
      // pin without spacing: the next section scrolls up over the pinned title
      gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: `+=${(DWELL_VH + 100) / 100 * window.innerHeight}`, pin: true, pinSpacing: false, invalidateOnRefresh: true },
      });
      // entrance, scrubbed while the title scrolls into view
      gsap
        .timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: el, start: "top 90%", end: "top 5%", scrub: 0.6 } })
        .fromTo(".ts-mandala", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, 0)
        .fromTo(".ts-kicker-line", { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0.15)
        .fromTo(".ts-kicker-text", { opacity: 0, letterSpacing: "0.8em" }, { opacity: 1, letterSpacing: "0.36em", duration: 0.5 }, 0.2)
        .fromTo(".ts-tamil", { opacity: 0, y: 30, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }, 0.3)
        .fromTo(
          ".ts-letter",
          { yPercent: 115, rotateX: -85, opacity: 0, filter: "blur(10px)" },
          { yPercent: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", duration: 0.55, stagger: 0.045 },
          0.35,
        )
        .fromTo(".ts-divider-line", { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, 0.75)
        .fromTo(".ts-divider-vel", { y: 26, opacity: 0, scale: 0.6 }, { y: 0, opacity: 1, scale: 1, duration: 0.4 }, 0.8);
      // as the next section covers it, the title sinks back
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: `top ${-DWELL_VH}%`, end: `top ${-(DWELL_VH + 100)}%`, scrub: true },
        })
        .to(".ts-content", { scale: 0.86, opacity: 0.25, yPercent: -8 }, 0)
        .to(".ts-mandala", { scale: 0.92, opacity: 0.2 }, 0);
    },
    { scope: section },
  );

  return (
    <>
      <section ref={section} id={id} className={`title-shower ts-${accent}`}>
        <div className="ts-glow" aria-hidden />
        <Mandala />
        <div className="ts-motes" aria-hidden>
          {motes.map((m, i) => (
            <i key={i} style={{ left: m.left, animationDelay: m.delay, animationDuration: m.dur, width: m.size, height: m.size }} />
          ))}
        </div>
        <div className="ts-content">
          <div className="ts-kicker">
            <span className="ts-kicker-line" />
            <span className="ts-kicker-text">
              {index} · {kicker}
            </span>
            <span className="ts-kicker-line" />
          </div>
          <p className="ts-tamil" lang="ta">
            {tamil}
          </p>
          <h2 className="ts-title" aria-label={title}>
            {letters.map((c, i) => (
              <span key={i} className="ts-letter" aria-hidden>
                {c === " " ? " " : c}
              </span>
            ))}
          </h2>
          <div className="ts-divider" aria-hidden>
            <span className="ts-divider-line" />
            <VelIcon className="ts-divider-vel" />
            <span className="ts-divider-line" />
          </div>
        </div>
        <div className="ts-scroll" aria-hidden>
          <span>Scroll</span>
          <i />
        </div>
      </section>
      <div className="ts-spacer" style={{ height: `${DWELL_VH}vh` }} aria-hidden />
    </>
  );
}
