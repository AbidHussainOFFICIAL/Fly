import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { fleet } from "@/data/fleet";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Our Private Jet Fleet",
  description:
    "From turboprops to super-midsize jets, compare the aircraft available for private charter from Pakistan.",
  path: "/fleet",
});

export default function FleetPage() {
  return (
    <>
      <PageHeader
        title="Our Fleet"
        description="Choose the aircraft that fits your route, group size and luggage."
      />

      <section aria-label="fleet" className="py-[100px]">
        <Container>
          <ul className="grid gap-[30px] md:grid-cols-2">
            {fleet.map((aircraft, index) => (
              <li key={aircraft.name}>
                <Reveal delay={(index % 2) * 0.1} className="h-full">
                  <div
                    id={aircraft.slug}
                    className="h-full border border-phthalo-green-2 bg-phthalo-green-3 p-[40px]"
                  >
                    <p className="text-fs-8 font-semibold tracking-[2px] text-satin-sheen-gold uppercase">
                      {aircraft.category}
                    </p>

                    <h2 className="mt-[5px] text-fs-3 leading-[1.2] text-white">
                      {aircraft.name}
                    </h2>

                    <p className="mt-[15px]">{aircraft.description}</p>

                    <dl className="mt-[25px] grid grid-cols-2 gap-[15px]">
                      <div>
                        <dt className="text-fs-8">Seats</dt>
                        <dd className="font-semibold text-white">
                          {aircraft.seats}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-fs-8">Range</dt>
                        <dd className="font-semibold text-white">
                          {aircraft.range}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-[50px] text-center">
            <Button href="/book" variant="primary" className="mx-auto">
              Book a Flight
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
