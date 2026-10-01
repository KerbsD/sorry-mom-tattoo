import type { Metadata } from "next";
import Portfolio from "@/module/Portfolio/Portfolio";

export const metadata: Metadata = {
  title: "SMT Portfolio",
  description: "Real healed and fresh work, with styles listed",
  alternates: { canonical: "/portfolio" },
  openGraph: { url: "/portfolio" },
};

function page() {
  return <Portfolio />;
}

export default page;
