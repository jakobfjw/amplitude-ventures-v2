"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/lib/content";

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 7 seconds; clicking a tab locks it
  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % services.length),
      7000
    );
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-surface py-[150px] relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            className="text-crimson text-[16px] font-[600] uppercase tracking-[0.3em] mb-6"
            style={{ fontFamily: "var(--font-dm-sans)" }}
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            What we offer
          </motion.p>
          <motion.h2
            className="text-warm-white leading-[0.92]"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(64px, 8vw, 104px)",
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0, x: -28, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            MORE THAN{" "}
            <span
              className="text-crimson italic"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              capital
            </span>
          </motion.h2>
        </div>

        {/* Tab buttons — cascade in with stagger */}
        <motion.div
          className="flex gap-2 mb-12 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {services.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => { setActive(i); setPaused(true); }}
              variants={{
                hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`relative px-6 py-3 rounded-full text-[16px] font-[500] tracking-wide transition-all duration-200 overflow-hidden ${
                active === i
                  ? "border border-crimson text-crimson bg-crimson/10"
                  : "border border-white/10 text-warm-white/50 hover:text-warm-white hover:border-white/25"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {String(i + 1).padStart(2, "0")} — {s.title}
              {/* Progress bar on active tab when auto-advancing */}
              {active === i && !paused && (
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-white/40 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 7, ease: "linear" }}
                  key={`${active}-progress`}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
          >
            <div>
              <h3
                className="text-warm-white leading-[0.9] mb-6"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(64px, 8vw, 104px)",
                  letterSpacing: "0.02em",
                }}
              >
                {services[active].headline.replace(".", "")}
                <span className="text-crimson">.</span>
              </h3>

              <p
                className="text-warm-white/60 text-[20px] leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {services[active].body}
              </p>

              <p
                className="text-warm-white/30 text-[17px] leading-relaxed border-l-2 border-crimson/40 pl-4 italic"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {services[active].detail}
              </p>
            </div>

            {/* Abstract right column — concentric ring system */}
            <div className="relative flex items-center justify-center min-h-[260px] md:min-h-[420px] overflow-hidden">
              {/* Rings — scale in with stagger on each tab switch */}
              {[400, 300, 220, 148, 88].map((size, i) => {
                const spinClass = i === 0
                  ? "ring-cw-1"
                  : i === 1
                  ? "ring-ccw-1"
                  : i === 2
                  ? "ring-cw-2"
                  : i === 3
                  ? "ring-ccw-2"
                  : "";
                return (
                  <motion.div
                    key={size}
                    className={`absolute rounded-full ${spinClass}`}
                    style={{
                      width: size,
                      height: size,
                      border: `1px solid rgba(200,16,46,${0.06 + i * 0.06})`,
                    }}
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.75,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                );
              })}

              {/* Centre glow */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 280,
                  height: 280,
                  background: "radial-gradient(circle, rgba(200,16,46,0.14) 0%, transparent 70%)",
                }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.7 }}
              />

              {/* Service number */}
              <motion.div
                className="relative text-crimson leading-none select-none z-10"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(88px, 10vw, 130px)",
                  letterSpacing: "0.02em",
                }}
                aria-hidden
                initial={{ opacity: 0, scale: 0.6, filter: "blur(16px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {String(active + 1).padStart(2, "0")}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
