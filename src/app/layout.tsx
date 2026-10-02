import type { Metadata, Viewport } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import Layout from "@/module/Layout/Layout";
import LenisProvider from "@/utils/Interactions/Lenis/LenisProvider";
import CursorTrail from "@/utils/Interactions/CursorTrail";
import { poppins } from "@/utils/fonts";
import { CartProvider } from "@/context/CartContext";
import { siteConfig } from "@/constants/site";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sorry Mom Tattoo | Tattoo Studio in Antipolo City, Rizal",
    template: "%s | Sorry Mom Tattoo",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_PH",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#161616",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} cursor-crosshair scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-screen flex-col">
        <Analytics />
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
