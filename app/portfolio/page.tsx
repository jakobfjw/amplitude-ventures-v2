import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PortfolioSection from "@/components/sections/PortfolioSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Portfolio — Amplitude Ventures",
  description:
    "40+ ventures supported across music tech, SaaS, and deep tech. Meet the companies Amplitude Ventures has co-built and backed from first idea through traction.",
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
