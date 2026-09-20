"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { AREAS, pendingClass } from "@/lib/content";
import { practiceSlotId } from "@/lib/media";
import { useMediaQuery, useReduceMotion } from "./hooks";
import { EASE, EASE_INOUT, Line } from "./motion";
import { Photo } from "./photo";
import { Arrow } from "./ui";

/**
 * Áreas de atuação como índice vertical. Desktop: passar o mouse (ou focar) troca a imagem
 * e a descrição no painel fixo. Celular: cada linha abre em acordeão com a sua imagem.
 */
export function Areas() {
  const [active, setActive] = useState(0);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReduceMotion();
  const shown = Math.max(0, active);
  const current = AREAS[shown];

  const select = (i: number) => setActive(!desktop && active === i ? -1 : i);
  const hover = (i: number) => {
    if (desktop) setActive(i);
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
                      <div className="relative mb-5 aspect-[4/5] max-h-[70svh] w-full overflow-hidden">
                        <Photo slot={practiceSlotId(area.slug)} sizes="100vw" tone="dark" />
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
              <AnimatePresence initial={false}>
                <m.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
                  animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0.3 : 0.95, ease: EASE_INOUT }}
                >
                  <Photo slot={practiceSlotId(current.slug)} sizes="(min-width: 1024px) 33vw, 100vw" tone="dark" />
                </m.div>
              </AnimatePresence>
            </div>
            <div aria-live="polite" className="relative mt-6 min-h-[7.5rem] max-w-[28rem]">
              <AnimatePresence mode="wait" initial={false}>
                <m.p
                  key={current.slug}
                  className={pendingClass(current.description) || "text-paper/85"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {current.description}
                </m.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
