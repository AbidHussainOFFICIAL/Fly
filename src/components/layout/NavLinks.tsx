"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navLinks, type NavLink } from "@/lib/site";

const spySections = navLinks.flatMap(({ section }) =>
  section ? [section] : [],
);

/** On the home page the visible section decides; elsewhere the route does. */
function getCurrent(
  link: NavLink,
  pathname: string,
  activeSection: string | null,
) {
  if (pathname === "/") {
    if (!link.section || (activeSection ?? "home") !== link.section) {
      return undefined;
    }

    return link.href === "/" ? "page" : "location";
  }

  if (link.href === "/" || link.href.includes("#")) return undefined;

  return pathname === link.href || pathname.startsWith(`${link.href}/`)
    ? "page"
    : undefined;
}

/**
 * Mobile drawer: items fade in one after another, 30ms apart, once the drawer
 * starts opening, and reset only after it has slid out. On desktop they are
 * always visible.
 */
export function drawerItemMotion(
  isOpen: boolean,
  index: number,
): { className: string; style: CSSProperties } {
  return {
    className: clsx(
      "transition-[opacity,translate] ease-out xl:translate-x-0 xl:opacity-100 xl:transition-none",
      isOpen
        ? "translate-x-0 opacity-100 duration-200"
        : "-translate-x-[12px] opacity-0 duration-0",
    ),
    style: { transitionDelay: isOpen ? `${60 + index * 30}ms` : "200ms" },
  };
}

interface Indicator {
  x: number;
  width: number;
  shown: boolean;
  /** Place it without gliding (first appearance), so it never flies in from a stale spot. */
  instant: boolean;
}

interface NavLinksProps {
  isOpen: boolean;
  onNavigate: () => void;
}

export function NavLinks({ isOpen, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const activeSection = useActiveSection(spySections, pathname === "/");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState<Indicator>({
    x: 0,
    width: 0,
    shown: false,
    instant: false,
  });

  const currentIndex = navLinks.findIndex((link) =>
    getCurrent(link, pathname, activeSection),
  );

  // The underline sits under the hovered or focused link, or else the current one.
  const targetIndex =
    previewIndex ?? (currentIndex === -1 ? null : currentIndex);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // `retarget` is true when the underline should move to a different link.
    // A resize only re-measures, and must not change how it moves.
    const measure = (retarget: boolean) => {
      const link = targetIndex === null ? null : linkRefs.current[targetIndex];
      // Bounding boxes, not offsetLeft: the list items carry a transform, which
      // would make them the offset reference and report 0 for every link.
      const linkBox = link?.getBoundingClientRect();
      const wrapperLeft = wrapper.getBoundingClientRect().left;

      setIndicator((previous) => {
        if (!linkBox) {
          return retarget
            ? { ...previous, shown: false, instant: false }
            : previous;
        }

        return {
          x: linkBox.left - wrapperLeft,
          width: linkBox.width,
          shown: true,
          instant: retarget ? !previous.shown : previous.instant,
        };
      });
    };

    const frame = requestAnimationFrame(() => measure(true));
    const observer = new ResizeObserver(() => measure(false));
    observer.observe(wrapper);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [targetIndex]);

  return (
    <div ref={wrapperRef} className="relative">
      <ul className="border-t border-white/10 xl:flex xl:items-center xl:gap-[30px] xl:border-0 min-[1400px]:gap-[40px]">
        {navLinks.map((link, index) => {
          const current = getCurrent(link, pathname, activeSection);
          const motion = drawerItemMotion(isOpen, index);

          return (
            <li
              key={link.label}
              className={clsx(
                "border-b border-white/10 xl:border-0",
                motion.className,
              )}
              style={motion.style}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setPreviewIndex(index);
              }}
              onPointerLeave={() => setPreviewIndex(null)}
            >
              <Link
                ref={(element) => {
                  linkRefs.current[index] = element;
                }}
                href={link.href}
                aria-current={current}
                className={clsx(
                  "py-[11px] text-fs-8 font-medium transition-colors duration-150 ease-out xl:py-[12px] xl:text-[1.6rem] xl:font-bold xl:tracking-[0.5px] xl:uppercase",
                  current
                    ? "text-vegas-gold"
                    : "text-white hocus:text-vegas-gold",
                )}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible")) {
                    setPreviewIndex(index);
                  }
                }}
                onBlur={() => setPreviewIndex(null)}
                onClick={onNavigate}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* One underline that glides between links (desktop only). */}
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute bottom-[8px] left-0 hidden h-[2px] w-px origin-left bg-vegas-gold xl:block",
          indicator.shown ? "opacity-100" : "opacity-0",
          indicator.instant
            ? "transition-opacity duration-150 ease-out"
            : "transition-[translate,scale,opacity] duration-250 ease-cubic-out",
        )}
        style={{
          translate: `${indicator.x}px 0`,
          scale: `${indicator.width} 1`,
        }}
      />
    </div>
  );
}
