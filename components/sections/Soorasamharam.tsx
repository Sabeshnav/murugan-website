"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrubVideo } from "@/lib/useScrubVideo";
import ProjectCaptionCard from "../ProjectCaptionCard";
import ProjectLabel from "../ProjectLabel";
import ProjectIntro from "../ProjectIntro";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";

const DURATION = 8.0;
const copy = projects.soorasamharam;
type Card = "A" | "B" | "C" | null;

/** Which card is on screen is decided by the scrubbed video time, never scroll distance. */
function cardFor(t: number, introGone: boolean): Card {
  if (!introGone) return null;
  if (t < 0.45) return "A";
  if (t >= 3.0 && t < 6.7) return "B";
  if (t >= 7.0) return "C";
  return null;
}

export default function Soorasamharam() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const setTime = useScrubVideo(video, "sooras");
  const [card, setCard] = useState<Card>(null);

  useGSAP(
    () => {
      const proxy = { t: 0 };
      let tl: gsap.core.Timeline;
      const update = () => {
        setTime(proxy.t);
        setCard(cardFor(proxy.t, tl.time() >= 0.07));
      };
      tl = gsap
        .timeline({
          defaults: { ease: "none" },
          onUpdate: update,
          scrollTrigger: { trigger: section.current, start: "top top", end: "+=620%", pin: true, scrub: true },
        })
        // big project title lifts away, the compact label takes over
        .to(".project-intro", { opacity: 0, yPercent: -30, scale: 0.94, duration: 0.07, ease: "power2.in" }, 0)
        .fromTo(".project-label", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.05 }, 0.04)
        // [DECISION] the opening 0.4s is stretched over extra scroll so Card A can be read
        .to(proxy, { t: 0.3, duration: 0.13 }, 0.07)
        .to(proxy, { t: DURATION, duration: 0.7 }, 0.2)
        // hold on the final frame so Card C can be read before release
        .to({}, { duration: 0.1 });
    },
    { scope: section },
  );

  return (
    <section ref={section} className="project-stage">
      <video ref={video} className="project-video" poster={asset("/media/sooras-poster.webp")} style={{ backgroundImage: `url(${asset("/media/sooras-poster.webp")})` }} muted playsInline preload="auto" />
      <div className="project-shade" aria-hidden />
      <ProjectIntro index={copy.index} title={copy.title} tamil={copy.tamil} tagline={copy.tagline} />
      <ProjectLabel index={copy.index} title={copy.title} tamil={copy.tamil} />
      <ProjectCaptionCard id="A" show={card === "A"} position="bottom-right">
        <p>{copy.cardA}</p>
      </ProjectCaptionCard>
      <ProjectCaptionCard id="B" show={card === "B"} position="left-center">
        <p>{copy.cardB}</p>
      </ProjectCaptionCard>
      <ProjectCaptionCard id="C" show={card === "C"} position="bottom-right">
        <p>{copy.cardC[0]}</p>
        <p className="caption-second">{copy.cardC[1]}</p>
      </ProjectCaptionCard>
    </section>
  );
}
