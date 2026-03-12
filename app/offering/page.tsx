import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import OfferingSection from "@/components/sections/OfferingSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Offering — Amplitude Ventures",
  description:
    "Capital, operator support, and investor readiness. Three ways we accelerate early-stage companies from first cheque to Series A.",
};

export default function OfferingPage() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <OfferingSection />
      <FooterCta />
      <Footer />
    </main>
  );
}
