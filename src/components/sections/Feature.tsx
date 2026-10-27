import { IoArrowForward } from "react-icons/io5";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const cards = [
  {
    title: ["Exclusive", "new offers"],
    image: "/images/feature-1.jpg",
  },
  {
    title: ["Join our", "cabin crew"],
    image: "/images/feature-2.jpg",
  },
];

export function Feature() {
  return (
    <section aria-label="feature" className="pb-[120px]">
      <Container>
        <ul className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          <li className="md:col-span-2 lg:col-auto">
            <div className="overflow-hidden bg-satin-sheen-gold bg-[url('/images/feature-card-bg-1.png'),url('/images/feature-card-bg-2.png')] [background-size:auto,contain] [background-position:left_bottom,bottom] [background-repeat:no-repeat,no-repeat] p-[20px] text-white md:p-[50px] lg:p-[20px] xl:p-[50px]">
              <p className="text-fs-8 font-semibold tracking-[2px] text-medium-champagne uppercase">
                Collect Miles
              </p>

              <h2>
                <a
                  href="#"
                  className="text-fs-4 leading-[1.4] tracking-[-1px] transition-fast md:max-w-[11ch] lg:max-w-none xl:max-w-[11ch] hocus:text-phthalo-green-2"
                >
                  Get discount next flights with our card
                </a>
              </h2>

              <p className="mt-[20px] mb-[25px] leading-[1.85] font-medium text-medium-champagne">
                Non augue egestas, commodo velit eget, vestibulum tellus.
                Curabitur vulputate justo elit, at elementum orci pulvinar vel.
              </p>

              <Button href="#" variant="feature">
                Get Card
              </Button>
            </div>
          </li>

          {cards.map(({ title, image }) => (
            <li key={image}>
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="relative z-[1] flex aspect-[370/452] flex-col-reverse justify-between overflow-hidden bg-light-gray [background-size:100%] bg-center bg-no-repeat p-[50px] transition-slow before:absolute before:inset-0 before:-z-10 before:bg-[image:var(--gradient-1)] before:content-[''] after:absolute after:inset-0 after:-z-10 after:origin-top after:scale-y-0 after:bg-phthalo-green-30 after:content-[''] after:transition-slow lg:aspect-auto lg:h-full xl:[background-size:105%] hocus-within:[background-size:105%] hocus-within:after:scale-y-100 xl:hocus-within:[background-size:110%]"
              >
                <h3>
                  <a
                    href="#"
                    className="text-fs-3 leading-[1.2] text-white transition-fast hocus:text-satin-sheen-gold"
                  >
                    {title[0]}
                    <br />
                    {title[1]}
                  </a>
                </h3>

                <a
                  href="#"
                  aria-label={`${title[0]} ${title[1]}`}
                  className="max-w-max self-end rounded-circle bg-white p-[17px] text-phthalo-green-2 transition-fast hocus:bg-satin-sheen-gold hocus:text-white"
                >
                  <IoArrowForward aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
