import { FOOTER, NAV, pendingClass } from "@/lib/content";
import { TEL_URL } from "@/lib/contact";
import { SITE } from "@/lib/site";
import { RMark, Wordmark } from "./brand";

/** Rodapé institucional e minimalista. O R aparece grande, cortado e quase invisível. */
export function Footer() {
  const a = SITE.address;
  return (
    <footer className="dark-surface relative z-10 overflow-hidden border-t border-graphite-line bg-ink text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[10vw] -right-[3vw] opacity-[0.05]"
      >
        <RMark size="min(46vw, 640px)" onDark />
      </div>

      <div className="page-x relative py-[clamp(56px,7vw,104px)]">
        <div className="grid-12 gap-y-10 md:gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Wordmark />
            <address className="mt-8 not-italic text-paper/85">
              {a.street}
              <br />
              {a.district} · <span className="whitespace-nowrap">{a.city} — {a.state}</span>
              <br />
              <span className="tabular-nums">{a.zip}</span>
            </address>
            <p className="mt-4 tabular-nums">
              <a href={TEL_URL} className="link-u hit">
                {SITE.phone.display}
              </a>
            </p>
          </div>

          <nav aria-label="Rodapé" className="col-span-6 md:col-span-3 md:col-start-7">
            <ul>
              {NAV.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="label link-u inline-block py-3.5 md:py-2">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <p className="label text-stone">Inscrição na OAB</p>
            <p className={`mt-2 ${pendingClass(FOOTER.oab)}`}>{FOOTER.oab}</p>
            <p className="mt-6">
              <a href={SITE.links.facebook} target="_blank" rel="noopener noreferrer" className="label link-u hit">
                Facebook
              </a>
            </p>
            <p className="mt-6">
              <a href="/privacidade" className="label link-u hit">
                Privacidade e cookies
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-[46rem] md:mt-16 border-t border-graphite-line pt-6 text-[0.9rem] leading-relaxed text-stone">
          <p>{FOOTER.notice}</p>
          <p className="label mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <span>
              © {new Date().getFullYear()} {SITE.name}
            </span>
            {SITE.flags.conceptNotice && <span>Proposta de conceito · não publicado</span>}
          </p>
        </div>
      </div>
    </footer>
  );
}
