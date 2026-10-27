import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** True once the window has been scrolled further down than `offset` px. */
export function useScrolledPast(offset: number): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false,
  );
}
