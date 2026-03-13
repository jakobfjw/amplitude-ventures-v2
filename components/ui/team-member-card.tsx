"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

interface TeamMemberCardProps {
  position: "left" | "right";
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  image: string;
  linkedin?: string;
  background: string;
  focus: string;
  index: number;
}

export default function TeamMemberCard({
  position,
  firstName,
  lastName,
  role,
  tagline,
  image,
  linkedin,
  background,
  focus,
  index,
}: TeamMemberCardProps) {
  const isRight = position === "right";
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease }}
    >
      {/* ── Ghosted index number ── */}
      <motion.div
        className={`absolute top-[-40px] pointer-events-none select-none ${
          isRight ? "right-0 lg:right-[5%]" : "left-0 lg:left-[5%]"
        }`}
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(160px, 18vw, 260px)",
          lineHeight: 1,
          color: "rgba(242,237,228,0.025)",
          letterSpacing: "-0.02em",
        }}
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.15, ease }}
      >
        {num}
      </motion.div>

      {/* ── Role label + crimson rule ── */}
      <motion.div
        className={`flex items-center gap-4 mb-6 ${isRight ? "justify-end" : ""}`}
        initial={{ opacity: 0, x: isRight ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1, ease }}
      >
        {!isRight && <span className="w-10 h-px bg-crimson/60" />}
        <span
          className="text-crimson text-[11px] font-[600] uppercase tracking-[0.35em]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {role}
        </span>
        {isRight && <span className="w-10 h-px bg-crimson/60" />}
      </motion.div>

      {/* ── Main layout — image + info ── */}
      <div
        className={`flex flex-col lg:flex-row items-start ${
          isRight ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Portrait */}
        <motion.div
          className="relative w-full lg:w-[400px] xl:w-[460px] aspect-[3/4] shrink-0 overflow-hidden"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 65% at 50% 40%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 65% at 50% 40%, black 30%, transparent 100%)",
          }}
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.15 + 0.15, ease }}
        >
          {/* Bottom gradient — strong dissolve into void */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#080808] via-[#080808]/40 via-[28%] to-transparent" />
          {/* Top gradient — subtle haze */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#080808]/50 via-transparent via-[20%] to-transparent" />
          {/* Side gradient blending toward info block */}
          <div
            className={`pointer-events-none absolute inset-y-0 z-10 w-36 ${
              isRight
                ? "left-0 bg-gradient-to-r from-[#080808]/60 to-transparent"
                : "right-0 bg-gradient-to-l from-[#080808]/60 to-transparent"
            }`}
          />
          {/* Opposite side bleed */}
          <div
            className={`pointer-events-none absolute inset-y-0 z-10 w-20 ${
              isRight
                ? "right-0 bg-gradient-to-l from-[#080808]/35 to-transparent"
                : "left-0 bg-gradient-to-r from-[#080808]/35 to-transparent"
            }`}
          />
          {/* Film grain texture */}
          <div
            className="pointer-events-none absolute inset-0 z-[11] mix-blend-overlay opacity-[0.07]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
              backgroundSize: "128px 128px",
            }}
          />
          {/* Crimson warmth — barely there */}
          <div className="pointer-events-none absolute inset-0 z-[12] bg-crimson/[0.03] mix-blend-color" />
          <Image
            src={image}
            alt={`${firstName} ${lastName}`}
            fill
            className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] hover:scale-[1.03]"
            style={{
              filter: "brightness(0.68) contrast(0.88) saturate(0.15)",
            }}
            sizes="(max-width: 1024px) 100vw, 460px"
          />
        </motion.div>

        {/* ── Info block — overlaps image via negative margin ── */}
        <motion.div
          className={`relative z-20 flex flex-col mt-8 lg:mt-12 ${
            isRight
              ? "lg:mr-[-32px] lg:items-end lg:text-right"
              : "lg:ml-[-32px]"
          }`}
          initial={{ opacity: 0, x: isRight ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3, ease }}
        >
          {/* Display name — editorial type collision */}
          <div className="mb-3">
            <h3
              className="text-warm-white leading-[0.88]"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(54px, 7vw, 100px)",
                letterSpacing: "0.015em",
              }}
            >
              {firstName}
            </h3>
            <span
              className="text-crimson italic block leading-[0.95]"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 400,
                fontSize: "clamp(40px, 5.5vw, 76px)",
              }}
            >
              {lastName}
            </span>
          </div>

          {/* Tagline — italic pull-phrase */}
          <motion.p
            className="text-warm-white/30 italic mb-8 max-w-[380px]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(16px, 1.4vw, 20px)",
              fontWeight: 300,
              lineHeight: 1.5,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.45, ease }}
          >
            {tagline}
          </motion.p>

          {/* Details row — LinkedIn CTA + bio */}
          <div
            className={`flex items-start gap-6 ${
              isRight ? "flex-row-reverse" : ""
            }`}
          >
            {/* LinkedIn circle */}
            {linkedin && (
              <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.08, borderColor: "rgba(200,16,46,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:bg-crimson/10"
                >
                  <Linkedin
                    size={16}
                    className="text-warm-white/30 transition-all duration-300 group-hover:text-crimson"
                  />
                </motion.div>
              </Link>
            )}

            {/* Bio with crimson accent bar */}
            <div className="max-w-[400px]">
              <div
                className={`${
                  isRight
                    ? "border-r-2 border-crimson/20 pr-5"
                    : "border-l-2 border-crimson/20 pl-5"
                }`}
              >
                <p
                  className="text-warm-white/40 text-[14px] leading-[1.85] mb-5"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                >
                  {background}
                </p>
              </div>
              <div
                className={`flex flex-wrap gap-x-2 gap-y-1 mt-4 ${
                  isRight ? "justify-end" : ""
                }`}
              >
                {focus.split(" · ").map((tag) => (
                  <span
                    key={tag}
                    className="text-warm-white/15 text-[10px] uppercase tracking-[0.22em] border border-white/[0.06] rounded-full px-3 py-1"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
