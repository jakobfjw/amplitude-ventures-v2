"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioCompanies } from "@/lib/content";
import LogoMark from "@/components/ui/logo-mark";
import { PulseNode, DataFragments, ScatterField } from "@/components/ui/ambient-orbitals";

const ease = [0.22, 1, 0.36, 1] as const;

const TYPES = ["All", "Investments", "Clients", "Projects"] as const;
type PortfolioType = (typeof TYPES)[number];

const TYPE_MAP: Record<PortfolioType, string | null> = {
  All: null,
  Investments: "Investment",
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
      {/* Dot grid — desktop only */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(var(--warm-white-rgb),0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Crimson radial glow — right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 85% 60%, rgba(var(--crimson-rgb),0.05) 0%, transparent 70%)",
        }}
      />

      {/* LogoMark — bottom-left, ghosted */}
      <div className="absolute bottom-16 left-[-20px] hidden lg:block pointer-events-none select-none" aria-hidden>
        <LogoMark
          className="w-[240px] h-auto opacity-[0.07]"
          pillarColor="rgba(var(--warm-white-rgb),0.05)"
          archColor="rgba(var(--crimson-rgb),0.05)"
          strokeWidth={4}
          style={{ transform: "rotate(-15deg)" }}
        />
      </div>

      {/* PulseNode — top-right */}
      <div className="absolute top-32 right-[8%] hidden lg:block w-[48px] h-[48px]">
        <PulseNode size={48} color="rgba(var(--crimson-rgb),0.2)" coreColor="rgba(var(--crimson-rgb),0.45)" pulseSpeed={3.5} />
      </div>

      {/* DataFragments — bottom-right */}
      <div className="absolute bottom-24 right-[12%] hidden md:block w-[60px] h-[40px]">
        <DataFragments count={3} width={60} color="rgba(var(--crimson-rgb),0.25)" secondaryColor="rgba(var(--warm-white-rgb),0.1)" bobSpeed={8} bobAmount={8} />
      </div>

      {/* ScatterField — background */}
      <div className="absolute top-[20%] left-[5%] hidden lg:block w-[300px] h-[200px] opacity-60">
        <ScatterField count={10} width={300} height={200} dotColor="rgba(var(--warm-white-rgb),0.06)" accentColor="rgba(var(--crimson-rgb),0.1)" accentCount={2} />
      </div>

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
                fontSize: "clamp(52px, 8vw, 120px)",
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, x: -28, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
            >
              We{" "}
              <span
                className="text-crimson"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "0.82em",
                }}
              >
                BUILD
              </span>
              <br />
              companies.
            </motion.h1>

            <motion.p
              className="text-warm-white/60 text-[18px] leading-relaxed max-w-[340px] border-l-2 border-crimson/25 pl-5 lg:mb-2"
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
                  : "bg-surface-2 text-warm-white/60 hover:text-warm-white border border-warm-white/[0.12]"
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
              <motion.a
                key={company.name}
                href={company.url || undefined}
                target={company.url ? "_blank" : undefined}
                rel={company.url ? "noopener noreferrer" : undefined}
                className={`group relative border border-warm-white/[0.08] bg-surface-2 rounded-xl p-6 hover:border-crimson/30 transition-all duration-300 overflow-hidden flex flex-col ${company.url ? "cursor-pointer" : ""}`}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.04 + i * 0.04,
                  duration: 0.55,
                  ease,
                }}
                whileHover={{ y: -4, transition: { duration: 0.22, ease } }}
              >
                {/* Corner accent — top-right crimson corner on hover */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(225deg, rgba(var(--crimson-rgb),0.18) 0%, transparent 65%)",
                  }}
                />
                {/* Scan line sweep */}
                <div
                  className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(var(--crimson-rgb),0.6), transparent)",
                    transform: "translateY(-2px)",
                    transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
                <div className="absolute inset-x-0 top-0 overflow-hidden h-full pointer-events-none">
                  <div
                    className="w-full h-[1px] opacity-0 group-hover:opacity-100 group-hover:[transform:translateY(300px)]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(var(--crimson-rgb),0.5), transparent)",
                      transition:
                        "opacity 0.1s, transform 0.65s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                </div>
                {/* Ambient bottom glow */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(var(--crimson-rgb),0.08), transparent)",
                  }}
                />

                {/* Ghost index number */}
                <div
                  className="absolute right-4 top-3 leading-none select-none pointer-events-none opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "64px",
                    letterSpacing: "0.05em",
                    color: "rgb(var(--warm-white-rgb))",
                  }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Industry label — top of card */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-px bg-crimson/50" />
                  <span
                    className="text-[10px] font-[600] uppercase tracking-[0.22em] text-warm-white/35 group-hover:text-crimson/60 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {company.industry}
                  </span>
                </div>

                {/* Company logo — invert + screen blend makes white bg transparent */}
                {company.logo && (
                  <div className="mb-5 h-[90px] flex items-center">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="logo-adaptive max-h-[90px] max-w-[240px] w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

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
                  className="text-warm-white/65 text-[15px] leading-snug mb-4"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {company.tagline}
                </p>

                <div className="mb-5 flex-1">
                  <p
                    className="text-[11px] uppercase tracking-[0.15em] text-crimson/65 mb-1.5 font-[600]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    What we did
                  </p>
                  <p
                    className="text-warm-white/55 text-[13px] leading-relaxed"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {company.role.split(" / ").join(" · ")}
                  </p>
                </div>

                <div className="pt-4 border-t border-warm-white/[0.1] flex items-center justify-between">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-[600] uppercase tracking-wider bg-warm-white/[0.05] text-warm-white/35 border border-warm-white/[0.08]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {company.type}
                  </span>
                  {company.url && (
                    <span
                      className="text-warm-white/40 group-hover:text-crimson transition-colors duration-200 text-[16px] leading-none"
                      aria-hidden
                    >
                      ↗
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p
            className="text-warm-white/25 text-[16px] mt-8"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Nothing here yet.
          </p>
        )}
      </div>
    </section>
  );
}
