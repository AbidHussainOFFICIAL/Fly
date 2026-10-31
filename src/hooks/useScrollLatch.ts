import { useEffect, useState } from "react";

/**
 * True once the window has scrolled past `activateAt` px and stays true until
 * it is back at `releaseAt` px or less. The gap between the two values keeps
 * the state from flickering while the user scrolls around a single threshold.
 */
export function useScrollLatch(activateAt: number, releaseAt: number): boolean {
  const [isLatched, setIsLatched] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;

      if (y > activateAt) setIsLatched(true);
      else if (y <= releaseAt) setIsLatched(false);
    };

    // Also picks up the scroll position the browser restores after a reload.
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [activateAt, releaseAt]);

  return isLatched;
}
