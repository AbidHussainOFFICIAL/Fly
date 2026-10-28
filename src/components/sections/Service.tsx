import Link from "next/link";
import {
  IoBusinessOutline,
  IoCalendarOutline,
  IoDiamondOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

const services = [
  { title: "Luxury & Comfort", href: "/fleet", Icon: IoDiamondOutline },
  { title: "Safe & Secure", href: "/faq", Icon: IoShieldCheckmarkOutline },
  { title: "Personal Schedule", href: "/book", Icon: IoCalendarOutline },
  { title: "Many Airports", href: "/flights", Icon: IoBusinessOutline },
];

export function Service() {
  return (
    <section
      id="services"
      aria-label="service"
      className="bg-satin-sheen-gold pt-[220px] pb-[120px]"
    >
      <Container>
        <ul className="grid gap-[30px] md:grid-cols-2 xl:grid-cols-4">
          {services.map(({ title, href, Icon }, index) => (
            <li key={title}>
              <Reveal delay={index * 0.1}>
                <div className="group border border-vegas-gold p-[35px] transition-fast hocus-within:bg-white">
                  <Icon
                    aria-hidden="true"
                    className="mb-[20px] icon-stroke-20 text-[45px] text-phthalo-green-2 transition-fast group-hocus-within:scale-90 group-hocus-within:text-vegas-gold"
                  />

                  <h3>
                    <Link
                      href={href}
                      className="text-fs-6 text-phthalo-green-1 uppercase transition-fast group-hocus-within:text-phthalo-green-2"
                    >
                      {title}
                    </Link>
                  </h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
