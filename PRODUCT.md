# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + framer-motion. Proposto na auditoria de 2026-09-20 e aprovado pelo usuário ("Sim"). Sem backend: contato por telefone e WhatsApp (link `wa.me`). Sem deploy nem push remoto sem pedido explícito.

**Adaptado em 2026-09-22** (branch `vasconcelos`, não publicado): era o site-conceito da Advocacia Rodrigo Alan Dias; o cliente não seguiu adiante e o usuário pediu para reaproveitar estrutura, direção visual, componentes e vídeos para um novo cliente, Vasconcelos — Escritório de Advocacia. Todo dado real do Rodrigo (endereço, telefone, OAB, avaliações, logo, retrato) foi removido; nada do que falta para o Vasconcelos foi inventado no lugar (ver `PENDENCIAS.md`). As seções abaixo descrevem o projeto **como ele é hoje, para o Vasconcelos**; o histórico do Rodrigo fica registrado em `LAW-FIRM-DESIGN-DIRECTION.md` e no git.

## Users

- **Primeiro público:** o advogado Michael Vasconcelos. Este site é uma proposta visual rápida, para ele avaliar o potencial do projeto (reaproveitado de um site-conceito anterior, para outro escritório).
- **Público final do site:** pessoas e empresas de Maringá (PR) e região que precisam de orientação jurídica e avaliam o escritório antes de entrar em contato, quase sempre pelo celular. Situação: decisão importante, pouca familiaridade com o Direito, necessidade de clareza e confiança.

## Product Purpose

Apresentar o Vasconcelos — Escritório de Advocacia com sobriedade e sofisticação, transmitindo autoridade, precisão e proximidade, e levar o visitante a um contato simples (ligação ou WhatsApp). Sucesso, para a proposta: o Dr. Vasconcelos vê o potencial do site e quer seguir adiante. Sucesso, para o site final: visitante entende quem é o escritório e entra em contato.

## Positioning

Escritório de Maringá (PR), avaliado 5,0 no Google por 26 pessoas (nota e contagem informadas pelo usuário; sem os textos das avaliações). **Sem identidade visual própria confirmada ainda**: o site usa só um lockup tipográfico ("Vasconcelos" + "Escritório de Advocacia"), nunca um símbolo inventado. Tradição reinterpretada em linguagem editorial contemporânea, sem os clichês do "site de advogado".

## Operating Context

Publicidade da advocacia no Brasil é regida pelo Estatuto da Advocacia, pelo Código de Ética e Disciplina e pelo Provimento 205/2021 do CFOAB: caráter informativo, discrição e sobriedade. Pela leitura da página oficial: vedados promessa de resultado, uso de casos concretos, referência a valores de honorários, gratuidade ou descontos, e captação de clientela. O texto integral do Provimento não foi conferido; o advogado deve validar o conteúdo final.

## Capabilities and Constraints

Fatos confirmados pelo usuário (2026-09-22):

- Nome: Vasconcelos — Escritório de Advocacia. Advogado: Michael Vasconcelos.
- Endereço: Av. Carlos Correa Borges, 597, Zona 05, Maringá, PR (CEP não informado).
- Google: 5,0 estrelas, 26 avaliações (sem os textos).
- Áreas de atuação, com os pontos informados no briefing (não expandir além disso): Direito Administrativo (processos administrativos, defesa de servidores públicos, suporte jurídico integral a servidores públicos); Direito Bancário (análise de contratos financeiros, revisão contratual, defesa de devedores, cláusulas abusivas); Direito Imobiliário (regularização fundiária, contratos de compra e venda, posse, propriedade). Atuação consultiva, preventiva e contenciosa.

Decisões em aberto (usar placeholder visível, nunca preencher com texto fictício): telefone/WhatsApp (**crítico**: os botões de contato não funcionam de verdade sem ele), CEP, OAB, formação, texto de apresentação, horário de atendimento, Facebook/Instagram, logo real, fotos reais (escritório, áreas, retrato).

**Nunca reaproveitar do cliente anterior** (Advocacia Rodrigo Alan Dias): telefone, endereço, OAB, avaliações reais de clientes dele, retrato, logo/símbolo. Ver `PENDENCIAS.md` §1 para o que foi removido e por quê.

## Brand Commitments

- **Sem logo confirmada do Vasconcelos.** Não inventar símbolo, slogan, história ou cores oficiais. Até chegar um arquivo real, o site usa só um lockup tipográfico discreto ("VASCONCELOS" / "ESCRITÓRIO DE ADVOCACIA"), reaproveitando o mesmo slot vazio (`public/images/logo/`) e o mesmo fallback do projeto anterior — nunca o símbolo do Rodrigo (círculo, R, louro), que é a identidade real de outro escritório.
- Paleta: migrada em 2026-09-22 para tons terrosos/café discretos (evolução do neutro anterior, não um "site marrom" — ver `LAW-FIRM-DESIGN-DIRECTION.md`), mesma estrutura de tokens.
- Direção mantida do projeto anterior: **Contemporary Legal Editorial** — sofisticada, cinematográfica, editorial, tipografia forte, vídeo integrado ao hero, movimento sutil.
- Proibido: template de advogado, cassino preto e dourado, três cards, glassmorphism, gradiente roxo/azul, pill em toda parte, Inter/Poppins/Montserrat/Roboto automáticos, balança e martelo decorativos, "trusted by", métricas, depoimentos e resultados inventados, promessa de resultado, dourado excessivo, aparência de imobiliária ou banco.

## Evidence on Hand

- Vídeo e fotos do hero: os mesmos do projeto anterior, mantidos sem alteração a pedido do usuário (cena de livro de Direito Civil e balança sobre mesa, entardecer). Aparência de imagem/vídeo gerado; não identificam nenhuma pessoa.
- Agregado do Google: 5,0 e 26 avaliações (informado pelo usuário; sem os textos).
- Fotos de área, escritório e contato: as mesmas fotos provisórias do projeto anterior (aparência de imagem gerada), reaproveitadas só onde não mostram texto ou pessoa de outro contexto; ver `PENDENCIAS.md` §2.
- **Não existem e não devem ser fabricados:** depoimentos, casos, resultados, números de causas, valores, fotos reais do escritório ou do advogado, anos de experiência, formação, OAB, telefone.

## Product Principles

1. Nenhuma informação jurídica ou factual é inventada: o que falta aparece como `[X A CONFIRMAR]`.
2. Sobriedade informativa: o site explica e convida ao contato, nunca promete nem pressiona.
3. A fotografia carrega a sofisticação; o design cria espaço e ritmo para ela.
4. Cada slot de mídia funciona sem código novo: trocar o arquivo mantendo o nome basta.
5. O site nunca depende do vídeo: com ou sem vídeo, o conteúdo principal carrega rápido e completo.

## Accessibility & Inclusion

WCAG 2.2 AA como piso: contraste, foco visível, navegação por teclado, alvos de toque adequados, `prefers-reduced-motion` respeitado, `lang="pt-BR"`, textos alternativos, sem conteúdo essencial só em vídeo.
