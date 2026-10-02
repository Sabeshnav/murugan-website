"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { testimonials } from "@/lib/content";
import RitualButton from "../RitualButton";
import { asset } from "@/lib/asset";

function Stars({ n }: { n: number }) {
  return (
    <span className="review-stars" aria-label={`${n} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={i < n ? "on" : ""} aria-hidden>
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

function Anchor({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className={`review-anchor ${open ? "is-open" : ""}`} onMouseLeave={() => setOpen(false)}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <svg viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 11v6M12 7.5v.01" />
        </svg>
        Based on a true story
      </button>
      <span className="review-anchor-tip" role="tooltip">
        {text}
      </span>
    </span>
  );
}

export default function Testimonials() {
  const section = useRef<HTMLElement>(null);
  const { place, reviews } = testimonials;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".review-card");
      const track = section.current!.querySelector<HTMLElement>(".review-track")!;
      // centre offset of card i inside the track
      const offset = (i: number) => {
        const c = cards[i];
        return -(c.offsetTop + c.offsetHeight / 2 - track.offsetHeight / 2);
      };
      // roller look: cards away from the centre tilt back, shrink and fade
      const shade = () => {
        const ty = Number(gsap.getProperty(track, "y")) || 0;
        cards.forEach((c) => {
          const d = (c.offsetTop + c.offsetHeight / 2 - track.offsetHeight / 2 + ty) / window.innerHeight;
          const a = Math.min(Math.abs(d) * 1.6, 1);
          gsap.set(c, { rotationX: -d * 38, scale: 1 - a * 0.14, opacity: 1 - a * 0.75 });
        });
      };
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onUpdate: shade,
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=330%",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: shade,
        },
      });
      tl.fromTo(track, { y: () => offset(0) + window.innerHeight * 0.45 }, { y: () => offset(0), duration: 0.8, ease: "power2.out" })
        .to({}, { duration: 0.9 })
        .to(track, { y: () => offset(1), duration: 0.8 })
        .to({}, { duration: 0.9 })
        .to(track, { y: () => offset(2), duration: 0.8 })
        .to({}, { duration: 1 });
    },
    { scope: section },
  );

  return (
    <section ref={section} className="reviews-stage">
      <div className="reviews-glow" aria-hidden />
      <header className="place-card">
        <span className="stage-kicker">04 · Testimonials</span>
        <div className="place-row">
          <strong>{place.name}</strong>
          <span className="place-rating">
            {place.rating} <Stars n={5} />
          </span>
          <span>{place.count}</span>
        </div>
        <div className="place-row place-sub">
          <span>{place.category}</span>
          <span className="place-open">{place.hours}</span>
        </div>
        <RitualButton size="sm" variant="ghost" icon="pen" className="place-btn">
          {place.button}
        </RitualButton>
      </header>
      <div className="review-viewport">
        <div className="review-track">
          {reviews.map((r) => (
            <article key={r.id} className="review-card">
              <div className="review-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="review-avatar" src={asset(r.avatar)} alt="" />
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-meta">{r.meta}</div>
                </div>
                <span className="review-more" aria-hidden>
                  ⋮
                </span>
              </div>
              <div className="review-rating-row">
                <Stars n={r.stars} />
                <span className="review-when">{r.when}</span>
              </div>
              <p className="review-text">{r.text}</p>
              {"ownerReply" in r && r.ownerReply && (
                <div className="review-owner">
                  <span>Response from the owner</span>
                  <p>{r.ownerReply}</p>
                </div>
              )}
              <div className="review-actions">
                <span className="review-helpful">
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M2 21h4V9H2v12zm20-11a2 2 0 0 0-2-2h-6.3l1-4.6v-.3a1.5 1.5 0 0 0-.4-1L13.2 1 6.6 7.6A2 2 0 0 0 6 9v10a2 2 0 0 0 2 2h9a2 2 0 0 0 1.8-1.2l3-7.1c.1-.2.2-.5.2-.7v-2z" />
                  </svg>
                  {r.helpful}
                </span>
                <Anchor text={r.anchor} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
