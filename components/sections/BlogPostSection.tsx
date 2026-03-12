"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Post {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: string[];
}

interface Props {
  post: Post;
}

const ease = [0.22, 1, 0.36, 1] as const;

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPostSection({ post }: Props) {
  return (
    <article className="relative bg-void min-h-[calc(100vh-80px)] pt-[120px] pb-24 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(242,237,228,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[860px] px-8 md:px-12">
        {/* ── Back link ── */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-warm-white/30 text-[14px] uppercase tracking-[0.2em] hover:text-crimson transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            ← All posts
          </Link>
        </motion.div>

        {/* ── Meta ── */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full bg-crimson/10 text-crimson text-[13px] font-[700] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {post.category}
          </span>
          <span className="w-px h-4 bg-white/10" aria-hidden />
          <span
            className="text-warm-white/30 text-[14px] uppercase tracking-wider"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {fmt(post.date)}
          </span>
          <span className="w-px h-4 bg-white/10" aria-hidden />
          <span
            className="text-warm-white/30 text-[14px] uppercase tracking-wider"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {post.readTime}
          </span>
        </motion.div>

        {/* ── Title ── */}
        <motion.h1
          className="text-warm-white leading-[1.05] mb-8"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "0.02em",
          }}
          initial={{ opacity: 0, x: -28, filter: "blur(20px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.15, duration: 0.9, ease }}
        >
          {post.title}
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-white/[0.07] mb-10"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease }}
        />

        {/* ── Pull excerpt ── */}
        <motion.p
          className="text-warm-white/65 italic leading-[1.4] mb-12 pl-6 border-l-2 border-crimson/40"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(22px, 2.5vw, 30px)",
            fontWeight: 400,
          }}
          initial={{ opacity: 0, x: -16, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.35, duration: 0.7, ease }}
        >
          {post.excerpt}
        </motion.p>

        {/* ── Body ── */}
        <div className="flex flex-col gap-6">
          {post.body.map((para, i) => (
            <motion.p
              key={i}
              className="text-warm-white/60 text-[18px] md:text-[20px] leading-[1.75]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.65, ease }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* ── Footer ── */}
        <motion.div
          className="mt-16 pt-10 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-warm-white/35 text-[15px] hover:text-crimson transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            ← Back to all posts
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white rounded-full text-[15px] font-[500] hover:bg-[#a80d25] transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Start a conversation →
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
