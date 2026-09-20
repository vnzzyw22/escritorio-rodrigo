"use client";

import { m, useScroll } from "framer-motion";
import { useActiveSection } from "./providers";

/**
 * Trilho de margem (≥ xl): mostra em que seção o leitor está e quanto da página já leu.
 * É orientação, não decoração; a navegação de verdade fica no cabeçalho.
 */
export function Rail() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-10 top-[calc(var(--nav-h)+40px)] z-40 hidden w-3 flex-col items-center gap-5 transition-colors duration-500 xl:flex ${
        active.theme === "dark" ? "text-paper/70" : "text-ash"
      }`}
      style={{ left: "calc(var(--margin) / 2 - 6px)" }}
    >
      <span className="label rotate-180 whitespace-nowrap [writing-mode:vertical-rl]">{active.label}</span>
      <span className="relative w-px flex-1 bg-current/20">
        <m.span
          className="absolute inset-0 origin-top bg-current"
          style={{ scaleY: scrollYProgress }}
        />
      </span>
    </div>
  );
}
