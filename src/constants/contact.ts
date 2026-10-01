import { Phone, Mail, MapPin, Car } from "lucide-react";
import type { ContactMethod, InfoStripItem } from "@/types/contact";
import { siteConfig } from "./site";

const DIRECT_CONTACTS: ContactMethod[] = [
  {
    id: "phone",
    icon: Phone,
    label: "PHONE",
    value: "0929 825 7646",
    href: `tel:${siteConfig.phone}`,
  },
  {
    id: "instagram",
    image: "/socials/instagram.svg",
    label: "INSTAGRAM",
    value: "@sorrymomtatt00",
    href: `${siteConfig.socials.instagram}`,
  },
  {
    id: "email",
    icon: Mail,
    label: "EMAIL",
    value: "sorrymomtatt00@gmail.com",
    href: `mailto:${siteConfig.email}`,
  },
  {
    id: "facebook",
    image: "/socials/facebook.svg",
    label: "FACEBOOK",
    value: "Sorry Mom Tattoo",
    href: `${siteConfig.socials.facebook}`,
  },
  {
    id: "tiktok",
    image: "/socials/tiktok.svg",
    label: "TIKTOK",
    value: "@sorrymomtatt00",
    href: `${siteConfig.socials.tiktok}`,
  },
];

const INFO_STRIP: InfoStripItem[] = [
  {
    id: "location",
    icon: MapPin,
    title: "WE ARE HERE",
    lines: [
      `${siteConfig.address.name},`,
      `${siteConfig.address.street}, ${siteConfig.address.locality},`,
      `${siteConfig.address.postalCode} ${siteConfig.address.region}, ${siteConfig.address.country}`,
    ],
    href: `${siteConfig.address.link}`,
  },
  {
    id: "parking",
    icon: Car,
    title: "PARKING",
    lines: ["Street parking available", "near the shop."],
  },
];

export { DIRECT_CONTACTS, INFO_STRIP };
