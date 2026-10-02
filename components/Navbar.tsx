"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_SECTIONS, scrollToSection } from "@/lib/nav";
import { useActiveSection } from "@/lib/useActiveSection";
import { VelIcon } from "./Icons";
import RitualButton from "./RitualButton";

/** Floating glass island navbar. */
export default function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShown(true), 600);
    return () => clearTimeout(t);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      className="nav-island"
      initial={{ y: -90, opacity: 0, x: "-50%" }}
      animate={shown ? { y: 0, opacity: 1, x: "-50%" } : undefined}
      transition={{ type: "spring", damping: 22, stiffness: 160 }}
    >
      <button type="button" className="nav-brand" onClick={() => go("home")} aria-label="Back to top">
        <VelIcon className="nav-brand-vel" />
        <span className="nav-brand-name">Murugan</span>
        <span className="nav-brand-ta" lang="ta">
          முருகன்
        </span>
      </button>

      <nav className="nav-links" aria-label="Sections">
        {NAV_SECTIONS.filter((s) => s.id !== "home").map((s) => (
          <button key={s.id} type="button" className={`nav-link ${active === s.id ? "is-active" : ""}`} onClick={() => go(s.id)}>
            {active === s.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", damping: 26, stiffness: 300 }} />}
            <span className="nav-link-label">{s.label}</span>
          </button>
        ))}
      </nav>

      <div className="nav-cta">
        <RitualButton size="sm" icon="vel">
          Call Upon Me
        </RitualButton>
      </div>

      <button type="button" className={`nav-burger ${open ? "is-open" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-sheet"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            {NAV_SECTIONS.map((s, i) => (
              <button key={s.id} type="button" className={`nav-sheet-link ${active === s.id ? "is-active" : ""}`} onClick={() => go(s.id)}>
                <em>0{i + 1}</em> {s.label}
              </button>
            ))}
            <RitualButton size="sm" icon="vel" className="nav-sheet-cta">
              Call Upon Me
            </RitualButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
