"use client";
import { Fragment, useMemo, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrubVideo } from "@/lib/useScrubVideo";
import ProjectLabel from "../ProjectLabel";
import ProjectIntro from "../ProjectIntro";
import ProjectCaptionCard from "../ProjectCaptionCard";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";

const DURATION = 6.1;
const copy = projects.devas;

/**
 * Piecewise reveal tied to the shot's beats:
 *  0.0–3.4s fleet dive-through  → first 45% at a steady pace
 *  3.4–4.3s catch up to Murugan → next 20%, faster
 *  4.3–5.8s arc to the Vel      → final 35%, last word lands with the Vel extending
 */
function revealFraction(t: number) {
  if (t <= 3.4) return 0.45 * (t / 3.4);
  if (t <= 4.3) return 0.45 + 0.2 * ((t - 3.4) / 0.9);
  return Math.min(1, 0.65 + 0.35 * ((t - 4.3) / 1.5));
}

export default function LeadingTheDevas() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const setTime = useScrubVideo(video, "devas");
  // split into words so line-wrapping never breaks mid-word while letters reveal
  const words = useMemo(() => copy.card.split(" ").map((w) => Array.from(w)), []);

  useGSAP(
    () => {
      const spans = Array.from(textRef.current?.querySelectorAll<HTMLSpanElement>(".ch") ?? []);
      const card = textRef.current?.closest(".caption-card");
      card?.classList.add("is-empty");
      let shown = 0;
      const proxy = { t: 0 };
      const update = () => {
        setTime(proxy.t);
        const n = Math.round(revealFraction(proxy.t) * spans.length);
        if (n === shown) return;
        for (let i = Math.min(n, shown); i < Math.max(n, shown); i++) spans[i].classList.toggle("on", i < n);
        shown = n;
        card?.classList.toggle("is-empty", n === 0);
      };
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section.current, start: "top top", end: "+=500%", pin: true, scrub: true },
        })
        .to(".project-intro", { opacity: 0, yPercent: -30, scale: 0.94, duration: 0.07, ease: "power2.in" }, 0)
        .fromTo(".project-label", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.05 }, 0.04)
        .to(proxy, { t: DURATION, duration: 0.84, onUpdate: update }, 0.08)
        // a short hold on the finished card before release
        .to({}, { duration: 0.06 });
    },
    { scope: section },
  );

  return (
    <section ref={section} className="project-stage">
      <video ref={video} className="project-video" poster={asset("/media/devas-poster.webp")} style={{ backgroundImage: `url(${asset("/media/devas-poster.webp")})` }} muted playsInline preload="auto" />
      <div className="project-shade" aria-hidden />
      <ProjectIntro index={copy.index} title={copy.title} tamil={copy.tamil} tagline={copy.tagline} />
      <ProjectLabel index={copy.index} title={copy.title} tamil={copy.tamil} />
      <ProjectCaptionCard show position="bottom-center" className="devas-card">
        <p ref={textRef} className="letter-reveal" aria-label={copy.card}>
          {words.map((w, wi) => (
            <Fragment key={wi}>
              <span className="word" aria-hidden>
                {w.map((c, ci) => (
                  <span key={ci} className="ch">
                    {c}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 && (
                <span className="ch" aria-hidden>
                  {" "}
                </span>
              )}
            </Fragment>
          ))}
        </p>
      </ProjectCaptionCard>
    </section>
  );
}
