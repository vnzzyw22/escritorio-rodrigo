import { AREAS } from "./content";

/**
 * Manifesto de mídia: cada slot tem caminhos previsíveis dentro de `public/`.
 * O servidor confere se o arquivo existe (media.server.ts). Presente → é usado;
 * ausente → moldura placeholder. Trocar o arquivo mantendo o nome não exige mudar código.
 */
export type SlotDef = {
  id: string;
  /** Caminhos candidatos dentro de public/, em ordem de preferência. */
  files: string[];
  /** Proporção de exibição (CSS aspect-ratio). */
  ratio: string;
  /** Largura mínima recomendada, em px (abaixo disso o build avisa). */
  minWidth: number;
  /** Rótulo humano, usado no placeholder. */
  label: string;
  alt: string;
  position?: string;
};

export type ResolvedSlot = SlotDef & {
  /** URL pública, ou null quando o arquivo não existe. Vídeos levam ?v=<hash> (cache imutável). */
  src: string | null;
  width: number | null;
  lowRes: boolean;
  /** Miniatura borrada (data URL) gerada no build, usada enquanto a foto carrega. */
  blur: string | null;
};

export type ResolvedMedia = Record<string, ResolvedSlot>;

export const practiceSlotId = (slug: string) => `practice:${slug}`;

export const SLOT_DEFS: SlotDef[] = [
  {
    id: "logo",
    files: ["images/logo/rodrigo-alan-dias.svg", "images/logo/rodrigo-alan-dias.png"],
    ratio: "auto",
    minWidth: 800,
    label: "Logo completa",
    alt: "Advocacia Rodrigo Alan Dias",
  },
  {
    id: "symbol",
    files: ["images/logo/rodrigo-symbol.svg", "images/logo/rodrigo-symbol.png"],
    ratio: "1/1",
    minWidth: 2000,
    label: "Símbolo R",
    alt: "",
  },
  {
    id: "heroPoster",
    files: ["media/hero/rodrigo-hero-poster.webp"],
    ratio: "16/9",
    minWidth: 2400,
    label: "Hero — poster desktop",
    alt: "",
    position: "50% 55%",
  },
  {
    id: "heroPosterMobile",
    files: ["media/hero/rodrigo-hero-poster-mobile.webp"],
    ratio: "4/5",
    minWidth: 1200,
    label: "Hero — poster mobile",
    alt: "",
    position: "50% 50%",
  },
  {
    id: "heroVideoDesktop",
    files: ["media/hero/rodrigo-hero-desktop.mp4"],
    ratio: "16/9",
    minWidth: 0,
    label: "Hero — vídeo desktop",
    alt: "",
  },
  {
    id: "heroVideoMobile",
    files: ["media/hero/rodrigo-hero-mobile.mp4"],
    ratio: "9/16",
    minWidth: 0,
    label: "Hero — vídeo mobile",
    alt: "",
  },
  {
    id: "office1",
    files: ["images/office/office-01.webp"],
    ratio: "3/2",
    minWidth: 2400,
    label: "Escritório — vista geral",
    alt: "Ambiente do escritório",
  },
  {
    id: "office2",
    files: ["images/office/office-02.webp"],
    ratio: "4/5",
    minWidth: 1400,
    label: "Escritório — detalhe",
    alt: "Detalhe do escritório",
  },
  {
    id: "lawyer",
    files: ["images/lawyer/rodrigo-01.webp"],
    ratio: "4/5",
    minWidth: 1600,
    label: "Retrato — Rodrigo Alan Dias",
    alt: "Retrato de Rodrigo Alan Dias",
    position: "50% 30%",
  },
  {
    id: "featured",
    files: ["images/editorial/featured-01.webp"],
    ratio: "3/2",
    minWidth: 1800,
    label: "Conteúdo — destaque",
    alt: "",
  },
  {
    id: "contact",
    files: ["images/contact/contact-01.webp"],
    ratio: "4/5",
    minWidth: 1400,
    label: "Contato — entrada do escritório",
    alt: "Entrada do escritório",
  },
  ...AREAS.map(
    (a): SlotDef => ({
      id: practiceSlotId(a.slug),
      files: [`images/practice/${a.slug}.webp`],
      ratio: "4/5",
      minWidth: 1600,
      label: `Área de atuação — ${a.slug}`,
      alt: "",
    }),
  ),
];
