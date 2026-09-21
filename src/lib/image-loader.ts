import manifest from "./image-manifest.json";

type Entry = { w: number; h: number; hash: string; widths: number[]; blur: string };
const MANIFEST = manifest as Record<string, Entry>;

/**
 * Loader do next/image que aponta para as variantes geradas no build (scripts/optimize-media.mjs):
 * arquivos estáticos e imutáveis, servidos direto pela CDN, sem otimizador em tempo de execução.
 * Fotos fora do manifesto (ex.: a logo) são servidas como estão.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const entry = MANIFEST[src];
  if (!entry) return src;
  const w = entry.widths.find((x) => x >= width) ?? entry.widths[entry.widths.length - 1];
  const base = src.replace(/^\//, "").replace(/\.[^.]+$/, "");
  return `/_img/${base}-${w}-${entry.hash}.webp`;
}
