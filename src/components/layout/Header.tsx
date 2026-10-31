"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IoCallOutline,
  IoCloseOutline,
  IoMenuOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { NavLinks, drawerItemMotion } from "@/components/layout/NavLinks";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Logo } from "@/components/ui/Logo";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useInert } from "@/hooks/useInert";
import { useScrollLatch } from "@/hooks/useScrollLatch";
import { navLinks, siteConfig } from "@/lib/site";

const quoteClasses =
  "rounded-pill bg-satin-sheen-gold font-bold tracking-[1px] whitespace-nowrap text-phthalo-green-1 uppercase press hocus:bg-white";

// 24px icons inside a 44px tap target.
const iconButtonClasses =
  "p-[10px] text-[24px] text-white press hocus:text-vegas-gold";

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Solid once scrolled past 100px, and stays solid until back at the very top.
  const isScrolled = useScrollLatch(100, 0);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(true);
  const shouldRestoreFocus = useCallback(() => restoreFocusRef.current, []);
  const [lastPathname, setLastPathname] = useState(pathname);

  useBodyScrollLock(isNavOpen || isSearchOpen);
  useInert(isNavOpen, "#page-content");
  useFocusTrap(navRef, isNavOpen, {
    initialFocusRef: closeButtonRef,
    shouldRestoreFocus,
  });

  // A new page always starts with the menu and search closed.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsNavOpen(false);
    setIsSearchOpen(false);
  }

  useEffect(() => {
    if (!isNavOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocusRef.current = true;
        setIsNavOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isNavOpen]);

  // The menu button is hidden from 1200px up, so close the drawer when the
  // window grows past that width instead of leaving the page scroll-locked.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        restoreFocusRef.current = false;
        setIsNavOpen(false);
      }
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  // Ctrl/Cmd+K opens search from anywhere; "/" does too unless you are typing.
  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.closest(
        "input, textarea, select, [contenteditable='true']",
      );
      const isShortcut =
        (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) ||
        (event.key === "/" &&
          !isTyping &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.altKey);

      if (!isShortcut) return;

      event.preventDefault();
      restoreFocusRef.current = false;
      setIsNavOpen(false);
      setIsSearchOpen(true);
    };

    document.addEventListener("keydown", openSearch);
    return () => document.removeEventListener("keydown", openSearch);
  }, []);

  const drawerCta = drawerItemMotion(isNavOpen, navLinks.length);

  const toggleNav = () => {
    restoreFocusRef.current = true;
    setIsNavOpen((open) => !open);
  };

  // Following a link leaves the page, so focus is not sent back to the button.
  const closeNavForLink = () => {
    restoreFocusRef.current = false;
    setIsNavOpen(false);
  };

  return (
    <>
      <header
        className={clsx(
          "top-0 left-0 z-[4] w-full border-b transition-[background-color,box-shadow,border-color] duration-200 ease-out",
          isScrolled
            ? "fixed [transform:translateY(-100%)] animate-slide-in-top border-transparent bg-phthalo-green-2 shadow-soft"
            : "absolute border-white/10",
        )}
      >
        <div
          className={clsx(
            "flex items-center justify-between px-[30px] transition-[padding] duration-200 ease-out xl:grid xl:grid-cols-[1fr_auto_1fr]",
            isScrolled ? "py-[10px]" : "py-[20px]",
          )}
        >
          <Logo compact />

          <nav
            ref={navRef}
            id="primary-navigation"
            aria-label="Primary"
            className={clsx(
              "fixed top-0 -left-[300px] z-[2] flex h-dvh scrollbar-dark w-full max-w-[300px] flex-col overflow-y-auto bg-phthalo-green-2 px-[15px] py-[20px] transition-[translate,visibility] xl:visible xl:contents",
              isNavOpen
                ? "visible translate-x-[300px] duration-300 ease-cubic-out"
                : "invisible duration-200 ease-cubic-out",
            )}
          >
            <div className="mb-[20px] flex items-start justify-between xl:hidden">
              <Logo compact />

              <button
                ref={closeButtonRef}
                type="button"
                className="press text-[22px] text-white"
                aria-label="close menu"
                onClick={toggleNav}
              >
                <IoCloseOutline
                  aria-hidden="true"
                  className="icon-stroke-100"
                />
              </button>
            </div>

            <NavLinks isOpen={isNavOpen} onNavigate={closeNavForLink} />

            <div
              className={clsx(
                "mt-auto space-y-[16px] pt-[20px] xl:hidden",
                drawerCta.className,
              )}
              style={drawerCta.style}
            >
              <Link
                href="/book"
                className={clsx(
                  quoteClasses,
                  "px-[26px] py-[13px] text-center text-fs-8",
                )}
                onClick={closeNavForLink}
              >
                Request a Quote
              </Link>

              <a
                href={siteConfig.phone.href}
                className="flex items-center gap-[10px] text-fs-8 font-medium text-white transition-fast hocus:text-vegas-gold"
              >
                <IoCallOutline
                  aria-hidden="true"
                  className="shrink-0 icon-stroke-40 text-[22px] text-vegas-gold"
                />
                {siteConfig.phone.display}
              </a>
            </div>
          </nav>

          <div className="flex items-center gap-[4px] md:gap-[6px] xl:justify-self-end">
            <a
              href={siteConfig.phone.href}
              aria-label={`Call ${siteConfig.phone.display}`}
              className={iconButtonClasses}
            >
              <IoCallOutline aria-hidden="true" className="icon-stroke-40" />
            </a>

            <button
              type="button"
              className={iconButtonClasses}
              aria-label="search"
              aria-haspopup="dialog"
              onClick={() => {
                restoreFocusRef.current = false;
                setIsNavOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <IoSearchOutline aria-hidden="true" className="icon-stroke-40" />
            </button>

            <Link
              href="/book"
              className={clsx(
                quoteClasses,
                "ms-[10px] hidden px-[22px] py-[10px] text-[1.3rem] md:block",
              )}
            >
              Request a Quote
            </Link>

            <button
              type="button"
              className="press p-[10px] text-[24px] text-satin-sheen-gold xl:hidden"
              aria-label="menu"
              aria-expanded={isNavOpen}
              aria-controls="primary-navigation"
              onClick={toggleNav}
            >
              <IoMenuOutline aria-hidden="true" className="icon-stroke-40" />
            </button>
          </div>

          <div
            aria-hidden="true"
            className={clsx(
              "fixed top-0 left-0 z-[1] h-dvh w-full bg-black/50 transition-opacity ease-cubic-out xl:hidden",
              isNavOpen
                ? "pointer-events-auto opacity-100 duration-300"
                : "pointer-events-none opacity-0 duration-200",
            )}
            onClick={toggleNav}
          />
        </div>
      </header>

      <SearchOverlay
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
