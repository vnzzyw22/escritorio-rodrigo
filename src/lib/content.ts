/**
 * Todo o texto do site. Placeholders seguem o formato `[X A CONFIRMAR]` e nunca são
 * preenchidos com texto fictício: quando o cliente confirmar, substitua a string aqui.
 */

import { SITE } from "./site";

export const pending = (what: string) => `[${what} A CONFIRMAR]`;
export const isPending = (text: string) => /^\[.+\]$/.test(text.trim());
/** Classe de estilo para textos ainda não confirmados. */
export const pendingClass = (text: string) => (isPending(text) ? "pending" : "");

export const NAV: { id: string; label: string }[] = [
  { id: "escritorio", label: "O escritório" },
  { id: "areas", label: "Áreas de atuação" },
  { id: "profissional", label: "Profissional" },
  ...(SITE.flags.articles ? [{ id: "conteudo", label: "Conteúdo" }] : []),
  { id: "primeira-conversa", label: "Primeira conversa" },
  { id: "contato", label: "Contato" },
];

export const HERO = {
  headline: ["Direito exige", "clareza."],
  lead: "Decisões importantes exigem compreensão, estratégia e orientação precisa.",
  primary: { label: "Conheça o escritório", href: "#escritorio" },
  secondary: { label: "Entre em contato", href: "#contato" },
} as const;

/** Uma linha por item; o recuo de cada linha é decisão de composição da seção. */
export const STATEMENT = ["Antes de agir,", "é preciso", "compreender."] as const;

export const OFFICE = {
  title: "Estratégia jurídica, com clareza.",
  /** Só os fatos informados pelo usuário em 2026-09-22 (cidade, áreas, forma de atuação); nada além disso. */
  body: "Vasconcelos — Escritório de Advocacia atua em Maringá (PR), nas áreas de Direito Administrativo, Bancário e Imobiliário. O trabalho é consultivo, preventivo e contencioso, com leitura atenta de cada caso antes de qualquer decisão.",
} as const;

export type Area = { slug: string; title: string; description: string };

/**
 * Áreas de atuação REAIS, informadas pelo usuário em 2026-09-22 (não são exemplo). O `slug` é o nome do
 * arquivo da foto: public/images/practice/<slug>.webp. As descrições usam só os itens informados no
 * briefing, sem acrescentar subespecialidade, prazo ou promessa (Provimento 205/2021).
 */
export const AREAS: Area[] = [
  {
    slug: "administrativo",
    title: "Direito Administrativo",
    description:
      "Suporte jurídico a servidores públicos e atuação em processos administrativos, da orientação preventiva à defesa técnica, diante de órgãos e entidades da administração pública.",
  },
  {
    slug: "bancario",
    title: "Direito Bancário",
    description:
      "Análise e revisão de contratos financeiros, com atenção a cláusulas potencialmente abusivas, e defesa de devedores em questões relacionadas a instituições bancárias.",
  },
  {
    slug: "imobiliario",
    title: "Direito Imobiliário",
    description:
      "Regularização fundiária, contratos de compra e venda e questões de posse e propriedade, com o cuidado que cada etapa de uma negociação imobiliária exige.",
  },
];

export const PROFESSIONAL = {
  name: ["Michael", "Vasconcelos"],
  fields: [
    { label: "Formação", value: pending("FORMAÇÃO") },
    { label: "Inscrição na OAB", value: pending("OAB") },
    {
      label: "Atuação",
      value: "Advocacia em Maringá (PR), nas áreas de Direito Administrativo, Bancário e Imobiliário.",
    },
    { label: "Apresentação", value: pending("TEXTO DE APRESENTAÇÃO") },
  ],
} as const;

export type Topic = { slug: string; tab: string; docs: string[] };

/**
 * "Primeira conversa": por assunto, uma lista de documentos que costumam ajudar a ter em mãos. Só orientação
 * prática, sem conselho jurídico, promessa ou prazo. `slug` é o de uma área em AREAS (o título completo vem de lá).
 * RASCUNHO de 2026-09-22, a partir só das três áreas informadas: o Dr. Michael Vasconcelos precisa validar.
 */
export const FIRST_TALK = {
  title: "Para a primeira conversa.",
  intro: "Escolha o assunto e veja o que costuma ajudar a ter em mãos. Marque o que você já reuniu e envie a mensagem pelo WhatsApp.",
  hint: "Documentos ficam para a conversa: não os envie por mensagem.",
  topics: [
    {
      slug: "administrativo",
      tab: "Administrativo",
      docs: [
        "Documento de identificação funcional ou vínculo com o órgão público",
        "Portarias, ofícios ou decisões administrativas recebidas",
        "Notificações, processos disciplinares ou sindicâncias, se houver",
        "Contracheques ou comprovantes relacionados ao cargo",
        "Prazos indicados em qualquer documento oficial recebido",
      ],
    },
    {
      slug: "bancario",
      tab: "Bancário",
      docs: [
        "O contrato financeiro completo, com anexos",
        "Extratos e faturas relacionados ao contrato",
        "Comprovantes de pagamento e eventuais cobranças",
        "Notificações do banco ou da instituição financeira",
        "Simulações, propostas ou renegociações recebidas",
      ],
    },
    {
      slug: "imobiliario",
      tab: "Imobiliário",
      docs: [
        "Escritura, matrícula do imóvel ou contrato de compra e venda",
        "Documentos pessoais das partes envolvidas",
        "Comprovantes de pagamento e recibos do negócio",
        "Certidões do imóvel e dos vendedores, se houver",
        "Notificações ou pendências relacionadas ao imóvel",
      ],
    },
  ] as Topic[],
} as const;

export type Post = { slug: string; category: string; title: string; date: string };

export const INSIGHTS = {
  title: "Perspectivas sobre o Direito.",
  /** Seção desligada (`SITE.flags.articles`); sem artigos ainda. Nenhum título inventado. */
  posts: [] as Post[],
  placeholder: {
    featured: { category: "[CATEGORIA]", title: pending("TÍTULO DO ARTIGO"), date: "[DATA]" },
    items: [1, 2, 3].map((n) => ({
      key: `p${n}`,
      category: "[CATEGORIA]",
      title: pending("TÍTULO DO ARTIGO"),
      date: "[DATA]",
    })),
  },
} as const;

export const CONTACT = {
  title: "Vamos conversar sobre o seu contexto.",
  intro: "Escreva seu nome e um breve resumo. A conversa continua pelo WhatsApp.",
  hours: pending("HORÁRIO DE ATENDIMENTO"),
  privacy: "Não envie documentos nem informações sigilosas por este formulário.",
} as const;

/** Política de privacidade (/privacidade). */
export const PRIVACY = {
  updated: "22 de setembro de 2026",
} as const;

export const FOOTER = {
  oab: pending("OAB"),
  notice:
    "Este site tem caráter meramente informativo e não constitui oferta de serviços, captação de clientela nem promessa de resultado.",
} as const;
