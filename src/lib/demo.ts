/** Stands in for a network request so the forms behave like real ones. */
export function simulateSubmit(delay = 800) {
  return new Promise<void>((resolve) => setTimeout(resolve, delay));
}
