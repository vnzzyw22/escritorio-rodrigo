import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import manifest from "./image-manifest.json";
import { SLOT_DEFS, type ResolvedMedia } from "./media";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MANIFEST = manifest as Record<string, { w: number; blur: string }>;

/** Hash curto do vídeo (tamanho + data): a URL muda quando o arquivo é trocado. */
function videoVersion(file: string) {
  const st = fs.statSync(file);
  return createHash("sha1").update(`${st.size}:${Math.round(st.mtimeMs)}`).digest("hex").slice(0, 8);
}

/** Roda no servidor (build): marca cada slot como disponível ou não. */
export async function resolveMedia(): Promise<ResolvedMedia> {
  const media: ResolvedMedia = {};
  for (const def of SLOT_DEFS) {
    const hit = def.files.find((f) => fs.existsSync(path.join(PUBLIC_DIR, f)));
    const entry = hit ? MANIFEST[`/${hit}`] : undefined;
    const width = entry?.w ?? null;
    const lowRes = width !== null && def.minWidth > 0 && width < def.minWidth * 0.9;
    if (hit && lowRes) {
      console.warn(
        `[mídia] ${hit} tem ${width}px; o mínimo recomendado é ${def.minWidth}px. A imagem não é esticada, mas pode ficar mole em telas grandes.`,
      );
    }
    let src: string | null = null;
    if (hit) src = /\.mp4$/i.test(hit) ? `/${hit}?v=${videoVersion(path.join(PUBLIC_DIR, hit))}` : `/${hit}`;
    media[def.id] = { ...def, src, width, lowRes, blur: entry?.blur ?? null };
  }
  return media;
}

/** Uma resolução por renderização/build, compartilhada por todos os componentes de servidor. */
export const getMedia = cache(resolveMedia);
