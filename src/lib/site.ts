/**
 * Fatos confirmados pelo cliente. Nada aqui é inventado: o que falta vive em `content.ts`
 * como placeholder `[X A CONFIRMAR]`.
 */
export type Review = { author: string; text: string };

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
  /**
   * Agregado do Google confirmado pelo usuário (2026-09-21). `featured`: avaliações de 5 estrelas COPIADAS
   * do Google, palavra por palavra, sem edição. Pedido do usuário em 2026-09-21; a validação pela OAB/PR
   * (Provimento 205/2021) fica com o advogado. Vazio, a seção não mostra nenhuma citação. Nunca inventar.
   * `author`: primeiro nome e inicial do sobrenome (o Google mostra o nome completo; a privacidade de quem
   * foi cliente vale mais que a assinatura). Colhidas em 2026-09-21 de 8 avaliações coladas pelo usuário; ficaram
   * de fora, de propósito, as que citam ganho de causa ou êxito (vedado como resultado), a cortada com "…"
   * e a incompleta. Ordem: a primeira vira o destaque.
   */
  reviews: { rating: "5,0", count: 426, featured: [
      { author: "Samanta L.", text: "Ótimo atendimento ao cliente, profissional bem capacitado, comunicação clara e objetiva, empatia. Super recomendo." },
      { author: "Alessandra A.", text: "Atencioso, paciente e muito profissional. Maioria das vezes que procuramos um advogado é isso que precisamos. Me atendeu prontamente, e com a ajuda dele consegui resolver os problemas que precisava. Obrigada Rodrigo!" },
      { author: "Amanda V.", text: "Super recomendo o Dr. Rodrigo! Profissional dedicado e competente, nos ajudou em uma demanda muito importante!! Foi pontual e honesto, agradeço imensamente pela ajuda!" },
      { author: "Miqueias M.", text: "O Nobre Dr. Rodrigo Dias desempenhou seu papel de defesa com excelência. Dito isso, podem confiar no seu trabalho. Parabéns e obrigado, Doutor." },
    ] as Review[] },
  flags: {
    /**
     * Faixa de avaliações do Google. Desligue se o advogado ou a OAB/PR entenderem
     * que não deve constar (as fontes consultadas divergem; ver PRODUCT.md).
     */
    socialProof: true,
    /**
     * Seção "Perspectivas sobre o Direito" (artigos). DESLIGADA em 2026-09-21: os artigos ainda não existem,
     * então os títulos não levavam a lugar nenhum. Ligue quando houver textos e páginas reais
     * (e reponha o item "Conteúdo" no menu: ver NAV em content.ts, que já reage a esta chave).
     */
    articles: false,
    /** Formulário e botões abrem o WhatsApp. Número confirmado como WhatsApp pelo usuário em 2026-09-20. */
    whatsapp: true,
    /** Aviso "conceito em desenvolvimento" no rodapé. Remover ao publicar. */
    conceptNotice: true,
  },
} as const;
