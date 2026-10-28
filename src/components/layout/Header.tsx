"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  IoCloseOutline,
  IoMenuOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { Logo } from "@/components/ui/Logo";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrolledPast } from "@/hooks/useScrolledPast";
import { navLinks } from "@/lib/site";

function isActiveLink(href: string, pathname: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isScrolled = useScrolledPast(100);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(isNavOpen);
  useFocusTrap(navRef, isNavOpen, closeButtonRef);

  useEffect(() => {
    if (!isNavOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsNavOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isNavOpen]);

  // The menu button is hidden from 1200px up, so close the drawer when the
  // window grows past that width instead of leaving the page scroll-locked.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1200px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsNavOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const toggleNav = () => setIsNavOpen((open) => !open);
  const closeNav = () => setIsNavOpen(false);

  return (
    <>
      <header
        className={clsx(
          "top-0 left-0 z-[4] w-full",
          isScrolled
            ? "fixed [transform:translateY(-100%)] animate-slide-in-top border-0 bg-phthalo-green-2 shadow-soft"
            : "absolute border-b border-white/10",
        )}
      >
        <div className="flex items-center justify-between px-[30px] py-[26px]">
          <Logo />

          <nav
            ref={navRef}
            id="primary-navigation"
            aria-label="Primary"
            className={clsx(
              "fixed top-0 -left-[300px] z-[2] h-screen w-full max-w-[300px] bg-phthalo-green-2 px-[15px] py-[30px] transition-all xl:visible xl:contents",
              isNavOpen
                ? "visible translate-x-[300px] duration-500 ease-cubic-out"
                : "invisible duration-250 ease-cubic-in",
            )}
          >
            <div className="mb-[40px] flex items-start justify-between xl:hidden">
              <Logo />

              <button
                ref={closeButtonRef}
                type="button"
                className="text-[22px] text-white"
                aria-label="close menu"
                onClick={toggleNav}
              >
                <IoCloseOutline
                  aria-hidden="true"
                  className="icon-stroke-100"
                />
              </button>
            </div>

            <ul className="border-t border-white/10 xl:flex xl:items-center xl:gap-[60px] xl:border-0">
              {navLinks.map(({ label, href }) => {
                const isActive = isActiveLink(href, pathname);

                return (
                  <li
                    key={label}
                    className="border-b border-white/10 xl:border-0"
                  >
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={clsx(
                        "py-[15px] text-fs-8 font-medium xl:text-[1.5rem] xl:font-bold xl:uppercase xl:transition-fast xl:hocus:text-vegas-gold",
                        isActive ? "text-vegas-gold" : "text-white",
                      )}
                      onClick={closeNav}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex gap-[15px]">
            <button
              type="button"
              className="hidden text-[28px] text-white md:block"
              aria-label="search"
              aria-haspopup="dialog"
              onClick={() => setIsSearchOpen(true)}
            >
              <IoSearchOutline aria-hidden="true" className="icon-stroke-40" />
            </button>

            <button
              type="button"
              className="text-[28px] text-satin-sheen-gold xl:hidden"
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
              "fixed top-0 left-0 z-[1] h-screen w-full bg-black/50 transition-fast xl:hidden",
              isNavOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0",
            )}
            onClick={closeNav}
          />
        </div>
      </header>

      <SearchDialog
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
