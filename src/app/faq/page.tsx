import { FaqItem } from "@/components/faq/FaqItem";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqs } from "@/data/faq";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about booking, pricing, airports, luggage and safety when you charter a private jet with Fly in Pakistan.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Quick answers about booking and flying with us."
      />

      <section aria-label="questions" className="py-[100px]">
        <Container className="mx-auto max-w-[820px]">
          {faqs.map((faq) => (
            <FaqItem key={faq.id} {...faq} />
          ))}
        </Container>
      </section>
    </>
  );
}
