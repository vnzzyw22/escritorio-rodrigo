import type { NextConfig } from "next";

const LONG_CACHE = "public, max-age=31536000, immutable";

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
      // Variantes de imagem: o nome leva o hash do conteúdo, então nunca ficam desatualizadas.
      { source: "/_img/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
      // Vídeos do hero: o site os referencia com ?v=<hash>, então também são imutáveis.
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: LONG_CACHE }] },
    ];
  },
};

export default nextConfig;
