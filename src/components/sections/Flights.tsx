import { Reveal } from "@/components/motion/Reveal";
import { FlightCard } from "@/components/flights/FlightCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { flights } from "@/data/flights";

/** The first two routes in the data file are the ones shown on the home page. */
const featuredFlights = flights.slice(0, 2);

export function Flights() {
  return (
    <section id="flights" aria-label="private flight" className="py-[120px]">
      <Container>
        <ul className="grid gap-[30px] md:grid-cols-2 xl:grid-cols-3">
          <li className="md:col-span-2 xl:col-auto">
            <Reveal className="lg:max-w-[70%] xl:max-w-none">
              <SectionSubtitle>Private Flights</SectionSubtitle>

              <SectionTitle>Browse legs of our charters</SectionTitle>

              <p className="mt-[30px] mb-[30px] leading-[1.85]">
                Popular routes between Karachi, Lahore, Islamabad and Dubai.
                Prices are starting prices for a one-way charter and depend on
                the aircraft and date.
              </p>

              <Button href="/flights" variant="secondary">
                View All Routes
              </Button>
            </Reveal>
          </li>

          {featuredFlights.map((flight, index) => (
            <li key={flight.slug}>
              <Reveal delay={(index + 1) * 0.1} className="h-full">
                <FlightCard flight={flight} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
