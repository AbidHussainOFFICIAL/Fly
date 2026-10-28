import { IoChevronDown } from "react-icons/io5";
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
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[20px] py-[22px] text-fs-6 font-semibold text-white transition-fast hocus:text-vegas-gold [&::-webkit-details-marker]:hidden">
                {question}
                <IoChevronDown
                  aria-hidden="true"
                  className="shrink-0 transition-fast group-open:rotate-180"
                />
              </summary>

              <p className="pb-[25px]">{answer}</p>
            </details>
          ))}
        </Container>
      </section>
    </>
  );
}
