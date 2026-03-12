# Design System Reference

## Brand Identity

**Firm**: Amplitude Ventures
**Tagline**: "From Idea to Investor Ready"
**Aesthetic**: Editorial dark luxury — high-contrast void black + crimson, dramatic typography

---

## Colour Palette

| Name | Token | Hex / Value | Use case |
|---|---|---|---|
| Void | `bg-void` | `#080808` | Page background |
| Surface | `bg-surface` | `#0f0f0f` | Alternate section BG |
| Surface 2 | `bg-surface-2` | `#171717` | Cards, panels |
| Surface 3 | `bg-surface-3` | `#1f1f1f` | Nested elements |
| Crimson | `text-crimson` | `#C8102E` | CTAs, accent text, highlights |
| Crimson dim | `crimson-dim` | `rgba(200,16,46,0.15)` | Subtle crimson fills |
| Warm White | `text-warm-white` | `#F2EDE4` | Primary text |
| Muted | `text-muted` | `#666666` | Secondary/meta text |
| Faint | `text-faint` | `#2e2e2e` | Decorative / barely visible |

### Opacity scale (for rgba crimson)
| Purpose | Alpha | Example |
|---|---|---|
| Spotlight inner | 0.13 | Mouse-tracking glow |
| Spotlight mid | 0.04 | Mouse-tracking glow |
| Orbit ring stroke | 0.14 | SVG ring in HeroVisual |
| Node glow halo | 0.07–0.10 | SVG node halos |
| Connection lines | 0.05–0.07 | SVG static lines |

---

## Typography

### Font Stack

| Role | Font | Variable | Weights |
|---|---|---|---|
| Display / Headlines | Bebas Neue | `var(--font-bebas)` | 400 only |
| Serif / Italic accent | Cormorant Garamond | `var(--font-cormorant)` | 300–700, normal + italic |
| Body / UI | DM Sans | `var(--font-dm-sans)` | 300–600 |

**Rule**: Always set fontFamily inline:
```tsx
style={{ fontFamily: "var(--font-bebas)" }}
```
Never use `font-display`, `font-serif`, or `font-sans` as Tailwind class names — they resolve to system fonts, not our variables.

### Typographic Scale (current usage)

| Element | Font | Size | Notes |
|---|---|---|---|
| Hero H1 line 1 (WE BACK) | Bebas | `clamp(70px, 15vw, 210px)` | tracking 0.02em |
| Hero H1 line 2 (Extraordinary) | Cormorant italic | `clamp(37px, 12vw, 175px)` | crimson, weight 400 |
| Hero H1 line 3 (FOUNDERS.) | Bebas | `clamp(70px, 15vw, 210px)` | outlined stroke only |
| Section heading | Bebas | `clamp(52px, 8vw, 110px)` | tracking varies |
| Stat numbers | Bebas | `clamp(40px, 5vw, 58px)` | |
| Body copy | DM Sans | 18–20px | weight 400 |
| Small labels | DM Sans | 13–14px | uppercase, tracking 0.2–0.3em |
| Eyebrow tags | DM Sans | 12–13px | uppercase, crimson |
| Navbar wordmark "AMPLITUDE" | Bebas | 18px | tracking 0.1em |
| Navbar wordmark "ventures" | Cormorant italic | 11px | crimson, weight 400 |

### Hero outlined text technique
```tsx
style={{
  fontFamily: "var(--font-bebas)",
  WebkitTextStroke: "1.5px rgba(242,237,228,0.4)",
  color: "transparent",
}}
```

---

## Spacing & Layout

- **Max content width**: `max-w-[1400px] mx-auto`
- **Horizontal padding**: `px-8 md:px-12`
- **Section vertical rhythm**: `py-24 md:py-36` (most sections)
- **Navbar height**: `h-[72px]`
- **Logo size**: 38×38px

---

## Animation System

### Easing
All animations use `[0.22, 1, 0.36, 1]` — an ease-out cubic with fast acceleration and long tail (like spring but deterministic).

### Durations
- **Page load / hero**: 0.9s per element, staggered by ~0.2s
- **Scroll reveal**: 0.7s
- **Hover transitions**: 0.2s (CSS transitions, not Framer)
- **Auto-advance intervals**: 7s (services), 5.5s (testimonials)
- **Orbital rotations**: 30s (inner), 58s (middle), 95s (outer)

### Blur reveal (signature effect)
All entrance animations include a blur that clears on reveal — gives the "materialise from void" look:
```tsx
initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
```

---

## Decorative Elements

### Film grain
`body::after` in globals.css — SVG fractalNoise filter, opacity 0.03, z-index 9999. Adds premium tactile quality. Do not remove.

### Spotlight
`components/ui/spotlight.tsx` — mouse-tracking crimson radial gradient, `position: fixed`. Mounted in layout — present on every page.

### Parallax watermarks
- WhoSection: large "WE BACK" or founder type text drifts on vertical scroll
- StatsSection: large "AV" text drifts horizontally

### Orbital visual (hero only)
`components/ui/hero-visual.tsx` — desktop only (`hidden lg:flex`). Three rotating elliptical orbits with crimson nodes around a pulsing center core.

---

## What Makes This Aesthetic Work

1. **Scale contrast** — Bebas at 200px next to 18px body text
2. **Typeface collision** — condensed sans (Bebas) overlapping italic serif (Cormorant)
3. **Colour restraint** — almost exclusively black + one accent (crimson). Warm white text, never pure white.
4. **Motion restraint** — blur reveals feel expensive because they're used judiciously, not on everything
5. **The outlined type** — transparent fill with stroke creates depth without adding colour
6. **Film grain** — almost invisible but felt; eliminates the "flat digital" quality
7. **Crimson scrollbar** — tiny brand touch that rewards attention-to-detail designers

---

## Don't Do List

- ❌ Purple gradients or any gradient-heavy backgrounds
- ❌ Inter, Roboto, Arial, system-ui as primary fonts
- ❌ White or light backgrounds
- ❌ Rounded card corners above 8px (we use `rounded-md` max on most elements)
- ❌ Icon-heavy UI — keep icons rare and meaningful
- ❌ Drop shadows (use translucent overlays instead)
- ❌ Coloured backgrounds for sections other than void/surface shades (exception: FooterCta uses crimson deliberately)
