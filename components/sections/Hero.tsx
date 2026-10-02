"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrubVideo } from "@/lib/useScrubVideo";
import { hero } from "@/lib/content";
import SpeechBubble from "../SpeechBubble";
import RitualButton from "../RitualButton";
import { ChevronDown } from "../Icons";
import { asset } from "@/lib/asset";

const DURATION = 5.167;

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const setTime = useScrubVideo(video, "hero");

  useGSAP(
    () => {
      const proxy = { t: 0 };
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section.current, start: "top top", end: "+=340%", pin: true, scrub: true },
        })
        // the "Scroll Down, Now!!" bubble leaves as soon as scrolling starts
        .to(".hero-bubble", { opacity: 0, y: -16, scale: 0.92, duration: 0.035 }, 0)
        .to(".hero-cue", { opacity: 0, y: 12, duration: 0.04 }, 0)
        .to(proxy, { t: DURATION, duration: 0.8, onUpdate: () => setTime(proxy.t) }, 0)
        .to(".hero-video", { opacity: 0, scale: 1.05, duration: 0.09 }, 0.8)
        .fromTo(".hero-greeting", { opacity: 0, y: 50, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.08 }, 0.84)
        .fromTo(".hero-translit", { opacity: 0, letterSpacing: "1.2em" }, { opacity: 1, letterSpacing: "0.5em", duration: 0.06 }, 0.88)
        .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.9)
        .fromTo(".hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05 }, 0.92)
        .to({}, { duration: 0.06 });
    },
    { scope: section },
  );

  return (
    <section ref={section} id="home" className="hero-stage">
      <video ref={video} className="hero-video" poster={asset("/media/hero-poster.webp")} style={{ backgroundImage: `url(${asset("/media/hero-poster.webp")})` }} muted playsInline preload="auto" />
      <div className="hero-vignette" aria-hidden />

      <div className="hero-bubble">
        <SpeechBubble tone="hero" tail="right" mobileTail="bottom" className="hero-bubble-sb">
          <span className="hero-bubble-text">{hero.bubble}</span>
          <span className="hero-bubble-chev" aria-hidden>
            <ChevronDown />
          </span>
        </SpeechBubble>
      </div>

      <div className="hero-cue" aria-hidden>
        <span>{hero.scrollCue}</span>
        <i />
      </div>

      <div className="hero-end">
        <h1 className="hero-greeting" lang="ta">
          {hero.greeting}
        </h1>
        <p className="hero-translit">{hero.translit}</p>
        <p className="hero-sub">{hero.sub}</p>
        <div className="hero-actions">
          <RitualButton icon="arrow">{hero.primary}</RitualButton>
          <RitualButton variant="ghost" icon="lotus">
            {hero.secondary}
          </RitualButton>
        </div>
      </div>
    </section>
  );
}
