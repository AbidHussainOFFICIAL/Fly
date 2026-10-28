"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { getAirport } from "@/data/airports";
import { flights } from "@/data/flights";
import { formatPrice } from "@/lib/format";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const routes = flights.map((flight) => {
  const from = getAirport(flight.from);
  const to = getAirport(flight.to);

  return {
    flight,
    label: `${from.city} to ${to.city}`,
    searchText:
      `${from.city} ${from.code} ${to.city} ${to.code} ${flight.aircraft}`.toLowerCase(),
  };
});

/** Route search. The native dialog traps focus and restores it on close. */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const inputId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = routes.filter(({ searchText }) =>
    terms.every((term) => searchText.includes(term)),
  );

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search flights"
      className="m-auto mt-[100px] w-[calc(100%-30px)] max-w-[600px] bg-phthalo-green-2 p-0 text-morning-blue shadow-soft backdrop:bg-black/60"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onClose={() => {
        setQuery("");
        onClose();
      }}
    >
      <div className="p-[30px]">
        <div className="mb-[20px] flex items-center justify-between">
          <label htmlFor={inputId} className="text-fs-5 font-bold text-white">
            Search flights
          </label>

          <button
            type="button"
            className="text-[26px] text-white"
            aria-label="close search"
            onClick={onClose}
          >
            <IoCloseOutline aria-hidden="true" className="icon-stroke-60" />
          </button>
        </div>

        <input
          id={inputId}
          type="search"
          value={query}
          placeholder="City, airport code or aircraft"
          autoComplete="off"
          className="border border-phthalo-green-3 bg-phthalo-green-3 px-[20px] py-[15px] text-white placeholder:text-morning-blue focus:border-satin-sheen-gold"
          onChange={(event) => setQuery(event.target.value)}
        />

        <p role="status" className="mt-[15px] text-fs-8">
          {results.length === 1
            ? "1 route found"
            : `${results.length} routes found`}
        </p>

        <ul className="mt-[10px] max-h-[320px] overflow-y-auto">
          {results.map(({ flight, label }) => (
            <li key={flight.slug} className="border-t border-white/10">
              <Link
                href={`/flights#${flight.slug}`}
                className="flex items-center justify-between gap-[15px] py-[14px] transition-fast hocus:text-white"
                onClick={onClose}
              >
                <span className="font-semibold text-white">{label}</span>
                <span className="text-fs-8">
                  From {formatPrice(flight.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
