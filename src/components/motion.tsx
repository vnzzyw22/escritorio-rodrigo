import type { CSSProperties } from "react";
import { getMedia } from "@/lib/media.server";
import { Photo } from "./photo";

export { Line, Reveal } from "./reveal";

/**
 * Foto de um slot com revelação em "cortina" (uma faixa da cor da seção que recolhe) e parallax
 * leve. Componente de servidor: não envia JS. A revelação é CSS acionado por reveal-observer.tsx;
 * o parallax é CSS scroll-driven (compositor) e só existe em telas largas com mouse.
 * O placeholder não desliza (o texto dele ficaria andando).
 */
export async function Frame({
  slot,
  sizes,
  className = "",
  tone = "dark",
  range = 6,
  delay = 0,
  position,
  mobileRatio,
}: {
  slot: string;
  sizes: string;
  className?: string;
  tone?: "dark" | "light";
  range?: number;
  delay?: number;
  position?: string;
  /** Proporção só abaixo de md (celular), quando a do slot recorta demais a foto. */
  mobileRatio?: string;
}) {
  const s = (await getMedia())[slot];
  const moving = Boolean(s.src) && range > 0;
  return (
    <div
      data-reveal
      className={`rv-curtain [aspect-ratio:var(--arm)] md:[aspect-ratio:var(--ar)] ${className}`}
      style={{ "--ar": s.ratio, "--arm": mobileRatio ?? s.ratio, "--d": `${delay}s` } as CSSProperties}
    >
      {moving ? (
        <div className="parallax" style={{ "--pr": `${range}%` } as CSSProperties}>
          <Photo slot={slot} sizes={sizes} tone={tone} position={position} />
        </div>
      ) : (
        <Photo slot={slot} sizes={sizes} tone={tone} position={position} />
      )}
    </div>
  );
}
