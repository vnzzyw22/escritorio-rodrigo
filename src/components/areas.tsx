"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { AREAS, pendingClass } from "@/lib/content";
import { Line } from "./reveal";
import { Arrow } from "./ui";

type Photos = {
  /** Foto de cada área nos cartões empilhados (abaixo de lg). */
  stack: Record<string, ReactNode>;
  /** Foto de cada área no painel fixo (desktop). */
  panel: Record<string, ReactNode>;
};

/** Nomes das linhas do tempo de rolagem, um por cartão (ver .area-* em globals.css). */
const TIMELINES = AREAS.map((_, i) => `--area-${i}`);

/**
 * Áreas de atuação. Desktop (lg+): índice vertical; passar o mouse (ou focar) troca a imagem e a
 * descrição no painel fixo. Celular e tablet: a mesma ideia, guiada pela rolagem — cada área é um
 * cartão de foto, com o texto no alto, que gruda sob o menu e é coberto pelo seguinte, que sobe
 * com a própria área. O texto fica no alto porque o cartão seguinte cobre de baixo para cima. Tudo fica visível (sem acordeão): a descrição não depende de toque.
 * As fotos chegam prontas do servidor (`photos`); aqui só a interação do desktop vive no cliente.
 * A troca de foto do desktop é um "wipe" em CSS (transform).
 */
export function Areas({ photos }: { photos: Photos }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const current = AREAS[active];

  const change = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };

  return (
    <section
      id="areas"
      data-section="areas"
      data-label="Áreas de atuação"
      data-theme="dark"
      aria-labelledby="areas-titulo"
      className="dark-surface section-y relative z-10 bg-ink text-paper"
    >
      <div className="page-x grid-12 gap-y-8 lg:gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="areas-titulo" className="text-display-m">
            <Line>Áreas de atuação</Line>
          </h2>

          {/* Celular e tablet: cartões empilhados pela rolagem. */}
          <ul
            className="area-stack mt-8 lg:hidden"
            style={{ "--tls": TIMELINES.join(", ") } as CSSProperties}
          >
            {AREAS.map((area, i) => (
              <li
                key={area.slug}
                className="area-card"
                style={
                  {
                    "--i": i,
                    "--tl": TIMELINES[i],
                    "--tl-next": TIMELINES[i + 1] ?? "none",
                  } as CSSProperties
                }
              >
                <div className="area-inner relative h-full overflow-hidden bg-graphite">
                  {photos.stack[area.slug]}
                  <div className="absolute inset-x-0 top-0 h-[70%] bg-linear-to-b from-ink/95 via-ink/70 to-transparent" />
                  <div className="absolute inset-x-0 top-0 p-5 sm:p-7">
                    <h3 className="text-title">{area.title}</h3>
                    <p className={`mt-3 max-w-[30rem] text-[0.98rem] leading-[1.55] ${pendingClass(area.description) || "text-paper/85"}`}>
                      {area.description}
                    </p>
                  </div>
                  <div className="area-veil pointer-events-none absolute inset-0 bg-ink opacity-0" />
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop: índice vertical. */}
          <ul className="mt-16 hidden border-t border-graphite-line lg:block">
            {AREAS.map((area, i) => {
              const on = i === active;
              return (
                <li key={area.slug} className="border-b border-graphite-line">
                  <button
                    type="button"
                    aria-current={on ? "true" : undefined}
                    onClick={() => change(i)}
                    onMouseEnter={() => change(i)}
                    onFocus={() => change(i)}
                    className="group flex min-h-[72px] w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span
                      className={`text-title transition-colors duration-500 ${
                        on ? "text-paper" : "text-paper/55 group-hover:text-paper/80"
                      }`}
                    >
                      {area.title}
                    </span>
                    <Arrow
                      className={`transition-all duration-500 ${
                        on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Painel fixo (só a partir de lg). */}
        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-[calc(var(--nav-h)+32px)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-graphite">
              {prev !== null && prev !== active && (
                <div key={`anterior-${prev}`} className="absolute inset-0">
                  {photos.panel[AREAS[prev].slug]}
                </div>
              )}
              <div
                key={`atual-${active}`}
                className={`absolute inset-0 ${prev !== null ? "wipe" : ""}`}
                onAnimationEnd={() => setPrev(null)}
              >
                <div className="wipe-img absolute inset-0">{photos.panel[current.slug]}</div>
              </div>
            </div>
            <div aria-live="polite" className="relative mt-6 min-h-[7.5rem] max-w-[28rem]">
              <p
                key={current.slug}
                className={`fade-swap ${pendingClass(current.description) || "text-paper/85"}`}
              >
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
