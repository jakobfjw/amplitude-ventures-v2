import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About — Amplitude Ventures",
  description:
    "Amplitude Ventures is a venture studio based in Stavanger, Norway. We partner with founders as early-stage co-builders — from first idea through product, traction, and the raise.",
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
