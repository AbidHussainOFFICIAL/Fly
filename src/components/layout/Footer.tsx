import Link from "next/link";
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
import { siteConfig } from "@/lib/site";

const linkColumns = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/#about" },
      { label: "Flights", href: "/flights" },
      { label: "Fleet", href: "/fleet" },
      { label: "Book a Flight", href: "/book" },
    ],
  },
  {
    title: "Links",
    links: [
      { label: "Terms of Use", href: "/terms" },
      { label: "Contact", href: "/contact" },
      { label: "News & Press", href: "/news" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

const socials = [
  { label: "Twitter", href: siteConfig.socials.twitter, Icon: IoLogoTwitter },
  {
    label: "Facebook",
    href: siteConfig.socials.facebook,
    Icon: IoLogoFacebook,
  },
  {
    label: "Pinterest",
    href: siteConfig.socials.pinterest,
    Icon: IoLogoPinterest,
  },
  {
    label: "Instagram",
    href: siteConfig.socials.instagram,
    Icon: IoLogoInstagram,
  },
];

const linkClasses = "mt-[5px] transition-fast hocus:text-white";
const listTitleClasses = "mb-[15px] text-fs-6 font-bold text-white";
const contactItemClasses = "mt-[12px] flex items-center gap-[5px]";
const contactLinkClasses = "text-fs-7 transition-fast hocus:text-vegas-gold";

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
            <nav key={title} aria-label={title}>
              <h2 className={listTitleClasses}>{title}</h2>

              <ul>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className={linkClasses}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className={listTitleClasses}>Contact</h2>

            <ul>
              <li className={contactItemClasses}>
                <IoCall
                  aria-hidden="true"
                  className="shrink-0 text-satin-sheen-gold"
                />
                <a href={siteConfig.phone.href} className={contactLinkClasses}>
                  {siteConfig.phone.display}
                </a>
              </li>

              <li className={contactItemClasses}>
                <IoMail
                  aria-hidden="true"
                  className="shrink-0 text-satin-sheen-gold"
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={contactLinkClasses}
                >
                  {siteConfig.email}
                </a>
              </li>

              <li className={contactItemClasses}>
                <IoLocation
                  aria-hidden="true"
                  className="shrink-0 text-satin-sheen-gold"
                />
                <address className="text-fs-7">
                  {siteConfig.address.street}, {siteConfig.address.city}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-[30px] text-center md:flex md:items-center md:justify-between">
          <p>
            Copyright {new Date().getFullYear()} by {siteConfig.author}.
          </p>

          <ul className="mt-[15px] flex justify-center gap-[10px] md:mt-0">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
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
