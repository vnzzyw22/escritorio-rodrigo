# Pendências — site Advocacia Rodrigo Alan Dias

Atualizado em 2026-09-20. Estado: estrutura completa e verificada; falta material real e algumas confirmações. Detalhes de direção em `LAW-FIRM-DESIGN-DIRECTION.md` (§13 e §18).

## 1. Antes de mostrar ao Rodrigo

- [ ] **Logo** (vetorial: SVG ou PDF; ou PNG transparente com 2000 px ou mais) em `public/images/logo/rodrigo-alan-dias.svg` (ou `.png`). Sem ela, o menu e o rodapé usam um lockup tipográfico neutro.
- [ ] **Símbolo R sozinho** em `public/images/logo/rodrigo-symbol.svg` (ou `.png`). Sem ele, o "R" grande do hero, do statement e do rodapé é um glifo provisório, sem círculo nem louro. Existe uma logo em PNG sem fundo (612×408) fora do projeto, pequena demais para o R grande.
- [ ] **Conferir "426 avaliações" no Google Maps.** O Instagram dele mostra "426 seguindo": pode ter havido confusão. Corrigir em `src/lib/site.ts` (`reviews.count`) ou trocar por "5 estrelas". A faixa desliga em `flags.socialProof`.
- [ ] **O Rodrigo aprovar o retrato.** É uma versão melhorada por IA de uma foto pequena, e a IA pode ter alterado traços do rosto. O notebook da foto mostra "DIAS ADVOGADOS", nome e marca que não são os do escritório (dá para recortar).

## 2. Informações que dependem do Rodrigo

Hoje aparecem como `[X A CONFIRMAR]`. Editar em `src/lib/content.ts`.

- [ ] **Formação** (faculdade e ano).
- [ ] **Texto de apresentação.** Só usar o que ele aprovar. Base pública: "Advocacia Artesanal e Humanizada", "há mais de 8 anos" (bio do Instagram dele).
- [ ] **Descrição do escritório** e confirmar se o título "Experiência construída ao longo do tempo." pode ficar.
- [ ] **Horário de atendimento.** Um diretório indica seg a sex 9h às 18h e sáb 9h às 13h; confirmar.
- [ ] **Áreas de atuação reais.** As cinco atuais são EXEMPLOS (Trabalho, Cível e Contratos, Consumidor, Defesa Médica, Planejamento Patrimonial). Fontes públicas citam Cível, Trabalhista, Criminal, Previdenciária, juros abusivos em empréstimos; divergem entre si. Ao confirmar, trocar título, descrição e fotos.
- [ ] **Artigos e publicações** (seção Conteúdo). Nenhum artigo dele foi achado online. Opções: manter placeholders; trocar por um convite ao Instagram com os temas que ele já publica; ou tirar a seção por enquanto.
- [ ] **Aviso institucional do rodapé.** Há um texto padrão sóbrio; o advogado valida.
- [ ] **Instagram** `@advocacia_rodrigoalandias`: achado em busca pública; confirmar antes de usar no site.
- [ ] **E-mail de contato**, se quiser um além do WhatsApp.

## 3. Conferências rápidas

- [ ] **OAB/PR 90.980** (informado pelo usuário; não foi possível conferir online). Conferir no Cadastro Nacional dos Advogados (cna.oab.org.br).
- [ ] **Bairro:** o texto do usuário dizia "Centro"; o site mantém "Jardim Nova Paulista" (brief original e diretórios).
- [ ] **Link real do Google** (avaliações e mapa). Hoje o site usa links de busca genéricos em `src/lib/site.ts` (`links.map` e `links.reviews`).
- [x] WhatsApp: (44) 99807-4406 confirmado pelo usuário como número de atendimento e WhatsApp.

## 4. Mídia

- [x] **Vídeo do hero** entregue e processado (desktop 1,3 MB e celular vertical 0,45 MB, sem áudio, faststart, loop contínuo). Original em `assets-originais/hero/video-hero.mp4`. Falta: o Rodrigo aprovar o vídeo; o arquivo é 720p (pode ficar macio em telas grandes: pedir 1080p); o loop usa uma dissolve de 1 s e o recorte vertical foi tirado do mesmo vídeo (uma versão gravada na vertical seria melhor).
- [ ] **Fotos reais** no lugar das provisórias (lista do que fotografar no §9 do documento de direção). As atuais têm aparência de imagem gerada.
  - Áreas: textos embutidos nas imagens ("BANK" na 3, placa "DEFESA MÉDICA" na 4), aperto de mão na 1, prédio de colunas e chave fundida a uma engrenagem na 5. Resolução de 944×1104.
  - Contato: `contact-01` mostra uma estatueta da Justiça.
  - Escritório: `office-01` e `office-02` são recortes da foto do hero; a pessoa de costas aparece nos dois lugares.
  - Retrato: 928×1062, abaixo dos 1600 px recomendados.
  - Conteúdo: `featured-01`, 1248×832.
- [ ] A marca **invisível** do gerador de imagens continua nos arquivos que vieram dele; o recorte tirou apenas a marca visível.
- Originais em alta ficam em `assets-originais/` (fora do git e da publicação).

## 5. Para publicar de verdade

- [ ] **Domínio** e onde hospedar. A Vercel no plano gratuito (Hobby) é de uso pessoal e não comercial; para o site do escritório em produção, avaliar o plano pago ou outra hospedagem.
- [ ] Remover o `noindex` (`src/app/layout.tsx`) e o aviso "Proposta de conceito · não publicado" (`SITE.flags.conceptNotice`).
- [ ] Validação do conteúdo pelo advogado à luz do Provimento 205/2021 da OAB (o texto integral não foi conferido). Isso inclui a faixa de avaliações do Google.
- [ ] Favicon, imagem de compartilhamento (og:image) e `robots`/`sitemap`, depois da logo.
- [ ] **Repositório GitHub público** (`vnzzyw22/escritorio-rodrigo`): decidir se deve ser privado, porque contém as fotos provisórias, o retrato e os dados do escritório.
- [ ] **Conectar a Vercel ao GitHub** para publicar sozinho a cada `git push`. A conexão automática falhou por falta de autorização do app da Vercel no GitHub: Vercel > projeto `escritorio-rodrigo` > Settings > Git > Connect. Enquanto isso, publicar com `npx vercel --prod --yes` na pasta do projeto.

## 6. Técnico

- [ ] **Desempenho:** otimizado em 2026-09-21 (§19 do documento de direção): thread principal na rolagem de 66% para 40% (celular CPU 4x), pior quadro de 231 para 33 ms. Sobra o LCP simulado do Lighthouse no celular (~3,1 s), que não mudou, e o custo das três famílias de fonte (opção: reduzir para duas). Publicar de novo na Vercel para o site no ar receber as melhorias.
- [ ] O build avisa que várias imagens estão abaixo da resolução mínima recomendada. É informativo; some quando chegarem as fotos reais.
- [ ] O servidor de desenvolvimento trava arquivos de imagem no Windows: para trocar uma foto já servida, pare o `npm run dev`, troque o arquivo e suba de novo.

## No ar

Site em produção: https://escritorio-rodrigo.vercel.app (`noindex`). Os endereços `escritorio-rodrigo-vnzzyw.vercel.app` e o de cada deploy ficam atrás do login da Vercel. Projeto na conta `vnzzyw`, projeto `escritorio-rodrigo`. Código: https://github.com/vnzzyw22/escritorio-rodrigo.

## Feito

Estrutura completa (hero em três estados, statement, escritório, áreas, profissional, avaliações, conteúdo, contato, rodapé), tipografia escolhida por espécime, acessibilidade (axe: 0 violações), movimento reduzido, teste do vídeo em Chrome real, formulário que abre o WhatsApp, OAB e atuação aplicadas, documentos de direção e de produto.
