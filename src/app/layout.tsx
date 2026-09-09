import "lenis/dist/lenis.css";
import type { Metadata } from "next";
import LenisProvider from "@/components/Interactions/Lenis/LenisProvider";
import "./globals.css";
import Layout from "@/module/Layout/Layout";
import { poppins } from "@/utils/Fonts";

export const metadata: Metadata = {
  title: "Sorry Mom Tattoo",
  description: "A Solo Artist from Antipolo City",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <LenisProvider>
          <Layout>{children}</Layout>
        </LenisProvider>
      </body>
    </html>
  );
}
