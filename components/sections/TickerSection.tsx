"use client";

import { motion } from "framer-motion";
import { ticker } from "@/lib/content";
import { PulseNode, DashedArc } from "@/components/ui/ambient-orbitals";

export default function TickerSection() {
  return (
    <motion.div
      className="relative bg-surface border-y border-white/[0.05] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient decorations */}
      <PulseNode
        size={36}
        color="rgba(var(--crimson-rgb),0.12)"
        coreColor="rgba(var(--crimson-rgb),0.3)"
        pulseSpeed={4}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-9 h-9 hidden lg:block"
      />
      <DashedArc
        width={140}
        height={80}
        color="rgba(var(--crimson-rgb),0.06)"
        dashArray="2 8"
        className="absolute -top-2 -left-4 w-[140px] h-[80px] hidden lg:block"
      />

      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgb(var(--surface-rgb)), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgb(var(--surface-rgb)), transparent)" }}
      />

      {/* Row 1 — left to right */}
      <div className="py-3 border-b border-white/[0.03]">
        <div className="ticker-track flex whitespace-nowrap w-max">
          {[...ticker, ...ticker].map((name, i) => (
            <div key={i} className="flex items-center">
              <span
                className="text-[13px] md:text-[11px] font-[600] uppercase tracking-[0.18em] md:tracking-[0.22em] text-warm-white/35 md:text-warm-white/30 px-4 md:px-6 transition-colors duration-300 hover:text-warm-white/60"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {name}
              </span>
              <span
                className="text-crimson/50 text-[6px] md:text-[8px] flex-shrink-0"
                aria-hidden
              >
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — right to left (reverse) */}
      <div className="py-3">
        <div className="ticker-track-reverse flex whitespace-nowrap w-max">
          {[...ticker.slice().reverse(), ...ticker.slice().reverse()].map((name, i) => (
            <div key={i} className="flex items-center">
              <span
                className="text-[11px] md:text-[10px] font-[500] uppercase tracking-[0.22em] md:tracking-[0.3em] text-warm-white/20 md:text-warm-white/15 px-4 md:px-6"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {name}
              </span>
              <span
                className="text-crimson/25 text-[5px] md:text-[7px] flex-shrink-0"
                aria-hidden
              >
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
