export const siteConfig = {
  name: "Fly",
  title: "Fly - Private Jet Charter in Pakistan",
  description:
    "Charter a private jet from Karachi, Lahore, Islamabad and Peshawar. Fly saves you time and gives you comfort, privacy and a flexible schedule.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  locale: "en_PK",
  author: "Abid Hussain",
  phone: { display: "+92 21 3456 7890", href: "tel:+922134567890" },
  email: "info@flycharter.pk",
  address: {
    street: "Office 402, 4th Floor, Business Plaza, Block 5, Clifton",
    city: "Karachi",
    region: "Sindh",
    postalCode: "75600",
    country: "PK",
  },
  socials: {
    twitter: "https://twitter.com/flycharterpk",
    facebook: "https://www.facebook.com/flycharterpk",
    pinterest: "https://www.pinterest.com/flycharterpk",
    instagram: "https://www.instagram.com/flycharterpk",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Flights", href: "/flights" },
  { label: "Fleet", href: "/fleet" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path}`;
}
