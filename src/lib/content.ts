/**
 * Todo o texto do site. Placeholders seguem o formato `[X A CONFIRMAR]` e nunca são
 * preenchidos com texto fictício: quando o cliente confirmar, substitua a string aqui.
 */

export const pending = (what: string) => `[${what} A CONFIRMAR]`;
export const isPending = (text: string) => /^\[.+\]$/.test(text.trim());
/** Classe de estilo para textos ainda não confirmados. */
export const pendingClass = (text: string) => (isPending(text) ? "pending" : "");

export const NAV = [
  { id: "escritorio", label: "O escritório" },
  { id: "areas", label: "Áreas de atuação" },
  { id: "profissional", label: "Profissional" },
  { id: "conteudo", label: "Conteúdo" },
  { id: "contato", label: "Contato" },
] as const;

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
  body: pending("DESCRIÇÃO DO ESCRITÓRIO"),
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
    { label: "Formação", value: pending("FORMAÇÃO") },
    { label: "Inscrição na OAB", value: "OAB/PR 90.980" },
    {
      label: "Atuação",
      value: "Advocacia com atuação predominante no Paraná, com escritório em Sarandi, na região metropolitana de Maringá.",
    },
    { label: "Apresentação", value: pending("TEXTO DE APRESENTAÇÃO") },
  ],
} as const;

export type Post = { slug: string; category: string; title: string; date: string };

export const INSIGHTS = {
  title: "Perspectivas sobre o Direito.",
  /** Sem publicações reais ainda: a seção mostra a estrutura com placeholders. */
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

export const FOOTER = {
  oab: "OAB/PR 90.980",
  notice:
    "Este site tem caráter meramente informativo e não constitui oferta de serviços, captação de clientela nem promessa de resultado.",
  noticePending: pending("AVISO INSTITUCIONAL A VALIDAR COM O ADVOGADO"),
} as const;
