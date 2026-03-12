"use client";

import { motion } from "framer-motion";
import { ticker } from "@/lib/content";

export default function TickerSection() {
  return (
    <motion.div
      className="relative bg-surface border-y border-white/[0.05] py-4 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0f0f0f, transparent)" }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0f0f0f, transparent)" }}
      />

      <div className="ticker-track flex gap-0 whitespace-nowrap w-max">
        {[...ticker, ...ticker].map((name, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-6"
          >
            <span
              className="text-[11px] font-[600] uppercase tracking-[0.25em] text-warm-white/25"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {name}
            </span>
            <span className="w-1 h-1 rounded-full bg-crimson/40 flex-shrink-0" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
