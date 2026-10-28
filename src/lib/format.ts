export function formatPrice(amount: number) {
  return `PKR ${amount.toLocaleString("en-US")}`;
}

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-GB", {
    ...options,
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

/** Today's date in the visitor's time zone, as YYYY-MM-DD. */
export function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}
