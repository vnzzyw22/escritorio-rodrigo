"use client";

import { useEffect } from "react";

/**
 * Um único IntersectionObserver para todas as revelações da página. Marca `data-shown` quando o
 * elemento chega perto da tela e para de observá-lo (cada elemento anima uma vez).
 * Sem JavaScript, o <noscript> do layout deixa tudo visível.
 */
export function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");
    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.setAttribute("data-shown", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-shown", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}
