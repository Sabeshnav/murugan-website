"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { setNavTheme } from "@/lib/nav";
import RitualButton from "../RitualButton";
import { VelIcon } from "../Icons";
import { contact } from "@/lib/content";
import { asset } from "@/lib/asset";

export default function Contact() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // The Vel spears up from below the screen: a fast, time-based strike (not scrubbed)
      // that plays when the scroll reaches the white finale and rewinds if you scroll back.
      const spear = gsap
        .timeline({ paused: true })
        .fromTo(
          ".contact-vel",
          { yPercent: 135, scaleY: 1.18, filter: "blur(6px)", opacity: 1 },
          { yPercent: 0, scaleY: 1, filter: "blur(0px)", duration: 0.75, ease: "expo.out" },
        )
        .fromTo(".contact-shock", { scale: 0.2, opacity: 0.9 }, { scale: 2.6, opacity: 0, duration: 0.9, ease: "power2.out" }, 0.32)
        .to(".contact-stage-inner", { keyframes: { x: [0, -5, 4, -2, 0] }, duration: 0.3, ease: "none" }, 0.3)
        .fromTo(".contact-tamil", { opacity: 0, scale: 0.94, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }, 0.55)
        .fromTo(".contact-translation", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85);

      let whiteAt = 1;
      let struck = false;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
          onUpdate: (st) => {
            const white = st.progress >= whiteAt;
            setNavTheme(white ? "light" : "dark");
            if (white && !struck) {
              struck = true;
              spear.timeScale(1).play();
            } else if (!white && struck) {
              struck = false;
              spear.timeScale(2.5).reverse();
            }
          },
          onLeaveBack: () => setNavTheme("dark"),
        },
      });
      tl.fromTo(".contact-card", { opacity: 0, y: 60, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }, 0.05)
        .fromTo(".contact-value", { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }, 0.35)
        .fromTo(".contact-close, .contact-actions", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }, 0.85)
        .to({}, { duration: 1.2 })
        .addLabel("white")
        .to(".contact-card", { opacity: 0, y: -30, duration: 0.4 }, "white")
        .to(".contact-white", { opacity: 1, duration: 0.6 }, "white+=0.1")
        .to({}, { duration: 1.4 });
      whiteAt = (tl.labels.white + 0.55) / tl.duration();
    },
    { scope: section },
  );

  return (
    <section ref={section} className="contact-stage">
      <div className="contact-stage-inner">
        <video className="contact-video" src={asset("/media/contact.mp4")} poster={asset("/media/contact-poster.webp")} autoPlay muted loop playsInline />
        <div className="contact-shade" aria-hidden />

        <div className="contact-card-wrap">
        <article className="contact-card">
          <span className="stage-kicker">05 · {contact.kicker}</span>
          <h2 className="contact-title">{contact.title}</h2>
          <p className="contact-title-ta" lang="ta">
            {contact.titleTa}
          </p>
          <p className="contact-lead">{contact.lead}</p>
          <ul>
            {contact.values.map((v) => (
              <li key={v} className="contact-value">
                <VelIcon className="contact-bullet" />
                {v}
              </li>
            ))}
          </ul>
          <p className="contact-close">{contact.close}</p>
          <div className="contact-actions">
            <RitualButton icon="vel">{contact.primary}</RitualButton>
            <RitualButton variant="ghost" icon="lotus">
              {contact.secondary}
            </RitualButton>
          </div>
        </article>
        </div>

        <div className="contact-white" aria-hidden />
        <div className="contact-finale">
          <span className="contact-shock" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="contact-vel" src={asset("/media/finale-spear.webp")} alt="" aria-hidden />
          <div className="contact-final">
            <h2 className="contact-tamil" lang="ta">
              {contact.tamil}
            </h2>
            <p className="contact-translation">
              <span>{contact.translit}</span> — {contact.translation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
