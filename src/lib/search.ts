import { airports, getAirport } from "@/data/airports";
import { faqs } from "@/data/faq";
import { fleet } from "@/data/fleet";
import { flights } from "@/data/flights";
import { formatPrice } from "@/lib/format";

export type SearchGroup = "Destinations" | "Aircraft" | "FAQs";

export interface SearchEntry {
  id: string;
  group: SearchGroup;
  title: string;
  description: string;
  href: string;
  /** Extra words that should find this entry. */
  keywords: string;
}

const groupOrder: SearchGroup[] = ["Destinations", "Aircraft", "FAQs"];

function truncate(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max).trimEnd()}…`;
}

const routeEntries: SearchEntry[] = flights.map((flight) => {
  const from = getAirport(flight.from);
  const to = getAirport(flight.to);

  return {
    id: `route-${flight.slug}`,
    group: "Destinations",
    title: `${from.city} to ${to.city}`,
    description: `From ${formatPrice(flight.price)} · ${flight.aircraft}`,
    href: `/flights#${flight.slug}`,
    keywords: `${from.city} ${from.code} ${from.name} ${to.city} ${to.code} ${to.name} ${flight.aircraft} flight route charter`,
  };
});

// Airports without a listed route still lead to the booking form.
const airportEntries: SearchEntry[] = airports
  .filter(
    (airport) =>
      !flights.some(
        (flight) => flight.from === airport.code || flight.to === airport.code,
      ),
  )
  .map((airport) => ({
    id: `airport-${airport.code}`,
    group: "Destinations",
    title: `${airport.city} (${airport.code})`,
    description: `${airport.name} · Request a custom route`,
    href: `/book?from=${airport.code}`,
    keywords: `${airport.city} ${airport.code} ${airport.name} airport charter`,
  }));

const aircraftEntries: SearchEntry[] = fleet.map((aircraft) => ({
  id: `aircraft-${aircraft.slug}`,
  group: "Aircraft",
  title: aircraft.name,
  description: `${aircraft.category} · ${aircraft.seats} seats · ${aircraft.range}`,
  href: `/fleet#${aircraft.slug}`,
  keywords: `${aircraft.name} ${aircraft.category} ${aircraft.description} jet aircraft plane`,
}));

const faqEntries: SearchEntry[] = faqs.map((faq) => ({
  id: `faq-${faq.id}`,
  group: "FAQs",
  title: faq.question,
  description: truncate(faq.answer, 110),
  href: `/faq#${faq.id}`,
  keywords: `${faq.question} ${faq.answer}`,
}));

const searchIndex: SearchEntry[] = [
  ...routeEntries,
  ...airportEntries,
  ...aircraftEntries,
  ...faqEntries,
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Every search term must match. Matches in the title rank highest. */
function scoreEntry(entry: SearchEntry, terms: string[]) {
  const title = normalize(entry.title);
  const titleWords = title.split(" ");
  const haystack = normalize(`${entry.title} ${entry.keywords}`);
  let score = 0;

  for (const term of terms) {
    if (titleWords.some((word) => word.startsWith(term))) score += 3;
    else if (title.includes(term)) score += 2;
    else if (haystack.includes(term)) score += 1;
    else return 0;
  }

  return score;
}

export function searchEntries(query: string): SearchEntry[] {
  const terms = normalize(query).split(" ").filter(Boolean);

  if (terms.length === 0) return [];

  return searchIndex
    .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ entry }) => entry);
}

export function groupResults(entries: SearchEntry[]) {
  return groupOrder
    .map((group) => ({
      group,
      entries: entries.filter((entry) => entry.group === group),
    }))
    .filter(({ entries: items }) => items.length > 0);
}
