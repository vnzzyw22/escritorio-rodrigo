import { AREAS } from "@/lib/content";
import { practiceSlotId } from "@/lib/media";
import { Areas } from "./areas";
import { Photo } from "./photo";

/**
 * Monta as fotos das áreas no servidor (sem JS) e as entrega prontas ao componente de cliente,
 * que só cuida da interação (qual área está ativa).
 */
export function AreasSection() {
  const accordion: Record<string, React.ReactNode> = {};
  const panel: Record<string, React.ReactNode> = {};
  for (const area of AREAS) {
    const slot = practiceSlotId(area.slug);
    accordion[area.slug] = <Photo slot={slot} sizes="100vw" tone="dark" />;
    panel[area.slug] = <Photo slot={slot} sizes="(min-width: 1024px) 33vw, 100vw" tone="dark" />;
  }
  return <Areas photos={{ accordion, panel }} />;
}
