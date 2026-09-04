import Image from "next/image";
import { anton } from "@/utils/Fonts";
import { MapPin, Send } from "lucide-react";
import { SOCIAL_LINKS, ICON_SIZE } from "@/constants/Footer/Footers";

import styles from "./Footer.module.scss";

export const FOOTER_COLUMNS: {
  title: string;
  headingClassName: string;
  content: React.ReactNode;
  icon?: any;
}[] = [
  {
    title: "Follow",
    headingClassName:
      "uppercase font-bold leading-none mb-4 text-lg md:text-xl flex gap-2 tracking-tigher",
    content: (
      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ src, alt }) => (
          <Image
            key={src}
            src={src}
            alt={alt}
            width={ICON_SIZE}
            height={ICON_SIZE}
            loading="eager"
          />
        ))}
      </div>
    ),
  },
  {
    title: "Studio",
    headingClassName:
      "uppercase font-bold leading-none mb-4 text-lg md:text-xl flex gap-1 tracking-tigher",
    content: (
      <a
        href="https://maps.app.goo.gl/jgwFcM7n8pnfUiKbA"
        target="_blank"
        rel="noopener noreferrer"
        className="text-center tracking-wide transition hover:text-teal-500 md:text-left"
      >
        CAMLON SILKSCREEN PRINTING SERVICES, <br />
        960 Onyx Ln, Antipolo City, 1870 Rizal
      </a>
    ),
    icon: <MapPin className="h-4 md:h-5" />,
  },
  {
    title: "Contact",
    headingClassName:
      "uppercase font-bold leading-none mb-4 text-lg md:text-xl flex gap-1 tracking-tigher",
    content: (
      <>
        <a
          href="tel:+639123456789"
          className="text-center tracking-wide transition hover:text-teal-500 md:text-left"
        >
          (+63)912-345-6789
        </a>
        <a
          href="mailto:sorrymomtattoo@gmail.com"
          className="text-center tracking-wide transition hover:text-teal-500 md:text-left"
        >
          sorrymomtattoo@gmail.com
        </a>
      </>
    ),
    icon: <Send className="h-4 md:h-5" />,
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className={styles["footer-main"]}>
        <div className={styles["logo"]}>
          <span className={`${styles["logo__span"]} ${anton.className}`}>
            SORRY MOM TATTOO
          </span>
        </div>

        <div className={styles["footer-items"]}>
          <div className={styles["footer-items__container"]}>
            {FOOTER_COLUMNS.map(
              ({ title, headingClassName, content, icon }) => (
                <div
                  key={title}
                  className={styles["footer-items__container-content"]}
                >
                  <h6 className={headingClassName}>
                    {title} {icon}
                  </h6>
                  {content}
                </div>
              ),
            )}
          </div>
        </div>
      </footer>

      <div className={styles["footer-copyright"]}>
        <span className={styles["footer-copyright__span"]}>
          Built with passion by <b>KerbsDev</b>
        </span>
        <span className={styles["footer-copyright__span"]}>
          <b>© {currentYear} Sorry Mom Tattoo</b>. All rights reserved.
        </span>
      </div>
    </>
  );
}

export default Footer;
