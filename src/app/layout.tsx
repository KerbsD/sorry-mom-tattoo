import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import { poppins } from "@/utils/fonts";
import Layout from "@/module/Layout/Layout";
import LenisProvider from "@/utils/Interactions/Lenis/LenisProvider";
import CursorTrail from "@/utils/Interactions/CursorTrail";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Sorry Mom Tattoo",
  description: "A Solo Artist from Antipolo City",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} cursor-crosshair scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        <CursorTrail />
        <CartProvider>
          <LenisProvider>
            <Layout>{children}</Layout>
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
