"use client";

import { motion, type SVGMotionProps } from "framer-motion";

/**
 * Amplitude Ventures logo mark — three interlocking rounded arches.
 * Tall center pillar + two shorter crimson arches.
 *
 * Props:
 * - pillarColor: color of the tall center arch (default: warm-white at 8% opacity)
 * - archColor: color of the two crimson arches (default: crimson at 8% opacity)
 * - animate: enable a subtle draw-on entrance animation
 */
interface LogoMarkProps {
  className?: string;
  pillarColor?: string;
  archColor?: string;
  animate?: boolean;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

export default function LogoMark({
  className = "",
  pillarColor = "rgba(242,237,228,0.08)",
  archColor = "rgba(200,16,46,0.08)",
  animate = false,
  strokeWidth = 8,
  style,
}: LogoMarkProps) {
  const pathProps: SVGMotionProps<SVGPathElement> = animate
    ? {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  return (
    <svg
      viewBox="0 0 400 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Left arch — crimson, medium height */}
      <motion.path
        d="M 60 480 L 60 240 Q 60 160 140 160 L 160 160 Q 200 160 200 240 L 200 480"
        stroke={archColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...pathProps}
      />

      {/* Center tall pillar — white/light, tallest */}
      <motion.path
        d="M 150 480 L 150 70 Q 150 20 200 20 L 200 20 Q 250 20 250 70 L 250 480"
        stroke={pillarColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...(animate
          ? {
              ...pathProps,
              transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
            }
          : {})}
      />

      {/* Right arch — crimson, shortest + widest */}
      <motion.path
        d="M 200 480 L 200 320 Q 200 270 250 270 L 310 270 Q 360 270 360 320 L 360 480"
        stroke={archColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...(animate
          ? {
              ...pathProps,
              transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
            }
          : {})}
      />
    </svg>
  );
}
