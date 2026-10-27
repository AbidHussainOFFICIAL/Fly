"use client";

import clsx from "clsx";
import { IoArrowUpOutline } from "react-icons/io5";
import { useScrolledPast } from "@/hooks/useScrolledPast";

export function BackToTop() {
  const isVisible = useScrolledPast(100);

  return (
    <a
      href="#top"
      aria-label="back to top"
      className={clsx(
        "fixed right-[30px] bottom-[20px] z-[3] rounded-circle bg-satin-sheen-gold p-[15px] text-[20px] text-white shadow-soft transition-fast",
        isVisible
          ? "visible -translate-y-[10px] opacity-100"
          : "invisible opacity-0",
      )}
    >
      <IoArrowUpOutline aria-hidden="true" />
    </a>
  );
}
