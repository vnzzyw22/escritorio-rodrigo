"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import { Hero } from "./hero";
import { Statement } from "./statement";

/**
 * Hero + Statement. O hero fica fixo no topo (desktop) e a folha do Statement sobe sobre ele:
 * o progresso vai de 0 (folha entrando pela base) a 1 (folha alinhada ao topo).
 */
export function Opening() {
  const statementRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ["start end", "start start"],
  });
  return (
    <div className="relative">
      <Hero progress={scrollYProgress} />
      <Statement ref={statementRef} />
    </div>
  );
}
