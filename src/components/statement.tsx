import { STATEMENT } from "@/lib/content";
import { RMark } from "./brand";
import { Line } from "./motion";

/**
 * A folha de papel que cobre o hero. Uma frase, em corpo grande e com quebra assimétrica:
 * cada linha recua um pouco mais. Nada mais na dobra. Componente de servidor.
 * `.stmt` define a linha do tempo que anima o hero por baixo (ver .cv-* em globals.css).
 */
export function Statement() {
  const indents = ["", "pl-[9%] md:pl-[16.66%]", "pl-[18%] md:pl-[33.33%]"];

  return (
    <section
      id="declaracao"
      data-section="declaracao"
      data-label="Declaração"
      data-theme="light"
      aria-labelledby="declaracao-titulo"
      className="stmt relative z-10 flex items-center overflow-hidden border-t border-paper-line bg-paper text-ink md:min-h-[100svh]"
    >
      <div
        aria-hidden="true"
        className="stmt-mark absolute -left-[6vw] top-1/2 -translate-y-1/2 opacity-[0.045]"
      >
        <RMark size="min(78vw, 1100px)" />
      </div>

      <div className="page-x relative w-full pb-10 pt-[var(--section-y)] md:py-[var(--section-y)]">
        <h2 id="declaracao-titulo" className="text-display-l">
          {STATEMENT.map((line, i) => (
            <Line key={line} delay={i * 0.12} className={indents[i] ?? ""}>
              {line}
            </Line>
          ))}
        </h2>
      </div>
    </section>
  );
}
