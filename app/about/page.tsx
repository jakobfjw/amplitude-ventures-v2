import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About — Amplitude Ventures",
  description:
    "We built companies. Now we back them. Three operators turned investors — backing extraordinary founders at the earliest stage.",
};

export default function AboutPage() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <AboutSection />
      <FooterCta />
      <Footer />
    </main>
  );
}
