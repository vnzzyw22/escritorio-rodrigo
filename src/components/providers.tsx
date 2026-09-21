"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { RevealObserver } from "./reveal-observer";

/* ------------------------------------------------------- seção ativa */

export type ActiveSection = { id: string; label: string; theme: "dark" | "light" };

const INITIAL: ActiveSection = { id: "inicio", label: "Início", theme: "dark" };
const SectionContext = createContext<ActiveSection>(INITIAL);

export const useActiveSection = () => useContext(SectionContext);

/** Linha de leitura: a seção ativa é a última (na ordem do DOM) que cruza uma faixa fina a 72px do topo. */
const READING_LINE = 72;

function Sections({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ActiveSection>(INITIAL);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!nodes.length) return;
    const crossing = new Set<HTMLElement>();
    let io: IntersectionObserver | null = null;

    const publish = () => {
      let current: HTMLElement | undefined;
      for (const n of nodes) if (crossing.has(n)) current = n; // ordem do DOM: a última vence
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

    // Um observador com uma faixa de 1px: só dispara quando uma seção entra ou sai dela.
    // Sem leitura de layout a cada quadro de rolagem.
    const observe = () => {
      io?.disconnect();
      crossing.clear();
      const bottom = Math.max(0, window.innerHeight - READING_LINE - 1);
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) crossing.add(e.target as HTMLElement);
            else crossing.delete(e.target as HTMLElement);
          }
          publish();
        },
        { rootMargin: `-${READING_LINE}px 0px -${bottom}px 0px` },
      );
      nodes.forEach((n) => io!.observe(n));
    };

    observe();
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(observe, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, []);

  return <SectionContext.Provider value={active}>{children}</SectionContext.Provider>;
}

/* --------------------------------------------------------------- raiz */

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Sections>
      <RevealObserver />
      {children}
    </Sections>
  );
}
