export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  /** YYYY-MM-DD */
  date: string;
  image: string;
  imageAlt: string;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: "flying-to-skardu-by-private-charter",
    title: "Flying to Skardu by private charter: what to expect",
    excerpt:
      "Mountain weather shapes every flight to Skardu. Here is how to plan a charter that stays flexible.",
    date: "2026-10-14",
    image: "/images/offer-banner.jpg",
    imageAlt: "Two passengers seated in a private jet cabin",
    body: [
      "Flights into Skardu depend heavily on mountain weather, which can change within the hour. A private charter gives you something scheduled flights cannot: the freedom to move your departure to the best window of the day.",
      "We recommend choosing a morning departure and keeping a spare day in your itinerary. Our flight coordinators monitor conditions and keep you informed from the moment you confirm your booking.",
      "Pack light and tell us about any equipment you are bringing, such as trekking or photography gear, so we can match you with the right aircraft.",
    ],
  },
  {
    slug: "peshawar-joins-our-charter-network",
    title: "Peshawar joins our charter network",
    excerpt:
      "Charter flights from Karachi to Peshawar are now available with a dedicated airport coordinator.",
    date: "2026-09-28",
    image: "/images/about-banner.jpg",
    imageAlt: "Two cabin crew members in uniform standing beside an aircraft",
    body: [
      "We are pleased to add Peshawar to the cities we serve. Travellers can now book direct charters between Karachi and Peshawar, with the same personal service we offer on every other route.",
      "Our team handles ground arrangements at Bacha Khan International Airport, so you can go from the car to the cabin in minutes.",
    ],
  },
  {
    slug: "same-day-business-trip-karachi-islamabad",
    title: "How to plan a same-day business trip between Karachi and Islamabad",
    excerpt:
      "Leave after breakfast, attend your meetings and be home for dinner. A simple guide to planning the day.",
    date: "2026-09-09",
    image: "/images/feature-1.jpg",
    imageAlt: "Two colleagues reviewing documents in a private jet cabin",
    body: [
      "A private charter turns a two-day trip into a single working day. Depart Karachi in the morning, land in Islamabad in about two hours and arrive at your first meeting fresh.",
      "Share your meeting times with your flight coordinator when you book. We can plan your return departure around them and keep the aircraft ready when you are.",
      "Because you board minutes before departure, there is no long check-in. Allow time for road transfers at each end and you will have a full, stress-free day.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
