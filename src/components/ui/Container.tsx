import clsx from "clsx";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx(
        "px-[15px] sm:mx-auto sm:w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1200px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
