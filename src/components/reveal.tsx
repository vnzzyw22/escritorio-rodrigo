import type { CSSProperties, ReactNode } from "react";

/**
 * Revelações de entrada em CSS (transform e opacidade). O servidor entrega o HTML escondido e um
 * único IntersectionObserver (reveal-observer.tsx) marca `data-shown` ao entrar na tela.
 * Sem JavaScript por elemento e sem dependência de servidor: podem ser usados em qualquer componente.
 */

const delayVar = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** Linha de texto que sobe de dentro de uma máscara ao entrar na tela. */
export function Line({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    // padding/margem negativa compensam ascendentes e descendentes que a máscara cortaria
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <span data-reveal className={`rv-line ${className}`} style={delayVar(delay)}>
        {children}
      </span>
    </span>
  );
}

/** Entrada discreta: opacidade e um deslocamento curto. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div data-reveal className={`rv-fade ${className}`} style={delayVar(delay)}>
      {children}
    </div>
  );
}
