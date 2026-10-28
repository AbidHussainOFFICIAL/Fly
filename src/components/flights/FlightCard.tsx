import Image from "next/image";
import { IoAirplane } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { getAirport } from "@/data/airports";
import type { Flight } from "@/data/flights";
import { formatDate, formatPrice } from "@/lib/format";

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const from = getAirport(flight.from);
  const to = getAirport(flight.to);

  const details = [
    [
      "Date:",
      formatDate(flight.date, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    ],
    ["Departure:", flight.departure],
    ["Arrival:", flight.arrival],
    ["Aircraft:", flight.aircraft],
    ["Starting From:", formatPrice(flight.price)],
    ["Passengers:", `Up to ${flight.passengers}`],
  ];

  return (
    <div
      id={flight.slug}
      className="group h-full border border-phthalo-green-2 bg-phthalo-green-3 pb-[40px] text-center transition-fast hocus-within:border-satin-sheen-gold"
    >
      <h3 className="mb-[20px] flex items-center justify-between bg-phthalo-green-2 px-[30px] py-[15px] text-fs-6 text-white transition-fast lg:px-[60px] group-hocus-within:bg-satin-sheen-gold group-hocus-within:text-phthalo-green-1">
        {from.city}
        <IoAirplane aria-hidden="true" />
        {to.city}
      </h3>

      <div>
        <Image
          src="/images/flight-1.png"
          width={263}
          height={84}
          alt={`${from.city} to ${to.city} flight airplane`}
          className="mx-auto w-full max-w-max"
        />
      </div>

      <ul className="my-[20px] px-[15px]">
        {details.map(([label, value]) => (
          <li
            key={label}
            className="mb-[8px] flex flex-wrap items-center justify-center gap-[5px]"
          >
            <span className="font-semibold text-white">{label}</span>
            {value}
          </li>
        ))}
      </ul>

      <Button
        href={`/book?flight=${flight.slug}`}
        variant="primary"
        className="mx-auto"
      >
        Book Now
      </Button>
    </div>
  );
}
