import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "./globals.css";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { ogImage } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage.url],
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: "#0b2314",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK" data-scroll-behavior="smooth">
      <body id="top">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-[10px] focus:left-[10px] focus:z-[10] focus:rounded-pill focus:bg-white focus:px-[25px] focus:py-[12px] focus:font-bold focus:text-phthalo-green-1"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" tabIndex={-1} className="outline-none">
          <MotionProvider>{children}</MotionProvider>
        </main>

        <Footer />
        <BackToTop />

        <noscript>
          <style>
            {"[data-reveal]{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
      </body>
    </html>
  );
}
