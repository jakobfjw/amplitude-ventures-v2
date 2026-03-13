"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Users, Briefcase, BarChart2, FileText, Mail, Sun, Moon } from "lucide-react";
import { nav } from "@/lib/content";
import { TubelightNav, type NavItem } from "@/components/ui/tubelight-navbar";
import { useTheme } from "@/components/ui/theme-provider";

const NAV_ITEMS: NavItem[] = [
  { name: "Home",      url: "/",         icon: Home },
  { name: "About Us",  url: "/about",    icon: Users },
  { name: "Offering",  url: "/offering", icon: Briefcase },
  { name: "Portfolio", url: "/portfolio",icon: BarChart2 },
  { name: "Blog",      url: "/blog",     icon: FileText },
  { name: "Contact",   url: "/contact",  icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b border-transparent"
        style={{
          backgroundColor: scrolled ? "rgba(var(--void-rgb), 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderColor: scrolled ? "rgba(var(--warm-white-rgb), 0.05)" : "transparent",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-12 h-[72px] md:h-[80px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="group flex-shrink-0 flex items-center">
            <Image
              src="/logo-main.png"
              alt="Amplitude Ventures"
              height={200}
              width={400}
              style={{
                height: "clamp(48px, 7vw, 60px)",
                width: "auto",
                filter: theme === "light" ? "invert(1) brightness(0.15)" : "none",
                transition: "filter 0.3s ease",
              }}
              priority
            />
          </Link>

          {/* Desktop nav — tubelight */}
          <TubelightNav items={NAV_ITEMS} className="flex-1 justify-center" />

          {/* Theme toggle + CTA */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-warm-white/60 hover:text-crimson transition-colors duration-200"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="hidden md:block">
              <Link
                href={nav.cta.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-crimson text-white text-[15px] font-[500] rounded-full hover:bg-crimson-dark transition-colors duration-200 tracking-wide whitespace-nowrap"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {nav.cta.label}
                <span aria-hidden className="text-[16px]">→</span>
              </Link>
            </motion.div>

            {/* Mobile burger */}
            <button
              className="md:hidden flex flex-col gap-[6px] p-2.5 -mr-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[2px] bg-warm-white transition-transform duration-300 origin-center ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-warm-white transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-[2px] bg-warm-white transition-transform duration-300 origin-center ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-void/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-12"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.url}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.url}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-5 py-5 border-b border-white/[0.06] group"
                  >
                    <Icon
                      size={20}
                      className="text-crimson/50 group-hover:text-crimson transition-colors"
                    />
                    <span
                      className="text-[34px] tracking-[0.06em] text-warm-white/80 group-hover:text-crimson transition-colors leading-none"
                      style={{ fontFamily: "var(--font-bebas)" }}
                    >
                      {item.name.toUpperCase()}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-10"
            >
              <Link
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-crimson text-white rounded-full text-[15px] font-[500]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {nav.cta.label} →
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
