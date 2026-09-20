"use client";

import { OFFICE, pendingClass } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Frame, Line, Reveal } from "./motion";
import { TextLink } from "./ui";

const TITLE = ["Experiência", "construída", "ao longo", "do tempo."];

/**
 * O escritório. Foto grande sangrando pela direita; texto em coluna estreita; uma segunda foto
 * de detalhe sobreposta, com margem de papel (passe-partout), só a partir de md.
 */
export function Office() {
  const a = SITE.address;
  return (
    <section
      id="escritorio"
      data-section="escritorio"
      data-label="O escritório"
      data-theme="light"
      aria-labelledby="escritorio-titulo"
      className="section-y relative z-10 overflow-x-clip bg-paper text-ink"
    >
      <div className="page-x grid-12 gap-y-12 md:gap-y-0">
        <h2
          id="escritorio-titulo"
          className="text-display-m col-span-12 md:col-span-5 md:row-start-1 lg:col-span-4 md:pt-[clamp(0px,6vw,110px)]"
        >
          <span className="sr-only">{OFFICE.title}</span>
          <span aria-hidden="true">
            {TITLE.map((line, i) => (
              <Line key={line} delay={i * 0.1}>
                {line}
              </Line>
            ))}
          </span>
        </h2>

        <div className="relative col-span-12 md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:-mr-[var(--margin)] lg:col-span-8 lg:col-start-5">
          <Frame slot="office1" sizes="(min-width: 1024px) 62vw, 100vw" range={6} tone="dark" />
          <div className="absolute -bottom-[13%] left-0 hidden w-[31%] -translate-x-[34%] border-[10px] border-paper md:block">
            <Frame slot="office2" sizes="20vw" range={0} delay={0.25} tone="dark" />
          </div>
        </div>

        <Reveal className="col-span-12 md:col-span-5 md:row-start-2 md:self-start lg:col-span-3 md:pt-10">
          <p className={`max-w-[26rem] ${pendingClass(OFFICE.body)}`}>{OFFICE.body}</p>
          <dl className="mt-10 border-t border-paper-line">
            <div className="border-b border-paper-line py-4">
              <dt className="label text-ash">Endereço</dt>
              <dd className="mt-2">
                {a.street}
                <br />
                {a.district} · {a.city} — {a.state}
                <br />
                <span className="tabular-nums">{a.zip}</span>
              </dd>
            </div>
          </dl>
          <p className="mt-5">
            <TextLink href={SITE.links.map} external className="label">
              Como chegar
            </TextLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
