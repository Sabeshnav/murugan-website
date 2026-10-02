"use client";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export type CaptionPosition = "bottom-right" | "left-center" | "bottom-center" | "bottom-left";

/** The one caption card used by every project in "My Projects". */
export default function ProjectCaptionCard({
  show,
  position,
  children,
  id,
  className = "",
}: {
  show: boolean;
  position: CaptionPosition;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={id}
          className={`caption-card caption-${position} ${className}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.25, ease: "easeIn" } }}
        >
          <span className="caption-rule" aria-hidden />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
