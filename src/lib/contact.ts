import { SITE } from "./site";

/** `NEXT_PUBLIC_WHATSAPP_NUMBER` (só dígitos, DDI+DDD) sobrescreve o número do site. */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || SITE.phone.wa;

export const TEL_URL = `tel:${SITE.phone.e164}`;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function buildMessage(name: string, message: string) {
  return `Olá, meu nome é ${name.trim()}. Gostaria de conversar com o escritório sobre o seguinte: ${message.trim()}`;
}
