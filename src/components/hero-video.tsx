"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery, useReduceMotion } from "./hooks";

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Vídeo opcional do hero. Não existe arquivo → não renderiza nada (o poster segue).
 * Só carrega depois do primeiro paint e só quando permitido: sem prefers-reduced-motion,
 * sem economia de dados e sem conexão 2g. Pausa fora da tela e com a aba escondida.
 * No celular usa só o vídeo vertical: nunca baixa o vídeo de desktop.
 */
export function HeroVideo({ desktop, mobile }: { desktop: string | null; mobile: string | null }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduce = useReduceMotion();
  const src = isMobile ? mobile : desktop;

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
      className={`absolute inset-0 size-full object-cover transition-opacity duration-[1400ms] [object-position:50%_88%] md:[object-position:50%_55%] ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
