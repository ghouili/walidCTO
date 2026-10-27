import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { IndustriesStrip } from "@/components/IndustriesStrip";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { getDictionary } from "@/lib/dictionaries";
import { FractionalCTOExplainer } from "@/components/FractionalCTOExplainer";
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
        <Testimonials labels={getDictionary("en").testimonials} />
        <About />
        <FractionalCTOExplainer />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
