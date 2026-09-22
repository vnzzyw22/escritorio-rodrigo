/**
 * Fatos confirmados pelo cliente. Nada aqui é inventado: o que falta vive em `content.ts`
 * como placeholder `[X A CONFIRMAR]`.
 *
 * PROJETO ADAPTADO em 2026-09-22: era o site-conceito da Advocacia Rodrigo Alan Dias (Sarandi, PR); o cliente
 * não seguiu adiante. Reaproveitado para Vasconcelos — Escritório de Advocacia (Maringá, PR), a pedido do
 * usuário. Todo dado real do Rodrigo (telefone, OAB, endereço, avaliações, fotos, retrato, logo) foi removido
 * daqui e do que é servido em `public/`; nada do que falta para o Vasconcelos foi inventado no lugar.
 * Ver `PENDENCIAS.md` para o que falta confirmar e `LAW-FIRM-DESIGN-DIRECTION.md` para o registro da adaptação.
 */
export type Review = { author: string; text: string };

export const SITE = {
  name: "Vasconcelos — Escritório de Advocacia",
  /** Nome curto usado no lockup da marca (Wordmark) e como letra do símbolo grande decorativo (RMark). */
  person: "Vasconcelos",
  descriptor: "Escritório de Advocacia",
  address: {
    street: "Av. Carlos Correa Borges, 597",
    district: "Zona 05",
    city: "Maringá",
    state: "PR",
    /** Não informado. */
    zip: "[CEP A CONFIRMAR]",
  },
  /** Telefone/WhatsApp confirmado pelo usuário em 2026-09-22. */
  phone: {
    display: "(44) 99154-1714",
    e164: "+5544991541714",
    wa: "5544991541714",
  },
  links: {
    /** Não há Facebook/Instagram confirmado: link vazio esconde a linha correspondente na UI. */
    facebook: "",
    map: "https://www.google.com/maps/search/?api=1&query=Av.+Carlos+Correa+Borges%2C+597%2C+Maring%C3%A1%2C+PR",
    reviews:
      "https://www.google.com/maps/search/?api=1&query=Vasconcelos+Escrit%C3%B3rio+de+Advocacia%2C+Maring%C3%A1%2C+PR",
  },
  /**
   * Agregado do Google informado pelo usuário (2026-09-22): 5,0 em 26 avaliações. Sem os textos das
   * avaliações — `featured` fica vazio. NUNCA reaproveitar as avaliações do cliente anterior: seriam
   * depoimentos reais de outras pessoas, atribuídos a um advogado que elas não avaliaram.
   */
  reviews: { rating: "5,0", count: 26, featured: [] as Review[] },
  flags: {
    /** Faixa de avaliações do Google: só nota e contagem, sem citações (ver `reviews.featured`). */
    socialProof: true,
    /** Seção de artigos ("Perspectivas sobre o Direito"): sem textos ainda. */
    articles: false,
    /** Número confirmado como WhatsApp pelo usuário (ver `phone` acima). */
    whatsapp: true,
    /** Aviso "conceito em desenvolvimento" no rodapé. Remover ao publicar de verdade. */
    conceptNotice: true,
  },
} as const;
