export interface Flight {
  slug: string;
  from: string;
  to: string;
  /** YYYY-MM-DD */
  date: string;
  /** Local times */
  departure: string;
  arrival: string;
  /** Starting price in PKR for a one-way charter */
  price: number;
  passengers: number;
  aircraft: string;
}

export const flights: Flight[] = [
  {
    slug: "karachi-islamabad",
    from: "KHI",
    to: "ISB",
    date: "2026-11-10",
    departure: "8:30 am",
    arrival: "10:35 am",
    price: 3650000,
    passengers: 4,
    aircraft: "Embraer Phenom 300E",
  },
  {
    slug: "islamabad-dubai",
    from: "ISB",
    to: "DXB",
    date: "2026-11-17",
    departure: "1:00 pm",
    arrival: "3:15 pm",
    price: 8400000,
    passengers: 6,
    aircraft: "Bombardier Challenger 350",
  },
  {
    slug: "karachi-lahore",
    from: "KHI",
    to: "LHE",
    date: "2026-11-12",
    departure: "7:15 am",
    arrival: "9:05 am",
    price: 3200000,
    passengers: 5,
    aircraft: "Cessna Citation CJ3+",
  },
  {
    slug: "islamabad-lahore",
    from: "ISB",
    to: "LHE",
    date: "2026-11-19",
    departure: "9:00 am",
    arrival: "10:00 am",
    price: 2250000,
    passengers: 5,
    aircraft: "Pilatus PC-12 NGX",
  },
  {
    slug: "karachi-peshawar",
    from: "KHI",
    to: "PEW",
    date: "2026-11-24",
    departure: "10:00 am",
    arrival: "12:05 pm",
    price: 3600000,
    passengers: 4,
    aircraft: "Embraer Phenom 300E",
  },
];
