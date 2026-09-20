"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import type { ResolvedMedia, ResolvedSlot } from "@/lib/media";

/* ---------------------------------------------------------------- mídia */

const MediaContext = createContext<ResolvedMedia | null>(null);

export function useSlot(id: string): ResolvedSlot {
  const media = useContext(MediaContext);
  if (!media) throw new Error("Providers ausente");
  const slot = media[id];
  if (!slot) throw new Error(`Slot de mídia desconhecido: ${id}`);
  return slot;
}

/* ------------------------------------------------------- seção ativa */

export type ActiveSection = { id: string; label: string; theme: "dark" | "light" };

const INITIAL: ActiveSection = { id: "inicio", label: "Início", theme: "dark" };
const SectionContext = createContext<ActiveSection>(INITIAL);

export const useActiveSection = () => useContext(SectionContext);

/** Linha de leitura: a seção ativa é a última (na ordem do DOM) cujo topo já passou dela. */
const READING_LINE = 72;

function Sections({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ActiveSection>(INITIAL);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
      let current = nodes[0];
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= READING_LINE) current = node;
      }
      if (!current) return;
      const next: ActiveSection = {
        id: current.dataset.section ?? "inicio",
        label: current.dataset.label ?? "",
        theme: current.dataset.theme === "light" ? "light" : "dark",
      };
      setActive((prev) =>
        prev.id === next.id && prev.theme === next.theme && prev.label === next.label ? prev : next,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <SectionContext.Provider value={active}>{children}</SectionContext.Provider>;
}

/* --------------------------------------------------------------- raiz */

// Recursos de animação carregados depois do primeiro paint; o JS inicial só leva o núcleo (`m`).
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function Providers({
  media,
  children,
}: {
  media: ResolvedMedia;
  children: React.ReactNode;
}) {
  return (
    // "user": respeita prefers-reduced-motion nas animações de transform.
    // clip-path e vídeo são tratados à parte (useReduceMotion), porque o framer não os desliga.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <MediaContext.Provider value={media}>
          <Sections>{children}</Sections>
        </MediaContext.Provider>
      </LazyMotion>
    </MotionConfig>
  );
}
