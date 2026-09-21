/**
 * Gera, no build, as variantes responsivas de cada foto e um manifesto para o loader de imagens.
 *
 *  - Entrada: os arquivos "mestres" em public/images/** e os posters em public/media/hero.
 *    O fluxo do cliente não muda: trocar o mestre mantendo o nome basta.
 *  - Saída: public/_img/<caminho>-<largura>-<hash>.webp (o hash do conteúdo permite cache imutável)
 *    e src/lib/image-manifest.json (largura, hash e miniatura borrada de cada foto).
 *  - A maior variante é uma cópia byte a byte do mestre (sem perda de geração); as menores são
 *    reencodadas em WebP q80. Nada é ampliado.
 *  - Idempotente: variantes que já existem são reaproveitadas; as obsoletas são removidas.
 */
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, "_img");
const MANIFEST = path.join(ROOT, "src", "lib", "image-manifest.json");
const LADDER = [480, 768, 1080, 1440, 1920, 2560];
const EXT = /\.(webp|jpe?g|png)$/i;
const SKIP = [path.join("images", "logo")];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const sources = [...walk(path.join(PUBLIC, "images")), ...walk(path.join(PUBLIC, "media", "hero"))]
  .filter((f) => EXT.test(f))
  .filter((f) => !SKIP.some((s) => f.includes(s)));

fs.mkdirSync(OUT, { recursive: true });
const manifest = {};
const keep = new Set();
let generated = 0;

for (const file of sources) {
  const rel = path.relative(PUBLIC, file).split(path.sep).join("/");
  const buf = fs.readFileSync(file);
  const hash = createHash("sha1").update(buf).digest("hex").slice(0, 8);
  const meta = await sharp(buf).metadata();
  const srcW = meta.width;
  const widths = [...LADDER.filter((w) => w < srcW * 0.94), srcW];
  const base = rel.replace(EXT, "");
  for (const w of widths) {
    const name = `${base}-${w}-${hash}.webp`;
    const dest = path.join(OUT, name);
    keep.add(dest);
    if (fs.existsSync(dest)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (w === srcW && /\.webp$/i.test(file)) fs.copyFileSync(file, dest);
    else await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: w === srcW ? 84 : 80, effort: 5 }).toFile(dest);
    generated++;
  }
  const blur = (await sharp(buf).resize({ width: 16 }).webp({ quality: 40 }).toBuffer()).toString("base64");
  manifest["/" + rel] = { w: srcW, h: meta.height, hash, widths, blur: `data:image/webp;base64,${blur}` };
}

// Remove variantes de versões antigas dos mestres.
let removed = 0;
for (const f of walk(OUT)) if (!keep.has(f)) { fs.rmSync(f); removed++; }

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + "\n");
console.log(`[mídia] ${sources.length} fotos, ${generated} variantes geradas, ${removed} obsoletas removidas.`);
