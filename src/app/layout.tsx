import type { Metadata } from "next";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fly - Luxury Jet Flights",
  description:
    "Fly offers private jet charters that save your time and give you comfort.",
  authors: [{ name: "Abid Hussain" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">{children}</body>
    </html>
  );
}
