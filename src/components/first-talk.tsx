import { FIRST_TALK } from "@/lib/content";
import { FirstTalkTabs } from "./first-talk-tabs";
import { Line, Reveal } from "./motion";

/**
 * "Primeira conversa": por assunto, o que costuma ajudar a ter em mãos, e um botão que abre o WhatsApp
 * já com o assunto (e o que a pessoa marcou). Substitui a seção de artigos enquanto não há artigos reais.
 * Texto e título no servidor; só as abas e as caixas de marcar vivem no cliente (first-talk-tabs.tsx).
 */
export function FirstTalk() {
  return (
    <section
      id="primeira-conversa"
      data-section="primeira-conversa"
      data-label="Primeira conversa"
      data-theme="light"
      aria-labelledby="primeira-conversa-titulo"
      className="section-y relative z-10 cover-deep bg-paper-deep text-ink"
    >
      <div className="page-x grid-12 gap-y-8 md:gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <h2 id="primeira-conversa-titulo" className="text-display-m">
            <span className="sr-only">{FIRST_TALK.title}</span>
            <span aria-hidden="true">
              <Line>Para a primeira</Line>
              <Line delay={0.1} className="md:pl-[12%] lg:pl-0">
                conversa.
              </Line>
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[26rem]">{FIRST_TALK.intro}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="col-span-12 lg:col-span-7 lg:col-start-6">
          <FirstTalkTabs />
        </Reveal>
      </div>
    </section>
  );
}
