"use client";

import { useSyncExternalStore } from "react";

/**
 * Media query reativa sem erro de hidratação: o servidor assume `false` e o cliente
 * corrige logo após hidratar.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReduceMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
