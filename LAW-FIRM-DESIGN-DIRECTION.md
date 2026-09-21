# Advocacia Rodrigo Alan Dias — Direção de arte

Documento vivo do site-conceito. Contexto de produto em `PRODUCT.md`. O código não altera nada daqui sem registrar a mudança neste arquivo.

Estado: 2026-09-20. Estrutura completa construída e verificada (seção 18). **Logo e vídeo finais ainda não foram entregues** (ver seção 13).

---

## 1. Conceito

**Contemporary Legal Editorial — "folha de autos".**

Uma identidade jurídica tradicional lida como publicação contemporânea. O site é um dossiê bem editado: a abertura é o escuro do escritório (foto, depois vídeo); uma **folha de papel** sobe e cobre essa imagem, e a partir dali a página é folha, margem e fio fino. A folha é a metáfora de clareza que sustenta o texto do hero ("Direito exige clareza.") e o do statement ("Antes de agir, é preciso compreender.").

Objetivo de cada decisão: autoridade sem pompa, precisão sem frieza, proximidade sem promessa.

O que o site **recusa** (categoria e brief): template de advogado, preto + dourado, estátua da Justiça, martelo, cards, métricas, depoimentos, "trusted by", grades repetidas, efeito só para parecer moderno.

## 2. Cena de uso (define claro/escuro)

Alguém em Sarandi, no celular, à noite ou no intervalo do trabalho, com uma decisão importante pendente, avaliando se confia neste escritório. E o Rodrigo, no computador, vendo o conceito pela primeira vez. Por isso: **abertura escura** (a foto é uma sala em luz baixa; o vídeo herdará isso), **corpo em papel** para leitura longa, e **dois momentos escuros** (Áreas e Contato) que marcam decisão e ação.

## 3. Paleta

Estratégia: **restrita**, fixada pelo brief. Neutros quentes, um único acento discreto.

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#0E0E0D` | Preto profundo: hero, Áreas, Contato, texto sobre papel |
| `graphite` | `#1D1E1C` | Superfícies escuras secundárias, placeholders escuros |
| `graphite-line` | `#33342F` | Fios sobre fundo escuro |
| `stone` | `#8E897F` | Cinza pedra: texto secundário **só sobre escuro** (≥ 5:1) |
| `ash` | `#5D594F` | Texto secundário sobre papel (≥ 5,5:1) |
| `paper` | `#F1EDE4` | Off-white quente: fundo das folhas |
| `paper-deep` | `#E7E1D4` | Faixas e campos sobre papel |
| `paper-line` | `#CFC8B8` | Fios sobre papel |
| `white` | `#FFFFFF` | Só onde o contraste exige (botão, texto sobre foto) |
| `bronze` | `#8F7248` | Acento raro: foco, um fio, marcador ativo. **≤ 2% da área.** |
| `bronze-light` | `#B79B6B` | O mesmo acento sobre fundo escuro |

Regras: bronze nunca preenche áreas grandes, nunca em texto corrido, nunca em gradiente. Nogueira e latão vivem na fotografia, não na interface. Valores a calibrar quando a logo real chegar.

## 4. Tipografia

Escolhida por espécime renderizado (2026-09-20), comparando Libre Caslon Display, Brygada 1918, Gilda Display, Prata, Gloock e Noto Serif Display.

| Papel | Família | Notas |
|---|---|---|
| Títulos | **Libre Caslon Display** 400 | Traço fino e claro, próximo ao lettering do cliente. Não tem itálico: **nunca usar oblíquo sintético** |
| Texto | **Libre Caslon Text** 400 | Mesma família; leitura confortável em claro e escuro. Só o peso regular é carregado (o site não usa negrito nem itálico). Para destacar uma palavra, declare `style: "italic"` em `src/app/layout.tsx`: é o itálico verdadeiro do Caslon |
| Rótulos, navegação, dados | **Schibsted Grotesk** 400–700 | Caixa-alta tracking .14–.18em, 11–13px. Só para rótulo, navegação, endereço, telefone |

Evitados de propósito: Inter, Poppins, Montserrat, Roboto, Playfair, Cormorant, Fraunces, Newsreader, DM Serif e Instrument, por serem defaults de site gerado. Gloock e Prata: pesados demais para a marca. Gilda: ficou "casamento".

Escala (fluida):

- Display XL (hero): `clamp(3.4rem, 8.4vw, 6rem)`, entrelinha .98, tracking −.015em.
- Display L (statement): `clamp(2.6rem, 6.6vw, 6rem)`, entrelinha 1.02.
- Display M (h2 de seção): `clamp(2.25rem, 4.6vw, 4.25rem)`, entrelinha 1.05.
- Título de linha (índice): `clamp(1.75rem, 3.2vw, 3rem)`.
- Texto grande: 1.25rem/1.55. Texto: 1.0625rem/1.65. Medida 62–70ch.
- Rótulo: .75rem, caixa-alta, .16em.

Sem kicker acima de título, sem numeração de seção. Números tabulares (`tnum`) em telefone, CEP e datas.

## 5. Grid e espaçamento

- 12 colunas. Margem `clamp(20px, 4.2vw, 76px)`; calha `clamp(16px, 1.8vw, 32px)`.
- **Trilho lateral** (≥ 1280px): coluna de margem à esquerda com o nome da seção atual em rotação de 90° e um fio de progresso. É navegação, não decoração; some no mobile.
- Composição assimétrica: cada seção usa outra divisão de colunas (7/5, 5/7, 4/8, texto deslocado), nunca a mesma estrutura duas vezes seguidas.
- Espaçamento: base 4px. Ritmo de seção `clamp(96px, 13vw, 200px)`. Mais espaço acima do título que abaixo; grupos internos apertados.
- Cantos: **0** em tudo. Inputs 0. Sem sombra. Profundidade só por camada (folha sobre foto) e fio.

## 6. Estrutura e composição (uma composição por seção)

| Seção | Fundo | Composição | Razão |
|---|---|---|---|
| **Hero** | foto/vídeo + `ink` | Imagem em tela cheia; título alinhado à esquerda embaixo em duas linhas; complemento em coluna estreita à direita; CTA primário retangular + link de texto; assinatura discreta ("Advocacia Rodrigo Alan Dias · Sarandi, PR") no rodapé da dobra; R gigante e quase invisível cortado no canto | Abrir com a imagem, não com um bloco de texto centralizado |
| **Statement** | `paper` | A folha sobe sobre o hero. Frase em display L com quebra assimétrica e recuo; nada mais na dobra | A transição é a narrativa: do escuro à clareza |
| **O escritório** | `paper` | Foto grande sangrando pela direita (7 col) + texto em coluna estreita deslocada para baixo + foto de detalhe sobreposta; legendas na margem | Fotografia protagonista |
| **Áreas de atuação** | `ink` | Índice vertical tipográfico com fios; ao passar o mouse/focar, painel fixo à direita troca imagem e descrição. Mobile: acordeão com imagem | Navegação por leitura, sem cards |
| **Profissional** | `paper-deep` | Retrato alto à esquerda; nome empilhado em display à direita; ficha em lista de definição | Apresentação editorial de uma pessoa |
| **Prova social** | `paper` | Faixa fina: nota e contagem do Google com link. **Desligável por flag** | Só o agregado informado; sem citações |
| **Conteúdo** | `paper` | "Sumário" de jornal: linhas com categoria, data e título; uma matéria em destaque | Estrutura pronta para publicações reais |
| **Contato** | `ink` | Frase grande + bloco de papel timbrado com endereço, telefone e formulário que abre o WhatsApp | Ação clara, sem peso |
| **Rodapé** | `ink` | Minimalista: marca, endereço, contato, OAB a confirmar, aviso informativo | Institucional |

## 7. Motion

Princípio: **um momento autoral** (a folha cobrindo o hero) e o resto contido. Motion reforça a narrativa; nunca é decoração.

Usa: máscara de linha em títulos; clip-path em fotos; parallax ≤ 8%; deslocamento do R; crossfade no painel das Áreas; progresso no trilho; hover em links. Curva `cubic-bezier(.16, 1, .3, 1)`; durações 0,9–1,2s para entradas, 0,3–0,4s para hover.

Não usa: bounce, spring exagerado, elementos voando, animação em tudo, glow, blur decorativo. A "mudança de palavras" ficou de fora de propósito (competiria com o título do hero); o painel das Áreas troca o texto por crossfade.

Movimento reduzido: `MotionConfig reducedMotion="user"` **e** desligamento explícito de clip-path, parallax e vídeo (clip-path não é transform e o framer não o desliga sozinho). Verificado em teste.

## 8. Símbolo R

Elemento de direção de arte, nunca repetição da logo. Aparece em três momentos: enorme e quase invisível no hero (6% de opacidade, cortado no canto); deslocando-se com o scroll atrás do statement (4,5%); e grande, cortado e quase invisível no rodapé (5%). Não aparece nas seções intermediárias, para não virar carimbo. **Depende do arquivo da logo**: até lá é um "R" tipográfico provisório, marcado como tal no código, sem círculo nem louro (não imita a marca).

## 9. Fotografia

Protagonista da identidade. Preferir: arquitetura, interiores, detalhes, retrato profissional, documentos, materiais, luz natural, composição cinematográfica. Evitar: aperto de mão, sorriso de banco de imagens, tribunal genérico, martelo, balança em excesso, imagem obviamente stock.

O poster atual (`foto-hero.png`) é um escritório de nogueira, livros, cadernos e uma pessoa de costas. **Aparência de imagem gerada**: o texto nos papéis e lombadas é ilegível; não ampliar além do quadro e substituir por fotografia real do escritório quando existir. A balança de latão ao fundo fica fora do recorte mobile.

**Proveniência dos rasters:** os dois posters do hero derivam do arquivo `foto-hero.png` fornecido pelo cliente (2752×1536), convertidos com ffmpeg para WebP q82: `rodrigo-hero-poster.webp` (quadro inteiro, 2752×1536) e `rodrigo-hero-poster-mobile.webp` (recorte 1200×1536 a partir de x=1252, sem reamostrar). **Fotos provisórias fornecidas pelo cliente em 2026-09-20** (convertidas de PNG/JPG para WebP; os originais ficam em `assets-originais/`, fora de `public/` e do git): cinco imagens das áreas (`area-01` a `area-05`, 944×1104), `contact-01` (recepção, 944×1104), `featured-01` (livro e caneta, 1248×832), `office-01` (recorte 3:2 de 1500×1000 da `foto-hero.png`, pilar, poltrona e a pessoa de costas; sem a balança) e `office-02` (recorte 4:5 de 560×700 da mesma foto: café, caneta e caderno sobre a mesa), ambos derivados do arquivo do hero, então a mesma pessoa de costas aparece no hero e no Escritório; as versões anteriores (livros e caneta) estão em `assets-originais/office/anteriores/`, e `rodrigo-01` (retrato, 928×1062, recortado de um original 928×1152 enviado em 2026-09-20, que parece uma versão melhorada por IA da foto pequena original, mesma cena; o recorte de 90 px na base eliminou a marca visível do gerador no canto inferior, e a marca invisível do gerador permanece no arquivo; o notebook da foto mostra "DIAS ADVOGADOS" e um "D", nome e marca que não são os do escritório; o Rodrigo deve aprovar a imagem, porque a IA pode ter alterado traços do rosto). Todas menos o retrato têm aparência de imagem gerada, com textos embutidos ("BANK" em `area-03`, placa "DEFESA MÉDICA" em `area-04`) e defeitos típicos (chave fundida a uma engrenagem em `area-05`); `area-01` é um aperto de mão e `contact-01` mostra uma estatueta da Justiça, ambos evitados no brief. Servem para o pitch; devem ser trocadas por fotos reais e em maior resolução antes de publicar. Nenhum raster veio da internet.

**Lista de fotos a produzir** (cada uma alimenta um slot da seção 10; nada de aperto de mão, martelo, sorriso de banco de imagens):

| Slot | O que fotografar |
|---|---|
| `office-01` | Vista ampla do interior do escritório em luz natural, sem pessoas posando: mesa, estantes, janela |
| `office-02` | Detalhe de material: documentos, madeira, caneta, livro |
| `rodrigo-01` | Retrato profissional do Rodrigo, luz natural, ambiente do escritório ao fundo |
| `practice/<slug>` | Um detalhe ou material por área confirmada |
| `featured-01` | Mesa de trabalho ou documento, textura |
| `contact-01` | Entrada, fachada ou recepção do escritório |
| Vídeo do hero | 8 a 12 s de câmera lenta no escritório, em loop |

Regras de imagem: nunca esticar imagem pequena; nunca mascarar baixa qualidade com blur; `next/image` com `sizes` correto; crops responsivos por `<picture>`; lazy loading, exceto a imagem do hero.

## 10. Slots de mídia (trocar o arquivo, manter o nome)

O site checa no servidor se cada arquivo existe. Ausente: moldura placeholder (proporção, largura mínima e nome do arquivo). Presente: usa direto, sem mudar código. Depois de trocar, é preciso rebuild (`npm run build`).

| Slot | Arquivo | Proporção / mínimo |
|---|---|---|
| Logo completa | `public/images/logo/rodrigo-alan-dias.svg` ou `.png` | vetor, ou PNG transparente ≥ 2000px |
| Símbolo R | `public/images/logo/rodrigo-symbol.svg` ou `.png` | só o símbolo; vetor ou ≥ 2000px |
| Hero vídeo desktop | `public/media/hero/rodrigo-hero-desktop.mp4` | 16:9, 1920×1080 |
| Hero vídeo mobile | `public/media/hero/rodrigo-hero-mobile.mp4` | vertical 9:16, 1080×1920 (ou 720×1280) |
| Hero poster desktop | `public/media/hero/rodrigo-hero-poster.webp` | 16:9, ≥ 2400px (atual: 2752×1536) |
| Hero poster mobile | `public/media/hero/rodrigo-hero-poster-mobile.webp` | 4:5, ≥ 1200×1500 (atual: 1200×1536) |
| Escritório | `public/images/office/office-01.webp`, `office-02.webp` | 3:2 ≥ 2400px; 4:5 ≥ 1400px |
| Profissional | `public/images/lawyer/rodrigo-01.webp` | 4:5 ≥ 1600px |
| Áreas | `public/images/practice/<slug>.webp` | 4:5 ≥ 1600px. O `<slug>` vem de `src/lib/content.ts` e hoje é `area-01` a `area-05`; nomes como `civil.webp` só valem depois de a área ser confirmada e o slug ser trocado lá |
| Editorial | `public/images/editorial/featured-01.webp` | 3:2 ≥ 1800px |
| Contato | `public/images/contact/contact-01.webp` | 4:5 ≥ 1400px |

**Vídeo do hero** (referência para quem gerar): H.264 High, `yuv420p`, sem áudio, `+faststart`, loop de 8–12s com primeiro e último quadro compatíveis, desktop ≤ 8 MB, mobile ≤ 3 MB.

```
ffmpeg -i in.mov -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 24 -preset slow -movflags +faststart -vf "scale=1920:-2,fps=24" rodrigo-hero-desktop.mp4
ffmpeg -i in.mov -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 25 -preset slow -movflags +faststart -vf "scale=1080:-2,fps=24" rodrigo-hero-mobile.mp4
```

**Hero em três estados:** (1) com vídeo: o vídeo entra em fade sobre o poster depois do primeiro paint; (2) sem vídeo: poster estático em alta qualidade; (3) celular: vídeo vertical se existir, senão poster mobile. O vídeo não carrega com `prefers-reduced-motion`, economia de dados (`saveData`) ou conexão 2g. O poster é sempre a imagem LCP.

## 11. Componentes

- **Botão primário:** retângulo, 0 de raio, `paper` sobre `ink` (ou o inverso), rótulo em caixa-alta tracking .14em, altura mínima 52px, seta fina. Um por bloco.
- **Link de texto:** sublinhado com deslocamento .3em que se desenha no hover/foco.
- **Fio:** 1px, `paper-line`/`graphite-line`; separa, não decora.
- **Linha de índice** (Áreas, Conteúdo): título, marcador, fio; estados hover, foco, ativo.
- **Lista de definição** (Profissional, Contato): rótulo em caixa-alta, valor em texto.
- **Placeholder de conteúdo:** `[TEXTO A CONFIRMAR]` visível, em `ash`/`stone`, sem parecer erro.
- **Placeholder de foto:** moldura com marcas de corte, nome do arquivo, proporção e largura mínima.
- **Navegação:** fixa; sobre o hero, texto claro; sobre papel, texto escuro com fundo `paper` a 92% e fio. Mobile: painel em tela cheia com foco preso, ESC fecha, e barra inferior com "Ligar" e "WhatsApp" depois do hero.
- **Formulário:** campos com fio inferior, rótulo sempre visível, erro em texto ("Informe seu nome"), sem asterisco decorativo. Aviso: não enviar documentos nem informações sigilosas.

Navegador também é design: `::selection` em `ink`/`paper`, `caret-color` em `bronze`, foco visível de 2px em `bronze` com deslocamento, `accent-color`, barra de rolagem fina.

## 12. Responsivo

Mobile tem composição própria, não é o desktop reduzido:

- Hero: foto 4:5 no topo (~68svh) e, abaixo, título e CTAs sobre `ink`. Nada de texto sobre foto em telas estreitas.
- Nav em painel; barra inferior de contato.
- Escritório: foto primeiro, texto depois, detalhe removido.
- Áreas: acordeão, imagem dentro do item aberto.
- Profissional: retrato antes do nome.
- Contato: telefone e WhatsApp antes do formulário.
- Alvos de toque ≥ 44px. Testar 360, 390, 768, 1024, 1440, 1920.

## 13. O que depende do cliente

| Falta | Efeito no site |
|---|---|
| **Arquivo da logo** (vetorial de preferência) | Nav e rodapé usam wordmark tipográfico neutro; R grande é tipográfico provisório. **Não mostrar ao Rodrigo antes de inserir a logo** |
| Vídeo do hero | Poster estático até existir |
| Fotos reais (escritório, retrato, áreas) | Molduras placeholder |
| **Áreas de atuação** | O site mostra 5 áreas de EXEMPLO (título de 1 a 3 palavras + descrição de ~175 caracteres, 4 linhas no painel), redigidas sem promessa de resultado. **O Rodrigo precisa confirmar ou trocar.** Fotos: `area-01` a `area-05` (Trabalho, Cível e Contratos, Consumidor, Defesa Médica, Patrimonial) |
| Formação, texto de apresentação, descrição do escritório, horário, artigos | Placeholders `[… A CONFIRMAR]`. A OAB (**OAB/PR 90.980**) e a frase de atuação já foram informadas pelo usuário; a OAB não foi conferida no cadastro oficial |
| ~~Confirmar que o número é WhatsApp~~ | Confirmado pelo usuário em 2026-09-20 (botão usa `wa.me`) |
| Validação OAB da prova social e do aviso institucional | Faixa desligável por flag |

## 14. Conteúdo e conformidade

Comunicação informativa e sóbria (Provimento 205/2021, pela leitura da página oficial). **Nunca:** promessa de resultado, garantia, "ganhe sua causa", "somos os melhores", casos concretos, resultados ou valores, números de causas, valores de honorários, gratuidade, descontos, comparação com concorrentes, depoimentos ou nomes de clientes. Nenhuma informação jurídica é inventada. O advogado valida o conteúdo final.

## 15. Acessibilidade

WCAG 2.2 AA: contraste (texto ≥ 4,5:1, grande ≥ 3:1), foco visível, navegação por teclado, link "pular para o conteúdo", landmarks, `lang="pt-BR"`, `aria-current` na navegação, texto alternativo real nas fotos e vazio nas decorativas, movimento reduzido, nada essencial só no vídeo.

## 16. Desempenho

Poster como LCP (`<img>` eager com `fetchpriority="high"` dentro de `<picture>` com arte-direção); vídeo só depois do primeiro paint e só quando permitido; fontes por `next/font` (subset latin, `swap`); `next/image` com AVIF/WebP e `sizes`; JavaScript mínimo (seções estáticas no servidor, ilhas de cliente só onde há interação ou scroll). `robots: noindex` enquanto for conceito.

## 17. Anti-patterns (lista interna)

Cards de ícone + título + texto; grade de três; métricas grandes com rótulo pequeno; kicker acima de título; numeração de seção; raio de borda; sombra; glassmorphism; gradiente decorativo (só é permitida a máscara funcional sob texto sobre foto); glow; pill; botão em todo lugar; texto todo centralizado; mesma estrutura em todas as seções; ícone sem função; balança, martelo e tribunal decorativos; dourado dominante; animação aleatória; blob; estética de painel ou SaaS; imagem esticada ou disfarçada com blur; itálico sintético.

---

## 18. Verificação (2026-09-20, build de produção)

| Item | Resultado |
|---|---|
| Tipos, lint, build | Sem erros; rota estática |
| Detector mecânico do Impeccable | Nenhum achado |
| axe-core (WCAG 2.2 AA + boas práticas), desktop e celular | 0 violações |
| Contraste do texto sobre a foto do hero (amostragem de pixels) | Mínimo 5,87:1 (texto de apoio); título 7,82:1 |
| Rolagem horizontal | Nenhuma em 360, 390, 430, 768, 820, 1024, 1280, 1366, 1440, 1920 e 2560 px |
| Hero com vídeo, em Chrome real | Toca; celular baixa só o vídeo vertical; sem vídeo com movimento reduzido, economia de dados ou 2g; título e CTA aparecem antes do vídeo |
| Movimento reduzido | Sem animação de entrada, sem parallax do hero e sem clip-path |
| Formulário | Valida; abre `wa.me` com número e mensagem corretos |
| Desktop, sem limitação | FCP/LCP 0,22 s, CLS 0, TBT 6 ms, JS 185 KB, fontes 78 KB, poster 46 KB |
| Celular, 4G lenta + CPU 4x | LCP 1,7 s (poster mobile, 19 KB), CLS 0, **TBT ≈ 1,1 s** |

**Limite conhecido de desempenho:** o TBT de ~1,1 s no cenário mais pessimista vem quase todo de layout (≈ 0,9 s), e ~0,65 s disso são as três famílias de webfont (com fontes do sistema cai para ~0,29 s). Uma página mínima do mesmo build fica em ~0,25 s. `font-display: optional` só reduziu ~12% e foi descartado (esconderia a tipografia da marca na primeira visita lenta). Opções, se for preciso baixar mais: reduzir para duas famílias (por exemplo, Caslon Display + Schibsted), ou `content-visibility: auto` nas seções abaixo da dobra (exige cuidado com âncoras e parallax).

## 19. Otimização de desempenho (2026-09-21)

Diagnóstico com Lighthouse, teste de rolagem real (rolagem por roda, CPU 4x no celular e 2x no desktop) e trace da thread principal. Causa principal do travamento: animações de rolagem em JavaScript (parallax de 8 fotos, trilho, "R" do statement), que reescreviam transforms a cada quadro e mantinham a thread principal ocupada.

**O que mudou (o visual foi preservado):**
- Reveals, cortina das fotos, parallax, cortina do hero e trilho agora são CSS (`transition` e `animation-timeline`), só com `transform` e `opacity`, no compositor. Um único IntersectionObserver aciona todas as revelações. O framer-motion foi removido.
- Seções viraram componentes de servidor (HTML, sem JS de hidratação). No cliente ficam só a navegação, o trilho, a barra do celular, o vídeo do hero, o formulário e a interação das Áreas.
- Menu do celular sem `overflow:hidden` no `<html>` (forçava um layout da página inteira). A seção ativa vem de um IntersectionObserver, sem leitura de layout a cada quadro.
- Fotos: variantes responsivas geradas no build (`scripts/optimize-media.mjs`, hash no nome, cache imutável) e miniatura borrada enquanto carregam. Sem otimizador em tempo de execução (o primeiro acesso levava 160 a 480 ms por foto). Fotos do acordeão só são montadas ao abrir a linha.
- Vídeo do hero: faststart, sem áudio, loop contínuo (dissolve de 1 s do fim para o início), versão vertical própria para o celular, URL com hash e cache imutável.
- Statement no celular menos alto (78svh) e logotipo do menu sem quebra em 320 px.

| Medida (build de produção local) | Antes | Depois |
|---|---|---|
| Thread principal ocupada na rolagem, celular CPU 4x | 66% | 40% |
| Quadros acima de 33 ms na rolagem, celular | 14% (119 de 853) | 2,3% (21 de 926) |
| Pior quadro na rolagem, celular | 231 ms | 33,5 ms |
| Pior quadro na rolagem, desktop CPU 2x | 1333 ms | 100 ms |
| Abrir o menu no celular (CPU 4x) | 190 a 700 ms | 136 ms (88 ms sem vídeo) |
| CLS na rolagem, celular | 0,035 | 0 |
| JavaScript transferido | 190 KB | 147 KB |
| Lighthouse desktop | 99 (SI 1,09 s; 2,02 MB) | 100 (SI 0,43 s; 1,62 MB) |
| Lighthouse celular (mediana de 3) | 93 (LCP 3,12 s; TBT 61 ms) | 92 (LCP 3,08 s; TBT 44 ms) |

**Sem ganho ou pior:** o LCP do Lighthouse no celular quase não mudou (o atraso de renderização vem da thread principal na simulação de CPU 4x). O Speed Index do celular subiu (1,29 para 4,09 s) e o peso passou de 0,37 para 0,75 MB porque o celular agora toca o vídeo vertical (0,45 MB), que entra em fade depois do carregamento e o Lighthouse conta essa mudança visual. A variação entre execuções do Lighthouse é alta (notas 67, 92 e 95).

## Registro de decisões

- 2026-09-20 — Conceito, paleta e tipografia definidos. Newsreader descartada (lista de fontes-padrão de IA); Libre Caslon escolhida por espécime. Sem numeração de seção nem kicker (regra do Impeccable). Concept-seed não executado: direção pinada pelo brief.
- 2026-09-20 — Cabeçalho transparente só no topo do hero; sólido nas demais seções (conteúdo passava por baixo do menu). Placeholders de foto com rótulo no topo. Áreas com placeholder curto e estado inativo em 55% de paper (contraste). Metadados do Conteúdo em `[CATEGORIA]` e `[DATA]`. Framer-motion via `LazyMotion` (`m`, recursos carregados sob demanda). Faces de fonte não usadas removidas.
- 2026-09-20 — Bloco de papel timbrado redefine o contexto (`.paper-surface`) porque fica dentro de seção escura.
- 2026-09-21 — Otimização de desempenho (§19): animações em CSS, framer-motion removido, seções de servidor, pipeline de imagens no build, vídeo do hero processado com versão vertical. Loop do vídeo com dissolve de 1 s (ajuste técnico do arquivo original, guardado em `assets-originais/hero/`).

