"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FooterCta() {
  return (
    <section className="bg-crimson py-[120px] relative overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
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

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-12 text-center">
        {/* Split entrance: "READY TO" from left, "build?" from right */}
        <h2
          className="text-white leading-[0.88] mb-6"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(76px, 10.5vw, 170px)",
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
            READY TO
          </motion.span>
          <motion.span
            className="block italic"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            initial={{ opacity: 0, x: 52, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            build?
          </motion.span>
        </h2>

        <motion.p
          className="text-white/70 text-[20px] leading-relaxed mb-10 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.28, duration: 0.6 }}
        >
          No deck required. Just a conversation about what you&apos;re building and why it matters.
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
            className="inline-flex items-center gap-2 px-9 py-[18px] bg-white text-[#080808] rounded-full text-[18px] font-[500] hover:bg-warm-white transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Start a conversation
            <span aria-hidden>→</span>
          </Link>
          <p
            className="text-white/40 text-[17px]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            No commitment. One conversation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
