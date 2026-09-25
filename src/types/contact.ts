import type { LucideIcon } from "lucide-react";

type ContactMethod = {
  id: string;
  label: string;
  value: string;
} & ({ icon: LucideIcon; image?: never } | { icon?: never; image: string });

export type { ContactMethod };
