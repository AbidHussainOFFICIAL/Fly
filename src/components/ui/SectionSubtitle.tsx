import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionSubtitleProps {
  children: ReactNode;
  /** "gold" on dark backgrounds, "dark" on the gold background. */
  tone?: "gold" | "dark";
}

export function SectionSubtitle({
  children,
  tone = "gold",
}: SectionSubtitleProps) {
  return (
    <p
      className={clsx(
        "mb-[5px] font-semibold tracking-[2px] uppercase",
        tone === "gold" ? "text-satin-sheen-gold" : "text-phthalo-green-1",
      )}
    >
      {children}
    </p>
  );
}
