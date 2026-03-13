"use client";

import { motion } from "framer-motion";
import { privacy } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PrivacySection() {
  return (
    <section className="relative bg-void min-h-[calc(100vh-80px)] pt-[120px] pb-24">
      <div className="relative z-10 mx-auto max-w-[800px] px-8 md:px-12">
        {/* Eyebrow */}
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
            Legal
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-warm-white leading-[0.88] mb-4"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(52px, 8vw, 96px)",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0, x: -28, filter: "blur(20px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.9, ease }}
        >
          {privacy.headline}
        </motion.h1>

        <motion.p
          className="text-warm-white/30 text-[14px] mb-16"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Last updated: {privacy.lastUpdated}
        </motion.p>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {privacy.sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease }}
            >
              <h2
                className="text-warm-white text-[22px] font-[500] mb-3"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {section.title}
              </h2>
              <p
                className="text-warm-white/50 text-[16px] leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
