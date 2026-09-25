import type { LucideIcon } from "lucide-react";

type ContactMethod = {
  id: string;
  label: string;
  value: string;
  href: string;
} & ({ icon: LucideIcon; image?: never } | { icon?: never; image: string });

interface InfoStripItem {
  id: string;
  icon: LucideIcon;
  title: string;
  lines: string[];
  href?: string;
}

export type { ContactMethod, InfoStripItem };
