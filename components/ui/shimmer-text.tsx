"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function ShimmerText({
  children,
  className,
  duration = 2.2,
  delay = 1.2,
}: ShimmerTextProps) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className={cn("inline-block", className)}
        style={{
          WebkitTextFillColor: "transparent",
          background:
            "currentColor linear-gradient(105deg, currentColor 0%, rgba(242,237,228,0.85) 38%, rgba(255,255,255,0.95) 50%, rgba(242,237,228,0.85) 62%, currentColor 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundRepeat: "no-repeat",
          backgroundSize: "200% 100%",
        } as React.CSSProperties}
        initial={{ backgroundPositionX: "200%" }}
        animate={{ backgroundPositionX: ["-200%", "300%"] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
