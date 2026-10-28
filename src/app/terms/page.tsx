import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms of Use",
  description:
    "The terms that apply when you use the Fly website and book a private jet charter with us.",
  path: "/terms",
});

const sections = [
  {
    title: "Using our website",
    text: "The information on this website is provided for general guidance. Routes, aircraft, times and prices may change without notice and do not form a binding offer.",
  },
  {
    title: "Quotes and bookings",
    text: "A booking is confirmed only when we send you a written confirmation. Starting prices shown on the website are guides, and your final quote depends on the aircraft, route, date and any extra services.",
  },
  {
    title: "Payments",
    text: "Payment terms are set out in your confirmation. Prices are quoted in Pakistani rupees (PKR) unless stated otherwise.",
  },
  {
    title: "Changes and cancellations",
    text: "Tell us as early as possible if your plans change. Charges for changes and cancellations depend on how close to departure you contact us and are included in your confirmation.",
  },
  {
    title: "Baggage and conduct",
    text: "Baggage allowance depends on the aircraft. The pilot in command may refuse any item or passenger for safety or legal reasons.",
  },
  {
    title: "Weather and safety",
    text: "Safety comes first. Flights may be delayed, rerouted or cancelled because of weather, air traffic or airport restrictions, and we will work with you to rebook.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Use"
        description="Last updated 1 October 2026."
      />

      <section aria-label="terms" className="py-[100px]">
        <Container className="mx-auto max-w-[820px] space-y-[40px]">
          {sections.map(({ title, text }) => (
            <div key={title}>
              <h2 className="mb-[10px] text-fs-5 text-white">{title}</h2>
              <p>{text}</p>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
