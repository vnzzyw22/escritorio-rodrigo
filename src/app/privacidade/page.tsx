import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand";
import { PRIVACY, pendingClass } from "@/lib/content";
import { SITE } from "@/lib/site";
import { TEL_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: `Privacidade e cookies — ${SITE.name}`,
  description: "Como este site trata dados pessoais e cookies, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).",
};

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="border-t border-paper-line pt-8 md:pt-10">
      <h2 id={`${id}-t`} className="text-title">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed">{children}</div>
    </section>
  );
}

const A = SITE.address;

/**
 * Política de privacidade e de cookies. Escrita a partir do que o site de fato faz (ver src/): não usa cookies,
 * não grava nada no navegador, não tem analytics nem formulário que envie dados a servidor próprio.
 * Se algo disso mudar (analytics, pixel, formulário com envio), este texto e o aviso de cookies precisam mudar antes.
 * Minuta: o advogado responsável deve revisar e aprovar antes da publicação definitiva.
 */
export default function Privacidade() {
  return (
    <div className="bg-paper text-ink">
      <header className="page-x flex items-center justify-between border-b border-paper-line py-5">
        <Link href="/" aria-label={`${SITE.name}: início`} className="hit">
          <Wordmark />
        </Link>
        <Link href="/" className="label link-u hit">
          Voltar ao site
        </Link>
      </header>

      <main id="conteudo-principal" className="page-x grid-12 pb-[clamp(64px,9vw,140px)] pt-[clamp(48px,7vw,104px)]">
        <div className="col-span-12 lg:col-span-9 xl:col-span-7">
          <p className="label text-ash">Atualizada em {PRIVACY.updated}</p>
          <h1 className="text-display-m mt-4">Privacidade e cookies.</h1>
          <p className="mt-6 text-lead">
            Este texto explica, sem rodeios, o que acontece com os seus dados quando você usa este site. Segue a Lei Geral de
            Proteção de Dados (LGPD, Lei 13.709/2018).
          </p>
          {SITE.flags.conceptNotice && (
            <p className="mt-4 text-ash">Minuta em revisão: o advogado responsável ainda vai validar este texto.</p>
          )}

          <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
            <Section id="resumo" title="Em resumo">
              <ul className="list-disc space-y-2 pl-5">
                <li>Este site não usa cookies e não grava nada no seu navegador.</li>
                <li>Não há cadastro, conta, análise de audiência, publicidade nem rastreadores.</li>
                <li>O que você escreve no formulário de contato não é enviado a nós pelo site: ele apenas prepara uma mensagem no seu WhatsApp.</li>
                <li>Por isso não mostramos um aviso de cookies: não há o que aceitar.</li>
              </ul>
            </Section>

            <Section id="controlador" title="Quem é o responsável">
              <p>
                <strong className="font-normal">{SITE.name}</strong>, de Rodrigo Alan Dias, advogado inscrito na OAB/PR 90.980.
                <br />
                {A.street}, {A.district}, {A.city} — {A.state}, CEP {A.zip}.
                <br />
                Telefone e WhatsApp:{" "}
                <a href={TEL_URL} className="link-u hit tabular-nums">
                  {SITE.phone.display}
                </a>
                .
              </p>
              <p>
                Para assuntos de privacidade e dados pessoais:{" "}
                <span className={pendingClass(PRIVACY.email)}>{PRIVACY.email}</span>. Enquanto isso, use o telefone ou o WhatsApp acima.
              </p>
            </Section>

            <Section id="cookies" title="Cookies e tecnologias semelhantes">
              <p>
                Este site não usa cookies próprios nem de terceiros. Também não usa o armazenamento local do navegador, pixels de
                anúncio, ferramentas de análise de audiência ou mapas incorporados. As fontes de letra são servidas pelo próprio
                site, sem chamar o Google Fonts.
              </p>
              <p>
                Ao tocar em um link que sai do site (WhatsApp, Google Maps, avaliações no Google, Facebook), você passa a usar o
                serviço de outra empresa, que pode usar cookies próprios e tem política própria. O site também não carrega nada
                dessas empresas antes de você tocar no link.
              </p>
              <p>
                Se um dia passarmos a usar cookies não essenciais (por exemplo, análise de audiência), este texto será
                atualizado antes e o site pedirá o seu consentimento, que você poderá recusar ou retirar a qualquer momento.
              </p>
            </Section>

            <Section id="dados" title="Quais dados tratamos">
              <p>
                <strong className="font-normal">Formulário de contato.</strong> Você digita seu nome e um resumo. O site monta uma
                mensagem e abre o WhatsApp no seu aparelho. Nada é enviado, guardado ou visto por nós até que você, dentro do
                WhatsApp, decida enviar. A partir daí a conversa segue as regras do WhatsApp e do item abaixo.
              </p>
              <p>
                <strong className="font-normal">Ligações e mensagens.</strong> Se você nos chamar por telefone ou WhatsApp,
                recebemos o seu número e o que você escrever ou disser. Usamos isso para responder ao seu pedido e, se houver
                contratação, para prestar o serviço. Essas conversas são protegidas pelo sigilo profissional da advocacia
                (Estatuto da Advocacia, Lei 8.906/1994, e Código de Ética e Disciplina da OAB).
              </p>
              <p>
                <strong className="font-normal">Dados técnicos de acesso.</strong> A empresa que hospeda o site (Vercel Inc., nos
                Estados Unidos) registra, como em qualquer site, dados como endereço IP, data e hora, página acessada e tipo de
                navegador. Isso serve à segurança e ao funcionamento do site; não usamos esses registros para identificar
                visitantes nem para publicidade.
              </p>
              <p>
                Não recomendamos enviar documentos, números de processo ou informações sigilosas pelo formulário. Isso fica para a
                conversa com o advogado.
              </p>
            </Section>

            <Section id="bases" title="Por que podemos tratar esses dados">
              <ul className="list-disc space-y-2 pl-5">
                <li>Responder ao seu pedido de contato e, se você quiser contratar, tomar as providências preliminares (LGPD, art. 7º, V).</li>
                <li>Cumprir obrigações legais e regulatórias da advocacia (art. 7º, II).</li>
                <li>Manter a segurança e o funcionamento do site, em interesse legítimo (art. 7º, IX).</li>
              </ul>
            </Section>

            <Section id="compartilhamento" title="Com quem compartilhamos">
              <p>
                Não vendemos nem cedemos dados a terceiros para fins comerciais. Os dados podem passar por prestadores que
                tornam o serviço possível: a hospedagem do site (Vercel Inc.) e o WhatsApp (Meta Platforms), quando você os usa
                para falar conosco. Esses prestadores podem estar fora do Brasil (transferência internacional, LGPD, art. 33).
                Também podemos compartilhar dados quando uma lei ou ordem de autoridade exigir.
              </p>
            </Section>

            <Section id="guarda" title="Por quanto tempo guardamos">
              <p>
                Conversas de atendimento são mantidas pelo tempo necessário ao atendimento e ao cumprimento de deveres
                profissionais e legais. Depois disso, são eliminadas ou anonimizadas. Os registros técnicos de acesso seguem o
                prazo do provedor de hospedagem.
              </p>
            </Section>

            <Section id="direitos" title="Seus direitos">
              <p>Você pode pedir, a qualquer momento e sem custo:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>confirmação de que tratamos dados seus e acesso a eles;</li>
                <li>correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desacordo com a lei;</li>
                <li>portabilidade dos dados, quando aplicável;</li>
                <li>informação sobre com quem compartilhamos os dados;</li>
                <li>retirada de consentimento, quando o tratamento depender dele, e oposição a tratamento indevido.</li>
              </ul>
              <p>
                Basta pedir pelos contatos acima. Alguns dados podem precisar ser mantidos por obrigação legal ou pelo sigilo
                profissional; nesse caso, explicaremos o motivo. Se achar que seus direitos não foram respeitados, você também
                pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
              </p>
            </Section>

            <Section id="seguranca" title="Segurança">
              <p>
                O site é servido por conexão segura (HTTPS) e com proteções de segurança do navegador ativadas. Nenhum sistema é
                totalmente livre de risco, mas coletamos o mínimo possível justamente para expor o mínimo possível.
              </p>
            </Section>

            <Section id="alteracoes" title="Mudanças neste texto">
              <p>
                Se o site passar a tratar dados de outra forma, esta página será atualizada, com a data no topo. A versão em vigor
                é sempre a publicada aqui.
              </p>
            </Section>
          </div>
        </div>
      </main>

      <footer className="page-x border-t border-paper-line py-8">
        <p className="label flex flex-wrap gap-x-6 gap-y-2 text-ash">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <Link href="/" className="link-u hit">
            Voltar ao site
          </Link>
        </p>
      </footer>
    </div>
  );
}
