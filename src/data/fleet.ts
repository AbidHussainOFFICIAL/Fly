export interface Aircraft {
  name: string;
  category: string;
  seats: string;
  range: string;
  description: string;
}

export const fleet: Aircraft[] = [
  {
    name: "Pilatus PC-12 NGX",
    category: "Turboprop",
    seats: "6 to 8",
    range: "About 3,400 km",
    description:
      "A quiet, efficient single-engine turboprop that suits short hops such as Islamabad to Lahore.",
  },
  {
    name: "Cessna Citation CJ3+",
    category: "Light jet",
    seats: "6 to 7",
    range: "About 3,700 km",
    description:
      "A fast, comfortable light jet for business trips between Pakistan's major cities.",
  },
  {
    name: "Embraer Phenom 300E",
    category: "Light jet",
    seats: "6 to 8",
    range: "About 3,650 km",
    description:
      "A spacious cabin with generous baggage space, a popular choice for Karachi to Islamabad.",
  },
  {
    name: "Bombardier Challenger 350",
    category: "Super-midsize jet",
    seats: "8 to 9",
    range: "About 5,900 km",
    description:
      "Stand-up cabin and long range for international legs such as Islamabad to Dubai.",
  },
];
