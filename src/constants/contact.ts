import { Phone, Mail, MapPin, Car } from "lucide-react";
import type { ContactMethod } from "@/types/contact";

const DIRECT_CONTACTS: ContactMethod[] = [
  {
    id: "phone",
    icon: Phone,
    label: "PHONE",
    value: "0912 345 6789",
  },
  {
    id: "instagram",
    image: "/socials/instagram.svg",
    label: "INSTAGRAM",
    value: "@sorrymom.tattoo",
  },
  {
    id: "email",
    icon: Mail,
    label: "EMAIL",
    value: "sorrymomtattoo@gmail.com",
  },
  {
    id: "facebook",
    image: "/socials/facebook.svg",
    label: "FACEBOOK",
    value: "Sorry Mom Tattoo",
  },
  {
    id: "tiktok",
    image: "/socials/tiktok.svg", // no lucide icon for TikTok, falls back to next/image
    label: "TIKTOK",
    value: "@sorrymom.tattoo",
  },
];

const INFO_STRIP = [
  {
    id: "location",
    icon: MapPin,
    title: "WE ARE HERE",
    lines: [
      "Camlon Silkscreen Printing Services",
      "Marigman Road, Antipolo City,",
      "Rizal, Philippines",
    ],
  },
  {
    id: "parking",
    icon: Car,
    title: "PARKING",
    lines: ["Street parking available", "near the shop."],
  },
];

export { DIRECT_CONTACTS, INFO_STRIP };
