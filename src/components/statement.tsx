"use client";

import { m, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import { STATEMENT } from "@/lib/content";
import { RMark } from "./brand";
import { useReduceMotion } from "./hooks";
import { Line } from "./motion";

/**
 * A folha de papel que cobre o hero. Uma frase, em corpo grande e com quebra assimétrica:
 * cada linha recua um pouco mais. Nada mais na dobra.
 */
export function Statement({ ref }: { ref: RefObject<HTMLElement | null> }) {
  const reduce = useReduceMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  const indents = ["", "pl-[9%] md:pl-[16.66%]", "pl-[18%] md:pl-[33.33%]"];

  return (
    <section
      ref={ref}
      id="declaracao"
      data-section="declaracao"
      data-label="Declaração"
      data-theme="light"
      aria-labelledby="declaracao-titulo"
      className="relative z-10 flex min-h-[100svh] items-center overflow-hidden border-t border-paper-line bg-paper text-ink"
    >
      <m.div
        aria-hidden="true"
        className="absolute -left-[6vw] top-1/2 -translate-y-1/2 opacity-[0.045]"
        style={reduce ? undefined : { y: markY }}
      >
        <RMark size="min(78vw, 1100px)" />
      </m.div>

      <div className="page-x relative w-full py-[var(--section-y)]">
        <h2 id="declaracao-titulo" className="text-display-l">
          {STATEMENT.map((line, i) => (
            <Line key={line} delay={i * 0.12} className={indents[i] ?? ""}>
              {line}
            </Line>
          ))}
        </h2>
      </div>
    </section>
  );
}
