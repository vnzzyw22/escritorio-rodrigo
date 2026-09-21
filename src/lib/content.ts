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
  title: "Experiência construída ao longo do tempo.",
  /** Rascunho de 2026-09-21 a partir de dados públicos (LinkedIn, Instagram) e do que o usuário informou. O Rodrigo precisa aprovar. */
  body: "Advocacia artesanal e humanizada, em Sarandi, na região metropolitana de Maringá. Cada caso é tratado de forma individual, com leitura atenta dos documentos e uma explicação clara do caminho possível. O Dr. Rodrigo advoga há mais de oito anos e atua, principalmente, com Direito do Trabalho, Direito Civil e Contratos.",
} as const;

export type Area = { slug: string; title: string; description: string };

/**
 * ÁREAS DE EXEMPLO, ainda NÃO confirmadas pelo Rodrigo. Vieram do briefing de 2026-09-20 marcadas
 * como "Ex:" e foram redigidas para o layout (título de 1 a 3 palavras; descrição de ~170 a 190 caracteres,
 * 4 linhas no painel do desktop). Redação informativa e sóbria: sem promessa de resultado, sem "blindagem",
 * sem valores (Provimento 205/2021).
 *
 * O `slug` é o nome do arquivo da foto: public/images/practice/<slug>.webp. Mapeamento atual:
 * area-01 Trabalho · area-02 Cível e Contratos · area-03 Consumidor · area-04 Defesa Médica · area-05 Patrimonial.
 * Ao confirmar as áreas reais, troque título, descrição (e o slug, se quiser nomes de arquivo mais claros);
 * adicione ou remova linhas livremente. Para voltar aos placeholders, use `pending("ÁREA")`.
 */
export const AREAS: Area[] = [
  {
    slug: "area-01",
    title: "Direito do Trabalho",
    description:
      "Orientação a empresas nas relações de trabalho: auditoria de rotinas e contratos e mapeamento de riscos, com foco preventivo para tratar pontos sensíveis antes das demandas.",
  },
  {
    slug: "area-02",
    title: "Cível e Contratos",
    description:
      "Elaboração e revisão de contratos, com leitura atenta de cláusulas e riscos. A atuação estratégica e preventiva procura dar clareza às partes desde o início e reduzir a chance de disputas.",
  },
  {
    slug: "area-03",
    title: "Direito do Consumidor",
    description:
      "Atuação em conflitos de consumo, inclusive com bancos e grandes empresas. Análise do contrato e da documentação para orientar, com clareza, os caminhos possíveis e o que esperar deles.",
  },
  {
    slug: "area-04",
    title: "Defesa Médica",
    description:
      "Orientação jurídica a médicos e demais profissionais da saúde: contratos, responsabilidade profissional e relação com pacientes. O trabalho preventivo apoia decisões com segurança.",
  },
  {
    slug: "area-05",
    title: "Planejamento Patrimonial",
    description:
      "Organização do patrimônio e da sucessão da família, incluindo holding familiar quando indicada. Planejamento antecipado, para dar clareza a decisões sobre bens e herdeiros.",
  },
];

export const PROFESSIONAL = {
  name: ["Rodrigo", "Alan", "Dias"],
  fields: [
    {
      label: "Formação",
      value:
        "Graduação em Direito e especialização em Direito Civil e Processo Civil (UEL, Universidade Estadual de Londrina). Especialização em Direito do Trabalho e Processo do Trabalho (Damásio Educacional).",
    },
    { label: "Inscrição na OAB", value: "OAB/PR 90.980" },
    {
      label: "Atuação",
      value: "Advocacia com atuação predominante no Paraná, com escritório em Sarandi, na região metropolitana de Maringá.",
    },
    /** Rascunho para oferecer ao Rodrigo (2026-09-21), a partir do LinkedIn. Ele precisa aprovar. */
    {
      label: "Apresentação",
      value:
        "Rodrigo Alan Dias advoga desde 2018, em Maringá e região. Antes disso, estagiou na 1ª Vara Federal de Maringá. Fez duas especializações: Direito Civil e Processo Civil, depois Direito do Trabalho e Processo do Trabalho. Trata cada caso como um caso, não como um modelo: lê os documentos com calma e explica o caminho antes de qualquer passo.",
    },
  ],
} as const;

export type Topic = { slug: string; tab: string; docs: string[] };

/**
 * "Primeira conversa": por assunto, uma lista de documentos que costumam ajudar a ter em mãos. Só orientação
 * prática, sem conselho jurídico, promessa ou prazo. `slug` é o de uma área em AREAS (o título completo vem de lá);
 * ao trocar as áreas, ajuste aqui também. RASCUNHO de 2026-09-21: as listas são genéricas e o Rodrigo precisa validar.
 */
export const FIRST_TALK = {
  title: "Para a primeira conversa.",
  intro: "Escolha o assunto e veja o que costuma ajudar a ter em mãos. Marque o que você já reuniu e envie a mensagem pelo WhatsApp.",
  hint: "Documentos ficam para a conversa: não os envie por mensagem.",
  topics: [
    {
      slug: "area-01",
      tab: "Trabalho",
      docs: [
        "Contrato de trabalho e registro do vínculo (carteira de trabalho ou ficha de registro)",
        "Holerites e comprovantes de pagamento",
        "Extrato do FGTS",
        "Controle de jornada, como cartão de ponto ou registros de horário",
        "Termo de rescisão ou comunicado de desligamento, se houver",
        "Notificações, intimações ou citações recebidas",
      ],
    },
    {
      slug: "area-02",
      tab: "Contratos",
      docs: [
        "O contrato completo, com anexos e aditivos, ou a minuta que será assinada",
        "Documentos de identificação das partes, pessoais ou da empresa",
        "Conversas por e-mail ou mensagem sobre a negociação",
        "Comprovantes de pagamento e recibos",
        "Notificações ou cobranças recebidas",
      ],
    },
    {
      slug: "area-03",
      tab: "Consumidor",
      docs: [
        "Contrato, proposta ou termo de adesão",
        "Notas fiscais, recibos e comprovantes de pagamento",
        "Faturas ou extratos relacionados ao problema",
        "Protocolos de atendimento e conversas com a empresa",
        "Fotos, vídeos ou capturas de tela que mostrem o problema",
        "Documento de identidade e comprovante de residência",
      ],
    },
    {
      slug: "area-04",
      tab: "Saúde",
      docs: [
        "Contratos com clínicas, hospitais, planos de saúde ou cooperativas",
        "Documento de registro no conselho da categoria, como o CRM",
        "Documentos do atendimento em questão, como o prontuário",
        "Notificações, ofícios ou reclamações recebidas",
        "Apólice de seguro de responsabilidade profissional, se houver",
      ],
    },
    {
      slug: "area-05",
      tab: "Patrimônio",
      docs: [
        "Documentos pessoais e certidão de estado civil, com pacto antenupcial ou contrato de convivência, se houver",
        "Relação dos bens: escrituras e matrículas de imóveis, veículos e participações em empresas",
        "Se houver empresa: contrato social e alterações",
        "Identificação dos herdeiros e beneficiários",
        "Testamento ou planejamento anterior, se houver",
        "Dívidas e financiamentos em andamento",
      ],
    },
  ] as Topic[],
} as const;

export type Post = { slug: string; category: string; title: string; date: string };

export const INSIGHTS = {
  title: "Perspectivas sobre o Direito.",
  /**
   * Títulos e datas informados pelo usuário em 2026-09-21. Ainda não existe página de artigo:
   * as linhas não são links (ver insights.tsx). O primeiro vira a matéria em destaque.
   */
  posts: [
    {
      slug: "fgts-atrasado-rescisao-indireta",
      category: "Direito do Trabalho",
      title: "FGTS atrasado dá direito a pedir demissão forçada (Rescisão Indireta)?",
      date: "21 de setembro de 2026",
    },
    {
      slug: "recusa-de-hora-extra-clt",
      category: "Direito do Trabalho",
      title: "O funcionário pode se recusar a fazer hora extra? Entenda as regras da CLT",
      date: "15 de setembro de 2026",
    },
    {
      slug: "assessoria-juridica-antes-de-assinar-contratos",
      category: "Direito Civil e Contratos",
      title: "Cuidados antes de assinar: Por que uma assessoria jurídica evita prejuízos contratuais",
      date: "10 de setembro de 2026",
    },
  ] as Post[],
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
  hours: "Segunda a sexta, das 9h às 18h. Sábado, das 9h às 13h.",
  privacy: "Não envie documentos nem informações sigilosas por este formulário.",
} as const;

export const FOOTER = {
  oab: "OAB/PR 90.980",
  notice:
    "Este site tem caráter meramente informativo e não constitui oferta de serviços, captação de clientela nem promessa de resultado.",
} as const;
