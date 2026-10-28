import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: siteConfig.title,
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
}

/** Per-page metadata: title, description, canonical URL and share cards. */
export function createMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: fullTitle,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
