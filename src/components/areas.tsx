"use client";

import { useState, type ReactNode } from "react";
import { AREAS, pendingClass } from "@/lib/content";
import { useMediaQuery } from "./hooks";
import { Line } from "./reveal";
import { Arrow } from "./ui";

type Photos = {
  /** Foto de cada área dentro do acordeão (celular). */
  accordion: Record<string, ReactNode>;
  /** Foto de cada área no painel fixo (desktop). */
  panel: Record<string, ReactNode>;
};

/**
 * Áreas de atuação como índice vertical. Desktop: passar o mouse (ou focar) troca a imagem
 * e a descrição no painel fixo. Celular: cada linha abre em acordeão com a sua imagem.
 * As fotos chegam prontas do servidor (`photos`); aqui só a interação vive no cliente.
 * A troca de foto é um "wipe" em CSS (transform), e as fotos do acordeão só são montadas quando a
 * linha é aberta: o celular não baixa cinco fotos que talvez nunca sejam vistas.
 */
export function Areas({ photos }: { photos: Photos }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [opened, setOpened] = useState<number[]>([0]);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const shown = Math.max(0, active);
  const current = AREAS[shown];

  const change = (i: number) => {
    if (i === active) return;
    setPrev(shown);
    setActive(i);
    setOpened((o) => (o.includes(i) ? o : [...o, i]));
  };
  const select = (i: number) => {
    if (!desktop && active === i) setActive(-1);
    else change(i);
  };
  const hover = (i: number) => {
    if (desktop) change(i);
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
      <div className="page-x grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="areas-titulo" className="text-display-m">
            <Line>Áreas de atuação</Line>
          </h2>

          <ul className="mt-12 border-t border-graphite-line lg:mt-16">
            {AREAS.map((area, i) => {
              const on = i === active || (desktop && i === shown);
              return (
                <li key={area.slug} className="border-b border-graphite-line">
                  <button
                    type="button"
                    aria-expanded={!desktop ? i === active : undefined}
                    aria-controls={`area-${area.slug}`}
                    aria-current={desktop && on ? "true" : undefined}
                    onClick={() => select(i)}
                    onMouseEnter={() => hover(i)}
                    onFocus={() => hover(i)}
                    className="group flex min-h-[72px] w-full items-center justify-between gap-6 py-5 text-left lg:py-7"
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

                  {/* Acordeão (só abaixo de lg): imagem e descrição da própria linha. */}
                  <div
                    id={`area-${area.slug}`}
                    inert={i !== active}
                    className="grid transition-[grid-template-rows] duration-500 ease-out lg:hidden"
                    style={{ gridTemplateRows: i === active ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="relative mb-5 aspect-[4/5] max-h-[70svh] w-full overflow-hidden bg-graphite">
                        {opened.includes(i) ? photos.accordion[area.slug] : null}
                      </div>
                      <p className={`mb-8 max-w-[30rem] ${pendingClass(area.description) || "text-paper/85"}`}>
                        {area.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Painel fixo (só a partir de lg). */}
        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-[calc(var(--nav-h)+32px)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-graphite">
              {prev !== null && prev !== shown && (
                <div key={`anterior-${prev}`} className="absolute inset-0">
                  {photos.panel[AREAS[prev].slug]}
                </div>
              )}
              <div
                key={`atual-${shown}`}
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
