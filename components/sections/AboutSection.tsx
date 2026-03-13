"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { about } from "@/lib/content";
import LogoMark from "@/components/ui/logo-mark";
import { MiniOrbital, FloatingNodes, DashedArc } from "@/components/ui/ambient-orbitals";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  const pullRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pullScroll } = useScroll({
    target: pullRef,
    offset: ["start end", "end start"],
  });
  const pullY = useTransform(pullScroll, [0, 1], ["0%", "-12%"]);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-void pt-[120px] pb-20 overflow-hidden">
        {/* Dot grid — desktop only */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(var(--warm-white-rgb),0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Ghost watermark */}
        <div
          className="absolute -bottom-8 right-0 leading-none select-none pointer-events-none"
          aria-hidden
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(72px, 12vw, 160px)",
            color: "rgba(var(--warm-white-rgb),0.04)",
            letterSpacing: "0.02em",
          }}
        >
          AMPLITUDE
        </div>

        {/* Crimson radial glow — left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 40% 50% at 10% 50%, rgba(var(--crimson-rgb),0.06) 0%, transparent 70%)",
          }}
        />

        {/* LogoMark — top-right, ghosted */}
        <div className="absolute top-12 right-[-40px] hidden lg:block pointer-events-none select-none" aria-hidden>
          <LogoMark
            className="w-[260px] h-auto opacity-[0.07]"
            pillarColor="rgba(var(--warm-white-rgb),0.05)"
            archColor="rgba(var(--crimson-rgb),0.05)"
            strokeWidth={4}
            style={{ transform: "rotate(12deg)" }}
          />
        </div>

        {/* MiniOrbital — mid-right */}
        <div className="absolute top-[45%] right-[5%] hidden lg:block w-[220px] h-[220px]">
          <MiniOrbital size={220} rings={2} tilt={-14} speed={70} ringColor="rgba(var(--crimson-rgb),0.1)" nodeColor="rgba(var(--crimson-rgb),0.45)" dotColor="rgba(var(--warm-white-rgb),0.18)" />
        </div>

        {/* FloatingNodes — bottom-left */}
        <div className="absolute bottom-16 left-[8%] hidden md:block w-[60px] h-[50px]">
          <FloatingNodes bobSpeed={11} bobAmount={6} />
        </div>

        {/* DashedArc — top area */}
        <div className="absolute top-8 left-[20%] hidden lg:block w-[200px] h-[100px]">
          <DashedArc width={200} height={100} color="rgba(var(--crimson-rgb),0.1)" dashArray="4 12" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-12">
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-8 h-px bg-crimson" />
            <span
              className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {about.eyebrow}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-end">
            <motion.div
              initial={{ opacity: 0, x: -28, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
            >
              <h1
                className="text-warm-white leading-[0.86] mb-4"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(52px, 8vw, 120px)",
                  letterSpacing: "0.02em",
                  whiteSpace: "pre-line",
                }}
              >
                {about.headline}
              </h1>
              <h2
                className="text-crimson leading-none uppercase"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(40px, 7vw, 100px)",
                  letterSpacing: "0.02em",
                }}
              >
                {about.subheadline}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease }}
              className="lg:pb-4"
            >
              <div className="flex flex-col gap-5">
                {about.story.map((para, i) => (
                  <p
                    key={i}
                    className="text-warm-white/50 text-[18px] leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pull quote ── */}
      <section
        ref={pullRef}
        className="relative bg-surface py-24 md:py-32 overflow-hidden"
      >
        {/* Crimson line accent */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-crimson/15" />

        <motion.div
          className="mx-auto max-w-[1400px] px-8 md:px-12"
          style={{ y: pullY }}
        >
          <motion.blockquote
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <p
              className="text-warm-white/80 italic leading-[1.25] mb-8 max-w-[900px]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 400,
              }}
            >
              &ldquo;{about.pullQuote}&rdquo;
            </p>
            <footer className="flex items-center gap-4">
              <span className="w-8 h-px bg-crimson/50" />
              <cite
                className="not-italic text-warm-white/35 text-[14px] uppercase tracking-[0.2em]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {about.pullQuoteAuthor}
              </cite>
            </footer>
          </motion.blockquote>
        </motion.div>
      </section>

    </div>
  );
}
