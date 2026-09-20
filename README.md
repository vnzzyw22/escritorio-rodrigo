# Advocacia Rodrigo Alan Dias — site-conceito

Next.js 16 (App Router) · Tailwind CSS 4 · framer-motion. Conceito, paleta, tipografia e regras em [LAW-FIRM-DESIGN-DIRECTION.md](LAW-FIRM-DESIGN-DIRECTION.md); contexto de produto em [PRODUCT.md](PRODUCT.md).

```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Trocar mídia (sem mexer no código)

Cada foto, a logo e o vídeo do hero têm um caminho fixo em `public/` (tabela completa na seção 10 do documento de direção). Solte o arquivo com o mesmo nome e **rode `npm run build`**: o servidor confere no build se o arquivo existe; se não existir, aparece uma moldura placeholder dizendo o que inserir.

- Vídeo do hero: `public/media/hero/rodrigo-hero-desktop.mp4` e `rodrigo-hero-mobile.mp4` (vertical). Sem os arquivos, o hero usa o poster.
- Logo: `public/images/logo/rodrigo-alan-dias.svg` (ou `.png`) e o símbolo `rodrigo-symbol.svg` (ou `.png`). Sem eles, a marca aparece como um lockup tipográfico neutro e o "R" grande é um glifo provisório.

## Conteúdo e chaves

- Texto e placeholders `[X A CONFIRMAR]`: `src/lib/content.ts`.
- Fatos confirmados e chaves (`socialProof`, `whatsapp`, `conceptNotice`): `src/lib/site.ts`.
- WhatsApp: número em `SITE.phone.wa`, ou `NEXT_PUBLIC_WHATSAPP_NUMBER` (só dígitos, DDI+DDD). Número confirmado como WhatsApp pelo usuário em 2026-09-20.
- O site está com `noindex` enquanto for conceito (`src/app/layout.tsx`).
