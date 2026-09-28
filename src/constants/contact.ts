import { Phone, Mail, MapPin, Car } from "lucide-react";
import type { ContactMethod, InfoStripItem } from "@/types/contact";

const DIRECT_CONTACTS: ContactMethod[] = [
  {
    id: "phone",
    icon: Phone,
    label: "PHONE",
    value: "0929 825 7646",
    href: "tel:+639298257646",
  },
  {
    id: "instagram",
    image: "/socials/instagram.svg",
    label: "INSTAGRAM",
    value: "@sorrymomtatt00",
    href: "https://www.instagram.com/sorrymomtatt00?stkn=NXZheTFyYnBoc2Y2",
  },
  {
    id: "email",
    icon: Mail,
    label: "EMAIL",
    value: "sorrymomtatt00@gmail.com",
    href: "mailto:sorrymomtatt00@gmail.com",
  },
  {
    id: "facebook",
    image: "/socials/facebook.svg",
    label: "FACEBOOK",
    value: "Sorry Mom Tattoo",
    href: "https://www.facebook.com/share/18XKsZEVxp/",
  },
  {
    id: "tiktok",
    image: "/socials/tiktok.svg", // no lucide icon for TikTok, falls back to next/image
    label: "TIKTOK",
    value: "@sorrymomtatt00",
    href: "https://www.tiktok.com/@sorrymomtatt00?_r=1&_t=ZS-9A1PLRPNH2T",
  },
];

const INFO_STRIP: InfoStripItem[] = [
  {
    id: "location",
    icon: MapPin,
    title: "WE ARE HERE",
    lines: [
      "CAMLON SILKSCREEN PRINTING SERVICES",
      "960 Onyx Ln, Antipolo City,",
      "1870 Rizal, Philippines",
    ],
    href: "https://maps.app.goo.gl/jgwFcM7n8pnfUiKbA",
  },
  {
    id: "parking",
    icon: Car,
    title: "PARKING",
    lines: ["Street parking available", "near the shop."],
  },
];

export { DIRECT_CONTACTS, INFO_STRIP };
