import type { Metadata, Viewport } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
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
  // Conceito em apresentação: não indexar até virar site publicado (ver também robots.ts).
  robots: { index: false, follow: false },
  // Domínio definitivo ainda não existe: usa o endereço de produção da Vercel para os links absolutos (og:image).
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.address.city}, ${SITE.address.state}`,
    description: "Direito exige clareza. Advocacia em Maringá (PR).",
  },
};

export const viewport: Viewport = {
  themeColor: "#16110d",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${text.variable} ${sans.variable}`}>
      <body>
        <noscript>
          {/* Sem JavaScript, nada fica escondido esperando animação de entrada. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-reveal]::after{display:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
