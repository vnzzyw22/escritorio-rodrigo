# Pendências — site Advocacia Rodrigo Alan Dias

Atualizado em 2026-09-21, depois de uma revisão completa que inclui as alterações feitas no outro computador (símbolo animado no hero, Primeira conversa, carrossel de avaliações, áreas empilhadas no celular). Estado: estrutura completa e verificada; falta material real e algumas confirmações. Detalhes de direção em `LAW-FIRM-DESIGN-DIRECTION.md` (§13 e §18).

## 1. Antes de mostrar ao Rodrigo

- [~] **Logo:** símbolo integrado ao hero em 2026-09-21 a partir de um JPEG (ver §Registro de decisões do documento de direção). Ainda vale um **vetor** (menu, rodapé e R grande do statement/rodapé). Pedido original: (vetorial: SVG ou PDF; ou PNG transparente com 2000 px ou mais) em `public/images/logo/rodrigo-alan-dias.svg` (ou `.png`). Sem ela, o menu e o rodapé usam um lockup tipográfico neutro.
- [ ] **Símbolo R sozinho** em `public/images/logo/rodrigo-symbol.svg` (ou `.png`). Sem ele, o "R" grande do hero, do statement e do rodapé é um glifo provisório, sem círculo nem louro. Existe uma logo em PNG sem fundo (612×408) fora do projeto, pequena demais para o R grande.
- [x] **"426 avaliações" no Google** confirmado pelo usuário em 2026-09-21. A faixa desliga em `flags.socialProof`.
- [x] **Avaliações reais no site** (2026-09-21): 4 das 8 coladas pelo usuário, texto idêntico ao do Google, nome abreviado (primeiro nome e inicial). Ficaram de fora as que citam ganho de causa/êxito (resultado), a cortada com "…" e a incompleta. **O Rodrigo e a OAB/PR ainda precisam validar** (Provimento 205/2021; o texto integral não foi conferido). Aparecem em um carrossel (`reviews-carousel.tsx`: deslizar, setas e teclado, sem rotação automática). Para tirar: `SITE.reviews.featured = []` em `src/lib/site.ts`. Para trocar/adicionar: mesma lista.
- [ ] **O Rodrigo aprovar o retrato.** É uma versão melhorada por IA de uma foto pequena, e a IA pode ter alterado traços do rosto. O notebook da foto mostra "DIAS ADVOGADOS", nome e marca que não são os do escritório (dá para recortar).

## 2. Informações que dependem do Rodrigo

Hoje aparecem como `[X A CONFIRMAR]`. Editar em `src/lib/content.ts`.

- [x] **Formação** preenchida em 2026-09-21 (LinkedIn): graduação em Direito e especialização em Civil e Processo Civil (UEL, confirmado pelo usuário) e especialização em Trabalho e Processo do Trabalho (Damásio), sem ano.
- [ ] **Texto de apresentação:** rascunho escrito em 2026-09-21 (LinkedIn) e no ar como proposta; o Rodrigo precisa aprovar. Só usar o que ele aprovar. Base pública: "Advocacia Artesanal e Humanizada", "há mais de 8 anos" (bio do Instagram dele).
- [ ] **Descrição do escritório:** rascunho no ar desde 2026-09-21 (a partir de dados públicos e do que o usuário informou); o Rodrigo precisa aprovar, e o título "Experiência construída ao longo do tempo." também.
- [x] **Horário** confirmado pelo usuário em 2026-09-21: seg a sex 9h às 18h, sáb 9h às 13h.
- [x] **Áreas:** o usuário mantém as cinco atuais (2026-09-21); o Rodrigo ainda deve validar.
- [ ] (histórico) **Áreas de atuação reais.** As cinco atuais são EXEMPLOS (Trabalho, Cível e Contratos, Consumidor, Defesa Médica, Planejamento Patrimonial). Fontes públicas citam Cível, Trabalhista, Criminal, Previdenciária, juros abusivos em empréstimos; divergem entre si. Ao confirmar, trocar título, descrição e fotos.
- [ ] **Validar as listas da "Primeira conversa"** (`FIRST_TALK` em `src/lib/content.ts`): documentos por assunto, rascunho genérico de 2026-09-21 que o Rodrigo deve conferir e ajustar. Vale o mesmo para as 5 áreas, que continuam sendo exemplos (as abas seguem `AREAS`).
- [ ] **Artigos e publicações:** a seção "Perspectivas sobre o Direito" está DESLIGADA (`SITE.flags.articles = false`), porque os artigos não existem. Os 3 títulos e datas informados em 2026-09-21 continuam guardados em `INSIGHTS.posts`. Para religar: escrever os textos, criar as rotas, o Rodrigo validar (Provimento 205/2021) e ligar a chave.
- [ ] **Aviso institucional do rodapé.** Há um texto padrão sóbrio; o advogado valida. (O placeholder `noticePending`, que aparecia como "A CONFIRMAR" no rodapé, foi removido em 2026-09-21.)
- [ ] **Instagram** `@advocacia_rodrigoalandias`: achado em busca pública; confirmar antes de usar no site.
- [ ] **E-mail de contato**, se quiser um além do WhatsApp.

## 3. Conferências rápidas

- [x] **OAB/PR 90.980** confirmada pelo usuário em 2026-09-21.
- [x] **Bairro:** mantido "Jardim Nova Paulista" por decisão do usuário (2026-09-21). (antes:) o texto do usuário dizia "Centro"; o site mantém "Jardim Nova Paulista" (brief original e diretórios).
- [ ] **Link real do Google** (avaliações e mapa). Hoje o site usa links de busca genéricos em `src/lib/site.ts` (`links.map` e `links.reviews`).
- [x] WhatsApp: (44) 99807-4406 confirmado pelo usuário como número de atendimento e WhatsApp.

## 4. Mídia

- [x] **Hero (2026-09-21):** vídeo e foto novos do usuário (livro "Direito Civil Brasileiro" e balança), em 16:9 para o desktop (1280×720, 1,3 MB) e 9:16 para o celular (720×1280, 0,9 MB). Sem áudio, faststart e laço de 7 s com dissolve de 1 s para não haver corte seco. Originais em `assets-originais/hero/`; versões antigas em `assets-originais/hero/anteriores/`. Falta: o Rodrigo aprovar; a balança é um elemento que o briefing original pedia para evitar (decisão do usuário); ambos os vídeos são 720p (podem ficar macios em telas grandes).
- [x] **Hero no celular:** resolvido com o vídeo e a foto verticais do usuário (ver item acima).
- [ ] **Fotos reais** no lugar das provisórias (lista do que fotografar no §9 do documento de direção). As atuais têm aparência de imagem gerada.
  - Áreas: textos embutidos nas imagens ("BANK" na 3, placa "DEFESA MÉDICA" na 4), aperto de mão na 1, prédio de colunas e chave fundida a uma engrenagem na 5. Resolução de 944×1104.
  - Contato: `contact-01` mostra uma estatueta da Justiça; desde 2026-09-21 a mesma foto também é a grande do Escritório (`office-01`). Nesse mesmo dia a `office-02` virou um retrato do Rodrigo (`rodrigo-02.png`, 1024×1024, aparência de imagem gerada).
  - Escritório: `office-01` e `office-02` são recortes da foto do hero; a pessoa de costas aparece nos dois lugares.
  - Retrato: 928×1062, abaixo dos 1600 px recomendados.
  - Conteúdo: `featured-01`, 1248×832.
- [ ] A marca **invisível** do gerador de imagens continua nos arquivos que vieram dele; o recorte tirou apenas a marca visível.
- Originais em alta ficam em `assets-originais/` (fora do git e da publicação).

## 5. Para publicar de verdade

- [ ] **Domínio** e onde hospedar. A Vercel no plano gratuito (Hobby) é de uso pessoal e não comercial; para o site do escritório em produção, avaliar o plano pago ou outra hospedagem.
- [ ] Remover o `noindex` (`src/app/layout.tsx`) e o aviso "Proposta de conceito · não publicado" (`SITE.flags.conceptNotice`).
- [ ] Validação do conteúdo pelo advogado à luz do Provimento 205/2021 da OAB (o texto integral não foi conferido). Isso inclui a faixa de avaliações do Google.
- [x] Favicon (`src/app/icon.png`, `apple-icon.png`), imagem de compartilhamento (`opengraph-image.png`, símbolo oficial sobre fundo escuro) e `robots.ts` (bloqueia tudo enquanto `conceptNotice` estiver ligado): criados em 2026-09-21.
- [x] **Privacidade e cookies** (2026-09-21): página `/privacidade` (LGPD) linkada no rodapé, escrita a partir do que o site faz (sem cookies, sem armazenamento local, sem analytics; o formulário só abre o WhatsApp). Por isso não há banner de cookies: não há o que consentir. **Se um dia entrar analytics, pixel ou envio de formulário a servidor, atualizar a política e criar o banner de consentimento antes.**
- [ ] **Política de privacidade:** o advogado precisa revisar e aprovar a minuta e, se quiser, **incluir um e-mail para assuntos de privacidade** (hoje o campo foi retirado e o contato é telefone/WhatsApp); depois remover a frase "Minuta em revisão" (some com `flags.conceptNotice`).
- [x] **Segurança** (2026-09-21): cabeçalhos em `next.config.ts` (CSP restritiva a `self`, nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, HSTS, COOP), `poweredByHeader` desligado, links externos com `noopener noreferrer`, `npm audit` sem vulnerabilidades, lint limpo. Testado no Chrome: nenhuma violação de CSP com vídeo, fontes, abas e carrossel funcionando.
- [ ] Ao publicar de verdade: `sitemap`, canonical, JSON-LD (LegalService) e og:image com o nome, quando houver domínio.
- [ ] **Repositório GitHub público** (`vnzzyw22/escritorio-rodrigo`): decidir se deve ser privado, porque contém as fotos provisórias, o retrato e os dados do escritório.
- [ ] **Conectar a Vercel ao GitHub** para publicar sozinho a cada `git push`. A conexão automática falhou por falta de autorização do app da Vercel no GitHub: Vercel > projeto `escritorio-rodrigo` > Settings > Git > Connect. Enquanto isso, publicar com `npx vercel --prod --yes` na pasta do projeto.

## 6. Técnico

- [x] **Revisão de 2026-09-21** (build, 7 larguras de 320 a 1440 px sem rolagem horizontal nem erro de JS, navegação desktop e menu mobile, abas, carrossel, formulário, vídeos desktop e mobile): sem falhas funcionais. Corrigidos: área de toque dos links avulsos no celular, foco e `role="alert"` nos erros do formulário, placeholder no rodapé.
- [ ] **Desempenho:** otimizado em 2026-09-21 (§19 do documento de direção): thread principal na rolagem de 66% para 40% (celular CPU 4x), pior quadro de 231 para 33 ms. Sobra o LCP simulado do Lighthouse no celular (~3,1 s), que não mudou, e o custo das três famílias de fonte (opção: reduzir para duas). Publicado na Vercel em 2026-09-21 (deploy `escritorio-rodrigo-d6y066lcv`): o site no ar já tem as melhorias.
- [ ] O build avisa que várias imagens estão abaixo da resolução mínima recomendada. É informativo; some quando chegarem as fotos reais.
- [ ] O servidor de desenvolvimento trava arquivos de imagem no Windows: para trocar uma foto já servida, pare o `npm run dev`, troque o arquivo e suba de novo.

## No ar

Site em produção: https://escritorio-rodrigo.vercel.app (`noindex`). Os endereços `escritorio-rodrigo-vnzzyw.vercel.app` e o de cada deploy ficam atrás do login da Vercel. Projeto na conta `vnzzyw`, projeto `escritorio-rodrigo`. Código: https://github.com/vnzzyw22/escritorio-rodrigo.

## Feito

Estrutura completa (hero em três estados, statement, escritório, áreas, profissional, avaliações, conteúdo, contato, rodapé), tipografia escolhida por espécime, acessibilidade (axe: 0 violações), movimento reduzido, teste do vídeo em Chrome real, formulário que abre o WhatsApp, OAB e atuação aplicadas, documentos de direção e de produto.
