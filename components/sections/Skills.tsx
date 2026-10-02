"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { skills } from "@/lib/content";
import { asset } from "@/lib/asset";

type Emblem = (typeof skills.cards)[number]["emblem"];

function EmblemArt({ kind }: { kind: Emblem }) {
  if (kind === "tamil")
    return (
      <span className="emblem-glyph" lang="ta">
        அ
      </span>
    );
  if (kind === "shatkona")
    return (
      <svg viewBox="0 0 100 100" className="emblem-svg" aria-hidden>
        <polygon points="50,8 86,71 14,71" />
        <polygon points="50,92 14,29 86,29" />
        <circle cx="50" cy="50" r="9" />
      </svg>
    );
  return (
    <svg viewBox="0 0 100 100" className="emblem-svg" aria-hidden>
      <path d="M50 96 C50 70 50 40 50 6" />
      <ellipse cx="50" cy="34" rx="22" ry="28" />
      <ellipse cx="50" cy="36" rx="12" ry="16" />
      <ellipse cx="50" cy="38" rx="5" ry="7" className="fill" />
    </svg>
  );
}

function Corners() {
  return (
    <>
      {["tl", "tr", "bl", "br"].map((c) => (
        <svg key={c} viewBox="0 0 40 40" className={`card-corner ${c}`} aria-hidden>
          <path d="M2 38 V14 Q2 2 14 2 H38" />
          <path d="M8 38 V16 Q8 8 16 8 H38" />
          <circle cx="14" cy="14" r="3" />
        </svg>
      ))}
    </>
  );
}

export default function Skills() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ small: "(max-width: 767px)", large: "(min-width: 768px)" }, (ctx) => {
        const small = ctx.conditions?.small;
        const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
        const inners = gsap.utils.toArray<HTMLElement>(".skill-inner");
        // Fanned "hand" at the bottom of the screen. Cards are centred by CSS; the deck
        // pose is a transform away from centre, so "play" is just tweening back to 0.
        const slot = (i: number) => ({
          x: () => (i - 1) * (small ? 0.24 : 0.17) * Math.min(window.innerWidth, 1400),
          // original fanned size, raised so the full face (name + class) stays on screen
          y: () => window.innerHeight * (small ? 0.25 : 0.215),
          rotation: (i - 1) * 11,
          scale: small ? 0.5 : 0.56,
          transformOrigin: "50% 100%",
        });
        cards.forEach((c, i) => gsap.set(c, { ...slot(i), zIndex: i + 1, "--glow": 0, "--dim": 0 }));
        gsap.set(inners, { rotationY: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: section.current, start: "top top", end: "+=420%", pin: true, scrub: true, invalidateOnRefresh: true },
        });
        tl.to({}, { duration: 0.3 });
        cards.forEach((card, i) => {
          tl.set(card, { zIndex: 20 })
            // play: rise to centre, flipping during the travel
            .to(card, { x: 0, y: 0, rotation: 0, scale: small ? 1 : 1.12, duration: 1 })
            .to(inners[i], { rotationY: 180, duration: 1 }, "<")
            .to(card, { "--glow": 1, duration: 0.3 }, "<0.7")
            .to({}, { duration: 1.1 })
            // put away: back to its slot, face down (text side up) and dimmed
            .to(card, { ...slot(i), "--glow": 0, duration: 0.9 })
            .to(card, { "--dim": 1, duration: 0.5 }, "<0.4")
            .set(card, { zIndex: i + 1 });
        });
        tl.to({}, { duration: 0.4 });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="skills-stage" style={{ backgroundImage: `url(${asset("/media/skills-bg.webp")})` }}>
      <span className="stage-kicker skills-kicker">03 · Skills</span>
      <div className="skills-deck">
        {skills.cards.map((c) => (
          <article key={c.name} className="skill-card" aria-label={c.name}>
            <div className="skill-inner">
              <div className="skill-face skill-front">
                <Corners />
                <span className="skill-numeral">{c.numeral}</span>
                <div className="skill-emblem">
                  <EmblemArt kind={c.emblem} />
                </div>
                <h3 className="skill-name">{c.name}</h3>
                <span className="skill-class">Class · {c.cls}</span>
              </div>
              <div className="skill-face skill-back">
                <Corners />
                <span className="skill-back-name">
                  {c.numeral} · {c.name}
                </span>
                <p className="skill-hook">{c.hook}</p>
                <span className="skill-divider" aria-hidden />
                <p className="skill-footnote">{c.footnote}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
