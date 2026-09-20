import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { resolveMedia } from "@/lib/media.server";
import { SITE } from "@/lib/site";

// Títulos: traço fino e claro, próximo ao lettering da marca. Não tem itálico (nunca sintetizar).
const display = Libre_Caslon_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caslon-display",
});

// Texto: mesma família dos títulos. Só o peso regular é carregado (o site não usa negrito nem itálico);
// para destacar uma palavra, declare também `style: "italic"` aqui: é o itálico verdadeiro do Caslon.
const text = Libre_Caslon_Text({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caslon-text",
});

// Rótulos, navegação e dados institucionais.
const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted",
});

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.address.city}, ${SITE.address.state}`,
  description: `${SITE.name}, em ${SITE.address.city} (${SITE.address.state}). ${SITE.address.street}, ${SITE.address.district}.`,
  // Conceito em apresentação: não indexar até virar site publicado.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0d",
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const media = await resolveMedia();
  return (
    <html lang="pt-BR" className={`${display.variable} ${text.variable} ${sans.variable}`}>
      <body>
        <noscript>
          {/* Sem JavaScript, nada fica escondido esperando animação de entrada. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <Providers media={media}>{children}</Providers>
      </body>
    </html>
  );
}
