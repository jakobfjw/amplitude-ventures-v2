"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whoWeWorkWith } from "@/lib/content";

export default function WhoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Watermark drifts up as user scrolls through the section
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={sectionRef} className="bg-void py-[110px] relative overflow-hidden">
      {/* Background text watermark — parallax depth */}
      <motion.div
        className="absolute top-0 right-0 leading-none pointer-events-none select-none opacity-[0.018]"
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(140px, 18vw, 280px)",
          color: "#F2EDE4",
          letterSpacing: "0.02em",
          y: watermarkY,
        }}
        aria-hidden
      >
        WHO
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Left column: heading — slides in from left */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              className="text-crimson text-[16px] font-[600] uppercase tracking-[0.3em] mb-6"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              Who we back
            </motion.p>

            <motion.h2
              className="text-warm-white leading-[0.92]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(64px, 8vw, 110px)",
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, x: -28, filter: "blur(16px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              THE<br />
              <span className="text-crimson italic" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                right
              </span>
              <br />
              FOUNDER
            </motion.h2>

            <motion.p
              className="mt-6 text-warm-white/40 text-[19px] leading-relaxed max-w-xs"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              We don&apos;t have a template. We look for pattern-breaking people at the earliest possible moment.
            </motion.p>
          </div>

          {/* Right column: cards — diagonal entrance from right */}
          <div className="flex flex-col gap-4">
            {whoWeWorkWith.map((item, i) => (
              <motion.div
                key={item.num}
                className="group relative rounded-2xl border border-white/[0.06] bg-surface-2 p-8 cursor-default overflow-hidden"
                style={{ transformPerspective: 800 }}
                initial={{ opacity: 0, y: 44, x: 24, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  rotateX: -2,
                  rotateY: 3,
                  y: -6,
                  scale: 1.01,
                  borderColor: "rgba(200,16,46,0.28)",
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(200,16,46,0.07), transparent)" }}
                />

                <div className="flex items-start justify-between gap-8 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span
                        className="text-crimson/45 group-hover:text-crimson/90 transition-colors duration-300 leading-none"
                        style={{
                          fontFamily: "var(--font-bebas)",
                          fontSize: "52px",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {item.num}
                      </span>
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/10 text-warm-white/30 text-[13px] font-[600] uppercase tracking-widest"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h3
                      className="text-warm-white text-[26px] font-[500] mb-3 tracking-[-0.01em] leading-snug"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-warm-white/45 text-[19px] leading-relaxed"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {item.body}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 mt-1">
                    <div className="w-9 h-9 rounded-full border border-crimson/50 bg-crimson/10 flex items-center justify-center text-crimson text-sm">
                      →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
