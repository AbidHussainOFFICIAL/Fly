import type { MetadataRoute } from "next";
import { articles } from "@/data/news";
import { absoluteUrl } from "@/lib/site";

const pages = [
  "/",
  "/flights",
  "/fleet",
  "/news",
  "/book",
  "/contact",
  "/faq",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
    })),
    ...articles.map(({ slug, date }) => ({
      url: absoluteUrl(`/news/${slug}`),
      lastModified: date,
    })),
  ];
}
