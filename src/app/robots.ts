import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Enquanto for conceito (`flags.conceptNotice`), nada é indexado. Ao publicar, desligue a flag e adicione o sitemap. */
export default function robots(): MetadataRoute.Robots {
  return SITE.flags.conceptNotice
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" } };
}
