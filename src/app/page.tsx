import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/JsonLd";
import { About } from "@/components/sections/About";
import { Feature } from "@/components/sections/Feature";
import { Flights } from "@/components/sections/Flights";
import { Hero } from "@/components/sections/Hero";
import { Newsletter } from "@/components/sections/Newsletter";
import { Offer } from "@/components/sections/Offer";
import { Service } from "@/components/sections/Service";
import { homeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />

      <Hero />
      <Service />
      <About />
      <Feature />
      <Offer />
      <Flights />
      <Newsletter />
    </>
  );
}
