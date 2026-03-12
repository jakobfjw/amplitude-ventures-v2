import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TickerSection from "@/components/sections/TickerSection";
import WhoSection from "@/components/sections/WhoSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PrinciplesSection from "@/components/sections/PrinciplesSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <HeroSection />
      <TickerSection />
      <WhoSection />
      <ServicesSection />
      <PrinciplesSection />
      <StatsSection />
      <TestimonialsSection />
      <BlogSection />
      <FooterCta />
      <Footer />
    </main>
  );
}
