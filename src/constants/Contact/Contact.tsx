import {
  Phone,
  Mail,
  MapPin,
  Car,
  type LucideIcon,
} from "lucide-react";

type ContactMethod = {
  id: string;
  label: string;
  value: string;
} & (
  | { icon: LucideIcon; image?: never }
  | { icon?: never; image: string }
);

export const directContacts: ContactMethod[] = [
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

export const infoStrip = [
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


