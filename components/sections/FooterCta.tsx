"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { footerCta } from "@/lib/content";
import { ShimmerText } from "@/components/ui/shimmer-text";
import LogoMark from "@/components/ui/logo-mark";
import { MiniOrbital, FloatingNodes, ScatterField } from "@/components/ui/ambient-orbitals";

export default function FooterCta() {
  return (
    <section className="bg-crimson py-16 md:py-[120px] relative overflow-hidden">
      {/* Dot grid — desktop only */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Logo mark — large, deconstructed, rotated, bottom-right */}
      <div
        className="absolute -right-16 -bottom-24 pointer-events-none select-none hidden md:block"
        style={{ transform: "rotate(-12deg)" }}
        aria-hidden
      >
        <LogoMark
          className="w-[380px] h-auto"
          pillarColor="rgba(255,255,255,0.06)"
          archColor="rgba(255,255,255,0.08)"
          strokeWidth={5}
        />
      </div>
      {/* Logo mark — small, top-left accent */}
      <div
        className="absolute -left-8 -top-12 pointer-events-none select-none hidden lg:block"
        style={{ transform: "rotate(15deg)" }}
        aria-hidden
      >
        <LogoMark
          className="w-[160px] h-auto"
          pillarColor="rgba(255,255,255,0.04)"
          archColor="rgba(255,255,255,0.05)"
          strokeWidth={3}
        />
      </div>
      {/* Mobile: subtle radial warmth replacing hidden dot grid */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />
      {/* Dark vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      {/* Ambient decorations — white-toned for crimson bg */}
      <div className="absolute top-12 left-12 w-[120px] h-[120px] hidden lg:block opacity-[0.35]" aria-hidden>
        <MiniOrbital size={120} rings={2} tilt={-30} speed={70} nodeColor="rgba(255,255,255,0.5)" ringColor="rgba(255,255,255,0.08)" dotColor="rgba(255,255,255,0.15)" />
      </div>
      <div className="absolute bottom-10 left-[15%] w-[60px] h-[50px] hidden lg:block" aria-hidden>
        <FloatingNodes bobSpeed={10} bobAmount={7} />
      </div>
      <div className="absolute inset-0 hidden md:block opacity-[0.3] pointer-events-none" aria-hidden>
        <ScatterField count={14} width={1400} height={600} dotColor="rgba(255,255,255,0.04)" accentColor="rgba(255,255,255,0.08)" accentCount={3} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 text-center">
        {/* Split entrance: "READY TO" from left, "build?" from right */}
        <h2
          className="text-white leading-[0.88] mb-6"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(56px, 10.5vw, 170px)",
            letterSpacing: "0.02em",
          }}
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -52, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {footerCta.line1}
          </motion.span>
          <motion.span
            className="block italic"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            initial={{ opacity: 0, x: 52, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <ShimmerText duration={2.4} delay={1.8} className="text-white">
              {footerCta.line2}
            </ShimmerText>
          </motion.span>
        </h2>

        <motion.p
          className="text-white/70 text-[17px] md:text-[20px] leading-relaxed mb-8 md:mb-10 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.28, duration: 0.6 }}
        >
          {footerCta.sub}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.42, duration: 0.6 }}
        >
          <Link
            href="/contact"
            className="cta-pulse inline-flex items-center gap-2 px-9 py-[18px] bg-white text-[#080808] rounded-full text-[18px] font-[500] hover:bg-warm-white transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {footerCta.ctaLabel}
            <span aria-hidden>→</span>
          </Link>
          <p
            className="text-white/40 text-[17px]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {footerCta.ctaSub}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
