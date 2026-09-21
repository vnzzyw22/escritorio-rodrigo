"use client";

import { useActiveSection } from "./providers";

/**
 * Trilho de margem (≥ xl): mostra em que seção o leitor está e quanto da página já leu.
 * É orientação, não decoração; a navegação de verdade fica no cabeçalho.
 * O preenchimento da linha é CSS scroll-driven (`.rail-fill`), sem JavaScript por quadro.
 * A caixa do rótulo tem altura fixa: a linha não muda de lugar quando o nome da seção muda.
 */
export function Rail() {
  const active = useActiveSection();
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-10 top-[calc(var(--nav-h)+40px)] z-40 hidden w-3 flex-col items-center gap-5 transition-colors duration-500 xl:flex ${
        active.theme === "dark" ? "text-paper/70" : "text-ash"
      }`}
      style={{ left: "calc(var(--margin) / 2 - 6px)" }}
    >
      <span className="label h-[11.5rem] shrink-0 rotate-180 whitespace-nowrap text-right [writing-mode:vertical-rl]">
        {active.label}
      </span>
      <span className="relative w-px flex-1 bg-current/20">
        <span className="rail-fill absolute inset-0 origin-top bg-current" />
      </span>
    </div>
  );
}
