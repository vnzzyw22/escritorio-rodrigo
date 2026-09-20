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

- [ ] **Vídeo do hero:** `public/media/hero/rodrigo-hero-desktop.mp4` (16:9, 1920×1080) e `rodrigo-hero-mobile.mp4` (vertical 9:16). H.264, sem áudio, `+faststart`, de 8 a 12 s em loop, desktop até 8 MB e mobile até 3 MB. Ao chegar, trocar os posters por um quadro do vídeo. Sem vídeo, o hero usa o poster.
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
- [ ] Repositório GitHub público: decidir se deve ser privado (contém as fotos e os dados do escritório).

## 6. Técnico

- [ ] **Desempenho no celular lento:** no cenário mais pessimista (rede 4G lenta com CPU 4x mais fraca) o TBT é de ~1,1 s (LCP 1,7 s, CLS 0). Cerca de 0,65 s vêm das três famílias de fonte. Opções no §18 do documento de direção: reduzir para duas famílias ou aplicar `content-visibility` nas seções abaixo da dobra.
- [ ] O build avisa que várias imagens estão abaixo da resolução mínima recomendada. É informativo; some quando chegarem as fotos reais.
- [ ] O servidor de desenvolvimento trava arquivos de imagem no Windows: para trocar uma foto já servida, pare o `npm run dev`, troque o arquivo e suba de novo.

## Feito

Estrutura completa (hero em três estados, statement, escritório, áreas, profissional, avaliações, conteúdo, contato, rodapé), tipografia escolhida por espécime, acessibilidade (axe: 0 violações), movimento reduzido, teste do vídeo em Chrome real, formulário que abre o WhatsApp, OAB e atuação aplicadas, documentos de direção e de produto.
