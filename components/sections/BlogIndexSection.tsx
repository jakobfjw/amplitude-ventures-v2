"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/content";
import LogoMark from "@/components/ui/logo-mark";
import { FloatingNodes, DataFragments, DashedArc } from "@/components/ui/ambient-orbitals";

const ease = [0.22, 1, 0.36, 1] as const;

function fmt(d: string) {
  return new Date(d)
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
}

export default function BlogIndexSection() {
  return (
    <section className="relative bg-void min-h-[calc(100vh-80px)] pt-[120px] pb-24 overflow-hidden">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(var(--warm-white-rgb),0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Crimson radial glow — right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 40% 50% at 85% 40%, rgba(var(--crimson-rgb),0.06) 0%, transparent 70%)",
        }}
      />

      {/* LogoMark — top-left, ghosted */}
      <div className="absolute top-16 left-[-20px] hidden lg:block pointer-events-none select-none" aria-hidden>
        <LogoMark
          className="w-[240px] h-auto opacity-[0.07]"
          pillarColor="rgba(var(--warm-white-rgb),0.05)"
          archColor="rgba(var(--crimson-rgb),0.05)"
          strokeWidth={4}
          style={{ transform: "rotate(-10deg)" }}
        />
      </div>

      {/* FloatingNodes — top-right */}
      <div className="absolute top-28 right-[8%] hidden lg:block w-[60px] h-[50px]">
        <FloatingNodes bobSpeed={10} bobAmount={7} />
      </div>

      {/* DataFragments — bottom-left */}
      <div className="absolute bottom-20 left-[10%] hidden md:block w-[55px] h-[36px]">
        <DataFragments count={3} width={55} color="rgba(var(--crimson-rgb),0.15)" secondaryColor="rgba(var(--warm-white-rgb),0.06)" bobSpeed={9} bobAmount={7} />
      </div>

      {/* DashedArc — bottom area */}
      <div className="absolute bottom-8 right-[20%] hidden lg:block w-[240px] h-[100px]">
        <DashedArc width={240} height={100} color="rgba(var(--crimson-rgb),0.05)" dashArray="3 12" flip />
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
              The Blog
            </span>
          </motion.div>

          <motion.h1
            className="text-warm-white leading-[0.88]"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(64px, 9vw, 120px)",
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0, x: -28, filter: "blur(20px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1, duration: 0.9, ease }}
          >
            Sharp{" "}
            <span
              className="text-crimson"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "0.88em",
              }}
            >
              THINKING.
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-warm-white/40 text-[18px] max-w-[420px]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Perspectives on early-stage investing, building companies, and what actually works.
          </motion.p>
        </div>

        {/* ── Posts grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              className={`group relative rounded-2xl border border-white/[0.06] bg-surface-2 p-7 hover:border-crimson/25 transition-colors duration-300 flex flex-col overflow-hidden ${
                i === 0 ? "md:col-span-2" : ""
              }`}
              initial={{
                opacity: 0,
                x: i === 0 ? -36 : 0,
                y: i === 0 ? 0 : 32,
                filter: "blur(12px)",
              }}
              animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
            >
              {/* Hover top glow */}
              <div
                className="absolute inset-x-0 top-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(var(--crimson-rgb),0.06), transparent)",
                }}
              />

              <div className="flex items-center justify-between mb-5">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-crimson/10 text-crimson text-[13px] font-[700] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {post.category}
                </span>
                <span
                  className="text-warm-white/25 text-[14px] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {post.readTime}
                </span>
              </div>

              <h2
                className={`text-warm-white font-[400] leading-snug mb-3 group-hover:text-crimson transition-colors duration-200 ${
                  i === 0 ? "text-[26px]" : "text-[22px]"
                }`}
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p
                className="text-warm-white/40 text-[17px] leading-relaxed flex-1 mb-6"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <span
                  className="text-warm-white/25 text-[14px] uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {fmt(post.date)}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[14px] text-warm-white/30 hover:text-crimson transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Read →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
