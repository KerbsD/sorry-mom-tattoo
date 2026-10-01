import type { Metadata } from "next";
import Design from "@/module/Design/Design";

export const metadata: Metadata = {
  title: "Designs for Sale",
  description:
    "Original flash tattoo designs by Sorry Mom Tattoo in Antipolo. Browse minimalist, black & grey and illustrative pieces ready to ink.",
  alternates: { canonical: "/design" },
  openGraph: { url: "/design" },
};

function page() {
  return <Design />;
}

export default page;
