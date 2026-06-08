import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { IndustriesStrip } from "@/components/IndustriesStrip";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <IndustriesStrip />
        <Services />
        <Process />
        <Work />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
