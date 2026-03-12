import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PortfolioSection from "@/components/sections/PortfolioSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Portfolio — Amplitude Ventures",
  description:
    "32+ companies backed at pre-seed across Scandinavia and Northern Europe. From day-zero ideas to Series A.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <PortfolioSection />
      <FooterCta />
      <Footer />
    </main>
  );
}
