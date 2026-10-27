/**
 * Central, typed registry of every image used by the site.
 * Width/height match the real files so next/image can reserve space
 * (no layout shift). Import from here instead of typing paths by hand.
 */
export interface SiteImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

const img = (
  file: string,
  width: number,
  height: number,
  alt = "",
): SiteImage => ({ src: `/images/${file}`, width, height, alt });

export const images = {
  // Brand
  logo: img("logo.svg", 102, 48, "Fly logo"),

  // Hero
  heroBg: img("hero-bg.jpg", 1894, 791),
  heroBanner: img("hero-banner.png", 1474, 426, "Airplane"),

  // About
  aboutBanner: img("about-banner.jpg", 470, 550, "Two flight attendants beside an aircraft"),

  // Feature cards
  feature1: img("feature-1.jpg", 370, 452, "Exclusive new offers"),
  feature2: img("feature-2.jpg", 370, 452, "Join our cabin crew"),
  featureCardBg1: img("feature-card-bg-1.png", 206, 197),
  featureCardBg2: img("feature-card-bg-2.png", 370, 346),

  // Special offer
  offerBg: img("offer-bg.png", 954, 364),
  offerBanner: img("offer-banner.jpg", 947, 661, "Passengers inside a private jet"),
  offerShape: img("special-offer-one-shape-2.png", 141, 75),

  // Flights
  flight1: img("flight-1.png", 263, 84, "Private jet"),

  // Newsletter & footer
  newsletterBg: img("newsletter-bg.png", 334, 329),
  newsletterShape: img("newsletter-shape-2.png", 379, 330),
  footerBg: img("footer-bg.png", 955, 314),
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
