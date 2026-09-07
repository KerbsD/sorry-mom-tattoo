import {
  Poppins,
  Anton,
  JetBrains_Mono,
} from "next/font/google";

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const anton = Anton({
  variable: "--font-anton",
  weight: ["400"],
  subsets: ["latin"],
});

export const jetbrainsmono = JetBrains_Mono({
  variable: "--font-jetbrainsmono",
  weight: ["400", "600"],
  subsets: ["latin"],
});
