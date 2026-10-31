"use client";

import type { IconType } from "react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import {
  IoAirplaneOutline,
  IoCloseOutline,
  IoHelpCircleOutline,
  IoLocationOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { groupResults, searchEntries, type SearchGroup } from "@/lib/search";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const groupIcons: Record<SearchGroup, IconType> = {
  Destinations: IoLocationOutline,
  Aircraft: IoAirplaneOutline,
  FAQs: IoHelpCircleOutline,
};

const suggestions = ["Karachi", "Dubai", "Phenom", "Baggage"];

const quickLinks = [
  { label: "All flights", href: "/flights" },
  { label: "Our fleet", href: "/fleet" },
  { label: "FAQs", href: "/faq" },
  { label: "Request a quote", href: "/book" },
];

const eyebrowClasses =
  "text-fs-8 font-semibold tracking-[2px] text-satin-sheen-gold uppercase";

/**
 * Full-screen search. The native dialog traps focus, closes on Escape and
 * returns focus to whatever opened it.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const inputId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }

    if (!open && dialog.open) dialog.close();
  }, [open]);

  const trimmedQuery = query.trim();
  const groups = groupResults(searchEntries(query));
  const total = groups.reduce((sum, { entries }) => sum + entries.length, 0);

  const getResultLinks = () =>
    Array.from(
      dialogRef.current?.querySelectorAll<HTMLAnchorElement>(
        "[data-search-result]",
      ) ?? [],
    );

  // Arrow keys move between the input and the results; Enter opens the first.
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) return;

    const links = getResultLinks();
    const index = links.findIndex((link) => link === document.activeElement);

    if (event.key === "Enter") {
      if (document.activeElement === inputRef.current && links.length > 0) {
        event.preventDefault();
        links[0].click();
      }
      return;
    }

    event.preventDefault();

    if (event.key === "ArrowDown") {
      links[index + 1]?.focus();
    } else if (index > 0) {
      links[index - 1].focus();
    } else {
      inputRef.current?.focus();
    }
  };

  // Links to the page that is already open don't navigate, so scroll to the
  // target ourselves and let the FAQ list know which question to open.
  const handleSelect = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey)
      return;

    onClose();

    const [path, hash] = href.split("#");
    if (!hash || path !== pathname) return;

    event.preventDefault();

    if (window.location.hash !== `#${hash}`) {
      window.history.pushState(null, "", `#${hash}`);
    }

    document.getElementById(hash)?.scrollIntoView();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search"
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-phthalo-green-1 p-0 text-morning-blue fade-dialog backdrop:bg-transparent open:flex open:flex-col"
      onKeyDown={handleKeyDown}
      onClose={() => {
        setQuery("");
        onClose();
      }}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[820px] flex-1 flex-col px-[15px] pt-[20px] pb-[20px] md:pt-[50px]">
        <div className="flex items-center gap-[15px] border-b border-white/20 pb-[10px] transition-fast focus-within:border-satin-sheen-gold">
          <IoSearchOutline
            aria-hidden="true"
            className="shrink-0 icon-stroke-40 text-[30px] text-satin-sheen-gold"
          />

          <label htmlFor={inputId} className="sr-only">
            Search destinations, aircraft and FAQs
          </label>

          <input
            ref={inputRef}
            id={inputId}
            type="text"
            enterKeyHint="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search destinations, aircraft and FAQs"
            value={query}
            className="bg-transparent py-[10px] text-fs-5 text-white outline-none placeholder:text-morning-blue md:text-fs-4"
            onChange={(event) => setQuery(event.target.value)}
          />

          <button
            type="button"
            aria-label="close search"
            className="shrink-0 press p-[6px] text-[30px] text-white hocus:text-vegas-gold"
            onClick={onClose}
          >
            <IoCloseOutline aria-hidden="true" className="icon-stroke-40" />
          </button>
        </div>

        <div className="mt-[25px] min-h-0 scrollbar-dark flex-1 overflow-y-auto overscroll-contain">
          <p role="status" className="sr-only">
            {trimmedQuery === ""
              ? ""
              : total === 0
                ? "No results found"
                : `${total} ${total === 1 ? "result" : "results"} found`}
          </p>

          {trimmedQuery === "" && (
            <div className="px-[16px]">
              <p className={`mb-[12px] ${eyebrowClasses}`}>Popular searches</p>

              <div className="flex flex-wrap gap-[10px]">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="animate-fade-in rounded-pill border border-white/20 px-[18px] py-[8px] text-fs-8 text-white transition-fast hocus:bg-white hocus:text-phthalo-green-1"
                    style={{ animationDelay: `${60 + index * 30}ms` }}
                    onClick={() => {
                      setQuery(suggestion);
                      inputRef.current?.focus();
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <p className={`mt-[35px] mb-[12px] ${eyebrowClasses}`}>
                Quick links
              </p>

              <ul className="flex flex-wrap gap-x-[30px] gap-y-[10px]">
                {quickLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      data-search-result=""
                      className="text-white transition-fast hocus:text-vegas-gold"
                      onClick={(event) => handleSelect(event, href)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {trimmedQuery !== "" && total === 0 && (
            <div className="px-[16px]">
              <p className="text-fs-6 text-white">
                No results for “{trimmedQuery}”.
              </p>

              <p className="mt-[8px]">
                Try a city, an airport code or an aircraft name, or{" "}
                <Link
                  href="/book"
                  data-search-result=""
                  className="inline text-white underline transition-fast hocus:text-vegas-gold"
                  onClick={(event) => handleSelect(event, "/book")}
                >
                  request a custom route
                </Link>
                .
              </p>
            </div>
          )}

          {groups.map(({ group, entries }) => {
            const Icon = groupIcons[group];

            return (
              <div key={group} className="mb-[25px]">
                <h2 className={`px-[16px] pb-[6px] ${eyebrowClasses}`}>
                  {group}
                </h2>

                <ul>
                  {entries.map((entry) => (
                    <li key={entry.id}>
                      <Link
                        href={entry.href}
                        data-search-result=""
                        className="flex items-start gap-[16px] px-[16px] py-[14px] transition-fast hocus:bg-phthalo-green-2"
                        onClick={(event) => handleSelect(event, entry.href)}
                      >
                        <Icon
                          aria-hidden="true"
                          className="mt-[4px] shrink-0 text-[22px] text-satin-sheen-gold"
                        />

                        <span className="min-w-0">
                          <span className="font-semibold text-white">
                            {entry.title}
                          </span>
                          <span className="text-fs-8">{entry.description}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </dialog>
  );
}
