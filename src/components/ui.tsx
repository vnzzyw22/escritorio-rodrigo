import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 28 10"
      className={`h-[10px] w-7 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 5h26M22 1l4 4-4 4" />
    </svg>
  );
}

type Tone = "onDark" | "onPaper";

const SOLID: Record<Tone, string> = {
  onDark: "bg-paper text-ink hover:bg-white",
  onPaper: "bg-ink text-paper hover:bg-graphite",
};
const OUTLINE: Record<Tone, string> = {
  onDark: "border border-paper/45 text-paper hover:border-paper",
  onPaper: "border border-ink/40 text-ink hover:border-ink",
};

const BUTTON_BASE =
  "group inline-flex items-center justify-center gap-4 whitespace-nowrap label tracking-[0.14em] transition-colors duration-300";
const SIZE = { md: "min-h-[52px] px-7", sm: "min-h-[44px] px-5" } as const;

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  tone?: Tone;
  className?: string;
  external?: boolean;
  size?: keyof typeof SIZE;
};

/** Botão retangular (raio 0). Um por bloco. */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  tone = "onDark",
  className = "",
  external,
  size = "md",
}: LinkProps) {
  const style = variant === "solid" ? SOLID[tone] : OUTLINE[tone];
  return (
    <a
      href={href}
      className={`${BUTTON_BASE} ${SIZE[size]} ${style} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

export function Button({
  children,
  variant = "solid",
  tone = "onDark",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline"; tone?: Tone }) {
  const style = variant === "solid" ? SOLID[tone] : OUTLINE[tone];
  return (
    <button className={`${BUTTON_BASE} ${SIZE.md} ${style} ${className}`} {...rest}>
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

/** Link de texto com sublinhado; herda a cor do contexto. */
export function TextLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`link-u hit ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
