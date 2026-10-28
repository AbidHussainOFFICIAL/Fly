import { Reveal } from "@/components/motion/Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Container } from "@/components/ui/Container";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Newsletter() {
  return (
    <section
      aria-label="newsletter"
      className="bg-satin-sheen-gold bg-[url('/images/newsletter-bg.png')] bg-auto bg-left-bottom bg-no-repeat py-[120px]"
    >
      <Container className="grid gap-[40px] lg:grid-cols-[0.8fr_1fr] lg:items-center">
        <Reveal>
          <SectionSubtitle tone="dark">Subscribe Now</SectionSubtitle>

          <SectionTitle>Want to know about our offers first?</SectionTitle>
        </Reveal>

        <Reveal delay={0.1}>
          <NewsletterForm />
        </Reveal>
      </Container>
    </section>
  );
}
