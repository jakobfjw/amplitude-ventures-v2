import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import BlogIndexSection from "@/components/sections/BlogIndexSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Perspectives on early-stage investing, operator lessons, and what it actually takes to build a company worth backing.",
};

export default function BlogPage() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <BlogIndexSection />
      <FooterCta />
      <Footer />
    </main>
  );
}
