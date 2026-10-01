import type { Metadata } from "next";
import Merch from "@/module/Merch/Merch";

export const metadata: Metadata = {
  title: "SMT Merch",
  description: "Hoodies, shirts, stickers, and art prints",
  alternates: { canonical: "/merch" },
  openGraph: { url: "/merch" },
};

function page() {
  return <Merch />;
}

export default page;
