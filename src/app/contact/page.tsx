import type { Metadata } from "next";
import Contact from "@/module/Contact/Contact";

export const metadata: Metadata = {
  title: "Contact & Studio Location",
  description: "Address, phone, hours, and how to book",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

function page() {
  return <Contact />;
}

export default page;
