# Pendências — site Vasconcelos — Escritório de Advocacia

Atualizado em 2026-09-22. **Este projeto era o site-conceito da Advocacia Rodrigo Alan Dias; o cliente não
seguiu adiante e o usuário pediu para reaproveitar a estrutura, a direção visual e os vídeos para um novo
cliente, Vasconcelos — Escritório de Advocacia (Maringá, PR).** A adaptação está em um branch separado
(`vasconcelos`), não publicada, feita rápido para servir de proposta visual ao Dr. Michael Vasconcelos —
ver §Objetivo. Nada do que faltava foi inventado: ver §1. Detalhes técnicos da adaptação em
`LAW-FIRM-DESIGN-DIRECTION.md` (registro de decisões, no fim).

## 0. Antes de qualquer coisa: decisão do usuário

- [ ] **Onde publicar.** O repositório GitHub (`vnzzyw22/escritorio-rodrigo`) é **público** e a Vercel está
  conectada a ele: qualquer `git push` na `main` publica sozinho em `escritorio-rodrigo.vercel.app`, o
  mesmo endereço que já foi mostrado como proposta ao Rodrigo. Por isso esta adaptação ficou em um branch
  à parte (`vasconcelos`), sem *merge* nem *push*. Antes de publicar de verdade, decidir: (a) um repositório
  e projeto Vercel **novos**, com nome do Vasconcelos, ou (b) reaproveitar este mesmo repositório e projeto,
  cientes de que o histórico do git guarda os dados do Rodrigo (nome, endereço, telefone, OAB e as 4
  avaliações reais de clientes dele) e de que o nome do repositório e da URL continuam dizendo
  "escritorio-rodrigo". Nenhuma opção foi executada.

## 1. O que foi removido, e por quê

Nada do cliente anterior foi reaproveitado como se fosse do Vasconcelos:

- **Telefone, endereço, OAB, avaliações e retrato do Rodrigo**: removidos. As 4 avaliações reais (nomes
  abreviados) eram depoimentos verdadeiros de clientes dele; usá-las para o Vasconcelos seria atribuir a
  outra pessoa uma opinião que ela nunca deu.
- **Logo e símbolo do Rodrigo** (círculo, R e louro, animado no hero): removidos dos arquivos publicados e
  do código. Sem uma logo real do Vasconcelos, o site usa só tipografia (nome "VASCONCELOS" e "ESCRITÓRIO
  DE ADVOCACIA"), sem inventar símbolo.
- **Foto do Rodrigo usada como detalhe do escritório** (um retrato dele tinha sido posto, por engano, no
  lugar de uma foto de mesa): trocada de volta pela foto genérica (café e caderno) que estava lá antes.
- **Favicon e imagem de compartilhamento**: tinham o símbolo real do Rodrigo gravado no PNG; regenerados
  com o novo lockup tipográfico.

## 2. Antes de mostrar ao Dr. Vasconcelos

- [ ] **Telefone/WhatsApp.** Não foi informado. Aparece como `[TELEFONE A CONFIRMAR]` em todos os botões de
  contato (cabeçalho, barra do celular, formulário, rodapé). Editar `SITE.phone` em `src/lib/site.ts`
  (`display`, `e164`, `wa`). **Sem o número real, ninguém consegue de fato entrar em contato pelo site.**
- [ ] **Logo real**, se existir (vetor de preferência). Sem ela, o site usa só o lockup tipográfico.
- [ ] **Fotos reais do escritório, das áreas e do Dr. Vasconcelos.** Todas as fotos atuais são as mesmas
  provisórias do projeto anterior (aparência de imagem gerada), reaproveitadas por serem genéricas o
  bastante (mesa, contrato, prédio) — nenhuma mostra uma pessoa real nem texto específico de outro
  escritório. O retrato profissional está vazio (moldura "Foto a inserir").
- [ ] **Duas fotos das áreas ficaram de fora**, porque têm texto errado gravado na imagem: uma diz "DEFESA
  MÉDICA" e a outra tem um prédio com a palavra "BANK" na fachada. Arquivos preservados, sem uso, em
  `public/images/practice/area-03.webp` e `area-04.webp`.

## 3. Informações que dependem do Dr. Vasconcelos

Hoje aparecem como `[X A CONFIRMAR]`. Editar em `src/lib/content.ts` e `src/lib/site.ts`.

- [ ] **CEP** do endereço (`SITE.address.zip`).
- [ ] **Inscrição na OAB** (`FOOTER.oab`, usada também no rodapé e em `/privacidade`).
- [ ] **Formação** do Dr. Michael Vasconcelos.
- [ ] **Texto de apresentação** dele (biografia curta).
- [ ] **Horário de atendimento** (`CONTACT.hours`).
- [ ] **Confirmar as três áreas de atuação** (Administrativo, Bancário, Imobiliário) e as descrições
  escritas a partir só do que foi informado no briefing (sem subespecialidade nem promessa acrescentada).
- [ ] **Validar as listas de documentos da "Primeira conversa"** (`FIRST_TALK` em `content.ts`): rascunho
  genérico por área, ainda não conferido por ele.
- [ ] **Facebook/Instagram**, se existir algum — hoje as linhas de redes sociais estão escondidas (nenhum
  link foi informado).
- [ ] **Avaliações do Google**: confirmado só nota (5,0) e contagem (26); sem os textos, a faixa mostra
  apenas o número. Se ele quiser citar avaliações reais, elas precisam ser copiadas do Google, palavra por
  palavra, com autorização — nunca inventadas.

## 4. Direção visual

- [ ] **Paleta migrada** para tons terrosos/café (a mesma estrutura de tokens do projeto anterior, só os
  valores de cor mudaram — ver `LAW-FIRM-DESIGN-DIRECTION.md`). Ainda não validada com o Dr. Vasconcelos.
- [ ] **Vídeo e fotos do hero**: mantidos exatamente como estavam (o usuário pediu para não gerar nem trocar
  vídeo), mesma cena de livro e balança sobre a mesa.
- [ ] **Título do hero** ("Direito exige clareza.") e o texto de apoio foram mantidos, por serem genéricos e
  não citarem o cliente anterior. Avaliar se combinam com o Vasconcelos ou se merecem texto próprio.

## 5. Técnico

- [ ] **Resolução das fotos**: o build avisa que várias imagens estão abaixo do mínimo recomendado (herdado
  do projeto anterior); some quando entrarem fotos reais.
- [ ] **Slots de foto renomeados**: as 3 fotos de área reaproveitadas viraram `administrativo.webp`,
  `bancario.webp` e `imobiliario.webp` (antes `area-01`, `area-02`, `area-05`); o retrato do profissional
  passou a esperar o arquivo `public/images/lawyer/retrato.webp` (antes `rodrigo-01.webp`).
- [ ] O servidor de desenvolvimento trava arquivos de imagem no Windows: para trocar uma foto já servida,
  pare o `npm run dev`, troque o arquivo e suba de novo.

## No branch `vasconcelos` (não publicado)

Feito nesta adaptação (2026-09-22), tudo verificado no navegador (desktop 1440 e celular 390, sem rolagem
horizontal) e com `tsc`, `eslint` e `next build` limpos:

- Nome, endereço, avaliações (nota + contagem, sem citação), telefone (placeholder seguro, não o número do
  Rodrigo) e OAB (placeholder) trocados em `src/lib/site.ts`.
- Três áreas de atuação reais (Administrativo, Bancário, Imobiliário), com fotos e descrições próprias.
- Seção "Primeira conversa" com listas de documentos reescritas para as três novas áreas.
- Profissional: nome "Michael Vasconcelos"; formação, OAB e apresentação como pendentes; retrato removido
  (volta ao estado de moldura "Foto a inserir").
- Escritório: título e texto reescritos, sem citar anos de experiência não informados.
- Logo/símbolo do Rodrigo removidos de tudo o que é publicado (hero, favicon, imagem de compartilhamento);
  hero usa o lockup tipográfico "Vasconcelos · Escritório de Advocacia"; o "V" grande decorativo do
  Statement e do rodapé é a inicial do nome, gerada dinamicamente (não é mais fixo em "R").
  Vídeo, poster e a animação de entrada do hero foram mantidos sem alteração.
- Paleta migrada para tons terrosos/café, mesma estrutura de tokens.
- Facebook/redes sociais escondidos (nenhum informado); página `/privacidade` genericizada (sem o nome, a
  OAB nem o texto fixo do Rodrigo).
