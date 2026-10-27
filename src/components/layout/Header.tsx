"use client";

import clsx from "clsx";
import { useState } from "react";
import {
  IoCartOutline,
  IoCloseOutline,
  IoMenuOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Logo } from "@/components/ui/Logo";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useScrolledPast } from "@/hooks/useScrolledPast";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "News", href: "#" },
  { label: "Shop", href: "#" },
  { label: "Contact", href: "#" },
];

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isScrolled = useScrolledPast(100);

  useBodyScrollLock(isNavOpen);

  const toggleNav = () => setIsNavOpen((open) => !open);
  const closeNav = () => setIsNavOpen(false);

  return (
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
          id="primary-navigation"
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
              type="button"
              className="text-[22px] text-white"
              aria-label="close menu"
              onClick={toggleNav}
            >
              <IoCloseOutline aria-hidden="true" className="icon-stroke-100" />
            </button>
          </div>

          <ul className="border-t border-white/10 xl:flex xl:items-center xl:gap-[80px] xl:border-0">
            {navLinks.map(({ label, href }) => (
              <li key={label} className="border-b border-white/10 xl:border-0">
                <a
                  href={href}
                  className="py-[15px] text-fs-8 font-medium text-white xl:text-[1.5rem] xl:font-bold xl:uppercase xl:transition-fast xl:hocus:text-satin-sheen-gold"
                  onClick={closeNav}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-[15px]">
          <button
            type="button"
            className="hidden text-[28px] text-white md:block"
            aria-label="search"
          >
            <IoSearchOutline aria-hidden="true" className="icon-stroke-40" />
          </button>

          <button
            type="button"
            className="hidden text-[28px] text-white md:block"
            aria-label="cart"
          >
            <IoCartOutline aria-hidden="true" className="icon-stroke-40" />
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
          onClick={toggleNav}
        />
      </div>
    </header>
  );
}
