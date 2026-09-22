import { CONTACT, pendingClass } from "@/lib/content";
import { TEL_URL } from "@/lib/contact";
import { SITE } from "@/lib/site";
import { Wordmark } from "./brand";
import { ContactForm } from "./contact-form";
import { Frame, Line, Reveal } from "./motion";
import { TextLink } from "./ui";

const TITLE = ["Vamos conversar", "sobre o seu", "contexto."];

/**
 * Contato: frase grande e formulário à esquerda; à direita, um bloco de papel timbrado
 * (a marca no topo, dados institucionais em lista) e a foto da entrada.
 */
export function Contact() {
  const a = SITE.address;
  return (
    <section
      id="contato"
      data-section="contato"
      data-label="Contato"
      data-theme="dark"
      aria-labelledby="contato-titulo"
      className="dark-surface section-y relative z-10 bg-ink text-paper"
    >
      <div className="page-x grid-12 gap-y-10 md:gap-y-16">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="contato-titulo" className="text-display-l">
            <span className="sr-only">{CONTACT.title}</span>
            <span aria-hidden="true">
              {TITLE.map((line, i) => (
                <Line key={line} delay={i * 0.1} className={i === 2 ? "md:pl-[16%]" : ""}>
                  {line}
                </Line>
              ))}
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p className="text-lead mt-7 max-w-[30rem] text-paper/85 md:mt-10">{CONTACT.intro}</p>
            <ContactForm />
          </Reveal>
        </div>

        <aside
          aria-label="Dados do escritório"
          className="col-span-12 space-y-6 lg:col-span-4 lg:col-start-9 lg:pt-4"
        >
          <Reveal className="paper-surface bg-paper p-[clamp(28px,3vw,48px)] text-ink">
            <Wordmark />
            <dl className="mt-8 border-t border-paper-line md:mt-10">
              <div className="border-b border-paper-line py-4">
                <dt className="label text-ash">Endereço</dt>
                <dd className="mt-2">
                  {a.street}
                  <br />
                  {a.district} · <span className="whitespace-nowrap">{a.city} — {a.state}</span>
                  <br />
                  <span className="tabular-nums">{a.zip}</span>
                  <TextLink href={SITE.links.map} external className="label mt-3 block w-fit">
                    Ver no mapa
                  </TextLink>
                </dd>
              </div>
              <div className="border-b border-paper-line py-4">
                <dt className="label text-ash">Telefone</dt>
                <dd className="mt-2 tabular-nums">
                  <a href={TEL_URL} className="link-u hit">
                    {SITE.phone.display}
                  </a>
                </dd>
              </div>
              <div className="border-b border-paper-line py-4">
                <dt className="label text-ash">Atendimento</dt>
                <dd className={`mt-2 ${pendingClass(CONTACT.hours)}`}>{CONTACT.hours}</dd>
              </div>
              {SITE.links.facebook && (
                <div className="py-4">
                  <dt className="label text-ash">Redes</dt>
                  <dd className="mt-2">
                    <a href={SITE.links.facebook} target="_blank" rel="noopener noreferrer" className="link-u hit">
                      Facebook
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
          <Frame slot="contact" sizes="(min-width: 1024px) 30vw, 100vw" range={5} tone="dark" mobileRatio="4/3" />
        </aside>
      </div>
    </section>
  );
}
