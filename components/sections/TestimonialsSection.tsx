"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/content";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % testimonials.length),
      5500
    );
    return () => clearInterval(id);
  }, [paused, active]);

  const words = testimonials[active].quote.split(" ");

  return (
    <section className="bg-void py-[110px] relative overflow-hidden">
      {/* Big background serif quote mark */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center leading-none pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(180px, 22vw, 320px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(200,16,46,0.09)",
          fontStyle: "italic",
        }}
        initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        &ldquo;
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-12">
        <motion.p
          className="text-crimson text-[16px] font-[600] uppercase tracking-[0.3em] mb-16"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          What founders say
        </motion.p>

        {/* Founder selector tabs */}
        <motion.div
          className="flex gap-2 mb-14 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              variants={{
                hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`relative px-5 py-2.5 rounded-full text-[14px] font-[500] tracking-wide transition-all duration-200 overflow-hidden ${
                active === i
                  ? "border border-crimson text-crimson bg-crimson/10"
                  : "border border-white/10 text-warm-white/50 hover:text-warm-white hover:border-white/25"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {t.name}
              {/* Progress bar on active tab when auto-advancing */}
              {active === i && !paused && (
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-crimson/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5.5, ease: "linear" }}
                  key={`${active}-progress`}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Quote area */}
        <div
          className="relative min-h-[260px] flex flex-col justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p
                className="italic text-warm-white leading-[1.25] mb-10"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 400,
                }}
              >
                &ldquo;
                {words.map((word, i) => (
                  <motion.span
                    key={`${active}-${i}`}
                    initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      delay: i * 0.03,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                    style={{ display: "inline-block", marginRight: "0.28em" }}
                  >
                    {word}
                  </motion.span>
                ))}
                &rdquo;
              </p>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: words.length * 0.03 + 0.1, duration: 0.5 }}
              >
                <div className="w-10 h-px bg-crimson" />
                <div>
                  <p
                    className="text-warm-white font-[500] text-[19px]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {testimonials[active].name}
                  </p>
                  <p
                    className="text-crimson text-[15px] font-[500] uppercase tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {testimonials[active].role} &bull; {testimonials[active].co}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Counter */}
        <div className="flex items-center gap-4 mt-10">
          <span
            className="text-warm-white/25 tabular-nums"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", letterSpacing: "0.12em" }}
          >
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
