import { About } from "./_components/about";
import { Contact } from "./_components/contact";
import { Faq } from "./_components/faq";
import { Features } from "./_components/features";
import Footer from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Pricing } from "./_components/pricing";
import { Stats } from "./_components/stats";
import { Team } from "./_components/team";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Features />
      <About />
      <Pricing />
      <Faq />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
