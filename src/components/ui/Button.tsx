import clsx from "clsx";
import type { ReactNode } from "react";

export type ButtonVariant =
  "primary" | "secondary" | "feature" | "offer" | "newsletter";

const base =
  "max-w-max rounded-pill px-[55px] text-fs-8 font-bold tracking-[1px] uppercase transition-fast";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-satin-sheen-gold py-[20px] text-white hocus:bg-white hocus:text-satin-sheen-gold",
  secondary:
    "bg-white py-[20px] text-phthalo-green-1 hocus:bg-satin-sheen-gold hocus:text-white",
  feature:
    "bg-white py-[20px] text-phthalo-green-1 hocus:bg-phthalo-green-2 hocus:text-white",
  offer:
    "bg-phthalo-green-2 py-[20px] text-white hocus:bg-white hocus:text-phthalo-green-2",
  newsletter:
    "flex items-center gap-[10px] bg-phthalo-green-2 py-[15px] text-white",
};

export function buttonClasses(variant: ButtonVariant, className?: string) {
  return clsx(base, variants[variant], className);
}

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  return (
    <a href={href} className={buttonClasses(variant, className)}>
      {children}
    </a>
  );
}
