"use client";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { ArrowIcon, LotusIcon, PenIcon, VelIcon } from "./Icons";

type Icon = "arrow" | "vel" | "lotus" | "pen" | "none";

/**
 * Designed button with hover shine, lift and a click ripple. Purely decorative for now:
 * it performs no action when pressed.
 */
export default function RitualButton({
  children,
  variant = "primary",
  size = "md",
  icon = "arrow",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "ink";
  size?: "sm" | "md" | "lg";
  icon?: Icon;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const ripple = (e: MouseEvent<HTMLButtonElement>) => {
    const b = ref.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const s = document.createElement("span");
    s.className = "rb-ripple";
    s.style.left = `${e.clientX - r.left}px`;
    s.style.top = `${e.clientY - r.top}px`;
    b.appendChild(s);
    window.setTimeout(() => s.remove(), 700);
  };
  return (
    <button ref={ref} type="button" className={`rb rb-${variant} rb-${size} ${className}`} onClick={ripple}>
      <span className="rb-shine" aria-hidden />
      <span className="rb-label">{children}</span>
      {icon !== "none" && (
        <span className="rb-icon" aria-hidden>
          {icon === "arrow" && <ArrowIcon />}
          {icon === "vel" && <VelIcon />}
          {icon === "lotus" && <LotusIcon />}
          {icon === "pen" && <PenIcon />}
        </span>
      )}
    </button>
  );
}
