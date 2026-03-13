"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { principles } from "@/lib/content";
import LogoMark from "@/components/ui/logo-mark";
import { FloatingNodes, DashedArc, PulseNode } from "@/components/ui/ambient-orbitals";

export default function PrinciplesSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-void py-16 md:py-[110px] relative overflow-hidden">
      {/* Ambient decorations */}
      <FloatingNodes
        bobSpeed={11}
        bobAmount={6}
        className="absolute top-20 right-[8%] w-[60px] h-[50px] opacity-[0.5] hidden lg:block"
      />
      <DashedArc
        width={180}
        height={100}
        color="rgba(var(--crimson-rgb),0.1)"
        dashArray="3 12"
        flip
        className="absolute bottom-12 left-[2%] w-[180px] h-[100px] hidden lg:block"
      />
      <PulseNode
        size={42}
        color="rgba(var(--crimson-rgb),0.18)"
        coreColor="rgba(var(--crimson-rgb),0.4)"
        pulseSpeed={3.8}
        className="absolute top-1/2 right-[3%] -translate-y-1/2 w-[42px] h-[42px] hidden lg:block"
      />

      {/* Mobile: crimson atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 30% 50%, rgba(var(--crimson-rgb),0.08) 0%, transparent 60%)",
        }}
      />
      {/* Fine dot grid — desktop only */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(var(--warm-white-rgb),0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Logo mark — large, ghosted, bottom-left */}
      <div className="absolute -left-12 bottom-0 pointer-events-none select-none" aria-hidden>
        <LogoMark
          className="w-[clamp(180px,22vw,340px)] h-auto opacity-[0.6]"
          pillarColor="rgba(var(--warm-white-rgb),0.04)"
          archColor="rgba(var(--crimson-rgb),0.05)"
          strokeWidth={5}
          animate
        />
      </div>
      {/* Subtle crimson glow behind heading area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at 20% 30%, rgba(var(--crimson-rgb),0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-32">
          {/* Left: header — slides in from left */}
          <div>
            <motion.p
              className="text-crimson text-[16px] font-[600] uppercase tracking-[0.3em] mb-6"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              How we think
            </motion.p>
            <motion.h2
              className="text-warm-white leading-[0.92]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(64px, 7vw, 96px)",
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, x: -28, filter: "blur(16px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              OUR<br />
              <span
                className="text-crimson"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                PRINCIPLES
              </span>
            </motion.h2>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col">
            {principles.map((p, i) => {
              const isOpen = openIdx === i;
              return (
                <motion.div
                  key={p.num}
                  className="border-b border-white/[0.07]"
                  // Alternate entrance direction for visual interest
                  initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    className="w-full text-left py-5 md:py-6 group flex items-center gap-4 md:gap-6"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                  >
                    <motion.span
                      className="flex-shrink-0 leading-none text-crimson"
                      animate={{
                        opacity: isOpen ? 1 : 0.25,
                        fontSize: isOpen ? "38px" : "24px",
                        x: isOpen ? 4 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        fontFamily: "var(--font-bebas)",
                        letterSpacing: "0.06em",
                        display: "inline-block",
                      }}
                    >
                      {p.num}
                    </motion.span>
                    <span
                      className={`flex-1 font-[400] tracking-[-0.01em] transition-colors duration-200 ${
                        isOpen ? "text-warm-white" : "text-warm-white/70 group-hover:text-warm-white"
                      }`}
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "clamp(20px, 2.3vw, 26px)",
                      }}
                    >
                      {p.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? "rgba(var(--crimson-rgb),0.6)" : "rgba(var(--warm-white-rgb),0.3)" }}
                      transition={{ duration: 0.25 }}
                      className="text-xl flex-shrink-0"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, filter: "blur(8px)" }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                        exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-6 pl-8 md:pl-12 text-warm-white/50 text-[16px] md:text-[19px] leading-relaxed"
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                        >
                          {p.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
