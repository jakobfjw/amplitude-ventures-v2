# Amplitude Ventures — Claude Code Reference

> ## ⛔ LEGACY PROJECT — DO NOT EDIT
> **This is an old version of the Amplitude Ventures website. It is no longer active.**
> The canonical production project is at `/Users/jakobwredstrom/Desktop/amplitude-ventures-new`.
> Do not make changes here. All future work goes to `amplitude-ventures-new`.

> **For new agents**: Read this entire file before touching anything. It documents the exact current state of the project, all naming conventions, patterns to follow, and what is and isn't done. Do not assume based on file names — the source of truth is here.

---

## What this project is

Production website for **Amplitude Ventures**, a Scandinavian early-stage VC firm.

**Aesthetic direction**: _Editorial dark luxury_ — near-black void background (`#080808`), crimson accents (`#C8102E`), massive Bebas Neue display type colliding with Cormorant Garamond italic, generous white space, zero decorative clutter. Think _Kinfolk_ meets _The Economist_ meets a Bloomberg terminal.

**Dev server**: `npm run dev` → http://localhost:3003
(Port is hardcoded in package.json. Do NOT change it.)

---

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server + Client components, `<Image>` optimisation |
| Styling | Tailwind CSS v4 | Utility-first; all tokens in `app/globals.css` |
| Animation | Framer Motion | `whileInView`, springs, `useScroll`/`useTransform`, SVG orbits |
| Fonts | Google Fonts via `next/font` | Bebas Neue, Cormorant, DM Sans — loaded in `app/layout.tsx` |
| Language | TypeScript | Strict mode |
| Hero visual | Custom SVG + Framer Motion | `components/ui/hero-visual.tsx` — NO Spline, no external CDN |

> **Note**: The Spline 3D robot that was in the hero section has been **permanently removed** and replaced with `HeroVisual`. The file `components/ui/splite.tsx` (the old Spline wrapper) still exists but is unused — it can be deleted.

---

## Design Tokens

Defined in `app/globals.css` via `@theme inline`. **Never change these without a full QA pass.**

| Token | Value | Usage |
|---|---|---|
| `bg-void` | `#080808` | Main background — used on `<main>` |
| `bg-surface` | `#0f0f0f` | Alternate section backgrounds |
| `bg-surface-2` | `#171717` | Cards, panels |
| `bg-surface-3` | `#1f1f1f` | Nested card elements |
| `text-crimson` | `#C8102E` | Brand accent — CTAs, highlights, italic lines |
| `crimson-dim` | `rgba(200,16,46,0.15)` | Subtle crimson fills |
| `text-warm-white` | `#F2EDE4` | Primary body text |
| `text-muted` | `#666666` | Secondary/meta text |
| `text-faint` | `#2e2e2e` | Barely-visible decorative text |

### Global CSS utilities (also in `globals.css`)
- **Film grain overlay** — `body::after` pseudo-element, `opacity: 0.03`, z-index 9999, always on top
- **Custom scrollbar** — 3px wide, crimson thumb
- **Selection highlight** — crimson background
- **Ticker marquee** — `.ticker-track` with 28s linear loop
- **Ring rotations** — `.ring-cw-1`, `.ring-cw-2`, `.ring-ccw-1`, `.ring-ccw-2` — used in ServicesSection

---

## Font Variables

```tsx
var(--font-bebas)      // Bebas Neue — display/headline, ALL-CAPS only, weight: 400
var(--font-cormorant)  // Cormorant Garamond — italic accents, weights: 300–700
var(--font-dm-sans)    // DM Sans — body copy, UI labels, weights: 300–600
```

**Rule**: Always set `fontFamily` inline with `style={{ fontFamily: "var(--font-bebas)" }}`.
Never set font family in Tailwind `className` — it won't resolve to the CSS variable correctly.

---

## Folder Structure

```
amplitude-ventures-v2/
├── app/
│   ├── layout.tsx          ← Root layout: fonts declared, <Spotlight /> mounted, metadata
│   ├── page.tsx            ← Home page: imports and renders all sections in order
│   └── globals.css         ← Tailwind v4 config, all design tokens, CSS utilities
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      ← Fixed header, transparent→blurred on scroll, TubelightNav, logo
│   │   └── Footer.tsx      ← Bottom links, copyright, social icons
│   │
│   ├── sections/           ← One file per page section, rendered in order in page.tsx
│   │   ├── HeroSection.tsx         ← Typographic collision (Bebas/Cormorant), HeroVisual orbital
│   │   ├── TickerSection.tsx       ← Horizontal marquee of portfolio company names
│   │   ├── WhoSection.tsx          ← Sticky heading + 3 founder type cards + parallax watermark
│   │   ├── ServicesSection.tsx     ← Auto-advancing tabs (7s) + CSS ring visual
│   │   ├── PrinciplesSection.tsx   ← Accordion, alternating left/right entrance animations
│   │   ├── StatsSection.tsx        ← Animated CountUp numbers + "AV" parallax drift
│   │   ├── TestimonialsSection.tsx ← Auto-advancing quote carousel (5.5s), pauses on hover
│   │   ├── BlogSection.tsx         ← Featured post (large) + 2 smaller cards
│   │   ├── FooterCta.tsx           ← Full-bleed crimson section, split-word entrance animation
│   │   └── (index pages needed)   ← /portfolio, /about, /contact, /blog/[slug] NOT BUILT YET
│   │
│   └── ui/
│       ├── hero-visual.tsx         ← Abstract orbital SVG animation (pure SVG + Framer Motion)
│       ├── spotlight.tsx           ← Fixed crimson mouse-tracking glow (mounted in layout)
│       ├── tubelight-navbar.tsx    ← Shared-layout "lamp" indicator for nav items
│       └── splite.tsx              ← UNUSED — old Spline wrapper, safe to delete
│
├── lib/
│   ├── content/
│   │   └── index.ts        ← ALL site copy: nav, hero, stats, who, services, principles,
│   │                          testimonials, blogPosts — single file, single import point
│   └── utils.ts            ← `cn()` utility (clsx + tailwind-merge)
│
├── public/
│   └── logo.svg            ← DROP THE REAL LOGO HERE. File expected but may not exist yet.
│                             If missing, Navbar shows text-only wordmark "AMPLITUDE / ventures"
│
├── next.config.ts          ← Allows framerusercontent.com images (legacy, can be cleaned up)
├── package.json            ← `dev` script hardcoded to port 3003
├── tsconfig.json           ← @/* alias → root
└── CLAUDE.md               ← This file
```

---

## Content Data (`lib/content/index.ts`)

**All copy lives here.** Never hardcode strings in components. Import like:
```tsx
import { hero, stats, services, testimonials } from "@/lib/content";
```

Current exports:
| Export | Type | Used in |
|---|---|---|
| `nav` | `{ links[], cta }` | Navbar.tsx |
| `ticker` | `string[]` | TickerSection |
| `hero` | `{ eyebrow, lineOne, lineTwo, lineThree, sub }` | HeroSection |
| `stats` | `{ number, suffix, label }[]` | HeroSection |
| `whoWeWorkWith` | `{ num, title, body, tag }[]` | WhoSection |
| `services` | `{ id, title, headline, body, detail }[]` | ServicesSection |
| `principles` | `{ num, title, body }[]` | PrinciplesSection |
| `testimonials` | `{ quote, name, role, co }[]` | TestimonialsSection |
| `blogPosts` | `{ slug, category, title, excerpt, date, readTime }[]` | BlogSection |

---

## Component: HeroVisual (`components/ui/hero-visual.tsx`)

This is the orbital SVG animation on the right side of the hero. It replaced the Spline 3D robot.

**Architecture**: Three concentric elliptical orbits rotating at different speeds around a central pulsing node:
- **Outer orbit**: 95s clockwise, tilted −22°, 5 nodes (crimson + white mix)
- **Middle orbit**: 58s counter-clockwise, tilted +14°, 5 nodes
- **Inner orbit**: 30s clockwise, circular, 3 nodes

**Key Framer Motion pattern for SVG rotation**:
```tsx
<motion.g
  style={{ originX: cx, originY: cy }}  // SVG user-space coordinates, not CSS %
  animate={{ rotate: 360 }}
  transition={{ duration: 95, ease: "linear", repeat: Infinity }}
>
```
`originX`/`originY` must be raw numbers matching the SVG coordinate system — NOT `"50%"`.

**Center point**: `cx = 320`, `cy = 330` (in a `viewBox="0 0 640 660"` SVG)

Only visible on desktop (`hidden lg:flex` wrapper in HeroSection). Gradient fades on left, top, and bottom edges blend it into the background.

---

## Component: Spotlight (`components/ui/spotlight.tsx`)

Mounted once in `app/layout.tsx`. Tracks `mousemove` globally. Always `position: fixed`, `z-index: 3`.

**Current opacity**: `rgba(200,16,46,0.13)` at center → `rgba(200,16,46,0.04)` at 50% → transparent at 72%.
To strengthen: increase the first alpha value. To remove: delete `<Spotlight />` from `app/layout.tsx`.

---

## Component: Navbar (`components/layout/Navbar.tsx`)

- Transparent at page top, blurs to `bg-[#080808]/92` on scroll (threshold: 32px)
- Uses `TubelightNav` (`components/ui/tubelight-navbar.tsx`) for the desktop nav — shared-layout `layoutId="tubelight-lamp"` animates the active indicator
- Logo: `<Image src="/logo.svg" />` with `onError` fallback that hides the broken img. If `/public/logo.svg` doesn't exist, the text wordmark "AMPLITUDE / ventures" renders cleanly
- Mobile: full-screen drawer with staggered entrance animations

**Nav items** (defined in `NAV_ITEMS` array at top of Navbar.tsx):
Home, About Us, Services, Portfolio, Blog, Contact

---

## Animation Patterns

Follow these **exactly** for consistency across sections:

### Standard scroll entrance
```tsx
initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
```

### Directional entrance rules
| Element type | Direction | Value |
|---|---|---|
| Section headings | Slide from left | `x: -28` |
| Right-column content | Slide from right | `x: 24` |
| Accordion items | Alternating per index | `x: i % 2 === 0 ? -24 : 24` |
| FooterCta word split | "READY TO" from left, "build?" from right | |

### Hero section entrance (page load, not scroll)
```tsx
initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
```

### Parallax watermarks
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); // WhoSection
const x = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);  // StatsSection
```

### Auto-advancing UI timers
- **ServicesSection**: `setInterval(7000)` — pauses **permanently** on user click
- **TestimonialsSection**: `setInterval(5500)` — pauses on hover, resumes on mouseLeave

---

## Rules — Never Break These

1. **Content in `lib/content/` only** — never hardcode strings in components
2. **Always use font variables** — `style={{ fontFamily: "var(--font-bebas)" }}` — never `font-sans` in className
3. **`"use client"` on every section** — they all use Framer Motion hooks
4. **Design token names** — always `bg-void`, `text-crimson`, `text-warm-white` etc.; never hardcode hex in className
5. **No heavy CDN dependencies in hero** — HeroVisual is intentionally pure SVG + Framer. Keep it that way.
6. **No `position: absolute` mouse tracking** — anything tracking mouse position must be `position: fixed` (see Spotlight)
7. **Port 3003** — always. Don't change start scripts.
8. **Don't add Inter/Roboto/Arial** — only Bebas, Cormorant, DM Sans

---

## `preview_start` MCP Note

The `preview_start` MCP tool **cannot** serve this project because it requires the cwd to be relative to the Claude Code session root. To check if the dev server is running:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3003
# Should return: 200
```
To start: `cd /Users/jakobwredstrom/Desktop/amplitude-ventures-v2 && npm run dev`

---

## What Is and Isn't Built

### ✅ Complete — Home page (`/`)
| Section | File | Status |
|---|---|---|
| Navbar | `components/layout/Navbar.tsx` | ✅ Done |
| Hero | `components/sections/HeroSection.tsx` | ✅ Done — uses HeroVisual (orbital SVG), no Spline |
| Ticker | `components/sections/TickerSection.tsx` | ✅ Done |
| Who We Work With | `components/sections/WhoSection.tsx` | ✅ Done |
| Services | `components/sections/ServicesSection.tsx` | ✅ Done |
| Principles | `components/sections/PrinciplesSection.tsx` | ✅ Done |
| Stats | `components/sections/StatsSection.tsx` | ✅ Done |
| Testimonials | `components/sections/TestimonialsSection.tsx` | ✅ Done |
| Blog Preview | `components/sections/BlogSection.tsx` | ✅ Done |
| Footer CTA | `components/sections/FooterCta.tsx` | ✅ Done |
| Footer | `components/layout/Footer.tsx` | ✅ Done |

### ❌ Not Yet Built — Inner Pages
| Page | Route | Notes |
|---|---|---|
| Portfolio | `/portfolio` | List of portfolio companies |
| About | `/about` | Team bios, firm story |
| Contact | `/contact` | Form + contact info |
| Blog index | `/blog` | List of all posts |
| Blog post | `/blog/[slug]` | Individual article — slug from `blogPosts` in content |

### ⚠️ Pending / Known Issues
- **`/public/logo.svg`** — may not exist. Drop the real SVG there; Navbar auto-picks it up.
- **`components/ui/splite.tsx`** — dead file (old Spline wrapper). Safe to delete.
- **`next.config.ts`** — still allowlists `framerusercontent.com`. Can be removed since logo no longer uses it.
- **No CMS** — blog posts are static in `lib/content/`. Add MDX or Sanity for production.
- **No forms backend** — `/contact` page doesn't exist yet and will need form handling (Resend, Formspree, etc.)
- **Mobile QA** — not formally done. Hero's orbital visual is already hidden on mobile (`hidden lg:flex`).
- **Not deployed** — use `/vercel:deploy` skill when ready.

---

## Adding Inner Pages — Step-by-Step

1. Create `app/[route]/page.tsx` — Server Component is fine (no animations needed at route level)
2. Add `"use client"` sections under `components/sections/` as needed
3. Content goes in `lib/content/index.ts` — add new exports
4. Follow animation patterns from this doc
5. Test: `npm run build` must pass with zero TypeScript errors

---

## Deployment

Run the deploy skill: `/vercel:deploy`

Or manually:
```bash
npm run build   # must pass cleanly first
npx vercel      # follow prompts
```

Environment: no env vars needed currently (no database, no CMS, no API keys).

---

## Session Context Tips for Agents

- The `.bashrc` spits `pyenv`/`nvm` warnings on every Bash call — **these are harmless**, ignore them
- `npm run build` is the ground truth for "does the code work" — run it before claiming anything is done
- The project is at `/Users/jakobwredstrom/Desktop/amplitude-ventures-v2/`
- All imports use `@/` alias → project root (configured in `tsconfig.json`)
