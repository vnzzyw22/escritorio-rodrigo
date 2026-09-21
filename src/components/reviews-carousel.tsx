"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Review } from "@/lib/site";
import { Arrow } from "./ui";

/**
 * Carrossel de avaliações: uma por vez, com deslizar (dedo ou trackpad, `scroll-snap` nativo), setas e
 * teclado (← →). Sem rotação automática: quem lê decide o ritmo, e movimento sozinho atrapalha a leitura.
 * O trilho é uma lista comum: sem JavaScript, todas as avaliações continuam legíveis (deslizando).
 * Todas as lâminas têm a altura da maior, então a seção não "pula" ao trocar.
 * Movimento reduzido: as setas trocam de avaliação sem animar a rolagem.
 */
export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const n = reviews.length;

  const sync = useCallback(() => {
    const el = track.current;
    if (el && el.clientWidth > 0) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(sync);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sync]);

  const go = (to: number) => {
    const el = track.current;
    if (!el) return;
    const i = (to + n) % n;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: i * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const btn =
    "grid size-11 place-items-center border border-ink/40 text-ink transition-colors duration-300 hover:border-ink";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Avaliações de clientes no Google" onKeyDown={onKey}>
      <ul
        ref={track}
        tabIndex={0}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <li
            key={r.author + r.text.slice(0, 24)}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${n}`}
            className="min-w-full snap-start snap-always pr-6 lg:pr-10"
          >
            <figure>
              <blockquote className="font-display text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.25] tracking-[-0.005em] text-pretty">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5">
                <span className="block">{r.author}</span>
                <span className="label mt-1 block text-ash">Avaliação no Google</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {n > 1 && (
        <div className="mt-6 flex items-center gap-4 border-t border-paper-line pt-5">
          <button type="button" onClick={() => go(index - 1)} aria-label="Avaliação anterior" className={btn}>
            <Arrow className="rotate-180" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Próxima avaliação" className={btn}>
            <Arrow />
          </button>
          <span className="label ml-auto tabular-nums text-ash" aria-hidden="true">
            {index + 1} de {n}
          </span>
        </div>
      )}
    </div>
  );
}
