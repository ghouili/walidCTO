import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { IndustriesStrip } from "@/components/IndustriesStrip";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
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
        <Work />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
