"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { stats, statsSection } from "@/lib/content";
import LogoMark from "@/components/ui/logo-mark";
import { MiniOrbital, DataFragments, DashedArc } from "@/components/ui/ambient-orbitals";

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
    const duration = 2000;
    let startTime: number | null = null;

    const run = (now: number) => {
      if (!startTime) startTime = now + delay * 1000;
      if (now < startTime) {
        raf = requestAnimationFrame(run);
        return;
      }
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 4);
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
  const avX = useTransform(scrollYProgress, [0, 1], ["-2%", "3%"]);

  return (
    <section
      ref={sectionRef}
      className="bg-surface relative overflow-hidden"
    >
      {/* Ambient decorations */}
      <MiniOrbital
        size={200}
        rings={3}
        tilt={-25}
        speed={80}
        nodeColor="rgba(var(--crimson-rgb),0.25)"
        ringColor="rgba(var(--crimson-rgb),0.08)"
        dotColor="rgba(var(--warm-white-rgb),0.12)"
        className="absolute bottom-8 left-[2%] w-[200px] h-[200px] opacity-[0.45] hidden lg:block"
      />
      <DataFragments
        count={3}
        width={55}
        color="rgba(var(--crimson-rgb),0.12)"
        secondaryColor="rgba(var(--warm-white-rgb),0.08)"
        bobSpeed={8}
        bobAmount={7}
        className="absolute top-20 right-[6%] w-[55px] h-[50px] hidden lg:block"
      />
      <DashedArc
        width={320}
        height={60}
        color="rgba(var(--crimson-rgb),0.08)"
        dashArray="4 14"
        className="absolute top-0 left-[10%] w-[320px] h-[60px] hidden lg:block"
      />

      {/* Mobile: stronger crimson glow centered */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(var(--crimson-rgb),0.09) 0%, transparent 60%)",
        }}
      />
      {/* Crimson radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 80% 50%, rgba(var(--crimson-rgb),0.08) 0%, transparent 70%)",
        }}
      />

      {/* Logo mark watermark — parallax drift */}
      <motion.div
        className="absolute -right-16 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ x: avX }}
        aria-hidden
      >
        <LogoMark
          className="w-[clamp(300px,38vw,560px)] h-auto"
          pillarColor="rgba(var(--warm-white-rgb),0.06)"
          archColor="rgba(var(--crimson-rgb),0.07)"
          strokeWidth={4}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">
        <motion.p
          className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em] pt-12 md:pt-20 mb-10 md:mb-20"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {statsSection.eyebrow}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.06]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className={`relative py-10 md:py-24 flex flex-col justify-between group ${
                i === 0 ? "md:border-r border-white/[0.06] md:pr-16" : "md:pl-16"
              }`}
              initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.15,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div
                className="text-warm-white leading-none mb-4 tabular-nums"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(52px, 10vw, 140px)",
                  letterSpacing: "0.01em",
                }}
              >
                <CountUp
                  value={s.number}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  trigger={isInView}
                  delay={i * 0.15}
                />
              </div>
              <p
                className="text-warm-white/30 text-[14px] font-[500] uppercase tracking-[0.25em] transition-colors duration-300 group-hover:text-warm-white/50"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="border-b border-white/[0.06] pb-0" />
      </div>
    </section>
  );
}
