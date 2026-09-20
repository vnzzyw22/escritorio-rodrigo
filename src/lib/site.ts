/**
 * Fatos confirmados pelo cliente. Nada aqui é inventado: o que falta vive em `content.ts`
 * como placeholder `[X A CONFIRMAR]`.
 */
export const SITE = {
  name: "Advocacia Rodrigo Alan Dias",
  person: "Rodrigo Alan Dias",
  descriptor: "Advocacia",
  address: {
    street: "Av. Maringá, 1441",
    district: "Jardim Nova Paulista",
    city: "Sarandi",
    state: "PR",
    zip: "87111-000",
  },
  phone: {
    display: "(44) 99807-4406",
    e164: "+5544998074406",
    /** Só dígitos, com DDI: formato do `wa.me`. */
    wa: "5544998074406",
  },
  links: {
    facebook: "https://www.facebook.com/Adv.RodrigoAlanDias/",
    map: "https://www.google.com/maps/search/?api=1&query=Av.+Maring%C3%A1%2C+1441%2C+Sarandi%2C+PR",
    reviews:
      "https://www.google.com/maps/search/?api=1&query=Advocacia+Rodrigo+Alan+Dias%2C+Sarandi%2C+PR",
  },
  /** Agregado público informado pelo cliente. Sem citações, nomes ou casos. */
  reviews: { rating: "5,0", count: 426 },
  flags: {
    /**
     * Faixa de avaliações do Google. Desligue se o advogado ou a OAB/PR entenderem
     * que não deve constar (as fontes consultadas divergem; ver PRODUCT.md).
     */
    socialProof: true,
    /** Formulário e botões abrem o WhatsApp. Número confirmado como WhatsApp pelo usuário em 2026-09-20. */
    whatsapp: true,
    /** Aviso "conceito em desenvolvimento" no rodapé. Remover ao publicar. */
    conceptNotice: true,
  },
} as const;
