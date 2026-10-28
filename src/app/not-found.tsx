import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section
      aria-label="page not found"
      className="pt-[230px] pb-[150px] text-center"
    >
      <Container>
        <p className="text-fs-5 font-semibold text-satin-sheen-gold">404</p>

        <h1 className="mt-[10px] text-fs-2 leading-[1.2] tracking-[-2px] text-white">
          This page has flown off
        </h1>

        <p className="mx-auto mt-[20px] mb-[40px] max-w-[520px]">
          The page you are looking for does not exist or has moved. Head back
          home or browse our flights.
        </p>

        <div className="flex flex-wrap justify-center gap-[10px]">
          <Button href="/" variant="primary">
            Back to Home
          </Button>

          <Button href="/flights" variant="secondary">
            View Flights
          </Button>
        </div>
      </Container>
    </section>
  );
}
