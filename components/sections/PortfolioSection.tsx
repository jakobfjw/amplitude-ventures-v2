"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioCompanies } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const TYPES = ["All", "Companies", "Projects", "Clients"] as const;
type PortfolioType = (typeof TYPES)[number];

const STAGE_COLORS: Record<string, string> = {
  Growth: "bg-crimson/15 text-crimson",
  Seed: "bg-warm-white/[0.07] text-warm-white/55",
  "Pre-seed": "bg-warm-white/[0.04] text-warm-white/35",
};

const TYPE_MAP: Record<PortfolioType, string | null> = {
  All: null,
  Companies: "Company",
  Projects: "Project",
  Clients: "Client",
};

export default function PortfolioSection() {
  const [activeStage, setActiveStage] = useState<PortfolioType>("All");

  const filtered =
    activeStage === "All"
      ? portfolioCompanies
      : portfolioCompanies.filter((c) => c.type === TYPE_MAP[activeStage]);

  return (
    <section className="relative bg-void min-h-[calc(100vh-80px)] pt-[120px] pb-24 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(242,237,228,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-12">
        {/* ── Header ── */}
        <div className="mb-16">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-8 h-px bg-crimson" />
            <span
              className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Portfolio
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h1
              className="text-warm-white leading-[0.88]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(64px, 9vw, 128px)",
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, x: -28, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
            >
              We{" "}
              <span
                className="text-crimson italic"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 400,
                  fontSize: "0.82em",
                }}
              >
                build
              </span>
              <br />
              companies.
            </motion.h1>

            <motion.p
              className="text-warm-white/45 text-[18px] leading-relaxed max-w-[340px] border-l-2 border-crimson/25 pl-5 lg:mb-2"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease }}
            >
              40+ ventures co-built across Scandinavia and Europe. Deep due diligence, hands-on execution, and selective equity investment — from first conversation to funding round.
            </motion.p>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <motion.div
          className="flex items-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {TYPES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStage(s)}
              className={`px-5 py-2 rounded-full text-[13px] font-[500] uppercase tracking-widest transition-all duration-200 ${
                activeStage === s
                  ? "bg-crimson text-white"
                  : "bg-surface-2 text-warm-white/45 hover:text-warm-white border border-white/[0.06]"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {s}
            </button>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((company, i) => (
              <motion.div
                key={company.name}
                className="group relative border border-white/[0.06] bg-surface-2 rounded-xl p-6 hover:border-crimson/20 transition-colors duration-300 overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.04 + i * 0.04,
                  duration: 0.55,
                  ease,
                }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
              >
                {/* Top hover glow */}
                <div
                  className="absolute inset-x-0 top-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(200,16,46,0.06), transparent)",
                  }}
                />

                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-[700] uppercase tracking-wider ${
                      company.stage
                        ? STAGE_COLORS[company.stage] ?? "bg-warm-white/5 text-warm-white/30"
                        : "bg-warm-white/5 text-warm-white/30"
                    }`}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {company.stage ?? company.type}
                  </span>
                  <span
                    className="text-warm-white/20 text-[13px]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {company.year}
                  </span>
                </div>

                <h3
                  className="text-warm-white leading-none mb-3 group-hover:text-crimson transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(26px, 2.5vw, 36px)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {company.name}
                </h3>

                <p
                  className="text-warm-white/40 text-[15px] leading-snug mb-4"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {company.tagline}
                </p>

                {company.role && (
                  <div className="mb-5 flex-1">
                    <p
                      className="text-[11px] uppercase tracking-[0.15em] text-crimson/50 mb-1.5 font-[600]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      What we did
                    </p>
                    <p
                      className="text-warm-white/30 text-[13px] leading-relaxed"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {company.role.split(" / ").join(" · ")}
                    </p>
                  </div>
                )}
                {!company.role && <div className="flex-1" />}

                <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <span
                    className="text-warm-white/25 text-[12px] uppercase tracking-[0.15em]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {company.category}
                  </span>
                  {company.url && (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warm-white/25 hover:text-crimson transition-colors duration-200 text-[16px] leading-none"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Visit ${company.name}`}
                    >
                      ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p
            className="text-warm-white/25 text-[16px] mt-8"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            No companies at this stage yet.
          </p>
        )}
      </div>
    </section>
  );
}
