import fs from "node:fs";
import path from "node:path";
import { SLOT_DEFS, type ResolvedMedia } from "./media";

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function pixelWidth(file: string): Promise<number | null> {
  if (!/\.(webp|png|jpe?g|avif)$/i.test(file)) return null;
  try {
    const { default: sharp } = await import("sharp");
    return (await sharp(file).metadata()).width ?? null;
  } catch {
    return null;
  }
}

/** Roda no servidor (build): marca cada slot como disponível ou não. */
export async function resolveMedia(): Promise<ResolvedMedia> {
  const media: ResolvedMedia = {};
  for (const def of SLOT_DEFS) {
    const hit = def.files.find((f) => fs.existsSync(path.join(PUBLIC_DIR, f)));
    const width = hit ? await pixelWidth(path.join(PUBLIC_DIR, hit)) : null;
    const lowRes = width !== null && def.minWidth > 0 && width < def.minWidth * 0.9;
    if (hit && lowRes) {
      console.warn(
        `[mídia] ${hit} tem ${width}px; o mínimo recomendado é ${def.minWidth}px. A imagem não é esticada, mas pode ficar mole em telas grandes.`,
      );
    }
    media[def.id] = { ...def, src: hit ? `/${hit}` : null, width, lowRes };
  }
  return media;
}
