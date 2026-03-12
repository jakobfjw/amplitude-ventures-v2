"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/content";

function fmt(d: string) {
  return new Date(d)
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
}

export default function BlogSection() {
  return (
    <section className="bg-surface py-[150px]">
      <div className="mx-auto max-w-[1400px] px-8 md:px-12">
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.p
              className="text-crimson text-[16px] font-[600] uppercase tracking-[0.3em] mb-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              From the blog
            </motion.p>
            <motion.h2
              className="text-warm-white leading-[0.92]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(56px, 7vw, 88px)",
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, x: -28, filter: "blur(16px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              SHARP{" "}
              <span
                className="text-crimson italic"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                thinking
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="text-warm-white/35 text-[16px] hover:text-crimson transition-colors tracking-wider"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              All posts →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogPosts.slice(0, 3).map((post, i) => (
            <motion.article
              key={post.slug}
              className={`group relative rounded-2xl border border-white/[0.06] bg-surface-2 p-7 hover:border-crimson/25 transition-colors duration-300 flex flex-col overflow-hidden ${
                i === 0 ? "md:col-span-2" : i === 2 ? "md:col-span-2" : ""
              }`}
              // Featured post slides from left; others from bottom with stagger
              initial={{
                opacity: 0,
                x: i === 0 ? -36 : 0,
                y: i === 0 ? 0 : 32,
                filter: "blur(12px)",
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              {/* Hover top-glow */}
              <div className="absolute inset-x-0 top-0 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-t-2xl"
                style={{ background: "linear-gradient(to bottom, rgba(200,16,46,0.06), transparent)" }}
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

              <h3
                className={`text-warm-white font-[400] leading-snug mb-3 group-hover:text-crimson transition-colors duration-200 ${
                  i === 0 ? "text-[26px]" : "text-[22px]"
                }`}
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

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
