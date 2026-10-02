"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrubVideo } from "@/lib/useScrubVideo";
import ProjectCaptionCard from "../ProjectCaptionCard";
import ProjectLabel from "../ProjectLabel";
import ProjectIntro from "../ProjectIntro";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";

const copy = projects.swamimalai;
const DURATIONS = [1.281, 2.433, 3.381, 2.202, 2.164];
// per clip (1 timeline unit each): slide in → scrub the camera move → card on its settled frame
const SLIDE = 0.22;
const PLAY_END = 0.6;
const INTRO = 0.25;

function Clip({ i, setters }: { i: number; setters: ((t: number) => void)[] }) {
  const ref = useRef<HTMLVideoElement>(null);
  setters[i] = useScrubVideo(ref, `swami-${i + 1}`);
  return <video ref={ref} className="project-video" poster={asset(`/media/swami-${i + 1}-poster.webp`)} style={{ backgroundImage: `url(${asset(`/media/swami-${i + 1}-poster.webp`)})` }} muted playsInline preload="auto" />;
}

/**
 * Five short clips joined by pull-up transitions, all driven by scroll (no locking):
 * each clip's camera move is scrubbed, its card shows once the shot settles, and the next
 * clip slides up from the bottom to replace it.
 */
export default function Swamimalai() {
  const section = useRef<HTMLElement>(null);
  const setters = useRef<((t: number) => void)[]>([]).current;
  const [card, setCard] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  useGSAP(
    () => {
      const layers = gsap.utils.toArray<HTMLElement>(".swami-layer");
      const proxies = DURATIONS.map(() => ({ t: 0 }));
      let tl: gsap.core.Timeline;
      const update = () => {
        proxies.forEach((p, i) => setters[i]?.(p.t));
        const t = tl.time() - INTRO;
        if (t < 0) {
          setCard(null);
          setStep(0);
          return;
        }
        const k = Math.min(4, Math.floor(t));
        const local = t - k;
        setStep(k);
        setCard(k === 4 ? (local >= PLAY_END ? 4 : null) : local >= PLAY_END ? k : null);
      };
      gsap.set(layers.slice(1), { yPercent: 100 });
      tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: update,
        scrollTrigger: { trigger: section.current, start: "top top", end: "+=600%", pin: true, scrub: 0.5 },
      });
      tl.to(".project-intro", { opacity: 0, yPercent: -30, scale: 0.94, duration: INTRO, ease: "power2.in" }, 0).fromTo(
        ".project-label",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.15 },
        0.12,
      );
      DURATIONS.forEach((d, i) => {
        const at = INTRO + i;
        if (i > 0) {
          tl.to(layers[i], { yPercent: 0, duration: SLIDE, ease: "power2.inOut" }, at).to(
            layers[i - 1],
            { yPercent: -14, filter: "brightness(0.4)", duration: SLIDE, ease: "power2.inOut" },
            at,
          );
        }
        tl.to(proxies[i], { t: d, duration: PLAY_END - (i > 0 ? SLIDE * 0.5 : 0) }, at + (i > 0 ? SLIDE * 0.5 : 0));
      });
      tl.to({}, { duration: 0.15 }, INTRO + 5);
    },
    { scope: section },
  );

  return (
    <section ref={section} className="project-stage swami-stage">
      {DURATIONS.map((_, i) => (
        <div key={i} className="swami-layer" style={{ zIndex: i + 1 }}>
          <Clip i={i} setters={setters} />
          <div className="project-shade" aria-hidden />
          <ProjectCaptionCard id={`s${i}`} show={card === i} position="bottom-center">
            <p>{copy.cards[i]}</p>
          </ProjectCaptionCard>
        </div>
      ))}
      <ProjectIntro index={copy.index} title={copy.title} tamil={copy.tamil} tagline={copy.tagline} />
      <ProjectLabel index={copy.index} title={copy.title} tamil={copy.tamil} />
      <div className="swami-steps" aria-hidden>
        {DURATIONS.map((_, i) => (
          <span key={i} className={i === step ? "on" : i < step ? "done" : ""} />
        ))}
        <em>
          {step + 1} / 5
        </em>
      </div>
    </section>
  );
}
