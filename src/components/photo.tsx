import Image from "next/image";
import type { ResolvedSlot } from "@/lib/media";
import { getMedia } from "@/lib/media.server";

type Props = {
  slot: string;
  /** Largura renderizada por breakpoint: evita baixar resolução máxima à toa. */
  sizes: string;
  /** Só para a imagem LCP. */
  eager?: boolean;
  /** Fundo do placeholder, conforme a seção. */
  tone?: "dark" | "light";
  /** Sobrescreve o object-position do manifesto. */
  position?: string;
  className?: string;
};

/**
 * Preenche o pai (que precisa ser `relative` e ter tamanho). Componente de servidor: não envia JS.
 * Arquivo ausente → placeholder que preserva a proporção e diz o que inserir.
 * Enquanto a foto carrega, aparece a miniatura borrada gerada no build (sem "pulo" de preto para imagem).
 */
export async function Photo({ slot, sizes, eager, tone = "dark", position, className = "" }: Props) {
  const s = (await getMedia())[slot];
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {s.src ? (
        <Image
          src={s.src}
          alt={s.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          placeholder={s.blur ? "blur" : "empty"}
          blurDataURL={s.blur ?? undefined}
          className="object-cover"
          style={{ objectPosition: position ?? s.position ?? "50% 50%" }}
        />
      ) : (
        <Placeholder slot={s} tone={tone} />
      )}
    </div>
  );
}

const CORNERS = [
  "left-4 top-4 border-l border-t",
  "right-4 top-4 border-r border-t",
  "bottom-4 left-4 border-b border-l",
  "bottom-4 right-4 border-b border-r",
] as const;

function Placeholder({ slot, tone }: { slot: ResolvedSlot; tone: "dark" | "light" }) {
  const dark = tone === "dark";
  const file = slot.files[0].split("/").pop();
  return (
    <div
      role="img"
      aria-label={`Espaço reservado para foto: ${slot.label}`}
      className={`absolute inset-0 ${dark ? "bg-graphite text-stone" : "bg-paper-deep text-ash"}`}
    >
      {CORNERS.map((c) => (
        <span
          key={c}
          aria-hidden="true"
          className={`absolute size-4 ${c} ${dark ? "border-stone/50" : "border-ash/50"}`}
        />
      ))}
      <div className="absolute inset-x-0 top-0 p-[clamp(32px,3vw,44px)]">
        <p className="label">Foto a inserir</p>
        <p className="mt-2 text-[0.95rem] leading-snug">{slot.label}</p>
        <p className="label mt-2 normal-case tracking-[0.03em]">
          {file} · {slot.ratio.replace("/", ":")} · mín. {slot.minWidth}px
        </p>
      </div>
    </div>
  );
}
