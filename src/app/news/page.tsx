import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { articles } from "@/data/news";
import { formatDate } from "@/lib/format";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "News & Press",
  description:
    "Travel tips, route updates and company news from Fly, the private jet charter service in Pakistan.",
  path: "/news",
});

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="News & Press"
        description="Travel tips, route updates and company news."
      />

      <section aria-label="articles" className="py-[100px]">
        <Container>
          <ul className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <li key={article.slug}>
                <Reveal delay={(index % 3) * 0.1} className="h-full">
                  <article className="group relative h-full border border-phthalo-green-2 bg-phthalo-green-3 transition-fast hocus-within:border-satin-sheen-gold">
                    <div className="relative aspect-[3/2] overflow-hidden bg-light-gray">
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes="(min-width: 992px) 310px, (min-width: 768px) 345px, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-[30px]">
                      <time dateTime={article.date} className="text-fs-8">
                        {formatDate(article.date)}
                      </time>

                      <h2 className="mt-[8px] text-fs-5 leading-[1.3] text-white">
                        <Link
                          href={`/news/${article.slug}`}
                          className="transition-fast after:absolute after:inset-0 hocus:text-vegas-gold"
                        >
                          {article.title}
                        </Link>
                      </h2>

                      <p className="mt-[10px]">{article.excerpt}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
