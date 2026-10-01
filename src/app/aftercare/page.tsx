import type { Metadata } from "next";
import Aftercare from "@/module/Aftercare/Aftercare";

export const metadata: Metadata = {
  title: "SMT Aftercare Guide",
  description: "Step-by-step healing guide, the 2-3 week do's and don'ts",
  alternates: { canonical: "/aftercare" },
  openGraph: { url: "/aftercare" },
};

function page() {
  return <Aftercare />;
}

export default page;
