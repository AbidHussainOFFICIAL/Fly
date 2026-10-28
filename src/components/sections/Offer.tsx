import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionSubtitle } from "@/components/ui/SectionSubtitle";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function Offer() {
  return (
    <section aria-label="offer" className="lg:grid lg:grid-cols-2">
      <div className="bg-satin-sheen-gold bg-[url('/images/offer-bg.png')] bg-bottom bg-no-repeat px-[15px] py-[120px] xl:pe-[100px]">
        <Reveal className="px-[15px] sm:mx-auto sm:w-full sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:ms-auto xl:me-0 xl:max-w-[500px]">
          <SectionSubtitle tone="dark">Special Offer</SectionSubtitle>

          <SectionTitle>
            The best service for business people who appreciate time
          </SectionTitle>

          <p className="mt-[30px] mb-[40px] text-phthalo-green-1">
            Leave Karachi after breakfast, hold your meetings in Islamabad and
            be home for dinner. Our charters turn a two-day trip into one
            productive day.
          </p>

          <Button href="/fleet" variant="offer">
            Discover More
          </Button>
        </Reveal>
      </div>

      <div className="h-[500px] bg-light-gray bg-[url('/images/offer-banner.jpg')] bg-cover [background-position:20%] bg-no-repeat lg:h-auto" />
    </section>
  );
}
