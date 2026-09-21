"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { TEL_URL, whatsappUrl } from "@/lib/contact";
import { NAV } from "@/lib/content";
import { SITE } from "@/lib/site";
import { useMediaQuery } from "./hooks";
import { useActiveSection } from "./providers";
import { ButtonLink } from "./ui";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Cabeçalho. A marca chega pronta do servidor (`brand`). O painel do menu do celular usa a própria
 * sobreposição como contêiner de rolagem (overscroll-behavior) e `inert` no conteúdo: sem travar
 * a rolagem do <html>, que forçaria um layout da página inteira a cada abertura.
 */
export function Navbar({ brand }: { brand: ReactNode }) {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const desktop = useMediaQuery("(min-width: 768px)");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    setMounted(true);
    setOpen(true);
  };
  const closeMenu = () => setOpen(false);

  // Desmonta o painel depois da animação de saída.
  useEffect(() => {
    if (open || !mounted) return;
    const t = window.setTimeout(() => setMounted(false), 320);
    return () => window.clearTimeout(t);
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const behind = document.querySelectorAll<HTMLElement>("#conteudo-principal, footer");
    behind.forEach((el) => el.setAttribute("inert", ""));
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      // Foco preso entre o painel e o botão que o controla.
      const nodes = [...(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []), toggle].filter(
        (n): n is HTMLElement => Boolean(n),
      );
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      behind.forEach((el) => el.removeAttribute("inert"));
      toggle?.focus();
    };
  }, [open]);

  // Menu aberto sempre usa o tema escuro (o painel é escuro).
  const dark = open || active.theme === "dark";
  // Transparente só sobre o hero (no desktop ele é fixo; no celular, só enquanto não rolou).
  const overHero = open || (active.id === "inicio" && (desktop || !scrolled));
  const surface = overHero
    ? "bg-transparent text-paper"
    : dark
      ? "border-b border-graphite-line bg-ink text-paper"
      : "border-b border-paper-line bg-paper text-ink";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-500 ${surface} ${dark ? "dark-surface" : ""}`}
      >
        <div className="page-x flex h-16 items-center justify-between md:h-[var(--nav-h)]">
          <a href="#inicio" aria-label={`${SITE.name} — início`} className="flex min-h-11 items-center" onClick={closeMenu}>
            {brand}
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-9">
              {NAV.map((item) => {
                const current = active.id === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={current ? "location" : undefined}
                      className={`label underline underline-offset-[0.7em] decoration-1 transition-[text-decoration-color] duration-300 ${
                        current ? "decoration-current" : "decoration-transparent hover:decoration-current"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <ButtonLink href="#contato" variant="outline" tone={dark ? "onDark" : "onPaper"} size="sm">
              Entre em contato
            </ButtonLink>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="label -mr-2 flex min-h-11 items-center px-2 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => (open ? closeMenu() : openMenu())}
          >
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
      </header>

      {mounted && (
        <div
          id="menu-mobile"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`dark-surface fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-ink px-[var(--margin)] pb-[max(24px,env(safe-area-inset-bottom))] pt-24 text-paper lg:hidden ${
            open ? "menu-in" : "menu-out"
          }`}
        >
          <nav aria-label="Menu principal">
            <ul className="border-t border-graphite-line">
              {NAV.map((item, i) => (
                <li key={item.id} className="border-b border-graphite-line">
                  <a
                    href={`#${item.id}`}
                    onClick={closeMenu}
                    className="menu-link block py-5 font-display text-[2rem] leading-none"
                    style={{ "--i": i } as CSSProperties}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            {SITE.flags.whatsapp && (
              <ButtonLink href={whatsappUrl()} external>
                WhatsApp
              </ButtonLink>
            )}
            <ButtonLink href={TEL_URL} variant="outline">
              Ligar {SITE.phone.display}
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
}
