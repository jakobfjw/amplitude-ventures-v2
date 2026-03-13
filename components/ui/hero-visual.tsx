"use client";
import { motion } from "framer-motion";

/**
 * HeroVisual — abstract orbital/network visualization for the hero section.
 * Replaces the Spline 3D robot. Pure SVG + Framer Motion, zero external deps.
 *
 * Aesthetic: orbital VC metaphor — a central entity (AV) with portfolio companies
 * orbiting at different speeds and distances. Crimson/void palette.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  const cx = 320;
  const cy = 330;

  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ backgroundColor: "transparent" }}
    >
      <svg
        viewBox="0 0 640 660"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* Central crimson glow */}
          <radialGradient id="hv-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(var(--crimson-rgb),0.55)" />
            <stop offset="45%" stopColor="rgba(var(--crimson-rgb),0.12)" />
            <stop offset="100%" stopColor="rgba(var(--crimson-rgb),0)" />
          </radialGradient>
          {/* Soft outer haze */}
          <radialGradient id="hv-haze" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(var(--crimson-rgb),0.07)" />
            <stop offset="100%" stopColor="rgba(var(--crimson-rgb),0)" />
          </radialGradient>
        </defs>

        {/* ── BACKGROUND HAZE ── */}
        <ellipse cx={cx} cy={cy} rx={310} ry={310} fill="url(#hv-haze)" />

        {/* ── SCATTER DOTS (background depth) ── */}
        {([
          [cx + 215, cy - 240, 1.5, 0.12],
          [cx + 315, cy - 165, 1.0, 0.09],
          [cx - 215, cy - 210, 2.0, 0.09],
          [cx + 345, cy + 95,  1.5, 0.10],
          [cx - 195, cy + 215, 1.0, 0.07],
          [cx + 230, cy + 235, 2.0, 0.09],
          [cx - 255, cy + 140, 1.5, 0.07],
          [cx + 155, cy - 285, 1.0, 0.12],
          [cx - 295, cy - 55,  1.5, 0.07],
          [cx + 285, cy - 55,  1.0, 0.10],
          [cx - 140, cy + 270, 1.5, 0.09],
          [cx + 110, cy + 275, 1.0, 0.07],
        ] as [number, number, number, number][]).map(([x, y, r, op], i) => (
          <circle key={`d${i}`} cx={x} cy={y} r={r} fill={`rgba(var(--warm-white-rgb),${op})`} />
        ))}

        {/* ── OUTER ORBIT (slow, clockwise, tilted) ── */}
        <motion.g
          style={{ originX: cx, originY: cy }}
          animate={{ rotate: 360 }}
          transition={{ duration: 95, ease: "linear", repeat: Infinity }}
        >
          {/* Ring */}
          <ellipse
            cx={cx} cy={cy}
            rx={278} ry={88}
            fill="none"
            stroke="rgba(var(--warm-white-rgb),0.12)"
            strokeWidth="1"
            transform={`rotate(-22, ${cx}, ${cy})`}
          />
          {/* 5 nodes — mix of crimson (portfolio co.) and white (connection) */}
          <circle cx={cx + 278} cy={cy}        r={5.5} fill="rgba(var(--crimson-rgb),0.88)" />
          <circle cx={cx + 278} cy={cy}        r={14}  fill="rgba(var(--crimson-rgb),0.14)" />
          <circle cx={cx - 278} cy={cy}        r={3.5} fill="rgba(var(--warm-white-rgb),0.30)" />
          <circle cx={cx + 100} cy={cy + 83}   r={4.5} fill="rgba(var(--crimson-rgb),0.72)" />
          <circle cx={cx + 100} cy={cy + 83}   r={11}  fill="rgba(var(--crimson-rgb),0.13)" />
          <circle cx={cx - 160} cy={cy - 68}   r={3.0} fill="rgba(var(--warm-white-rgb),0.25)" />
          <circle cx={cx + 50}  cy={cy - 86}   r={2.5} fill="rgba(var(--warm-white-rgb),0.20)" />
        </motion.g>

        {/* ── MIDDLE ORBIT (medium speed, counter-clockwise) ── */}
        <motion.g
          style={{ originX: cx, originY: cy }}
          animate={{ rotate: -360 }}
          transition={{ duration: 58, ease: "linear", repeat: Infinity }}
        >
          <ellipse
            cx={cx} cy={cy}
            rx={172} ry={54}
            fill="none"
            stroke="rgba(var(--crimson-rgb),0.22)"
            strokeWidth="1.5"
            transform={`rotate(14, ${cx}, ${cy})`}
          />
          <circle cx={cx + 172} cy={cy}       r={6.5} fill="rgba(var(--crimson-rgb),0.92)" />
          <circle cx={cx + 172} cy={cy}       r={16}  fill="rgba(var(--crimson-rgb),0.13)" />
          <circle cx={cx - 172} cy={cy}       r={3.5} fill="rgba(var(--warm-white-rgb),0.40)" />
          <circle cx={cx}       cy={cy + 54}  r={4.5} fill="rgba(var(--warm-white-rgb),0.30)" />
          <circle cx={cx}       cy={cy - 54}  r={3.0} fill="rgba(var(--crimson-rgb),0.55)" />
        </motion.g>

        {/* ── INNER ORBIT (fast, clockwise, circular) ── */}
        <motion.g
          style={{ originX: cx, originY: cy }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          <circle
            cx={cx} cy={cy} r={90}
            fill="none"
            stroke="rgba(var(--warm-white-rgb),0.15)"
            strokeWidth="1"
          />
          <circle cx={cx + 90} cy={cy}  r={4.5} fill="rgba(var(--crimson-rgb),0.80)" />
          <circle cx={cx - 90} cy={cy}  r={2.5} fill="rgba(var(--warm-white-rgb),0.40)" />
          <circle cx={cx}      cy={cy + 90} r={3.0} fill="rgba(var(--warm-white-rgb),0.30)" />
        </motion.g>

        {/* ── STATIC CONNECTION LINES (center → outer nodes) ── */}
        <line
          x1={cx} y1={cy}
          x2={cx + 278} y2={cy}
          stroke="rgba(var(--crimson-rgb),0.12)"
          strokeWidth="0.5"
        />
        <line
          x1={cx} y1={cy}
          x2={cx - 160} y2={cy - 68}
          stroke="rgba(var(--crimson-rgb),0.09)"
          strokeWidth="0.5"
        />
        <line
          x1={cx} y1={cy}
          x2={cx + 172} y2={cy}
          stroke="rgba(var(--crimson-rgb),0.10)"
          strokeWidth="0.5"
        />

        {/* ── AMBIENT CORE GLOW ── */}
        <circle cx={cx} cy={cy} r={70} fill="url(#hv-core-glow)" />

        {/* ── CENTER RINGS ── */}
        {/* Outer pulse ring */}
        <motion.circle
          cx={cx} cy={cy} r={30}
          fill="none"
          stroke="rgba(var(--crimson-rgb),0.22)"
          strokeWidth="1"
          animate={{ r: [24, 38, 24], opacity: [0.25, 0.08, 0.25] }}
          transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity }}
        />
        {/* Static inner ring */}
        <circle cx={cx} cy={cy} r={16} fill="none" stroke="rgba(var(--crimson-rgb),0.38)" strokeWidth="1" />
        {/* Pulsing center dot */}
        <motion.circle
          cx={cx} cy={cy}
          fill="rgba(var(--crimson-rgb),0.95)"
          animate={{ r: [6.5, 9, 6.5] }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
        />
        {/* Crisp white core */}
        <circle cx={cx} cy={cy} r={3.5} fill="rgba(var(--warm-white-rgb),0.96)" />

        {/* ── FLOATING DATA FRAGMENTS (top-right decoration) ── */}
        <motion.g
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity }}
        >
          <rect x={cx + 240} y={cy - 188} width={54} height={1.5} fill="rgba(var(--crimson-rgb),0.32)" rx={1} />
          <rect x={cx + 240} y={cy - 178} width={34} height={1.0} fill="rgba(var(--warm-white-rgb),0.20)" rx={1} />
          <rect x={cx + 240} y={cy - 170} width={44} height={1.0} fill="rgba(var(--warm-white-rgb),0.15)" rx={1} />
        </motion.g>

        {/* ── FLOATING NODES (bottom-right decoration) ── */}
        <motion.g
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 9.5, ease: "easeInOut", repeat: Infinity, delay: 1.8 }}
        >
          <circle cx={cx + 298} cy={cy + 205} r={4} fill="none" stroke="rgba(var(--crimson-rgb),0.42)" strokeWidth="1.5" />
          <circle cx={cx + 272} cy={cy + 222} r={2.0} fill="rgba(var(--warm-white-rgb),0.28)" />
          <circle cx={cx + 318} cy={cy + 190} r={1.5} fill="rgba(var(--crimson-rgb),0.48)" />
        </motion.g>

        {/* ── DASHED ARC (upper-right flourish) ── */}
        <path
          d={`M ${cx + 195} ${cy - 250} A 280 280 0 0 1 ${cx + 290} ${cy - 100}`}
          fill="none"
          stroke="rgba(var(--crimson-rgb),0.14)"
          strokeWidth="1"
          strokeDasharray="3 10"
        />
      </svg>
    </motion.div>
  );
}
