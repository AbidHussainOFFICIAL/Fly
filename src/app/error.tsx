"use client";

import { Button, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section aria-label="error" className="pt-[230px] pb-[150px] text-center">
      <Container>
        <h1 className="text-fs-2 leading-[1.2] tracking-[-2px] text-white">
          Something went wrong
        </h1>

        <p className="mx-auto mt-[20px] mb-[40px] max-w-[520px]">
          We could not load this page. Please try again, or head back home.
        </p>

        <div className="flex flex-wrap justify-center gap-[10px]">
          <button
            type="button"
            className={buttonClasses("primary")}
            onClick={reset}
          >
            Try Again
          </button>

          <Button href="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
