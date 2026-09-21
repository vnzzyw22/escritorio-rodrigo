import { SITE } from "@/lib/site";
import { Reveal } from "./motion";
import { ReviewsCarousel } from "./reviews-carousel";
import { TextLink } from "./ui";

/**
 * Avaliações do Google: a nota e a contagem (informadas pelo cliente) e, quando houver, avaliações
 * reais copiadas do Google (`SITE.reviews.featured`) em um carrossel compacto ao lado. Sem avaliações
 * cadastradas, só a faixa com a nota aparece. Desligue tudo em `SITE.flags.socialProof`.
 */
export function SocialProof() {
  if (!SITE.flags.socialProof) return null;
  const featured = SITE.reviews.featured;
  const link = (
    <TextLink href={SITE.links.reviews} external className="label">
      Ver no Google
    </TextLink>
  );
  return (
    <section
      id="avaliacoes"
      data-section="avaliacoes"
      data-label="Avaliações"
      data-theme="light"
      aria-label="Avaliações no Google"
      className="relative z-10 border-t border-paper-line bg-paper text-ink"
    >
      <Reveal className="page-x grid-12 items-start gap-y-8 py-[clamp(40px,6vw,88px)]">
        {featured.length > 0 ? (
          <>
            <div className="col-span-12 lg:col-span-5">
              <p className="text-display-m">
                Nota {SITE.reviews.rating} em {SITE.reviews.count} avaliações no Google.
              </p>
              <p className="mt-6">{link}</p>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-3">
              <ReviewsCarousel reviews={featured} />
            </div>
          </>
        ) : (
          <>
            <p className="text-display-m col-span-12 lg:col-span-9">
              Nota {SITE.reviews.rating} em {SITE.reviews.count} avaliações no Google.
            </p>
            <p className="col-span-12 lg:col-span-3 lg:justify-self-end">{link}</p>
          </>
        )}
      </Reveal>
    </section>
  );
}
