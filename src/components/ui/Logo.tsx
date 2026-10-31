import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** The smaller size used in the header and the mobile menu. */
  compact?: boolean;
  className?: string;
}

export function Logo({ compact = false, className }: LogoProps) {
  return (
    <Link href="/" aria-label="Fly home" className={clsx("w-fit", className)}>
      <Image
        src="/images/logo.svg"
        width={compact ? 85 : 102}
        height={compact ? 40 : 48}
        alt="Fly"
      />
    </Link>
  );
}
