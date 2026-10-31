import { useEffect, type RefObject } from "react";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface FocusTrapOptions {
  /** Element to focus when the trap starts. Defaults to the first focusable one. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Return false to skip returning focus when the trap ends. Keep it stable (useCallback). */
  shouldRestoreFocus?: () => boolean;
}

/**
 * While `active`, keeps Tab and Shift+Tab inside `containerRef` and, when the
 * trap ends, returns focus to the element that had it before.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  { initialFocusRef, shouldRestoreFocus }: FocusTrapOptions = {},
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

      if (shouldRestoreFocus?.() ?? true) {
        previouslyFocused?.focus({ preventScroll: true });
      }
    };
  }, [active, containerRef, initialFocusRef, shouldRestoreFocus]);
}
