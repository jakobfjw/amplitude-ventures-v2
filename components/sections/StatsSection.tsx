"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { stats } from "@/lib/content";

const extended = [
  ...stats,
  { number: "11", suffix: "d", label: "Avg. first decision" },
  { number: "100", suffix: "+", label: "Investors per raise" },
];

function CountUp({
  value,
  suffix,
  prefix = "",
  trigger,
  delay = 0,
}: {
  value: string;
  suffix: string;
  prefix?: string;
  trigger: boolean;
  delay?: number;
}) {
  const num = parseFloat(value);
  const decimals = value.includes(".")
    ? (value.split(".")[1]?.length ?? 0)
    : 0;
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!trigger) return;
    let raf: number;
    const duration = 1600;
    let startTime: number | null = null;

    const run = (now: number) => {
      if (!startTime) startTime = now + delay * 1000;
      if (now < startTime) {
        raf = requestAnimationFrame(run);
        return;
      }
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const current = ease * num;
      setDisplay(
        decimals > 0
          ? current.toFixed(decimals)
          : Math.round(current).toString()
      );
      if (t < 1) raf = requestAnimationFrame(run);
    };

    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [trigger, num, decimals, delay]);

  return (
    <>
      {prefix && <span className="text-crimson">{prefix}</span>}
      {display}
      <span className="text-crimson">{suffix}</span>
    </>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Background "AV" drifts horizontally with scroll
  const avX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section
      ref={sectionRef}
      className="bg-surface relative py-[150px] overflow-hidden"
    >
      {/* Giant background letters — parallax drift */}
      <motion.div
        className="absolute -right-12 top-1/2 -translate-y-1/2 leading-none pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(240px, 30vw, 480px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(200,16,46,0.13)",
          letterSpacing: "0.02em",
          x: avX,
        }}
        aria-hidden
      >
        AV
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
          By the numbers
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {extended.map((s, i) => (
            <motion.div
              key={s.label}
              className={`bg-surface p-10 flex flex-col justify-between ${i === 0 ? "border-l-2 border-crimson/60" : ""}`}
              initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.07,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="text-warm-white leading-none mb-3"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(56px, 7vw, 88px)",
                  letterSpacing: "0.02em",
                }}
              >
                <CountUp
                  value={s.number}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  trigger={isInView}
                  delay={i * 0.07}
                />
              </div>
              <p
                className="text-warm-white/35 text-[16px] leading-snug font-[500] uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
