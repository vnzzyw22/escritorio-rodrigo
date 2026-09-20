"use client";

import { m, useTransform, type MotionValue } from "framer-motion";
import { getImageProps } from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { HERO } from "@/lib/content";
import { SITE } from "@/lib/site";
import { RMark } from "./brand";
import { useMediaQuery, useReduceMotion } from "./hooks";
import { useSlot } from "./providers";
import { ButtonLink, TextLink } from "./ui";

/* ------------------------------------------------------------------ */
/* Mídia do hero: poster sempre (é o LCP); vídeo só depois, se permitido */
/* ------------------------------------------------------------------ */

function HeroPoster() {
  const desktop = useSlot("heroPoster");
  const mobile = useSlot("heroPosterMobile");
  const d = desktop.src ?? mobile.src;
  const m = mobile.src ?? desktop.src;
  if (!d || !m) return <div className="absolute inset-0 bg-graphite" />;

  const common = { alt: "", fill: true, quality: 75 as const, sizes: "100vw" };
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
        decoding="async"
        className="absolute inset-0 size-full object-cover md:[object-position:50%_55%]"
      />
    </picture>
  );
}

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Vídeo opcional. Não existe arquivo → não renderiza nada (o poster segue).
 * Só carrega depois do primeiro paint e só quando permitido: sem prefers-reduced-motion,
 * sem economia de dados e sem conexão 2g. Pausa fora da tela e com a aba escondida.
 */
function HeroVideo() {
  const desktop = useSlot("heroVideoDesktop");
  const mobile = useSlot("heroVideoMobile");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduce = useReduceMotion();
  // No celular só o vídeo vertical: nunca baixa o vídeo pesado de desktop.
  const src = isMobile ? mobile.src : desktop.src;

  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!src) return;
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    const allow = () => setAllowed(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(allow, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    // Safari não tem requestIdleCallback.
    const id = setTimeout(allow, 600);
    return () => clearTimeout(id);
  }, [src]);

  const active = Boolean(src) && allowed && !reduce;

  useEffect(() => {
    const video = ref.current;
    if (!video || !active) return;
    video.muted = true;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) void video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    const onVisibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active, src]);

  if (!active || !src) return null;
  return (
    <video
      key={src}
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
      onLoadStart={() => setPlaying(false)}
      onPlaying={() => setPlaying(true)}
      onError={() => setPlaying(false)}
      className={`absolute inset-0 size-full object-cover transition-opacity duration-[1400ms] md:[object-position:50%_55%] ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

/* ------------------------------------------------------------------ */

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export function Hero({ progress }: { progress: MotionValue<number> }) {
  const desktop = useMediaQuery("(min-width: 768px)");
  const reduce = useReduceMotion();
  const cover = desktop && !reduce; // a folha cobre o hero só onde ele é fixo

  // À medida que a folha sobe, a imagem recua e escurece; o texto sai antes.
  const mediaY = useTransform(progress, [0, 1], ["0%", "-4%"]);
  const mediaScale = useTransform(progress, [0, 1], [1, 1.05]);
  const veil = useTransform(progress, [0, 1], [0, 0.6]);
  const textOpacity = useTransform(progress, [0, 0.55], [1, 0]);
  const textY = useTransform(progress, [0, 1], ["0%", "-5%"]);

  return (
    <section
      id="inicio"
      data-section="inicio"
      data-label="Início"
      data-theme="dark"
      aria-label="Apresentação"
      className="dark-surface relative isolate overflow-hidden bg-ink text-paper md:sticky md:top-0 md:z-0 md:h-[100svh] md:min-h-[640px]"
    >
      {/* Mídia. Celular: bloco no topo. Desktop: fundo de tela cheia. */}
      <div className="relative h-[52svh] min-h-[360px] md:absolute md:inset-0 md:h-auto">
        <m.div
          className="absolute inset-0 origin-center"
          style={cover ? { y: mediaY, scale: mediaScale } : undefined}
        >
          <HeroPoster />
          <HeroVideo />
        </m.div>
        {/* Máscaras funcionais: garantem contraste do texto e do menu sobre a foto. */}
        <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-ink/85 via-ink/55 to-transparent" />
        <div className="absolute inset-0 hidden bg-ink/30 md:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-[64%] bg-linear-to-t from-ink/90 via-ink/45 to-transparent md:block" />
        <m.div className="absolute inset-0 bg-ink" style={{ opacity: cover ? veil : 0 }} />
      </div>

      {/* A opacidade fica no contêiner: a animação de entrada termina em opacity 1 e a sobrescreveria. */}
      <div
        aria-hidden="true"
        className="absolute -right-[7vw] -bottom-[16vw] hidden opacity-[0.06] md:block"
      >
        <div className="fade-in" style={delay(0.6)}>
          <RMark size="min(64vw, 900px)" onDark />
        </div>
      </div>

      {/* Texto. Celular: abaixo da foto, sobre ink. Desktop: sobre a base da imagem. */}
      <m.div
        className="page-x relative flex flex-col pb-8 pt-10 md:absolute md:inset-0 md:pb-[clamp(24px,4.5vh,52px)] md:pt-[var(--nav-h)]"
        style={cover ? { opacity: textOpacity, y: textY } : undefined}
      >
        <div className="grid-12 items-end gap-y-8 md:mt-auto">
          <h1 className="text-display-xl col-span-12 lg:col-span-7">
            {HERO.headline.map((line, i) => (
              <span key={line} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <span className="rise block" style={delay(0.15 + i * 0.14)}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pb-2">
            <p className="fade-in text-lead max-w-[24rem] text-paper/90" style={delay(0.85)}>
              {HERO.lead}
            </p>
            <div
              className="fade-in mt-8 flex flex-col items-stretch gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-5"
              style={delay(1.05)}
            >
              <ButtonLink href={HERO.primary.href}>{HERO.primary.label}</ButtonLink>
              <TextLink href={HERO.secondary.href} className="label self-start sm:self-auto">
                {HERO.secondary.label}
              </TextLink>
            </div>
          </div>
        </div>

        <div
          className="fade-in label mt-10 flex items-center justify-between gap-6 border-t border-paper/20 pt-4 text-paper/75 md:mt-12"
          style={delay(1.3)}
        >
          <span>{SITE.name}</span>
          <span className="hidden sm:inline">
            {SITE.address.city} — {SITE.address.state}
          </span>
        </div>
      </m.div>
    </section>
  );
}
