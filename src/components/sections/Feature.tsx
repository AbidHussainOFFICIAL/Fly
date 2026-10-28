import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const cards = [
  {
    title: ["Exclusive", "new offers"],
    image: "/images/feature-1.jpg",
    href: "/flights",
  },
  {
    title: ["Join our", "cabin crew"],
    image: "/images/feature-2.jpg",
    href: "/contact",
  },
];

export function Feature() {
  return (
    <section aria-label="feature" className="pb-[120px]">
      <Container>
        <ul className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          <li className="md:col-span-2 lg:col-auto">
            <Reveal className="h-full">
              <div className="h-full overflow-hidden bg-satin-sheen-gold bg-[url('/images/feature-card-bg-1.png'),url('/images/feature-card-bg-2.png')] [background-size:auto,contain] [background-position:left_bottom,bottom] [background-repeat:no-repeat,no-repeat] p-[20px] text-white md:p-[50px] lg:p-[20px] xl:p-[50px]">
                <p className="text-fs-8 font-semibold tracking-[2px] text-phthalo-green-1 uppercase">
                  Collect Miles
                </p>

                <h2 className="text-fs-4 leading-[1.4] tracking-[-1px] md:max-w-[11ch] lg:max-w-none xl:max-w-[11ch]">
                  Get discounts on your next flights with our card
                </h2>

                <p className="mt-[20px] mb-[25px] leading-[1.85] font-medium text-phthalo-green-1">
                  Frequent flyers earn credits on every charter and redeem them
                  against future flights. Ask our team about membership.
                </p>

                <Button href="/contact" variant="feature">
                  Get Card
                </Button>
              </div>
            </Reveal>
          </li>

          {cards.map(({ title, image, href }, index) => (
            <li key={image}>
              <Reveal delay={(index + 1) * 0.1} className="h-full">
                <div
                  style={{ backgroundImage: `url(${image})` }}
                  className="group relative z-[1] flex aspect-[370/452] flex-col-reverse justify-between overflow-hidden bg-light-gray [background-size:100%] bg-center bg-no-repeat p-[50px] transition-slow before:absolute before:inset-0 before:-z-10 before:bg-[image:var(--gradient-1)] before:content-[''] after:absolute after:inset-0 after:-z-10 after:origin-top after:scale-y-0 after:bg-phthalo-green-30 after:content-[''] after:transition-slow lg:aspect-auto lg:h-full xl:[background-size:105%] hocus-within:[background-size:105%] hocus-within:after:scale-y-100 xl:hocus-within:[background-size:110%]"
                >
                  <h3>
                    <Link
                      href={href}
                      className="text-fs-3 leading-[1.2] text-white transition-fast after:absolute after:inset-0 hocus:text-satin-sheen-gold"
                    >
                      <span>{title[0]}</span>
                      <span>{title[1]}</span>
                    </Link>
                  </h3>

                  <span
                    aria-hidden="true"
                    className="max-w-max self-end rounded-circle bg-white p-[17px] text-phthalo-green-2 transition-fast group-hocus-within:bg-satin-sheen-gold group-hocus-within:text-phthalo-green-1"
                  >
                    <IoArrowForward />
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
