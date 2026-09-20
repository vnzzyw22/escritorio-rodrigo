"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReduceMotion } from "./hooks";
import { Photo } from "./photo";
import { useSlot } from "./providers";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_INOUT = [0.76, 0, 0.24, 1] as const;

const IN_VIEW = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Linha de texto que sobe de dentro de uma máscara ao entrar no viewport. */
export function Line({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    // padding/margem negativa compensam ascendentes e descendentes que a máscara cortaria
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <m.span
        data-reveal
        className={`block ${className}`}
        initial={{ y: "108%" }}
        whileInView={{ y: "0%" }}
        viewport={IN_VIEW}
        transition={{ duration: 1.15, ease: EASE, delay }}
      >
        {children}
      </m.span>
    </span>
  );
}

/** Entrada discreta: opacidade e um deslocamento curto. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/** Moldura que se revela por clip-path (uma vez). Sem movimento com prefers-reduced-motion. */
export function ImageReveal({
  children,
  className = "",
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const reduce = useReduceMotion();
  if (reduce) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        {children}
      </div>
    );
  }
  return (
    <m.div
      data-reveal
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={IN_VIEW}
      transition={{ duration: 1.4, ease: EASE_INOUT, delay }}
    >
      {children}
    </m.div>
  );
}

/** Camada que desliza suavemente com o scroll (no máximo `range`% para cada lado). */
export function Parallax({
  children,
  className = "",
  range = 6,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduceMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <m.div className="absolute inset-[-8%]" style={reduce ? undefined : { y }}>
        {children}
      </m.div>
    </div>
  );
}

/**
 * Foto de um slot com revelação por clip-path e parallax leve.
 * O placeholder não desliza (o texto dele ficaria andando).
 */
export function Frame({
  slot,
  sizes,
  className = "",
  tone = "dark",
  range = 6,
  delay = 0,
  position,
}: {
  slot: string;
  sizes: string;
  className?: string;
  tone?: "dark" | "light";
  range?: number;
  delay?: number;
  position?: string;
}) {
  const s = useSlot(slot);
  const moving = Boolean(s.src) && range > 0;
  return (
    <ImageReveal className={className} style={{ aspectRatio: s.ratio }} delay={delay}>
      {moving ? (
        <Parallax className="absolute inset-0" range={range}>
          <Photo slot={slot} sizes={sizes} tone={tone} position={position} />
        </Parallax>
      ) : (
        <Photo slot={slot} sizes={sizes} tone={tone} position={position} />
      )}
    </ImageReveal>
  );
}
