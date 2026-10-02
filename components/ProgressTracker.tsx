"use client";
import { useCallback, useRef, useState } from "react";
import { scrollToSection } from "@/lib/nav";
import { getMarkers, useActiveSection, useScrollListener } from "@/lib/useActiveSection";

/** Custom scroll-progress rail on the right edge with a marker per section. */
export default function ProgressTracker() {
  const fill = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const active = useActiveSection();
  const [marks, setMarks] = useState<{ id: string; label: string; at: number }[]>([]);

  const onScroll = useCallback(() => {
    const { markers, maxScroll } = getMarkers();
    const p = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    if (fill.current) fill.current.style.transform = `scaleY(${p})`;
    if (pct.current) pct.current.textContent = `${Math.round(p * 100)}`;
    const next = markers.map((m) => ({ id: m.id, label: m.label, at: Math.min(1, m.top / maxScroll) }));
    setMarks((prev) => (prev.length === next.length && prev.every((x, i) => Math.abs(x.at - next[i].at) < 0.001) ? prev : next));
  }, []);
  useScrollListener(onScroll);

  return (
    <aside className="tracker" aria-label="Page progress">
      <div className="tracker-rail">
        <span ref={fill} className="tracker-fill" />
        {marks.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`tracker-mark ${active === m.id ? "is-active" : ""}`}
            style={{ top: `${m.at * 100}%` }}
            onClick={() => scrollToSection(m.id)}
            aria-label={`Go to ${m.label}`}
          >
            <i />
            <span className="tracker-label">{m.label}</span>
          </button>
        ))}
      </div>
      <span className="tracker-pct">
        <span ref={pct}>0</span>%
      </span>
    </aside>
  );
}
