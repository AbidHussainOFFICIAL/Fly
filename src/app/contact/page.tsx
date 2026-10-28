import { IoCall, IoLocation, IoMail, IoTime } from "react-icons/io5";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact Fly to plan a private jet charter from Karachi, Lahore, Islamabad or Peshawar. Our team replies with a quote.",
  path: "/contact",
});

const itemClasses = "flex items-start gap-[12px]";
const iconClasses = "mt-[4px] shrink-0 text-[22px] text-satin-sheen-gold";
const linkClasses = "text-white transition-fast hocus:text-vegas-gold";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Tell us where you want to fly and our team will reply with a quote."
      />

      <section aria-label="contact" className="py-[100px]">
        <Container className="grid gap-[60px] lg:grid-cols-[0.8fr_1fr]">
          <Reveal>
            <h2 className="mb-[25px] text-fs-4 leading-[1.3] text-white">
              Our office
            </h2>

            <ul className="space-y-[20px]">
              <li className={itemClasses}>
                <IoLocation aria-hidden="true" className={iconClasses} />
                <address>
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city} {siteConfig.address.postalCode},
                  Pakistan
                </address>
              </li>

              <li className={itemClasses}>
                <IoCall aria-hidden="true" className={iconClasses} />
                <a href={siteConfig.phone.href} className={linkClasses}>
                  {siteConfig.phone.display}
                </a>
              </li>

              <li className={itemClasses}>
                <IoMail aria-hidden="true" className={iconClasses} />
                <a href={`mailto:${siteConfig.email}`} className={linkClasses}>
                  {siteConfig.email}
                </a>
              </li>

              <li className={itemClasses}>
                <IoTime aria-hidden="true" className={iconClasses} />
                <p>Our team is available 24 hours a day, 7 days a week.</p>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mb-[25px] text-fs-4 leading-[1.3] text-white">
              Send a message
            </h2>

            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
