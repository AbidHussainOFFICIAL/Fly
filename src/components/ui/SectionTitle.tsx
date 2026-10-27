import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={clsx(
        "text-fs-2 leading-[1.3] tracking-[-2px] text-white",
        className,
      )}
    >
      {children}
    </h2>
  );
}
