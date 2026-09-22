# Pendências — site Vasconcelos — Escritório de Advocacia

Atualizado em 2026-09-22. **Este projeto era o site-conceito da Advocacia Rodrigo Alan Dias; o cliente não
seguiu adiante e o usuário pediu para reaproveitar a estrutura, a direção visual e os vídeos para um novo
cliente, Vasconcelos — Escritório de Advocacia (Maringá, PR).** A adaptação está em um branch separado
(`vasconcelos`), não publicada, feita rápido para servir de proposta visual ao Dr. Michael Vasconcelos —
ver §Objetivo. Nada do que faltava foi inventado: ver §1. Detalhes técnicos da adaptação em
`LAW-FIRM-DESIGN-DIRECTION.md` (registro de decisões, no fim).

## 0. Onde está publicado

- [x] **Decisão do usuário (2026-09-22): reaproveitar o mesmo repositório e projeto Vercel.** O repositório
  GitHub (`vnzzyw22/escritorio-rodrigo`) é **público** e a Vercel está conectada a ele: todo `git push` na
  `main` publica sozinho em `escritorio-rodrigo.vercel.app`. Esse é o mesmo endereço que já foi mostrado
  como proposta ao Rodrigo; a partir desta publicação, a `main` passa a mostrar o Vasconcelos. **O
  histórico do git continua guardando os dados do Rodrigo** (nome, endereço, telefone, OAB, as 4 avaliações
  reais de clientes dele) — não visível no site publicado, mas recuperável por quem tiver acesso ao
  repositório. O nome do repositório e do projeto Vercel continuam dizendo "escritorio-rodrigo".

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

- [x] **Telefone/WhatsApp** confirmado pelo usuário em 2026-09-22: (44) 99154-1714. Aplicado em `SITE.phone`
  (`display`, `e164`, `wa`) em `src/lib/site.ts`; todos os botões de contato (cabeçalho, barra do celular,
  formulário, rodapé) já usam o número real.
- [ ] **Logo real**, se existir (vetor de preferência). Sem ela, o site usa só o lockup tipográfico.
- [x] **Retrato do Dr. Michael Vasconcelos** adicionado em 2026-09-22 (duas fotos fornecidas pelo usuário):
  o retrato vertical (terno cinza) foi para o slot `lawyer` (`public/images/lawyer/retrato.webp`, seção
  Profissional); a foto horizontal (terno azul, meio corpo) foi para o detalhe do Escritório
  (`public/images/office/office-02.webp`, no lugar da foto genérica de café e caderno). Originais
  preservados em `assets-originais/lawyer/` (fora do git). **Ainda sem confirmação visual num navegador
  real** (ver nota no fim deste arquivo) — conferir o recorte das duas fotos (a de `office-02` é bem mais
  larga que o quadro 4:5 do slot e é cortada nas laterais).
- [ ] **Fotos reais do escritório e das áreas.** Continuam as mesmas provisórias do projeto anterior
  (aparência de imagem gerada), reaproveitadas por serem genéricas o bastante (mesa, contrato, prédio) —
  nenhuma mostra pessoa nem texto específico de outro escritório.
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

## No branch `vasconcelos`

Feito nesta adaptação (2026-09-22). A primeira leva (dados do cliente, 3 áreas, paleta, logo/símbolo) foi
verificada no navegador (desktop 1440 e celular 390, sem rolagem horizontal). **A segunda leva (telefone
real e as duas fotos do Dr. Vasconcelos) só foi verificada por `tsc`, `eslint`, `next build` e inspeção
direta dos arquivos de imagem — o Chrome DevTools MCP caiu no meio da checagem visual e não reconectou a
tempo.** Vale abrir o site publicado e conferir o recorte das duas fotos novas antes de mostrar ao Dr.
Vasconcelos.

- Nome, endereço, avaliações (nota + contagem, sem citação), telefone real e OAB (placeholder) trocados em
  `src/lib/site.ts`.
- Retrato do Dr. Vasconcelos e uma segunda foto dele no detalhe do Escritório (ver §2).
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
