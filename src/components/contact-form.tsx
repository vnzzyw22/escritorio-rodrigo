"use client";

import { useId, useState, type FormEvent } from "react";
import { buildMessage, TEL_URL, whatsappUrl } from "@/lib/contact";
import { CONTACT } from "@/lib/content";
import { SITE } from "@/lib/site";
import { Button, TextLink } from "./ui";

type Errors = { name?: string; message?: string };

const FIELD =
  "block w-full border-0 border-b border-graphite-line bg-transparent px-0 py-3 text-lead text-paper placeholder:text-stone/70 transition-colors duration-300 focus:border-paper focus:outline-none focus-visible:outline-none";

/**
 * Formulário sem servidor: monta a mensagem e abre o WhatsApp com ela pronta.
 * Não guarda nada, não envia nada sozinho. Com `SITE.flags.whatsapp` desligado, só oferece ligação.
 */
export function ContactForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [url, setUrl] = useState<string | null>(null);

  if (!SITE.flags.whatsapp) {
    return (
      <div className="mt-10">
        <Button type="button" onClick={() => (window.location.href = TEL_URL)}>
          Ligar {SITE.phone.display}
        </Button>
      </div>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Informe seu nome.";
    if (message.trim().length < 10) next.message = "Escreva um breve resumo, com pelo menos 10 caracteres.";
    setErrors(next);
    if (next.name || next.message) {
      // Leva o foco ao primeiro campo com erro (teclado e leitor de tela).
      document.getElementById(`${uid}-${next.name ? "nome" : "mensagem"}`)?.focus();
      return;
    }
    const target = whatsappUrl(buildMessage(name, message));
    setUrl(target);
    window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <form noValidate onSubmit={onSubmit} className="mt-10 max-w-[38rem] space-y-8">
      <div>
        <label htmlFor={`${uid}-nome`} className="label text-stone">
          Seu nome
        </label>
        <input
          id={`${uid}-nome`}
          name="nome"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${uid}-nome-erro` : undefined}
          className={FIELD}
        />
        {errors.name && (
          <p id={`${uid}-nome-erro`} role="alert" className="mt-2 text-[0.95rem] text-alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-mensagem`} className="label text-stone">
          Resumo do seu contexto
        </label>
        <textarea
          id={`${uid}-mensagem`}
          name="mensagem"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={`${uid}-mensagem-ajuda${errors.message ? ` ${uid}-mensagem-erro` : ""}`}
          className={`${FIELD} resize-none`}
        />
        <p id={`${uid}-mensagem-ajuda`} className="mt-2 text-[0.9rem] text-stone">
          {CONTACT.privacy}
        </p>
        {errors.message && (
          <p id={`${uid}-mensagem-erro`} role="alert" className="mt-2 text-[0.95rem] text-alert">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
        <Button type="submit">Enviar pelo WhatsApp</Button>
        <TextLink href={TEL_URL} className="label">
          Ligar {SITE.phone.display}
        </TextLink>
      </div>

      <p role="status" className="min-h-[1.5rem] text-[0.95rem] text-stone">
        {url && (
          <>
            Abrimos o WhatsApp em outra aba.{" "}
            <a href={url} target="_blank" rel="noopener noreferrer" className="link-u text-paper">
              Se não abriu, toque aqui.
            </a>
          </>
        )}
      </p>
    </form>
  );
}
