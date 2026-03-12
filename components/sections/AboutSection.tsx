"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { about } from "@/lib/content";

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
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(242,237,228,0.035) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Ghost watermark */}
        <div
          className="absolute -bottom-8 right-0 leading-none select-none pointer-events-none"
          aria-hidden
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(100px, 18vw, 240px)",
            color: "rgba(242,237,228,0.02)",
            letterSpacing: "0.02em",
          }}
        >
          AMPLITUDE
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
                  fontSize: "clamp(72px, 11vw, 160px)",
                  letterSpacing: "0.02em",
                  whiteSpace: "pre-line",
                }}
              >
                {about.headline}
              </h1>
              <h2
                className="text-crimson italic leading-none"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(40px, 7vw, 100px)",
                  fontWeight: 400,
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
                fontFamily: "var(--font-cormorant)",
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

      {/* ── Team ── */}
      <section className="bg-void py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-8 md:px-12">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, x: -28, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p
              className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em] mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              The Partners
            </p>
            <h2
              className="text-warm-white leading-[0.9]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(52px, 7vw, 96px)",
                letterSpacing: "0.02em",
              }}
            >
              Who{" "}
              <span
                className="text-crimson italic"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "0.9em" }}
              >
                backs
              </span>{" "}
              you.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.team.map((member, i) => (
              <motion.div
                key={member.name}
                className="group relative border border-white/[0.06] bg-surface-2 rounded-xl p-8 hover:border-crimson/20 transition-colors duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease }}
              >
                {/* Top hover glow */}
                <div
                  className="absolute inset-x-0 top-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(200,16,46,0.06), transparent)",
                  }}
                />

                {/* Number */}
                <div
                  className="text-crimson/20 leading-none mb-6 select-none"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(48px, 5vw, 72px)",
                    letterSpacing: "0.05em",
                  }}
                  aria-hidden
                >
                  0{i + 1}
                </div>

                <h3
                  className="text-warm-white mb-1 leading-tight"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(28px, 2.5vw, 38px)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {member.name}
                </h3>

                <p
                  className="text-crimson text-[13px] uppercase tracking-[0.18em] mb-5"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {member.role}
                </p>

                <p
                  className="text-warm-white/45 text-[15px] leading-relaxed mb-6"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {member.background}
                </p>

                <div className="pt-4 border-t border-white/[0.05]">
                  <p
                    className="text-warm-white/25 text-[12px] uppercase tracking-[0.15em]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {member.focus}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
