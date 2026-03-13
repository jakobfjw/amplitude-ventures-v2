"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />

      <section className="relative bg-void min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(var(--warm-white-rgb),0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Giant ghost 404 */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(140px, 28vw, 340px)",
              letterSpacing: "0.04em",
              color: "rgba(var(--warm-white-rgb),0.02)",
              lineHeight: 1,
            }}
          >
            404
          </span>
        </div>

        <div className="relative z-10 text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <p
              className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em] mb-6"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Page not found
            </p>
            <h1
              className="text-warm-white leading-[0.9] mb-4"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(64px, 10vw, 140px)",
                letterSpacing: "0.02em",
              }}
            >
              Wrong{" "}
              <span
                className="text-crimson uppercase"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "0.85em",
                }}
              >
                turn.
              </span>
            </h1>
            <p
              className="text-warm-white/45 text-[18px] leading-relaxed max-w-[440px] mx-auto mb-10"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been
              moved.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white rounded-full text-[15px] font-[500] hover:bg-crimson-dark transition-colors duration-200"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Back to home →
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
