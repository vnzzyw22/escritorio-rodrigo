import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { HERO } from "@/lib/content";
import { getMedia } from "@/lib/media.server";
import { SITE } from "@/lib/site";
import { Wordmark } from "./brand";
import { HeroVideo } from "./hero-video";
import { ButtonLink, TextLink } from "./ui";

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Poster sempre presente: é a imagem LCP. Arte-direção: recorte próprio para o celular. */
async function HeroPoster() {
  const media = await getMedia();
  const d = media.heroPoster.src ?? media.heroPosterMobile.src;
  const m = media.heroPosterMobile.src ?? media.heroPoster.src;
  if (!d || !m) return <div className="absolute inset-0 bg-graphite" />;

  const common = { alt: "", fill: true, sizes: "100vw" };
  const { props: deskProps } = getImageProps({ ...common, src: d });
  const { props: mobProps } = getImageProps({ ...common, src: m });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={deskProps.srcSet} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={mobProps.srcSet} sizes="100vw" />
      <img
        src={deskProps.src}
        srcSet={deskProps.srcSet}
        sizes="100vw"
        alt=""
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover [object-position:50%_88%] md:[object-position:50%_55%]"
      />
    </picture>
  );
}

/**
 * Hero. Componente de servidor: o texto e a imagem chegam no HTML, sem esperar JavaScript.
 * A "cortina" (a folha do statement cobrindo o hero) é CSS scroll-driven: ver .cv-* em globals.css.
 */
export async function Hero() {
  const media = await getMedia();
  return (
    <section
      id="inicio"
      data-section="inicio"
      data-label="Início"
      data-theme="dark"
      aria-label="Apresentação"
      className="dark-surface relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper md:sticky md:top-0 md:z-0 md:block md:h-[100svh] md:min-h-[640px]"
    >
      {/* Mídia. Celular: bloco no topo. Desktop: fundo de tela cheia. */}
      <div className="relative min-h-[46svh] flex-1 md:absolute md:inset-0 md:h-auto md:min-h-0 md:flex-none">
        <div className="cv-media absolute inset-0 origin-center">
          <HeroPoster />
          <HeroVideo desktop={media.heroVideoDesktop.src} mobile={media.heroVideoMobile.src} />
        </div>
        {/* Máscaras funcionais: garantem contraste do texto e do menu sobre a foto. */}
        <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-ink/85 via-ink/55 to-transparent" />
        <div className="absolute inset-0 hidden bg-ink/30 md:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-[64%] bg-linear-to-t from-ink/90 via-ink/45 to-transparent md:block" />
        <div className="cv-veil absolute inset-0 bg-ink opacity-0" />
      </div>

      {/*
        Assinatura: o lockup tipográfico (Wordmark), pequeno, discreto, sem moldura — não há logo real do
        Vasconcelos ainda (ver brand.tsx). O contêiner (.hero-mark) é movido/esmaecido pela rolagem.
        Celular: no fluxo, acima do título, sobre ink (fora do vídeo).
      */}
      <div className="hero-mark page-x pointer-events-none relative pt-6 md:absolute md:inset-x-0 md:top-[calc(var(--nav-h)+clamp(24px,5.5vh,60px))] md:pt-0">
        <div className="fade-in" style={delay(0.5)}>
          <Wordmark />
        </div>
      </div>


      {/* Texto. Celular: abaixo da foto, sobre ink. Desktop: sobre a base da imagem. */}
      <div className="cv-text page-x relative flex flex-col pb-7 pt-6 md:absolute md:inset-0 md:pb-[clamp(24px,4.5vh,52px)] md:pt-[var(--nav-h)]">
        <div className="grid-12 items-end gap-y-5 md:mt-auto lg:gap-y-8">
          <h1 className="text-display-xl col-span-12 lg:col-span-7">
            {HERO.headline.map((line, i) => (
              <span key={line} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <span className="rise block" style={delay(1.7 + i * 0.14)}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pb-2">
            <p className="fade-in text-lead max-w-[24rem] text-paper/90" style={delay(2.4)}>
              {HERO.lead}
            </p>
            <div
              className="fade-in mt-6 flex flex-col items-stretch gap-4 md:mt-8 md:gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-5"
              style={delay(2.6)}
            >
              <ButtonLink href={HERO.primary.href}>{HERO.primary.label}</ButtonLink>
              <TextLink href={HERO.secondary.href} className="label self-start sm:self-auto">
                {HERO.secondary.label}
              </TextLink>
            </div>
          </div>
        </div>

        <div
          className="fade-in label mt-10 hidden items-center justify-between gap-6 border-t border-paper/20 pt-4 text-paper/75 md:mt-12 md:flex"
          style={delay(2.85)}
        >
          <span>{SITE.name}</span>
          <span className="hidden sm:inline">
            {SITE.address.city} — {SITE.address.state}
          </span>
        </div>
      </div>
    </section>
  );
}
