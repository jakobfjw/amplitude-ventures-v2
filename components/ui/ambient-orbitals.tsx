"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────
   MINI ORBITAL — A smaller version of the hero's
   rotating ring system. Configurable ring count,
   speed, and tilt for unique per-section placement.
   ────────────────────────────────────────────── */
export function MiniOrbital({
  className = "",
  size = 240,
  rings = 2,
  tilt = -18,
  speed = 65,
  nodeColor = "rgba(200,16,46,0.6)",
  ringColor = "rgba(200,16,46,0.1)",
  dotColor = "rgba(242,237,228,0.2)",
}: {
  className?: string;
  size?: number;
  rings?: number;
  tilt?: number;
  speed?: number;
  nodeColor?: string;
  ringColor?: string;
  dotColor?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const ringConfigs = [
    { rx: size * 0.42, ry: size * 0.14, dur: speed, dir: 1 },
    { rx: size * 0.28, ry: size * 0.28, dur: speed * 0.55, dir: -1 },
    { rx: size * 0.16, ry: size * 0.08, dur: speed * 0.35, dir: 1 },
  ].slice(0, rings);

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        {/* Haze */}
        <circle cx={cx} cy={cy} r={size * 0.3} fill="rgba(200,16,46,0.03)" />

        {ringConfigs.map((ring, i) => (
          <motion.g
            key={i}
            style={{ originX: cx, originY: cy }}
            animate={{ rotate: ring.dir * 360 }}
            transition={{ duration: ring.dur, ease: "linear", repeat: Infinity }}
          >
            <ellipse
              cx={cx} cy={cy}
              rx={ring.rx} ry={ring.ry}
              fill="none"
              stroke={ringColor}
              strokeWidth={i === 0 ? 1 : 0.8}
              transform={`rotate(${tilt + i * 25}, ${cx}, ${cy})`}
            />
            {/* Primary node */}
            <circle
              cx={cx + ring.rx * 0.9} cy={cy}
              r={3.5 - i * 0.8}
              fill={nodeColor}
            />
            {/* Glow ring around primary node */}
            {i === 0 && (
              <circle
                cx={cx + ring.rx * 0.9} cy={cy}
                r={10}
                fill="rgba(200,16,46,0.06)"
              />
            )}
            {/* Secondary dot */}
            <circle
              cx={cx - ring.rx * 0.7} cy={cy + ring.ry * 0.5}
              r={2 - i * 0.3}
              fill={dotColor}
            />
          </motion.g>
        ))}

        {/* Center pulse */}
        <motion.circle
          cx={cx} cy={cy} r={8}
          fill="none"
          stroke="rgba(200,16,46,0.18)"
          strokeWidth={0.8}
          animate={{ r: [6, 14, 6], opacity: [0.2, 0.06, 0.2] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
        <circle cx={cx} cy={cy} r={3} fill="rgba(200,16,46,0.5)" />
        <circle cx={cx} cy={cy} r={1.5} fill="rgba(242,237,228,0.7)" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   DATA FRAGMENTS — Floating horizontal lines
   that bob gently, like data readouts from
   the hero's "floating data fragments."
   ────────────────────────────────────────────── */
export function DataFragments({
  className = "",
  count = 3,
  width = 60,
  color = "rgba(200,16,46,0.25)",
  secondaryColor = "rgba(242,237,228,0.1)",
  bobSpeed = 7,
  bobAmount = 10,
}: {
  className?: string;
  count?: number;
  width?: number;
  color?: string;
  secondaryColor?: string;
  bobSpeed?: number;
  bobAmount?: number;
}) {
  const lines = Array.from({ length: count }, (_, i) => ({
    w: width * (0.5 + Math.random() * 0.5),
    y: i * 12,
    isPrimary: i === 0,
  }));

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
      animate={{ y: [0, -bobAmount, 0] }}
      transition={{ duration: bobSpeed, ease: "easeInOut", repeat: Infinity }}
    >
      <svg viewBox={`0 0 ${width} ${count * 12 + 4}`} className="w-full h-full">
        {lines.map((line, i) => (
          <rect
            key={i}
            x={0} y={line.y}
            width={line.w}
            height={line.isPrimary ? 1.8 : 1}
            fill={line.isPrimary ? color : secondaryColor}
            rx={0.5}
          />
        ))}
      </svg>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   PULSE NODE — Expanding/contracting ring with
   a glowing center dot. Echoes the hero's center
   pulse ring motif.
   ────────────────────────────────────────────── */
export function PulseNode({
  className = "",
  size = 48,
  color = "rgba(200,16,46,0.35)",
  coreColor = "rgba(200,16,46,0.7)",
  pulseSpeed = 3.2,
}: {
  className?: string;
  size?: number;
  color?: string;
  coreColor?: string;
  pulseSpeed?: number;
}) {
  const c = size / 2;
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        {/* Outer expanding ring */}
        <motion.circle
          cx={c} cy={c}
          fill="none"
          stroke={color}
          strokeWidth={0.8}
          animate={{ r: [size * 0.2, size * 0.4, size * 0.2], opacity: [0.3, 0.08, 0.3] }}
          transition={{ duration: pulseSpeed, ease: "easeInOut", repeat: Infinity }}
        />
        {/* Static ring */}
        <circle cx={c} cy={c} r={size * 0.15} fill="none" stroke={color} strokeWidth={0.6} />
        {/* Core glow */}
        <circle cx={c} cy={c} r={size * 0.12} fill="rgba(200,16,46,0.06)" />
        {/* Core dot */}
        <motion.circle
          cx={c} cy={c}
          fill={coreColor}
          animate={{ r: [size * 0.04, size * 0.06, size * 0.04] }}
          transition={{ duration: pulseSpeed * 0.8, ease: "easeInOut", repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   DASHED ARC — A curved dashed flourish, echoing
   the hero's upper-right dashed arc motif.
   ────────────────────────────────────────────── */
export function DashedArc({
  className = "",
  width = 200,
  height = 120,
  color = "rgba(200,16,46,0.08)",
  dashArray = "3 10",
  flip = false,
}: {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  dashArray?: string;
  flip?: boolean;
}) {
  const d = flip
    ? `M 10 ${height - 10} A ${width} ${height} 0 0 1 ${width - 10} 10`
    : `M 10 10 A ${width} ${height} 0 0 1 ${width - 10} ${height - 10}`;

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeDasharray={dashArray}
        />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SCATTER FIELD — Random static dots that add
   depth, echoing the hero's background scatter dots.
   ────────────────────────────────────────────── */
export function ScatterField({
  className = "",
  count = 12,
  width = 300,
  height = 200,
  dotColor = "rgba(242,237,228,0.06)",
  accentColor = "rgba(200,16,46,0.12)",
  accentCount = 2,
}: {
  className?: string;
  count?: number;
  width?: number;
  height?: number;
  dotColor?: string;
  accentColor?: string;
  accentCount?: number;
}) {
  // Deterministic "random" positions via golden ratio
  const phi = 1.618033988749;
  const dots = Array.from({ length: count }, (_, i) => {
    const t = (i * phi) % 1;
    const u = ((i * phi * phi) % 1);
    return {
      x: t * width,
      y: u * height,
      r: 0.8 + (i % 3) * 0.6,
      isAccent: i < accentCount,
    };
  });

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={dot.r}
            fill={dot.isAccent ? accentColor : dotColor}
          />
        ))}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   FLOATING NODES — Small circle group that bobs,
   echoing the hero's bottom-right floating nodes.
   ────────────────────────────────────────────── */
export function FloatingNodes({
  className = "",
  bobSpeed = 9,
  bobAmount = 8,
}: {
  className?: string;
  bobSpeed?: number;
  bobAmount?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
      animate={{ y: [0, bobAmount, 0] }}
      transition={{ duration: bobSpeed, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
    >
      <svg viewBox="0 0 60 50" className="w-full h-full">
        {/* Hollow ring node */}
        <circle cx={25} cy={18} r={5} fill="none" stroke="rgba(200,16,46,0.35)" strokeWidth={1.2} />
        {/* Small solid dot */}
        <circle cx={10} cy={32} r={2} fill="rgba(242,237,228,0.22)" />
        {/* Tiny accent dot */}
        <circle cx={42} cy={12} r={1.5} fill="rgba(200,16,46,0.4)" />
        {/* Connection line */}
        <line x1={25} y1={18} x2={10} y2={32} stroke="rgba(200,16,46,0.08)" strokeWidth={0.5} />
      </svg>
    </motion.div>
  );
}
