import { INSIGHTS, pendingClass } from "@/lib/content";
import { Frame, Line, Reveal } from "./motion";

type Entry = { key: string; category: string; title: string; date: string };

/**
 * "Sumário" de jornal: uma matéria em destaque e uma lista de linhas com categoria, título e data.
 * Sem publicações reais, mostra a estrutura com placeholders. Ao publicar, preencha `INSIGHTS.posts`
 * (e crie a rota da matéria: hoje as linhas não são links, porque não há artigo para abrir).
 */
export function Insights() {
  const real = INSIGHTS.posts.map((p) => ({ key: p.slug, category: p.category, title: p.title, date: p.date }));
  const all: Entry[] = real.length
    ? real
    : [{ key: "destaque", ...INSIGHTS.placeholder.featured }, ...INSIGHTS.placeholder.items];
  const [featured, ...rest] = all;

  return (
    <section
      id="conteudo"
      data-section="conteudo"
      data-label="Conteúdo"
      data-theme="light"
      aria-labelledby="conteudo-titulo"
      className="section-y relative z-10 bg-paper text-ink"
    >
      <div className="page-x grid-12 gap-y-14">
        <h2 id="conteudo-titulo" className="text-display-m col-span-12 lg:col-span-8">
          <span className="sr-only">{INSIGHTS.title}</span>
          <span aria-hidden="true">
            <Line>Perspectivas</Line>
            <Line delay={0.1} className="md:pl-[12%]">
              sobre o Direito.
            </Line>
          </span>
        </h2>

        <Reveal className="col-span-12 lg:col-span-7">
          <Frame slot="featured" sizes="(min-width: 1024px) 55vw, 100vw" range={5} tone="dark" />
          <div className="label mt-5 flex items-center justify-between gap-6 text-ash">
            <span className={pendingClass(featured.category)}>{featured.category}</span>
            <span className={pendingClass(featured.date)}>{featured.date}</span>
          </div>
          <p className={`text-title mt-3 font-display ${pendingClass(featured.title)}`}>{featured.title}</p>
        </Reveal>

        <Reveal delay={0.1} className="col-span-12 lg:col-span-4 lg:col-start-9">
          <ul className="border-t border-paper-line">
            {rest.map((item) => (
              <li key={item.key} className="border-b border-paper-line py-6">
                <div className="label flex items-center justify-between gap-6 text-ash">
                  <span className={pendingClass(item.category)}>{item.category}</span>
                  <span className={pendingClass(item.date)}>{item.date}</span>
                </div>
                <p className={`mt-3 font-display text-[1.5rem] leading-[1.2] ${pendingClass(item.title)}`}>
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
