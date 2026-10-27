import { Container } from "@/components/ui/Container";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { NewsletterForm } from "./NewsletterForm";

export function Newsletter() {
  return (
    <section
      aria-label="newsletter"
      className="bg-satin-sheen-gold bg-[url('/images/newsletter-bg.png')] bg-auto bg-left-bottom bg-no-repeat py-[120px]"
    >
      <Container className="grid gap-[40px] lg:grid-cols-[0.8fr_1fr] lg:items-center">
        <div>
          <SectionSubtitle tone="champagne">Subscribe Now</SectionSubtitle>

          <SectionTitle>Want to know about our offers first?</SectionTitle>
        </div>

        <NewsletterForm />
      </Container>
    </section>
  );
}
