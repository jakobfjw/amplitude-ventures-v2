import type { Metadata } from "next";
import { Bebas_Neue, Cormorant, DM_Sans } from "next/font/google";
import "./globals.css";
import { Spotlight } from "@/components/ui/spotlight";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Amplitude Ventures — From Idea to Investor Ready",
  description:
    "We back extraordinary founders at the earliest stage. Capital, conviction, and the operator experience to match.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${cormorant.variable} ${dmSans.variable} antialiased`}
      >
        <Spotlight size={700} />
        {children}
      </body>
    </html>
  );
}
