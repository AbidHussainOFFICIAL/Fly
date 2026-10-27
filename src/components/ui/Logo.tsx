import Image from "next/image";

export function Logo() {
  return (
    <a href="#">
      <Image src="/images/logo.svg" width={102} height={48} alt="fly logo" />
    </a>
  );
}
