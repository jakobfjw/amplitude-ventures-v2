"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const cols = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Offering",
    links: [
      { label: "Capital", href: "/offering#capital" },
      { label: "Build", href: "/offering#build" },
      { label: "Raise", href: "/offering#raise" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Get in Touch", href: "/contact" },
      { label: "LinkedIn", href: "#" },
      { label: "Twitter / X", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-void border-t border-white/[0.05] pt-16 pb-10">
      <div className="mx-auto max-w-[1400px] px-8 md:px-12">
        {/* Top: logo + cols */}
        <div className="grid grid-cols-2 md:grid-cols-[1fr_repeat(3,_auto)] gap-12 mb-16">
          {/* Logo */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="flex items-center mb-5 w-fit">
              <Image
                src="/logo-trimmed.png"
                alt="Amplitude Ventures"
                width={453}
                height={115}
                style={{
                  filter: "brightness(0) invert(1)",
                  opacity: 0.5,
                  height: "36px",
                  width: "auto",
                }}
                className="hover:opacity-70 transition-opacity duration-200"
              />
            </Link>
            <p
              className="text-warm-white/35 text-[14px] leading-relaxed max-w-[200px]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Pre-seed capital and operator support for extraordinary founders.
            </p>
          </motion.div>

          {cols.map((col, colIdx) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1 + colIdx * 0.08 }}
            >
              <p
                className="text-warm-white/35 text-[12px] font-[600] uppercase tracking-[0.2em] mb-5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group relative text-warm-white/55 text-[15px] hover:text-warm-white transition-colors duration-200 inline-flex flex-col"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {l.label}
                      <span className="absolute bottom-0 left-0 h-px w-0 bg-crimson/60 group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom: copyright */}
        <motion.div
          className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p
            className="text-warm-white/30 text-[13px]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            © {new Date().getFullYear()} Amplitude Ventures. All rights reserved.
          </p>
          <p
            className="text-warm-white/40 text-[15px] italic"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Back the extraordinary.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
