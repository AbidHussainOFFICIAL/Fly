import { useEffect } from "react";

/** Makes everything matching `selector` unreachable while `active` is true. */
export function useInert(active: boolean, selector: string) {
  useEffect(() => {
    if (!active) return;

    const elements = Array.from(document.querySelectorAll(selector));
    elements.forEach((element) => element.setAttribute("inert", ""));

    return () => {
      elements.forEach((element) => element.removeAttribute("inert"));
    };
  }, [active, selector]);
}
