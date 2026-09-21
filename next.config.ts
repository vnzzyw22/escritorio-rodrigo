import type { NextConfig } from "next";

const LONG_CACHE = "public, max-age=31536000, immutable";

/**
 * Política de segurança de conteúdo. O site é estático e não carrega nada de terceiros (fontes, imagens e vídeos
 * são próprios), então tudo fica em 'self'. 'unsafe-inline' em script e estilo é exigido pelos scripts de
 * hidratação embutidos do Next e pelos estilos inline em páginas estáticas (nonce exigiria renderização dinâmica).
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // As fotos são pré-geradas no build (scripts/optimize-media.mjs) e servidas como arquivos
    // estáticos: sem otimizador em tempo de execução, sem espera no primeiro acesso.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 768, 1080, 1440, 1920, 2560],
    imageSizes: [256, 384],
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Variantes de imagem: o nome leva o hash do conteúdo, então nunca ficam desatualizadas.
      { source: "/_img/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      // Vídeos do hero: o site os referencia com ?v=<hash>, então também são imutáveis.
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
    ];
  },
};

export default nextConfig;
