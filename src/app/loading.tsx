export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[70vh] items-center justify-center pt-[100px]"
    >
      <span
        aria-hidden="true"
        className="size-[50px] animate-spin rounded-circle border-4 border-phthalo-green-2 border-t-satin-sheen-gold"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
