"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { setNavTheme } from "@/lib/nav";
import SpeechBubble from "../SpeechBubble";
import Rangoli from "../Rangoli";
import { about } from "@/lib/content";

export default function AboutMe() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      let wrathAt = 1;
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: true,
          // light navbar over the white / ivory phases, dark once the lava arrives
          onUpdate: (st) => setNavTheme(st.progress < wrathAt ? "light" : "dark"),
          onEnter: () => setNavTheme("light"),
          onEnterBack: () => setNavTheme("dark"),
          onLeave: () => setNavTheme("dark"),
          onLeaveBack: () => setNavTheme("dark"),
        },
      });
      // 1. assemble: "About me?" glides in from the left, Murugan from the right
      tl.fromTo(".about-decor-rangoli", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out" }, 0)
        .fromTo(".about-heading", { xPercent: -70, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.05)
        .fromTo(".about-p1", { xPercent: 70, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.05)
        .fromTo(".about-shy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.95)
        .to({}, { duration: 0.6 })
        // 2. both exit: image to the right, heading to the left
        .addLabel("exit")
        .to(".about-p1", { xPercent: 60, opacity: 0, duration: 1.1 }, "exit")
        .to(".about-heading", { xPercent: -60, opacity: 0, duration: 1.1 }, "exit")
        // 3. calm pattern loop fades in
        .to(".about-decor", { opacity: 0, duration: 0.9 }, "exit+=0.6")
        .to(".about-calm-bg", { opacity: 1, duration: 0.9 }, "exit+=0.6")
        // 4. calm Murugan + bubble, centred together
        .fromTo(".duo-calm .about-bust", { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }, "exit+=1.1")
        .fromTo(".duo-calm .sb", { scale: 0.7, opacity: 0, rotate: -4 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.7, ease: "back.out(1.7)" }, "exit+=1.6")
        .fromTo(".duo-calm .sb-line", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.12 }, "exit+=1.9")
        .to({}, { duration: 1.3 })
        // 5. quick switch to wrath
        .addLabel("wrath")
        .to(".duo-calm", { opacity: 0, y: 30, duration: 0.45 }, "wrath")
        .to(".about-wrath-bg", { opacity: 1, duration: 0.45 }, "wrath+=0.1")
        // 6. wrath Murugan + bubble in the same centred spot
        .fromTo(".duo-wrath .about-bust", { yPercent: 14, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "wrath+=0.45")
        .fromTo(".duo-wrath .sb", { scale: 0.7, opacity: 0, rotate: 4 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.9)" }, "wrath+=0.8")
        .fromTo(".duo-wrath .sb-line", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.12 }, "wrath+=1.05")
        .to({}, { duration: 1.6 });
      wrathAt = (tl.labels.wrath + 0.2) / tl.duration();
    },
    { scope: section },
  );

  return (
    <section ref={section} id="about" className="about-stage">
      <div className="about-decor" aria-hidden>
        <div className="about-decor-dots" />
        <div className="about-decor-rays" />
        <div className="about-decor-rangoli">
          <Rangoli className="about-decor-rangoli-svg" />
        </div>
        <svg className="about-frieze" preserveAspectRatio="none" aria-hidden>
          <defs>
            <pattern id="frieze" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M0 50 H56" className="fz-line" />
              <path d="M28 10 C36 22 36 32 28 44 C20 32 20 22 28 10Z" className="fz-petal" />
              <path d="M0 44 C8 36 12 30 14 22 C16 30 20 36 28 44" className="fz-arch" />
              <path d="M28 44 C36 36 40 30 42 22 C44 30 48 36 56 44" className="fz-arch" />
              <circle cx="14" cy="16" r="2" className="fz-dot" />
              <circle cx="42" cy="16" r="2" className="fz-dot" />
            </pattern>
          </defs>
          <rect width="100%" height="56" y="8" fill="url(#frieze)" />
          <path d="M0 4 H10000" className="fz-line" />
        </svg>
      </div>
      <video className="about-calm-bg about-bg" src="/media/about-calm.mp4" poster="/media/about-calm-poster.webp" autoPlay muted loop playsInline />
      <video className="about-wrath-bg about-bg" src="/media/about-wrath.mp4" poster="/media/about-wrath-poster.webp" autoPlay muted loop playsInline />

      <div className="about-intro">
        <div className="about-heading">
          <span className="about-kicker">02 · About</span>
          <h2>{about.heading}</h2>
          <p className="about-shy">{about.shy}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about-p1" src="/media/about-1.webp" alt="Murugan, shy and flattered" />
      </div>

      <div className="about-duo duo-calm">
        <div className="about-duo-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about-bust" src="/media/about-2.webp" alt="Murugan, calm and smiling" />
        <SpeechBubble tone="calm" tail="left" mobileTail="bottom" className="about-bubble">
          <p className="sb-lead sb-line">{about.calm.lead}</p>
          {about.calm.lines.map((l) => (
            <p key={l} className="sb-line">
              {l}
            </p>
          ))}
        </SpeechBubble>
        </div>
      </div>
      <div className="about-duo duo-wrath">
        <div className="about-duo-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about-bust" src="/media/about-3.webp" alt="Murugan, fierce, gripping the Vel" />
        <SpeechBubble tone="wrath" tail="left" mobileTail="bottom" className="about-bubble">
          <p className="sb-lead sb-line">{about.wrath.lead}</p>
          {about.wrath.lines.map((l) => (
            <p key={l} className="sb-line">
              {l}
            </p>
          ))}
        </SpeechBubble>
        </div>
      </div>
    </section>
  );
}
