import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import PrivacySection from "@/components/sections/PrivacySection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Amplitude Ventures collects, uses, and protects your data. GDPR-compliant privacy policy covering analytics, cookies, and contact form submissions.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <PrivacySection />
      <Footer />
    </main>
  );
}
