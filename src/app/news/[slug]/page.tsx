import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { articles, getArticle } from "@/data/news";
import { formatDate } from "@/lib/format";
import { createMetadata } from "@/lib/metadata";
import { articleJsonLd } from "@/lib/structured-data";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />

      <PageHeader title={article.title} />

      <article className="py-[100px]">
        <Container className="mx-auto max-w-[820px]">
          <figure className="relative mb-[40px] aspect-[3/2] overflow-hidden bg-light-gray">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              sizes="(min-width: 992px) 790px, 100vw"
              className="object-cover"
              preload
            />
          </figure>

          <time dateTime={article.date} className="text-fs-8">
            {formatDate(article.date)}
          </time>

          <div className="mt-[15px] space-y-[20px] text-fs-6 leading-[1.7]">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-[50px]">
            <Button href="/news" variant="primary">
              Back to News
            </Button>
          </div>
        </Container>
      </article>
    </>
  );
}
