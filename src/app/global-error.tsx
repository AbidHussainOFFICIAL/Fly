"use client";

import "./globals.css";
import { buttonClasses } from "@/components/ui/Button";

/** Last-resort page for errors in the root layout itself. */
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en-PK">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center px-[15px] text-center">
          <h1 className="text-fs-2 leading-[1.2] tracking-[-2px] text-white">
            Something went wrong
          </h1>

          <p className="mt-[20px] mb-[40px] max-w-[520px]">
            We could not load the website. Please try again.
          </p>

          <button
            type="button"
            className={buttonClasses("primary")}
            onClick={reset}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
