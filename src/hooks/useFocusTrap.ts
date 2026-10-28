import { useEffect, type RefObject } from "react";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * While `active`, keeps Tab and Shift+Tab inside `containerRef`, moves focus
 * to `initialFocusRef` and returns focus to the previous element on close.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));

    (initialFocusRef?.current ?? getFocusable()[0])?.focus({
      preventScroll: true,
    });

    const trapTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trapTab);

    return () => {
      document.removeEventListener("keydown", trapTab);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [active, containerRef, initialFocusRef]);
}
