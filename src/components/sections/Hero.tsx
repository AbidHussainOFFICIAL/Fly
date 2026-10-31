import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="home"
      className="relative z-[1] overflow-x-clip bg-phthalo-green-2 pt-[200px] pb-[250px] text-center text-white after:absolute after:inset-0 after:-z-10 after:bg-[url('/images/hero-bg.jpg')] after:bg-cover after:bg-center after:bg-no-repeat after:opacity-15 after:mix-blend-luminosity after:content-[''] md:pt-[224px]"
    >
      <Container>
        <p className="text-fs-5 leading-none font-medium">
          Save time and fly with comfort
        </p>

        <h1 className="mt-[25px] mb-[40px] text-fs-1 leading-[1.2] tracking-[5px] uppercase md:leading-[0.9] xl:tracking-[10px]">
          Luxury Jet Flights
        </h1>

        <div className="flex flex-wrap justify-center gap-[10px]">
          <Button href="/book" variant="primary">
            Book Now
          </Button>

          <Button href="/#about" variant="secondary">
            Read More
          </Button>
        </div>

        <Image
          src="/images/hero-banner.png"
          width={1474}
          height={426}
          alt="Passenger jet seen from the front"
          preload
          className="absolute bottom-0 left-1/2 max-w-none [transform:translate(-50%,40%)] animate-fly-move"
        />
      </Container>
    </section>
  );
}