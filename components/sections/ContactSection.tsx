"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/lib/content";
import LogoMark from "@/components/ui/logo-mark";
import { MiniOrbital, PulseNode, DashedArc } from "@/components/ui/ambient-orbitals";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Formspree form endpoint — get yours at https://formspree.io/forms
 * Submissions forward to the email configured in Formspree dashboard.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mreykdne";

const INPUT_CLS =
  "bg-surface-3 border border-white/[0.07] rounded-lg px-4 py-3.5 text-warm-white text-[16px] placeholder:text-warm-white/20 focus:outline-none focus:border-crimson/40 transition-colors duration-200";

const LABEL_CLS =
  "text-warm-white/50 text-[13px] uppercase tracking-[0.18em]";

const STARTUP_STAGES = [
  "Idea / Pre-product",
  "MVP / Prototype",
  "Early Revenue",
  "Growth / Scaling",
  "Other",
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    // Sync _replyto with the email field so Formspree sets Reply-To header
    const emailVal = (form.elements.namedItem("Email") as HTMLInputElement)?.value;
    const replyTo = form.elements.namedItem("_replyto") as HTMLInputElement;
    if (replyTo && emailVal) replyTo.value = emailVal;

    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSending(false);
        setSubmitted(true);

        // ── Conversion tracking ──
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        if (typeof w.gtag === "function") {
          w.gtag("event", "generate_lead", {
            event_category: "contact",
            event_label: "brief_submission",
          });
        }
        if (typeof w.fbq === "function") {
          w.fbq("track", "Lead");
        }
      } else {
        const json = await res.json();
        setSending(false);
        setError(json?.errors?.[0]?.message ?? "Something went wrong. Please email us directly.");
      }
    } catch {
      setSending(false);
      setError("Network error. Please email us directly at build@amplitude.ventures");
    }
  }

  return (
    <section className="relative bg-void min-h-[calc(100vh-80px)] pt-[120px] pb-24 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(var(--warm-white-rgb),0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Ghost label */}
      <div
        className="absolute top-16 right-0 leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(100px, 16vw, 200px)",
          color: "rgba(var(--warm-white-rgb),0.05)",
          letterSpacing: "0.01em",
        }}
        aria-hidden
      >
        TALK.
      </div>

      {/* Crimson radial glow — bottom area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 85%, rgba(var(--crimson-rgb),0.055) 0%, transparent 70%)",
        }}
      />

      {/* LogoMark — mid-right, ghosted */}
      <div className="absolute top-[40%] right-[-30px] hidden lg:block pointer-events-none select-none" aria-hidden>
        <LogoMark
          className="w-[220px] h-auto opacity-[0.06]"
          pillarColor="rgba(var(--warm-white-rgb),0.045)"
          archColor="rgba(var(--crimson-rgb),0.045)"
          strokeWidth={4}
          style={{ transform: "rotate(8deg)" }}
        />
      </div>

      {/* MiniOrbital — top-left */}
      <div className="absolute top-28 left-[4%] hidden lg:block w-[160px] h-[160px]">
        <MiniOrbital size={160} rings={2} tilt={-20} speed={75} ringColor="rgba(var(--crimson-rgb),0.1)" nodeColor="rgba(var(--crimson-rgb),0.45)" dotColor="rgba(var(--warm-white-rgb),0.18)" />
      </div>

      {/* PulseNode — bottom-right */}
      <div className="absolute bottom-20 right-[10%] hidden md:block w-[44px] h-[44px]">
        <PulseNode size={44} color="rgba(var(--crimson-rgb),0.18)" coreColor="rgba(var(--crimson-rgb),0.4)" pulseSpeed={3.8} />
      </div>

      {/* DashedArc — mid-section, flipped */}
      <div className="absolute top-[55%] left-[15%] hidden lg:block w-[220px] h-[120px]">
        <DashedArc width={220} height={120} color="rgba(var(--crimson-rgb),0.1)" dashArray="3 14" flip />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* ── Left: copy ── */}
          <div className="pt-4">
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 h-px bg-crimson" />
              <span
                className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Contact
              </span>
            </motion.div>

            <motion.h1
              className="text-warm-white leading-[0.88] mb-6"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(52px, 8vw, 120px)",
                letterSpacing: "0.02em",
              }}
              initial={{ opacity: 0, x: -28, filter: "blur(20px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
            >
              {contact.headline}
            </motion.h1>

            <motion.p
              className="text-warm-white/50 text-[20px] leading-relaxed max-w-[380px] mb-14 border-l-2 border-crimson/30 pl-5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease }}
            >
              {contact.sub}
            </motion.p>

            <motion.div
              className="flex flex-col gap-7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              {[
                {
                  label: "LinkedIn",
                  value: contact.linkedin,
                  href: contact.linkedin,
                  external: true,
                },
                { label: "Based in", value: "Stavanger, Norway" },
              ].map(({ label, value, href, external }) => (
                <div key={label}>
                  <p
                    className="text-warm-white/25 text-[12px] uppercase tracking-[0.2em] mb-1"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="text-warm-white text-[18px] hover:text-crimson transition-colors duration-200"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p
                      className="text-warm-white text-[18px]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24, filter: "blur(16px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 0.9, ease }}
          >
            <div className="relative border border-white/[0.07] bg-surface-2 rounded-2xl p-8 md:p-10 overflow-hidden">
              {/* Top glow */}
              <div
                className="absolute inset-x-0 top-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(var(--crimson-rgb),0.08), transparent)",
                }}
              />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                  {/* Formspree special fields */}
                  <input type="hidden" name="_subject" value="New submission from amplitude.ventures" />
                  <input type="hidden" name="_replyto" id="_replyto" />
                  <div>
                    <p
                      className="text-warm-white text-[22px] font-[400] mb-1"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Send us a brief
                    </p>
                    <p
                      className="text-warm-white/35 text-[15px]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Two sentences or ten pages — we read everything.
                    </p>
                  </div>

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Full Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        id="name"
                        name="Name"
                        type="text"
                        required
                        placeholder="Your name"
                        className={INPUT_CLS}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Email <span className="text-crimson">*</span>
                      </label>
                      <input
                        id="email"
                        name="Email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className={INPUT_CLS}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone + Role */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="Phone Number"
                        type="tel"
                        placeholder="+47 000 00 000"
                        className={INPUT_CLS}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="role" className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Role / Job Title
                      </label>
                      <input
                        id="role"
                        name="Role / Job Title"
                        type="text"
                        placeholder="Founder, CTO, etc."
                        className={INPUT_CLS}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      />
                    </div>
                  </div>

                  {/* Row 3: Company + Website */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Company / Startup Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        id="company"
                        name="Company / Startup Name"
                        type="text"
                        required
                        placeholder="Company or project name"
                        className={INPUT_CLS}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="website" className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Website URL
                      </label>
                      <input
                        id="website"
                        name="Website URL"
                        type="url"
                        placeholder="https://yourcompany.com"
                        className={INPUT_CLS}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      />
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="linkedin" className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                      LinkedIn Profile Link
                    </label>
                    <input
                      id="linkedin"
                      name="LinkedIn Profile Link"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      className={INPUT_CLS}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                  </div>

                  {/* Startup Stage — Radio */}
                  <div className="flex flex-col gap-3">
                    <p className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Startup Stage
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {STARTUP_STAGES.map((stage) => (
                        <label
                          key={stage}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="Startup Stage"
                            value={stage}
                            className="sr-only peer"
                          />
                          <span
                            className="px-4 py-2 rounded-full border border-white/[0.07] bg-surface-3 text-warm-white/50 text-[14px] transition-all duration-200 peer-checked:border-crimson/50 peer-checked:text-crimson peer-checked:bg-crimson/[0.08] hover:border-white/15 hover:text-warm-white/70"
                            style={{ fontFamily: "var(--font-dm-sans)" }}
                          >
                            {stage}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brief / Description */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="brief"
                      className={LABEL_CLS}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Tell us about your startup <span className="text-crimson">*</span>
                    </label>
                    <textarea
                      id="brief"
                      name="Brief"
                      required
                      rows={5}
                      placeholder="Tell us what you're building, where you are in the journey, and what kind of support you're looking for."
                      className={`${INPUT_CLS} resize-none`}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                  </div>

                  {/* Supporting Documents Link */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="documents" className={LABEL_CLS} style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Supporting Documents Link
                    </label>
                    <input
                      id="documents"
                      name="Supporting Documents Link"
                      type="url"
                      placeholder="Google Drive, Notion, or Dropbox link"
                      className={INPUT_CLS}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                    <p
                      className="text-warm-white/20 text-[12px]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Pitch deck, one-pager, or any relevant material.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 bg-crimson text-white rounded-full text-[16px] font-[500] hover:bg-crimson-dark disabled:opacity-50 transition-colors duration-200 tracking-wide"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {sending ? "Sending…" : "Send brief →"}
                  </button>

                  {error && (
                    <p
                      className="text-crimson text-[14px] -mt-3"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {error}
                    </p>
                  )}

                  <p
                    className="text-warm-white/20 text-[13px] -mt-3"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Average response time: 48 hours.
                  </p>
                </form>
              ) : (
                <motion.div
                  className="relative z-10 flex flex-col items-center justify-center py-16 text-center gap-6"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <div className="w-14 h-14 rounded-full border border-crimson/30 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                      <path
                        d="M4 11.5L8.5 16L18 7"
                        stroke="rgb(var(--crimson-rgb))"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-warm-white text-[22px] mb-2"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      Brief received.
                    </p>
                    <p
                      className="text-warm-white/40 text-[16px] max-w-[260px]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      We&apos;ll be in touch within 48 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
