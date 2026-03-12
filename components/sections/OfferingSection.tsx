"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const DETAILS: Record<string, { stat: string; statLabel: string; detail: string }> = {
  capital: {
    stat: "6–20 wks",
    statLabel: "Typical delivery",
    detail: "From first brief to production-ready product. Web, mobile, and AI across any stack.",
  },
  build: {
    stat: "Weeks",
    statLabel: "Not months",
    detail: "Market sizing, competitor mapping, and go/no-go analysis before you write a line of code.",
  },
  raise: {
    stat: "100+",
    statLabel: "Investors contacted per raise",
    detail: "10–40% response rates on outreach. Pitch decks and data rooms that close rounds.",
  },
};

export default function OfferingSection() {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pillarsRef,
    offset: ["start end", "end start"],
  });
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["-8%", "4%"]);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-void pt-[120px] pb-20 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(242,237,228,0.04) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Ghost watermark */}
        <div
          className="absolute -bottom-4 right-0 leading-none select-none pointer-events-none"
          aria-hidden
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(120px, 20vw, 280px)",
            color: "rgba(242,237,228,0.018)",
            letterSpacing: "0.02em",
          }}
        >
          OFFERING
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
              What we do
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-end">
            <motion.div
              initial={{ opacity: 0, x: -28, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
            >
              <h1
                className="text-warm-white leading-[0.88] mb-3"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(64px, 11vw, 160px)",
                  letterSpacing: "0.02em",
                }}
              >
                Build.
              </h1>
              <h1
                className="text-crimson italic leading-[0.88]"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(52px, 9vw, 130px)",
                  fontWeight: 400,
                }}
              >
                Validate. Raise.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease }}
              className="lg:pb-4"
            >
              <p
                className="text-warm-white/50 text-[20px] leading-relaxed border-l-2 border-crimson/25 pl-5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Three ways we work with early-stage companies — from idea through product, traction, and the raise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section ref={pillarsRef} className="relative bg-void overflow-hidden">
        {/* Floating watermark */}
        <motion.div
          className="absolute top-1/3 left-0 leading-none select-none pointer-events-none"
          aria-hidden
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(200px, 30vw, 460px)",
            color: "rgba(242,237,228,0.012)",
            letterSpacing: "0.04em",
            x: watermarkX,
          }}
        >
          AV
        </motion.div>

        {services.map((svc, i) => {
          const meta = DETAILS[svc.id];
          const isEven = i % 2 === 0;

          return (
            <motion.div
              key={svc.id}
              id={svc.id}
              className={`relative border-t border-white/[0.06] ${
                i === services.length - 1 ? "border-b" : ""
              }`}
              initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="mx-auto max-w-[1400px] px-8 md:px-12 py-20 md:py-28">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-8 lg:gap-16 items-start ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Number */}
                  <div
                    className="text-crimson/15 leading-none select-none"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(64px, 8vw, 120px)",
                      letterSpacing: "0.02em",
                    }}
                    aria-hidden
                  >
                    0{i + 1}
                  </div>

                  {/* Title + headline */}
                  <div className={isEven ? "" : "lg:col-start-2"}>
                    <p
                      className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em] mb-4"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {svc.title}
                    </p>
                    <h2
                      className="text-warm-white leading-[0.9] mb-6"
                      style={{
                        fontFamily: "var(--font-bebas)",
                        fontSize: "clamp(40px, 5vw, 72px)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {svc.headline}
                    </h2>
                    <p
                      className="text-warm-white/55 text-[18px] leading-relaxed"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {svc.body}
                    </p>
                  </div>

                  {/* Detail + stat */}
                  <div
                    className={`flex flex-col gap-6 ${
                      isEven ? "" : "lg:col-start-3"
                    }`}
                  >
                    <div className="border-l-2 border-crimson/20 pl-5">
                      <p
                        className="text-warm-white/35 text-[15px] leading-relaxed italic"
                        style={{ fontFamily: "var(--font-cormorant)", fontSize: "20px" }}
                      >
                        {meta.detail}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-white/[0.05]">
                      <div
                        className="text-warm-white leading-none mb-1"
                        style={{
                          fontFamily: "var(--font-bebas)",
                          fontSize: "clamp(36px, 4vw, 56px)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        <span className="text-crimson">{meta.stat}</span>
                      </div>
                      <p
                        className="text-warm-white/30 text-[13px] uppercase tracking-[0.2em]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {meta.statLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* ── Process ── */}
      <section className="relative bg-surface py-24 md:py-36 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-crimson/10" />

        <div className="mx-auto max-w-[1400px] px-8 md:px-12">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -28, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
          >
            <p
              className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em] mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              How it works
            </p>
            <h2
              className="text-warm-white leading-[0.9]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 6vw, 88px)",
                letterSpacing: "0.02em",
              }}
            >
              From first{" "}
              <span
                className="text-crimson italic"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                conversation
              </span>{" "}
              to backed.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { step: "01", title: "Validate", body: "Pressure-test the idea before writing code. Market sizing, competitor mapping, feasibility — clear go/no-go in weeks." },
              { step: "02", title: "Build", body: "Ship a product at a cost that makes sense. MVPs, AI agents, full platforms — from brief to live in 6–20 weeks." },
              { step: "03", title: "Commercialize", body: "Find pricing, positioning, and first revenue. Sales pipeline, ICP definition, multi-channel outreach." },
              { step: "04", title: "Shape the story", body: "Pitch decks, data rooms, and investor targeting. We build the fundraising narrative that gets responses." },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                className="relative pl-8 md:pl-0 md:pt-8 md:border-l md:first:border-l-0 border-t md:border-t-0 first:border-t-0 border-white/[0.06]"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease }}
              >
                {/* Step indicator */}
                <div className="absolute left-0 top-0 md:top-8 md:left-[-1px] translate-x-[-50%] w-px md:w-auto">
                  <div className="hidden md:block w-2 h-2 rounded-full bg-crimson/40 -translate-x-[3px]" />
                </div>

                <div className="md:px-8 pb-10 md:pb-0">
                  <div
                    className="text-crimson/25 leading-none mb-4 select-none"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(36px, 4vw, 56px)",
                      letterSpacing: "0.05em",
                    }}
                    aria-hidden
                  >
                    {step.step}
                  </div>
                  <h3
                    className="text-warm-white mb-3"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(22px, 2vw, 30px)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-warm-white/40 text-[15px] leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-void py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-[1400px] px-8 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
          initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <div>
            <p
              className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em] mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Ready to start?
            </p>
            <h2
              className="text-warm-white leading-[0.9]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(52px, 7vw, 96px)",
                letterSpacing: "0.02em",
              }}
            >
              Two paragraphs.{" "}
              <span
                className="text-crimson italic"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "0.9em" }}
              >
                That&apos;s all it takes.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 items-start md:items-end flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white rounded-full text-[17px] font-[500] hover:bg-[#a80d25] transition-colors duration-200 tracking-wide whitespace-nowrap"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Send us a brief →
            </Link>
            <p
              className="text-warm-white/25 text-[14px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Average response: 48 hours
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
