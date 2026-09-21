import { AREAS } from "@/lib/content";
import { practiceSlotId } from "@/lib/media";
import { Areas } from "./areas";
import { Photo } from "./photo";

/**
 * Monta as fotos das áreas no servidor (sem JS) e as entrega prontas ao componente de cliente,
 * que só cuida da interação do desktop (qual área está ativa). As fotos dos cartões do celular são
 * `loading="lazy"`: só baixam quando a rolagem se aproxima.
 */
export function AreasSection() {
  const stack: Record<string, React.ReactNode> = {};
  const panel: Record<string, React.ReactNode> = {};
  for (const area of AREAS) {
    const slot = practiceSlotId(area.slug);
    stack[area.slug] = <Photo slot={slot} sizes="(min-width: 768px) 90vw, 100vw" tone="dark" />;
    panel[area.slug] = <Photo slot={slot} sizes="(min-width: 1024px) 33vw, 100vw" tone="dark" />;
  }
  return <Areas photos={{ stack, panel }} />;
}
