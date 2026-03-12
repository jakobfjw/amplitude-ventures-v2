"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { hero, stats } from "@/lib/content";
import { HeroVisual } from "@/components/ui/hero-visual";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-void flex flex-col justify-center overflow-hidden">
      {/* Fine dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(242,237,228,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 40% 45%, transparent 40%, #080808 95%)",
        }}
      />

      {/* Crimson glow behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 32% 48%, rgba(200,16,46,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Abstract orbital visual — full bleed, desktop only, masked with radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-end pr-0"
        style={{
          maskImage: "radial-gradient(ellipse 55% 70% at 75% 50%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 55% 70% at 75% 50%, black 20%, transparent 75%)",
        }}
      >
        <HeroVisual className="w-[52%] h-full max-w-[640px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-12 pt-32 pb-24">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span className="w-8 h-px bg-crimson" />
          <span
            className="text-crimson text-[16px] font-[600] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {hero.eyebrow}
          </span>
        </motion.div>

        {/* ── The typographic collision ── */}
        <div className="relative overflow-hidden">
          {/* Line 1: WE BACK — Bebas, massive */}
          <motion.div
            initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-warm-white leading-[0.9] tracking-[0.02em] select-none"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(70px, 15vw, 210px)",
              }}
            >
              {hero.lineOne}
            </h1>
          </motion.div>

          {/* Line 2: Extraordinary — Cormorant Italic, crimson, overlapping */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative -mt-1 md:-mt-4"
          >
            <h1
              className="text-crimson italic leading-[0.85] select-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(37px, 12vw, 175px)",
                fontWeight: 400,
              }}
            >
              {hero.lineTwo}
            </h1>
          </motion.div>

          {/* Line 3: FOUNDERS. — Bebas, outlined */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.72, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative -mt-1 md:-mt-4"
          >
            <h1
              className="leading-[0.9] tracking-[0.02em] select-none"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(70px, 15vw, 210px)",
                WebkitTextStroke: "1.5px rgba(242,237,228,0.4)",
                color: "transparent",
              }}
            >
              {hero.lineThree}
            </h1>
          </motion.div>
        </div>

        {/* Sub copy + CTA */}
        <motion.div
          className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.95, duration: 0.7 }}
        >
          <p
            className="text-warm-white/50 text-[20px] leading-relaxed max-w-sm border-l-2 border-crimson/35 pl-5"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {hero.sub}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white rounded-full text-[17px] font-[500] hover:bg-[#a80d25] transition-colors duration-200 tracking-wide whitespace-nowrap"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Start a conversation
              <span aria-hidden className="text-[17px]">→</span>
            </Link>
            <Link
              href="/portfolio"
              className="text-warm-white/40 text-[17px] hover:text-warm-white transition-colors whitespace-nowrap"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              See our portfolio
            </Link>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mt-20 pt-8 border-t border-white/[0.06] grid grid-cols-3 gap-8 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="text-warm-white leading-none mb-1"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(40px, 5vw, 58px)",
                  letterSpacing: "0.02em",
                }}
              >
                {s.number}
                <span className="text-crimson">{s.suffix}</span>
              </div>
              <p
                className="text-warm-white/40 text-[16px] leading-snug"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator — rotating arc label */}
      <motion.div
        className="absolute bottom-8 right-10 hidden lg:flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity }}
          className="relative w-[72px] h-[72px]"
        >
          <svg viewBox="0 0 72 72" className="w-full h-full" aria-hidden>
            <defs>
              <path id="scroll-arc" d="M 36,36 m -26,0 a 26,26 0 1,1 52,0 a 26,26 0 1,1 -52,0" />
            </defs>
            <text
              fill="rgba(242,237,228,0.28)"
              fontSize="7.5"
              letterSpacing="3.5"
              fontFamily="var(--font-dm-sans)"
              fontWeight="600"
            >
              <textPath href="#scroll-arc">SCROLL · SCROLL ·&nbsp;</textPath>
            </text>
          </svg>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-crimson"
              animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
