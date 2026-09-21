import Image from "next/image";
import type { CSSProperties } from "react";
import { getMedia } from "@/lib/media.server";
import { SITE } from "@/lib/site";

/**
 * Marca no cabeçalho e no rodapé. Com o arquivo da logo em public/images/logo/, usa a logo
 * sem alterá-la. Sem o arquivo, mostra um lockup TIPOGRÁFICO NEUTRO (não imita nem redesenha a marca).
 */
export async function Wordmark({ className = "", height = 44 }: { className?: string; height?: number }) {
  const logo = (await getMedia()).logo;
  if (logo.src) {
    return (
      <Image
        src={logo.src}
        alt={SITE.name}
        width={320}
        height={120}
        unoptimized
        className={`w-auto ${className}`}
        style={{ height }}
      />
    );
  }
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="font-display text-[clamp(0.9rem,4.6vw,1.3rem)] uppercase tracking-[0.12em] whitespace-nowrap md:tracking-[0.14em]">{SITE.person}</span>
      <span className="label mt-[7px] text-[0.625rem] tracking-[0.46em]">{SITE.descriptor}</span>
    </span>
  );
}

/**
 * Símbolo R como elemento de direção de arte (grande e quase invisível).
 * Sem o arquivo do símbolo, usa um "R" tipográfico PROVISÓRIO (sem círculo nem louro).
 */
export async function RMark({
  size,
  onDark = false,
  className = "",
}: {
  /** Qualquer comprimento CSS. */
  size: string;
  /** Sobre fundo escuro, a arte do símbolo é invertida para claro. */
  onDark?: boolean;
  className?: string;
}) {
  const symbol = (await getMedia()).symbol;
  const base = `pointer-events-none select-none ${className}`;
  if (symbol.src) {
    return (
      <Image
        src={symbol.src}
        alt=""
        aria-hidden="true"
        width={1200}
        height={1200}
        unoptimized
        className={`${base} ${onDark ? "invert" : ""}`}
        style={{ width: size, height: size } as CSSProperties}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      data-placeholder="r-glyph"
      className={`${base} font-display leading-none ${onDark ? "text-paper" : "text-ink"}`}
      style={{ fontSize: size, lineHeight: 0.8 }}
    >
      R
    </span>
  );
}
