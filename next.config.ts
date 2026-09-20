import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 exige a lista de qualidades permitidas e os caminhos locais.
    qualities: [60, 75, 85],
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/media/**" }],
  },
};

export default nextConfig;
