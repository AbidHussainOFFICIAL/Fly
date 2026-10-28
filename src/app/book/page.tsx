import { Suspense } from "react";
import { BookingForm } from "@/components/forms/BookingForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Book a Private Jet",
  description:
    "Request a private jet charter from Pakistan. Choose your route, date and passengers and we will send you a quote.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHeader
        title="Book a Flight"
        description="Choose your route and date and we will send you a quote."
      />

      <section aria-label="booking" className="py-[100px]">
        <Container className="mx-auto max-w-[820px]">
          <Suspense fallback={null}>
            <BookingForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
