export interface Airport {
  code: string;
  city: string;
  name: string;
}

export const airports: Airport[] = [
  { code: "KHI", city: "Karachi", name: "Jinnah International Airport" },
  { code: "LHE", city: "Lahore", name: "Allama Iqbal International Airport" },
  { code: "ISB", city: "Islamabad", name: "Islamabad International Airport" },
  { code: "PEW", city: "Peshawar", name: "Bacha Khan International Airport" },
  { code: "SKD", city: "Skardu", name: "Skardu International Airport" },
  { code: "DXB", city: "Dubai", name: "Dubai International Airport" },
];

export function getAirport(code: string): Airport {
  const airport = airports.find((item) => item.code === code);

  if (!airport) throw new Error(`Unknown airport code: ${code}`);

  return airport;
}
