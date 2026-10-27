import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Feature } from "@/components/sections/Feature";
import { Flights } from "@/components/sections/Flights";
import { Hero } from "@/components/sections/Hero";
import { Newsletter } from "@/components/sections/Newsletter";
import { Offer } from "@/components/sections/Offer";
import { Service } from "@/components/sections/Service";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <article>
          <Hero />
          <Service />
          <About />
          <Feature />
          <Offer />
          <Flights />
          <Newsletter />
        </article>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
