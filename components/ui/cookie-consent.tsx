"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "av_cookie_consent";

type ConsentStatus = "pending" | "accepted" | "rejected";

/**
 * Reads consent status from localStorage.
 * Returns "pending" if nothing stored yet (first visit).
 */
function readConsent(): ConsentStatus {
  if (typeof window === "undefined") return "pending";
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return "pending";
}

/**
 * Lightweight GDPR cookie-consent banner.
 *
 * - Renders a slide-up banner when consent is "pending"
 * - Persists choice in localStorage (not a cookie)
 * - Exposes a global event `av:consent-change` so the analytics
 *   wrapper in layout.tsx can react immediately
 * - "Cookie Preferences" footer link dispatches `av:consent-reset`
 *   which re-shows the banner
 */
export default function CookieConsent() {
  const [, setStatus] = useState<ConsentStatus>("accepted"); // SSR-safe default
  const [visible, setVisible] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const current = readConsent();
    setStatus(current);
    if (current === "pending") setVisible(true);
  }, []);

  // Listen for reset event (from "Cookie Preferences" footer link)
  useEffect(() => {
    function handleReset() {
      localStorage.removeItem(CONSENT_KEY);
      setStatus("pending");
      setVisible(true);
    }
    window.addEventListener("av:consent-reset", handleReset);
    return () => window.removeEventListener("av:consent-reset", handleReset);
  }, []);

  const respond = useCallback((choice: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, choice);
    setStatus(choice);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("av:consent-change", { detail: choice }));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 inset-x-0 z-[9998] flex justify-center px-4 pb-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-[640px] bg-surface-2 border border-white/[0.07] rounded-2xl px-6 py-5 shadow-2xl">
            <p
              className="text-warm-white/70 text-[14px] leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              We use cookies for analytics and advertising measurement.
              Your data helps us improve and reach the right founders.{" "}
              <a
                href="/privacy"
                className="text-crimson hover:text-crimson/80 underline underline-offset-2 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => respond("accepted")}
                className="px-5 py-2.5 bg-crimson text-white rounded-full text-[13px] font-[500] hover:bg-crimson-dark transition-colors duration-200 tracking-wide"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Accept
              </button>
              <button
                onClick={() => respond("rejected")}
                className="px-5 py-2.5 border border-white/[0.12] text-warm-white/50 rounded-full text-[13px] font-[500] hover:text-warm-white/80 hover:border-white/[0.2] transition-colors duration-200 tracking-wide"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Reject
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook for other components to check consent status reactively.
 */
export function useConsentStatus(): ConsentStatus {
  const [status, setStatus] = useState<ConsentStatus>(() => readConsent());

  useEffect(() => {
    function handleChange(e: Event) {
      const detail = (e as CustomEvent).detail as ConsentStatus;
      setStatus(detail);
    }
    window.addEventListener("av:consent-change", handleChange);
    return () => window.removeEventListener("av:consent-change", handleChange);
  }, []);

  return status;
}
