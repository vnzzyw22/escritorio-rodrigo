import { Areas } from "@/components/areas";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Insights } from "@/components/insights";
import { MobileBar } from "@/components/mobile-bar";
import { Navbar } from "@/components/navbar";
import { Office } from "@/components/office";
import { Opening } from "@/components/opening";
import { Professional } from "@/components/professional";
import { Rail } from "@/components/rail";
import { SocialProof } from "@/components/social-proof";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo-principal"
        className="label fixed left-4 top-4 z-[100] -translate-y-24 bg-paper px-4 py-3 text-ink focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <Navbar />
      <Rail />
      <MobileBar />
      <main id="conteudo-principal">
        <Opening />
        <Office />
        <Areas />
        <Professional />
        <SocialProof />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
