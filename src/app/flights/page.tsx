import { FlightCard } from "@/components/flights/FlightCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { flights } from "@/data/flights";
import { createMetadata } from "@/lib/metadata";
import { flightsJsonLd } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Private Jet Charter Flights in Pakistan",
  description:
    "Browse private jet charter routes between Karachi, Lahore, Islamabad, Peshawar and Dubai, with starting prices in PKR.",
  path: "/flights",
});

export default function FlightsPage() {
  return (
    <>
      <JsonLd data={flightsJsonLd(flights)} />

      <PageHeader
        title="Private Jet Flights"
        description="Charter routes between Karachi, Lahore, Islamabad, Peshawar and Dubai."
      />

      <section aria-label="flights" className="py-[100px]">
        <Container>
          <ul className="grid gap-[30px] md:grid-cols-2 xl:grid-cols-3">
            {flights.map((flight, index) => (
              <li key={flight.slug}>
                <Reveal delay={(index % 3) * 0.1} className="h-full">
                  <FlightCard flight={flight} />
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-[50px] text-center">
            <p className="mb-[25px]">
              Prices are starting prices for a one-way charter and depend on the
              aircraft and date. All times are local.
            </p>

            <Button href="/book" variant="primary" className="mx-auto">
              Request a Custom Route
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
