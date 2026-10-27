import Image from "next/image";
import { IoAirplane } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  departure: string;
  arrival: string;
  price: string;
  passengers: string;
}

const flights: Flight[] = [
  {
    id: "new-york-moscow-1",
    from: "New York",
    to: "Moscow",
    date: "Tuesday, Jul 6, 2022",
    departure: "11:25 pm",
    arrival: "02:25 am",
    price: "$2786",
    passengers: "Adult 3",
  },
  {
    id: "new-york-moscow-2",
    from: "New York",
    to: "Moscow",
    date: "Tuesday, Jul 6, 2022",
    departure: "11:25 pm",
    arrival: "02:25 am",
    price: "$2786",
    passengers: "Adult 3",
  },
];

export function Flights() {
  return (
    <section aria-label="private flight" className="py-[120px]">
      <Container>
        <ul className="grid gap-[30px] md:grid-cols-2 xl:grid-cols-3">
          <li className="md:col-span-2 xl:col-auto">
            <div className="lg:max-w-[70%] xl:max-w-none">
              <SectionSubtitle>Private Flights</SectionSubtitle>

              <SectionTitle>Browse legs of our charters</SectionTitle>

              <p className="mt-[30px] mb-[20px] leading-[1.85]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur condimentum, lacus non faucibus congue, lectus quam
                viverra nulla, quis egestas neque sapien ac magna.
              </p>
            </div>
          </li>

          {flights.map((flight) => {
            const details = [
              ["Date:", flight.date],
              ["Departure:", flight.departure],
              ["Arrival:", flight.arrival],
              ["Starting From:", flight.price],
              ["Person:", flight.passengers],
            ];

            return (
              <li key={flight.id}>
                <div className="group border border-phthalo-green-2 bg-phthalo-green-3 pb-[40px] text-center transition-fast hocus-within:border-satin-sheen-gold">
                  <h3 className="mb-[20px] flex items-center justify-between bg-phthalo-green-2 px-[30px] py-[15px] text-fs-6 text-white transition-fast lg:px-[60px] group-hocus-within:bg-satin-sheen-gold">
                    {flight.from}
                    <IoAirplane aria-hidden="true" />
                    {flight.to}
                  </h3>

                  <div>
                    <Image
                      src="/images/flight-1.png"
                      width={263}
                      height={84}
                      alt={`${flight.from} to ${flight.to} flight airplane`}
                      className="mx-auto w-full max-w-max"
                    />
                  </div>

                  <ul className="my-[20px]">
                    {details.map(([label, value]) => (
                      <li
                        key={label}
                        className="mb-[8px] flex items-center justify-center gap-[5px]"
                      >
                        <span className="font-semibold text-white">
                          {label}
                        </span>
                        {value}
                      </li>
                    ))}
                  </ul>

                  <Button href="#" variant="primary" className="mx-auto">
                    Book Now
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
