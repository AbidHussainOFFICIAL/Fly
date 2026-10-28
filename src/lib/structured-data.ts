import type { Article } from "@/data/news";
import { getAirport } from "@/data/airports";
import type { Flight } from "@/data/flights";
import { absoluteUrl, siteConfig } from "@/lib/site";

const context = "https://schema.org";

const provider = {
  "@type": "TravelAgency",
  name: siteConfig.name,
  url: absoluteUrl("/"),
};

/** Business and website details for the home page. */
export function homeJsonLd() {
  return {
    "@context": context,
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        description: siteConfig.description,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icons/icon-512.png"),
        image: absoluteUrl("/og-image.png"),
        telephone: siteConfig.phone.display,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
        areaServed: { "@type": "Country", name: "Pakistan" },
        sameAs: Object.values(siteConfig.socials),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.name,
        inLanguage: "en-PK",
        publisher: { "@id": absoluteUrl("/#organization") },
      },
    ],
  };
}

/** One service with a starting price per route, built from the flight data. */
export function flightsJsonLd(flights: Flight[]) {
  return {
    "@context": context,
    "@type": "ItemList",
    itemListElement: flights.map((flight, index) => {
      const from = getAirport(flight.from);
      const to = getAirport(flight.to);

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": absoluteUrl(`/flights#${flight.slug}`),
          name: `Private jet charter from ${from.city} to ${to.city}`,
          serviceType: "Private jet charter",
          provider,
          areaServed: [from.city, to.city],
          offers: {
            "@type": "Offer",
            url: absoluteUrl(`/book?flight=${flight.slug}`),
            description: "Starting price for a one-way charter",
            price: flight.price,
            priceCurrency: "PKR",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: flight.price,
              priceCurrency: "PKR",
            },
          },
        },
      };
    }),
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": context,
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.image),
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: absoluteUrl(`/news/${article.slug}`),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icons/icon-512.png"),
      },
    },
  };
}
