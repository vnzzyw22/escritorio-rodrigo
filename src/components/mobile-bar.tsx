"use client";

import { TEL_URL, whatsappUrl } from "@/lib/contact";
import { SITE } from "@/lib/site";
import { useActiveSection } from "./providers";

/** Barra de contato fixa no celular. Aparece depois do hero e some na seção de contato. */
export function MobileBar() {
  const { id } = useActiveSection();
  const visible = id !== "inicio" && id !== "contato";
  const cell = "label flex min-h-14 items-center justify-center";
  return (
    <div
      inert={!visible}
      className={`dark-surface fixed inset-x-0 bottom-0 z-40 border-t border-graphite-line bg-ink pb-[env(safe-area-inset-bottom)] text-paper transition-transform duration-500 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className={`grid ${SITE.flags.whatsapp ? "grid-cols-2" : "grid-cols-1"}`}>
        <a href={TEL_URL} className={cell}>
          Ligar
        </a>
        {SITE.flags.whatsapp && (
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cell} border-l border-graphite-line`}
          >
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
