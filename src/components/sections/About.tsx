import Image from "next/image";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { SectionTitle } from "@/components/ui/SectionTitle";

const highlights = [
  "Departures from Karachi, Lahore, Islamabad and Peshawar.",
  "A dedicated flight coordinator for every charter.",
];

export function About() {
  return (
    <section id="about" aria-label="about" className="py-[120px]">
      <div className="grid gap-[60px] px-[15px] sm:mx-auto sm:w-full sm:max-w-[540px] md:max-w-[600px] xl:max-w-[1200px] xl:grid-cols-2">
        <Reveal>
          <SectionSubtitle>Get To Know Us</SectionSubtitle>

          <SectionTitle className="mb-[30px]">
            Private flights that save your time and give you comfort
          </SectionTitle>

          <p>
            Fly connects Pakistan&rsquo;s major cities with on-demand private
            charters. Skip the queues, board minutes before departure and fly on
            your own schedule, with a coordinator who looks after every detail
            from booking to landing.
          </p>

          <ul className="mt-[30px] mb-[40px]">
            {highlights.map((text) => (
              <li
                key={text}
                className="flex items-center gap-[15px] first:mb-[6px]"
              >
                <IoCheckmarkOutline
                  aria-hidden="true"
                  className="shrink-0 text-[22px] text-satin-sheen-gold"
                />

                <p className="text-fs-6 font-semibold text-white">{text}</p>
              </li>
            ))}
          </ul>

          <Button href="/book" variant="primary">
            Book Now
          </Button>
        </Reveal>

        <Reveal delay={0.15}>
          <figure className="aspect-[470/550] overflow-hidden bg-light-gray shadow-[-40px_60px_0_-20px_var(--color-phthalo-green-3)] xl:mx-[50px]">
            <Image
              src="/images/about-banner.jpg"
              width={470}
              height={550}
              sizes="(min-width: 1200px) 455px, (min-width: 768px) 600px, 100vw"
              alt="Two cabin crew members in uniform standing beside an aircraft"
              className="h-full w-full object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
