# Component Patterns

Reference for building new components consistently.

---

## Section Template

Every page section follows this shell:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { myContent } from "@/lib/content";

export default function MySection() {
  const ref = useRef<HTMLElement>(null);

  // Only add useScroll if you need parallax — don't add it for every section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="relative bg-void py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-8 md:px-12">

        {/* Section eyebrow */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="w-8 h-px bg-crimson" />
          <span
            className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            EYEBROW LABEL
          </span>
        </motion.div>

        {/* Section heading */}
        <motion.h2
          className="text-warm-white leading-none tracking-[0.02em] mb-16"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(52px, 8vw, 110px)" }}
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          SECTION HEADING
        </motion.h2>

        {/* Content */}

      </div>
    </section>
  );
}
```

---

## Scroll Entrance Variants

```tsx
// Standard (most elements)
initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}

// Heading — from left
initial={{ opacity: 0, x: -28 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}

// Right-column element — from right
initial={{ opacity: 0, x: 24 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}

// Staggered list (add delay per index)
transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}

// Fade only (subtle elements, backgrounds)
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
```

---

## Card Component

Standard dark card:
```tsx
<div className="group p-8 bg-surface-2 border border-white/[0.06] hover:border-crimson/30 transition-colors duration-300 rounded-sm">
  {/* Number/tag */}
  <span
    className="text-crimson/40 text-[13px] font-[600] uppercase tracking-[0.2em] block mb-4"
    style={{ fontFamily: "var(--font-dm-sans)" }}
  >
    01
  </span>

  {/* Card heading */}
  <h3
    className="text-warm-white text-[22px] mb-3 leading-tight"
    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
  >
    Card Title
  </h3>

  {/* Body */}
  <p
    className="text-warm-white/50 text-[16px] leading-relaxed"
    style={{ fontFamily: "var(--font-dm-sans)" }}
  >
    Card body text.
  </p>
</div>
```

---

## CTA Button Variants

### Primary (crimson filled)
```tsx
<Link
  href="/contact"
  className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white rounded-full text-[17px] font-[500] hover:bg-[#a80d25] transition-colors duration-200 tracking-wide whitespace-nowrap"
  style={{ fontFamily: "var(--font-dm-sans)" }}
>
  Start a conversation
  <span aria-hidden className="text-[17px]">→</span>
</Link>
```

### Ghost (text link)
```tsx
<Link
  href="/portfolio"
  className="text-warm-white/40 text-[17px] hover:text-warm-white transition-colors whitespace-nowrap"
  style={{ fontFamily: "var(--font-dm-sans)" }}
>
  See our portfolio
</Link>
```

### Small nav CTA
```tsx
<Link
  href="/contact"
  className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white text-[14px] font-[500] rounded-full hover:bg-[#a80d25] transition-colors duration-200 tracking-wide whitespace-nowrap"
  style={{ fontFamily: "var(--font-dm-sans)" }}
>
  Get in Touch
  <span aria-hidden className="text-[16px]">→</span>
</Link>
```

---

## Section Divider / Eyebrow Line

```tsx
{/* Horizontal rule with label */}
<div className="flex items-center gap-4 mb-8">
  <span className="w-8 h-px bg-crimson flex-shrink-0" />
  <span
    className="text-crimson text-[13px] font-[600] uppercase tracking-[0.3em]"
    style={{ fontFamily: "var(--font-dm-sans)" }}
  >
    Section Label
  </span>
</div>
```

---

## Parallax Watermark

Large decorative text that drifts on scroll:
```tsx
const ref = useRef<HTMLElement>(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

// In JSX:
<motion.div
  style={{ y }}
  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
  aria-hidden
>
  <span
    className="text-text-faint leading-none"
    style={{
      fontFamily: "var(--font-bebas)",
      fontSize: "clamp(120px, 25vw, 300px)",
      letterSpacing: "0.05em",
    }}
  >
    WATERMARK
  </span>
</motion.div>
```

---

## Auto-Advancing Tabs

Pattern from ServicesSection — advances automatically, pauses on user interaction:
```tsx
const [active, setActive] = useState(0);
const [paused, setPaused] = useState(false);

useEffect(() => {
  if (paused) return;
  const id = setInterval(() => {
    setActive((a) => (a + 1) % items.length);
  }, 7000);
  return () => clearInterval(id);
}, [paused, items.length]);

const handleClick = (i: number) => {
  setActive(i);
  setPaused(true); // Never auto-advance again after user interaction
};
```

---

## Counter Animation (StatsSection pattern)

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function CountUp({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setCount(Math.round(progress * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{count}</span>;
}
```

---

## Adding Content to `lib/content/index.ts`

Always add to the single file. Export pattern:
```ts
export const myNewContent = [
  {
    id: "unique-id",
    title: "Title string",
    body: "Body string.",
  },
];
```

Then import in the component:
```tsx
import { myNewContent } from "@/lib/content";
```

---

## Image Handling

Use `next/image` for all images:
```tsx
import Image from "next/image";

// Fixed size
<Image src="/logo.svg" alt="Amplitude Ventures" width={38} height={38} priority />

// Fill container
<div className="relative w-full aspect-[16/9]">
  <Image src="/portfolio/company.jpg" alt="Company name" fill className="object-cover" />
</div>
```

Local images go in `/public/`. Remote images need their hostname in `next.config.ts`.
