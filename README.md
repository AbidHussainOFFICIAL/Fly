# Fly – Luxury Jet Flights

Single-page marketing site for a private jet charter company, built with **Next.js (App Router)**, **TypeScript** and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                           |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Start the dev server                   |
| `npm run build`     | Production build                       |
| `npm run start`     | Serve the production build             |
| `npm run lint`      | ESLint                                 |
| `npm run typecheck` | TypeScript check                       |
| `npm run format`    | Prettier (with Tailwind class sorting) |

## Project structure

```
src/
├── app/
│   ├── api/newsletter/route.ts   Newsletter endpoint (validates the email)
│   ├── globals.css               Design tokens, base styles, custom utilities
│   ├── icon.svg                  Favicon
│   ├── layout.tsx                Root layout, fonts, metadata
│   └── page.tsx                  The Home page (all sections)
├── components/
│   ├── layout/                   Header, Footer, BackToTop
│   ├── sections/                 Hero, Service, About, Feature, Offer, Flights, Newsletter
│   └── ui/                       Button, Container, Logo, SectionTitle, SectionSubtitle
├── hooks/                        useScrolledPast, useBodyScrollLock
└── lib/schemas.ts                Zod schema shared by the form and the API
```

## Notes

- **Design tokens** (colors, type scale, radii, shadow, easing, breakpoints) live in `src/app/globals.css` under `@theme`. The site uses `html { font-size: 10px }`, so `1rem = 10px`.
- **Newsletter:** the form validates with `react-hook-form` + `zod` and posts to `/api/newsletter`. Connect your email provider (Mailchimp, Resend, ...) in `src/app/api/newsletter/route.ts`.
- **Only the Header, BackToTop and NewsletterForm are client components.** Everything else renders on the server.
