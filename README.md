# Fly – Luxury Jet Flights

Marketing site for a private jet charter company in Pakistan, built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

| Script              | What it does                           |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Start the dev server                   |
| `npm run build`     | Production build                       |
| `npm run start`     | Serve the production build             |
| `npm run lint`      | ESLint                                 |
| `npm run typecheck` | TypeScript check                       |
| `npm run format`    | Prettier (with Tailwind class sorting) |

## Environment variables

| Variable                   | Purpose                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Public site address for canonical URLs, sitemap, robots and share cards |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification token (optional until you verify)    |

## Project structure

```
public/
├── icons/                        192px and 512px app icons (used by the manifest)
├── images/                       Site artwork
└── og-image.png                  1200x630 social share image
src/
├── app/
│   ├── book/ contact/ faq/ fleet/ flights/ news/ terms/   Pages
│   ├── apple-icon.png favicon.ico icon.svg                Favicons
│   ├── error.tsx global-error.tsx loading.tsx not-found.tsx
│   ├── globals.css               Design tokens, base styles, custom utilities
│   ├── layout.tsx                Root layout, skip link, fonts, default metadata
│   ├── manifest.ts robots.ts sitemap.ts
│   └── page.tsx                  Home page
├── components/
│   ├── flights/                  FlightCard
│   ├── forms/                    NewsletterForm, ContactForm, BookingForm
│   ├── layout/                   Header, SearchDialog, Footer, BackToTop
│   ├── motion/                   MotionProvider, Reveal (scroll animations)
│   ├── sections/                 Home page sections
│   └── ui/                       Button, Container, Field, JsonLd, Logo, PageHeader, Section*
├── data/                         Airports, flights, fleet, news, FAQ content
├── hooks/                        useScrolledPast, useBodyScrollLock, useFocusTrap
└── lib/                          Site config, metadata, structured data, schemas, formatting
```

## Notes

- **Content lives in `src/data` and `src/lib/site.ts`.** Flight cards, the flights page, the search dialog, the booking form and the structured data all read the same flight list, so a price or route changes everywhere at once. The first two flights are the ones shown on the home page.
- **Forms are demos.** They validate with `react-hook-form` + `zod` and simulate a successful send (`src/lib/demo.ts`). Replace `simulateSubmit` with a real request when you connect a backend.
- **SEO:** page titles use the template in `layout.tsx`; each page sets its own description and canonical URL through `createMetadata`. Structured data (business, flight prices, articles) is built from the data files in `src/lib/structured-data.ts`.
- **Contact details** (phone, email, address, social links) are placeholders in `src/lib/site.ts`. Replace them with your own before launch, because they feed the structured data.
- **Accessibility:** skip link, focus trap and focus return for the mobile menu, native `<dialog>` for search, and form errors linked to their inputs. Small text on the gold background uses dark green for contrast.
- **Motion:** `<Reveal>` animates content on first scroll into view. It honors the system "reduce motion" setting and is skipped when JavaScript is off.
- **Design tokens** live in `src/app/globals.css` under `@theme`. The site uses `html { font-size: 10px }`, so `1rem = 10px`.
