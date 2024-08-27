import { About } from "./_components/about";
import { Contact } from "./_components/contact";
import { Faq } from "./_components/faq";
import { Features } from "./_components/features";
import Footer from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Team } from "./_components/team";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <About />
      <Faq />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
