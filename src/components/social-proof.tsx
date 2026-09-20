"use client";

import { SITE } from "@/lib/site";
import { Reveal } from "./motion";
import { TextLink } from "./ui";

/**
 * Faixa fina com o agregado público do Google (nota e contagem informadas pelo cliente).
 * Sem citações, nomes, casos ou resultados. Desligue em `SITE.flags.socialProof`.
 */
export function SocialProof() {
  if (!SITE.flags.socialProof) return null;
  return (
    <section
      id="avaliacoes"
      data-section="avaliacoes"
      data-label="Avaliações"
      data-theme="light"
      aria-label="Avaliações no Google"
      className="relative z-10 border-t border-paper-line bg-paper text-ink"
    >
      <Reveal className="page-x grid-12 items-baseline gap-y-5 py-[clamp(56px,7vw,104px)]">
        <p className="text-display-m col-span-12 lg:col-span-9">
          Nota {SITE.reviews.rating} em {SITE.reviews.count} avaliações no Google.
        </p>
        <p className="col-span-12 lg:col-span-3 lg:justify-self-end">
          <TextLink href={SITE.links.reviews} external className="label">
            Ver no Google
          </TextLink>
        </p>
      </Reveal>
    </section>
  );
}
