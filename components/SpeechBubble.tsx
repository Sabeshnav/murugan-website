"use client";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Tail = "left" | "right" | "bottom";

/**
 * Body + tail drawn as ONE continuous SVG path, measured from the live text box.
 * Because the outline is a single stroke, the pointer can never look detached from the
 * body (no overlapping pieces, no seams, no rotation maths).
 */
function bubblePath(w: number, h: number, tail: Tail, r = 28) {
  const L = 46; // tail length
  const B = 34; // tail base width
  r = Math.min(r, h / 2 - 2, w / 2 - 2);
  if (tail === "bottom") {
    const a = Math.max(r + 6, w * 0.22); // base start (left)
    const b = a + B;
    const tipX = a - 18;
    const tipY = h + L;
    return [
      `M ${r} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w} ${r} V ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h}`,
      `H ${b} Q ${b - 6} ${h + L * 0.45} ${tipX} ${tipY} Q ${a + 2} ${h + L * 0.38} ${a} ${h}`,
      `H ${r} A ${r} ${r} 0 0 1 0 ${h - r} V ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`,
    ].join(" ");
  }
  // side tails sit a little below the vertical middle and point down-outward
  const a = Math.min(h - r - B - 4, Math.max(r + 4, h * 0.46)); // base top
  const b = a + B; // base bottom
  const tipY = b + 18;
  if (tail === "left") {
    return [
      `M ${r} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w} ${r} V ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h} H ${r} A ${r} ${r} 0 0 1 0 ${h - r}`,
      `V ${b} Q ${-L * 0.45} ${b + 6} ${-L} ${tipY} Q ${-L * 0.38} ${a + 6} 0 ${a}`,
      `V ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`,
    ].join(" ");
  }
  return [
    `M ${r} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w} ${r} V ${a}`,
    `Q ${w + L * 0.38} ${a + 6} ${w + L} ${tipY} Q ${w + L * 0.45} ${b + 6} ${w} ${b}`,
    `V ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h} H ${r} A ${r} ${r} 0 0 1 0 ${h - r} V ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`,
  ].join(" ");
}

export default function SpeechBubble({
  tone,
  tail = "left",
  mobileTail,
  className = "",
  children,
}: {
  tone: "calm" | "wrath" | "hero";
  tail?: Tail;
  /** tail used below 768px (e.g. "bottom" when the bubble stacks above the speaker) */
  mobileTail?: Tail;
  className?: string;
  children: ReactNode;
}) {
  const body = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<{ w: number; h: number; t: Tail } | null>(null);

  useLayoutEffect(() => {
    const el = body.current;
    if (!el) return;
    const measure = () => {
      const t = mobileTail && window.innerWidth < 768 ? mobileTail : tail;
      setShape({ w: el.offsetWidth, h: el.offsetHeight, t });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [tail, mobileTail]);

  const r = tone === "hero" ? 24 : 30;
  return (
    <div className={`sb sb-${tone} ${className}`}>
      <div ref={body} className="sb-body">
        {shape && (
          <svg className="sb-shape" width={shape.w} height={shape.h} aria-hidden>
            <path className="sb-fill" d={bubblePath(shape.w, shape.h, shape.t, r)} />
            <rect className="sb-inner" x={7} y={7} width={Math.max(0, shape.w - 14)} height={Math.max(0, shape.h - 14)} rx={r - 7} />
          </svg>
        )}
        <svg className="sb-orn sb-orn-tl" viewBox="0 0 40 40" aria-hidden>
          <path d="M3 30 C3 14 14 3 30 3 M3 22 C6 12 12 6 22 3" />
          <circle cx="8" cy="8" r="2.4" />
        </svg>
        <svg className="sb-orn sb-orn-br" viewBox="0 0 40 40" aria-hidden>
          <path d="M3 30 C3 14 14 3 30 3 M3 22 C6 12 12 6 22 3" />
          <circle cx="8" cy="8" r="2.4" />
        </svg>
        <div className="sb-content">{children}</div>
      </div>
    </div>
  );
}
