import {
  IoCall,
  IoLocation,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoLogoTwitter,
  IoMail,
} from "react-icons/io5";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const linkColumns = [
  {
    title: "Explore",
    links: [
      "About",
      "Private Jet Catering",
      "Destinations",
      "Flight Search",
      "Book Flight",
    ],
  },
  {
    title: "Links",
    links: ["Terms of Use", "Contact", "News & Press", "Games", "FAQs"],
  },
];

const socials = [
  { label: "Twitter", Icon: IoLogoTwitter },
  { label: "Facebook", Icon: IoLogoFacebook },
  { label: "Pinterest", Icon: IoLogoPinterest },
  { label: "Instagram", Icon: IoLogoInstagram },
];

const linkClasses = "mt-[5px] transition-fast hocus:text-white";
const listTitleClasses = "mb-[15px] text-fs-6 font-bold text-white";
const contactItemClasses = "mt-[12px] flex items-center gap-[5px]";
const contactLinkClasses =
  "text-fs-7 transition-fast hocus:text-satin-sheen-gold";

export function Footer() {
  return (
    <footer className="bg-phthalo-green-2 bg-[url('/images/footer-bg.png')] [background-position:center_85%] bg-no-repeat">
      <Container>
        <div className="grid gap-[30px] py-[90px] md:grid-cols-2 xl:grid-cols-[1fr_0.4fr_0.4fr_0.6fr]">
          <div>
            <Logo />

            <p className="mt-[20px] text-fs-5 font-medium text-white xl:me-[80px]">
              Private jet charters save your time and give you comfort.
            </p>
          </div>

          {linkColumns.map(({ title, links }) => (
            <ul key={title}>
              <li>
                <p className={listTitleClasses}>{title}</p>
              </li>

              {links.map((label) => (
                <li key={label}>
                  <a href="#" className={linkClasses}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ))}

          <ul>
            <li>
              <p className={listTitleClasses}>Contact</p>
            </li>

            <li className={contactItemClasses}>
              <IoCall
                aria-hidden="true"
                className="shrink-0 text-satin-sheen-gold"
              />
              <a href="tel:+0123456780" className={contactLinkClasses}>
                +01 ( 2345 ) - 6780
              </a>
            </li>

            <li className={contactItemClasses}>
              <IoMail
                aria-hidden="true"
                className="shrink-0 text-satin-sheen-gold"
              />
              <a href="mailto:fly@info.com" className={contactLinkClasses}>
                fly@info.com
              </a>
            </li>

            <li className={contactItemClasses}>
              <IoLocation
                aria-hidden="true"
                className="shrink-0 text-satin-sheen-gold"
              />
              <address className="text-fs-7">
                30 broklyn golden street. New York
              </address>
            </li>
          </ul>
        </div>

        <div className="border-t border-white/10 py-[30px] text-center md:flex md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} by Abid Hussain.</p>

          <ul className="mt-[15px] flex justify-center gap-[10px] md:mt-0">
            {socials.map(({ label, Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="rounded-circle bg-british-racing-green p-[12px] text-white transition-fast hocus:bg-white hocus:text-satin-sheen-gold"
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
