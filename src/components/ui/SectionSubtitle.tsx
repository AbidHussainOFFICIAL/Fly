import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionSubtitleProps {
  children: ReactNode;
  tone?: "gold" | "champagne";
}

export function SectionSubtitle({
  children,
  tone = "gold",
}: SectionSubtitleProps) {
  return (
    <p
      className={clsx(
        "mb-[5px] font-semibold tracking-[2px] uppercase",
        tone === "gold" ? "text-satin-sheen-gold" : "text-medium-champagne",
      )}
    >
      {children}
    </p>
  );
}
