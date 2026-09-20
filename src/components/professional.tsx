"use client";

import { PROFESSIONAL, pendingClass } from "@/lib/content";
import { Frame, Line, Reveal } from "./motion";
import { ButtonLink } from "./ui";

/**
 * Apresentação editorial de uma pessoa: retrato alto à esquerda; nome empilhado em corpo grande
 * e ficha em lista de definição à direita. Nada de formação, OAB ou anos de atuação inventados.
 */
export function Professional() {
  const name = PROFESSIONAL.name.join(" ");
  return (
    <section
      id="profissional"
      data-section="profissional"
      data-label="Profissional"
      data-theme="light"
      aria-labelledby="profissional-titulo"
      className="section-y relative z-10 bg-paper-deep text-ink"
    >
      <div className="page-x grid-12 gap-y-12">
        <div className="col-span-12 -mx-[var(--margin)] md:col-span-6 md:mx-0 lg:col-span-5">
          <Frame
            slot="lawyer"
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
            range={5}
            tone="dark"
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7 lg:pt-[clamp(0px,7vw,120px)]">
          <h2 id="profissional-titulo" className="text-display-l">
            <span className="sr-only">{name}</span>
            <span aria-hidden="true">
              {PROFESSIONAL.name.map((part, i) => (
                <Line key={part} delay={i * 0.11}>
                  {part}
                </Line>
              ))}
            </span>
          </h2>

          <Reveal delay={0.1} className="mt-12 max-w-[34rem]">
            <dl className="border-t border-paper-line">
              {PROFESSIONAL.fields.map((f) => (
                <div
                  key={f.label}
                  className="grid gap-x-8 gap-y-1 border-b border-paper-line py-4 sm:grid-cols-[9.5rem_1fr]"
                >
                  <dt className="label pt-[0.35em] text-ash">{f.label}</dt>
                  <dd className={pendingClass(f.value)}>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <ButtonLink href="#contato" tone="onPaper">
                Falar com o escritório
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
