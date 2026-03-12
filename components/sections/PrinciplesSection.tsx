"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { principles } from "@/lib/content";

export default function PrinciplesSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-void py-[110px]">
      <div className="mx-auto max-w-[1400px] px-8 md:px-12">
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
                className="text-crimson italic"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                principles
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
                    className="w-full text-left py-6 group flex items-center gap-6"
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
                      animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? "rgba(200,16,46,0.6)" : "rgba(242,237,228,0.3)" }}
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
                          className="pb-6 pl-12 text-warm-white/50 text-[19px] leading-relaxed"
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
