import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Fly home">
      <Image src="/images/logo.svg" width={102} height={48} alt="Fly" />
    </Link>
  );
}
