"use client";

import { useEffect, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";

interface FaqItemProps {
  id: string;
  question: string;
  answer: string;
}

/** A question that opens itself when the page address points to it (`/faq#id`). */
export function FaqItem({ id, question, answer }: FaqItemProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash === `#${id}` && detailsRef.current) {
        detailsRef.current.open = true;
      }
    };

    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);

    return () => window.removeEventListener("hashchange", openIfTargeted);
  }, [id]);

  return (
    <details
      ref={detailsRef}
      id={id}
      className="group border-b border-white/10"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-[20px] py-[22px] text-fs-6 font-semibold text-white transition-fast hocus:text-vegas-gold [&::-webkit-details-marker]:hidden">
        {question}
        <IoChevronDown
          aria-hidden="true"
          className="shrink-0 transition-fast group-open:rotate-180"
        />
      </summary>

      <p className="pb-[25px]">{answer}</p>
    </details>
  );
}
