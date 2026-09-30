import Image from "next/image";
import Link from "next/link";
import { MapPin, Send } from "lucide-react";
import { SOCIAL_LINKS, ICON_SIZE } from "@/constants/footer";

const FOOTER_COLUMNS: {
  title: string;
  headingClassName: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}[] = [
  {
    title: "Follow",
    headingClassName:
      "uppercase font-bold leading-none mb-4 text-lg md:text-xl flex gap-2 tracking-tigher",
    content: (
      <div className="flex gap-4">
        {SOCIAL_LINKS.map(({ src, alt, href }) => (
          <Link key={src} href={href} target="_blank" rel="noopener noreferrer">
            <Image src={src} alt={alt} width={ICON_SIZE} height={ICON_SIZE} />
          </Link>
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
        className="text-center transition hover:text-teal-500 active:text-teal-400 md:text-left"
      >
        CAMLON SILKSCREEN PRINTING SERVICES,
        <br /> 960 Onyx Ln,
        <br /> Antipolo City, 1870 Rizal
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
          target="_blank"
          rel="noopener noreferrer"
          className="text-center transition hover:text-teal-500 active:text-teal-400 md:text-left"
        >
          (+63)912-345-6789
        </a>
        <a
          href="mailto:sorrymomtattoo@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center transition hover:text-teal-500 active:text-teal-400 md:text-left"
        >
          sorrymomtattoo@gmail.com
        </a>
      </>
    ),
    icon: <Send className="h-4 md:h-5" />,
  },
];

export default FOOTER_COLUMNS;
