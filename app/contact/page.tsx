import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ContactSection from "@/components/sections/ContactSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "If you're building something worth backing, we want to hear it. Get in touch with Amplitude Ventures.",
};

export default function ContactPage() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <ContactSection />
      <FooterCta />
      <Footer />
    </main>
  );
}
