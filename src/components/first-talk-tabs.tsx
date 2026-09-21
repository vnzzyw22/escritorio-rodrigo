"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AREAS, FIRST_TALK } from "@/lib/content";
import { whatsappUrl } from "@/lib/contact";
import { ButtonLink } from "./ui";

const topics = FIRST_TALK.topics;

/** Abas por assunto (uma lista de documentos em cada) e a mensagem do WhatsApp montada com o que foi marcado. */
export function FirstTalkTabs() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState<Record<string, number[]>>({});
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // No celular a fileira de abas rola na horizontal: mantém a aba escolhida à vista (só ela, sem mexer na página).
  useEffect(() => {
    const el = tabs.current[active];
    const list = el?.parentElement;
    if (!el || !list || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  const topic = topics[active];
  const area = AREAS.find((a) => a.slug === topic.slug);
  const areaTitle = area?.title ?? topic.tab;
  const done = checked[topic.slug] ?? [];

  const toggle = (i: number) =>
    setChecked((c) => {
      const cur = c[topic.slug] ?? [];
      return { ...c, [topic.slug]: cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i] };
    });

  const message =
    `Olá, gostaria de conversar com o escritório sobre ${areaTitle}.` +
    (done.length
      ? ` Já reuni: ${[...done].sort((a, b) => a - b).map((i) => topic.docs[i].replace(/ \(.*\)$/, "").replace(/,? se houver$/, "")).join("; ")}.`
      : "");

  const move = (to: number) => {
    const i = (to + topics.length) % topics.length;
    setActive(i);
    tabs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const to =
      e.key === "ArrowRight" ? active + 1 : e.key === "ArrowLeft" ? active - 1 : e.key === "Home" ? 0 : e.key === "End" ? topics.length - 1 : null;
    if (to === null) return;
    e.preventDefault();
    move(to);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Assunto da conversa"
        onKeyDown={onKey}
        className="-mx-[var(--margin)] flex snap-x gap-7 overflow-x-auto border-b border-paper-line px-[var(--margin)] [scrollbar-width:none] md:mx-0 md:gap-10 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {topics.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`ft-tab-${t.slug}`}
              aria-selected={on}
              aria-controls="ft-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`-mb-px min-h-[52px] shrink-0 snap-start whitespace-nowrap border-b-2 font-display text-[1.25rem] transition-colors duration-300 md:text-[1.4rem] ${
                on ? "border-ink text-ink" : "border-transparent text-ash hover:text-ink"
              }`}
            >
              {t.tab}
            </button>
          );
        })}
      </div>

      <div id="ft-panel" role="tabpanel" aria-labelledby={`ft-tab-${topic.slug}`} className="pt-8">
        <div key={topic.slug} className="fade-swap">
          <h3 className="text-title">{areaTitle}</h3>
          <p className="mt-2 text-ash">O que costuma ajudar a ter em mãos:</p>

          <ul className="mt-6 border-t border-paper-line">
            {topic.docs.map((doc, i) => (
              <li key={doc} className="border-b border-paper-line">
                <label className="flex min-h-[52px] cursor-pointer items-start gap-4 py-3.5">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={done.includes(i)}
                    onChange={() => toggle(i)}
                  />
                  <span
                    aria-hidden="true"
                    className="mt-[0.3rem] grid size-5 shrink-0 place-items-center border border-ink/50 transition-colors duration-200 peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-bronze peer-checked:[&_svg]:opacity-100"
                  >
                    <svg viewBox="0 0 12 12" className="size-3 text-paper opacity-0 transition-opacity duration-200" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 6.5l2.6 2.5L10 3.5" />
                    </svg>
                  </span>
                  <span className={`transition-colors duration-200 ${done.includes(i) ? "text-ash" : ""}`}>{doc}</span>
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ButtonLink href={whatsappUrl(message)} external tone="onPaper" className="sm:order-2">
              Enviar pelo WhatsApp
            </ButtonLink>
            <p className="label tabular-nums text-ash sm:order-1" aria-live="polite">
              {done.length} de {topic.docs.length} reunidos
            </p>
          </div>
          <p className="mt-5 max-w-[30rem] text-[0.95rem] text-ash">{FIRST_TALK.hint}</p>
        </div>
      </div>
    </div>
  );
}
