import { Hero } from "./hero";
import { Statement } from "./statement";

/**
 * Hero + Statement. No desktop o hero fica fixo no topo e a folha do Statement sobe sobre ele.
 * `.opening` declara o escopo da linha do tempo de rolagem compartilhada entre os dois.
 */
export function Opening() {
  return (
    <div className="opening relative">
      <Hero />
      <Statement />
    </div>
  );
}
