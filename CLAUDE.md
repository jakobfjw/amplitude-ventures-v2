# Amplitude Ventures v2 — Codebase & Brand Reference

> **Production site**: `http://172.239.240.151:4000` (Linode VPS, nginx static)
> **Dev server**: `npm run dev` → `http://localhost:3003`
> **Project path**: `/Users/jakobwredstrom/Desktop/New website/amplitude-ventures-v2/`

---

## 1 · What This Is

Production marketing website for **Amplitude Ventures**, a Scandinavian pre-seed venture studio based in Stavanger, Norway. They co-build with early-stage founders — product, validation, sales, and fundraising — from first idea to investor-ready company.

The site is a fully static Next.js export (no server runtime), deployed to a Linode VPS via rsync and served by nginx.

---

## 2 · Stack

| Layer | Choice | Version | Notes |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 | Static export (`output: "export"`) |
| Styling | Tailwind CSS | v4 | `@theme inline` tokens in `globals.css` |
| Animation | Framer Motion | 12.35.x | `whileInView`, springs, `useScroll`/`useTransform` |
| Fonts | Google Fonts via `next/font` | — | Bebas Neue, Cormorant Garamond, DM Sans |
| Icons | Lucide React | 0.577.x | Only a handful used (Linkedin, nav icons) |
| Language | TypeScript | 5.x | Strict mode |
| Build | Static HTML export | — | `npm run build` → `out/` directory |
| Deploy | rsync over SSH to Linode | — | nginx serves port 4000 |

### Key Architectural Decisions

- **Static export** — no server-side rendering, no API routes, no middleware. Every page is pre-rendered to HTML at build time. This means `output: "export"` in `next.config.ts` and `images: { unoptimized: true }`.
- **No CMS** — all content lives in `lib/content/index.ts`. Blog posts are static objects. This is intentional for v2; a CMS (Sanity, MDX) may be added later.
- **No external dependencies for the hero** — the orbital animation is pure SVG + Framer Motion. No Spline, no Three.js, no CDN-hosted 3D.

---

## 3 · Brand Identity

### 3.1 Aesthetic Direction

**Editorial dark luxury** — the visual language sits at the intersection of high-end editorial design and financial authority. Think _Kinfolk_ meets _The Economist_ meets a Bloomberg terminal.

| Principle | Execution |
|---|---|
| **Near-black void** | `#080808` background everywhere. Never gray, never blue-black. |
| **Crimson as the only accent** | `#C8102E`. Used for CTAs, italic lines, hover states, subtle glows. Never another color. |
| **Warm white, not pure white** | `#F2EDE4` for text. Cream-toned, not clinical. |
| **Massive type collisions** | Bebas Neue at 100–160px clamp sizes slamming into Cormorant italic. Headlines are architecture, not decoration. |
| **Generous negative space** | Sections breathe. Content is never cramped. |
| **Film grain overlay** | A barely-visible SVG noise texture sits over the entire page (`opacity: 0.03`). This adds organic warmth to the digital surface. |
| **Crosshair cursor** | Everywhere — intentional, unconventional, signals precision. |

### 3.2 Color Palette

| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| Void | `#080808` | `bg-void` | Primary background — `<main>`, `<body>` |
| Surface | `#0f0f0f` | `bg-surface` | Alternate section backgrounds |
| Surface 2 | `#171717` | `bg-surface-2` | Cards, panels |
| Surface 3 | `#1f1f1f` | `bg-surface-3` | Nested card elements |
| Crimson | `#C8102E` | `text-crimson` / `bg-crimson` | Brand accent — CTAs, highlights, italic text |
| Crimson Dim | `rgba(200,16,46,0.15)` | `bg-crimson-dim` | Subtle crimson fills, glow effects |
| Crimson Dark | `#a80d25` | `bg-crimson-dark` | Hover state for crimson buttons/CTAs |
| Warm White | `#F2EDE4` | `text-warm-white` | Primary body text, headlines |
| Muted | `#666666` | `text-muted` | Secondary/meta text |
| Faint | `#2e2e2e` | `text-faint` | Barely-visible decorative text |

**Opacity conventions** used throughout:
- `text-warm-white/80` — primary readable text
- `text-warm-white/50` — body paragraphs
- `text-warm-white/35` — secondary info, labels
- `text-warm-white/15` — tags, borders, ghost elements
- `border-white/[0.06]` — subtle dividers
- `bg-crimson/[0.03]` — barely-there warmth overlays

### 3.3 Typography

Three fonts. No exceptions. Never add Inter, Roboto, Arial, or system fonts.

| Font | Variable | Role | Weights | Usage Notes |
|---|---|---|---|---|
| **Bebas Neue** | `var(--font-bebas)` | Display headlines | 400 only | ALL-CAPS always. Used at massive sizes (52px–160px clamped). The voice of authority. |
| **Cormorant Garamond** | `var(--font-cormorant)` | Italic accents, pull quotes | 300–700, normal + italic | Used italic for subheadlines, last names, quotes. The voice of elegance. |
| **DM Sans** | `var(--font-dm-sans)` | Body copy, UI labels, buttons | 300–600 | The workhorse. Clean, modern, readable. |

**Critical rule**: Always set font family with `style={{ fontFamily: "var(--font-bebas)" }}`. **Never** use `className="font-display"` or similar — Tailwind v4 variable resolution doesn't work correctly with `next/font` class injection.

### 3.4 Type Hierarchy Examples

```
Page headline:     Bebas Neue, clamp(72px, 11vw, 160px), warm-white, leading-[0.86]
Subheadline:       Cormorant italic, clamp(40px, 7vw, 100px), crimson, leading-none
Section heading:   Bebas Neue, clamp(52px, 7vw, 96px), warm-white
Body paragraph:    DM Sans, 18px, warm-white/50, leading-relaxed
Eyebrow label:     DM Sans, 13px, crimson, font-600, uppercase, tracking-[0.3em]
Tag/pill:          DM Sans, 10–11px, warm-white/15, uppercase, tracking-[0.22em]
Pull quote:        Cormorant italic, clamp(28px, 4vw, 52px), warm-white/80
```

### 3.5 Logo

The logo is a text wordmark: **"AMPLITUDE VENTURES"** in a condensed sans-serif. Stored at `/public/logo-main.png`.

- **Navbar**: 28px height, white on transparent
- **Footer**: 24px height, 55% opacity, hover to 75%
- No icon mark is used on the live site (legacy icon marks exist in `/public/` but are unused)

### 3.6 Photography Treatment

Team photos use a cinematic grading system to dissolve into the dark background:

```css
filter: brightness(0.68) contrast(0.88) saturate(0.15)
```

Plus multi-layer gradient overlays:
- **Bottom**: Strong dissolve to void (`from-[#080808] via-[#080808]/40`)
- **Top**: Subtle haze (`from-[#080808]/50`)
- **Side**: Directional bleed toward the text block
- **Film grain**: SVG noise at `opacity: 0.07`, `mix-blend-overlay`
- **Crimson warmth**: `bg-crimson/[0.03] mix-blend-color` for subtle warm toning

This creates portraits that feel embedded in the page rather than floating on it.

---

## 4 · Folder Structure

```
amplitude-ventures-v2/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, JSON-LD, Spotlight
│   ├── page.tsx                # Home — renders all sections in order
│   ├── globals.css             # Tailwind v4 tokens, film grain, scrollbar, animations
│   ├── not-found.tsx           # Custom 404
│   ├── robots.ts               # SEO robots config
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── about/page.tsx          # /about — team bios, firm story
│   ├── blog/page.tsx           # /blog — all posts index
│   │   └── [slug]/page.tsx     # /blog/:slug — individual articles
│   ├── contact/page.tsx        # /contact — contact form
│   ├── offering/page.tsx       # /offering — service pillars
│   └── portfolio/page.tsx      # /portfolio — company grid
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed header, scroll-blur, TubelightNav, mobile drawer
│   │   └── Footer.tsx          # Column links, logo, copyright, motto
│   │
│   ├── sections/               # One file per page section (all "use client")
│   │   ├── HeroSection.tsx     # Typographic collision + HeroVisual orbital
│   │   ├── TickerSection.tsx   # Bi-directional marquee of portfolio names
│   │   ├── WhoSection.tsx      # Sticky heading + 4 founder-type accordion cards
│   │   ├── ServicesSection.tsx  # Auto-advancing tabs (7s) + CSS ring visual
│   │   ├── PrinciplesSection.tsx # Accordion, alternating entrance animations
│   │   ├── StatsSection.tsx    # Animated CountUp numbers + "AV" parallax drift
│   │   ├── TestimonialsSection.tsx # Auto-advancing quote carousel (5.5s)
│   │   ├── BlogSection.tsx     # Featured post + 2 smaller cards (home page)
│   │   ├── FooterCta.tsx       # Full-bleed crimson CTA, split-word animation
│   │   ├── AboutSection.tsx    # Team bios with editorial photo treatment
│   │   ├── PortfolioSection.tsx # Company grid with category filters
│   │   ├── OfferingSection.tsx  # Service pillars + process timeline
│   │   ├── ContactSection.tsx   # Contact form + info
│   │   ├── BlogIndexSection.tsx # Blog listing page
│   │   └── BlogPostSection.tsx  # Individual blog post renderer
│   │
│   └── ui/
│       ├── hero-visual.tsx     # Abstract orbital SVG animation (pure SVG + FM)
│       ├── spotlight.tsx       # Fixed crimson mouse-tracking glow (mounted in layout)
│       ├── tubelight-navbar.tsx # Shared-layout "lamp" indicator for nav items
│       ├── team-member-card.tsx # Editorial team member card with photo treatment
│       ├── logo-mark.tsx       # SVG pillar-and-arch mark (used decoratively)
│       ├── ambient-orbitals.tsx # MiniOrbital, FloatingNodes, DashedArc components
│       └── shimmer-text.tsx    # Text reveal animation utility
│
├── lib/
│   ├── content/
│   │   └── index.ts            # ALL site copy — single source of truth
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
│
├── public/
│   ├── logo-main.png           # Primary wordmark logo
│   ├── logo-mark-*.png         # Decorative icon marks (dark, red, white)
│   ├── team/                   # Team member photos (jakob.jpg, tajdar.jpg, etc.)
│   └── *.svg                   # Misc Next.js defaults
│
├── next.config.ts              # Static export config
├── package.json                # Dependencies, scripts
├── tsconfig.json               # @/* alias → root
└── CLAUDE.md                   # This file
```

---

## 5 · Content System (`lib/content/index.ts`)

**ALL copy lives in this one file.** Components never hardcode strings. Import like:

```tsx
import { hero, stats, services, testimonials } from "@/lib/content";
```

### Exports

| Export | Type | Used in |
|---|---|---|
| `nav` | `{ links[], cta }` | Navbar |
| `ticker` | `string[]` | TickerSection |
| `hero` | `{ eyebrow, lineOne, lineTwo, lineThree, sub }` | HeroSection |
| `stats` | `{ number, suffix, label }[]` | HeroSection, StatsSection |
| `whoWeWorkWith` | `{ num, title, body, tag }[]` | WhoSection |
| `services` | `{ id, title, headline, body, detail }[]` | ServicesSection |
| `principles` | `{ num, title, body }[]` | PrinciplesSection |
| `testimonials` | `{ quote, name, role, co }[]` | TestimonialsSection |
| `blogPosts` | `{ slug, category, title, excerpt, date, ... }[]` | BlogSection, BlogIndex |
| `about` | `{ headline, story, team[], pullQuote }` | AboutSection |
| `portfolio` | `{ companies[], categories[] }` | PortfolioSection |
| `offering` | `{ pillars[], process[] }` | OfferingSection |
| `contact` | `{ heading, subheading, methods[] }` | ContactSection |
| `footer` | `{ tagline, columns[], copyright, motto }` | Footer |

---

## 6 · Animation System

### 6.1 Standard Scroll Entrance

Every section uses this pattern for staggered reveal on scroll:

```tsx
initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
```

The ease curve `[0.22, 1, 0.36, 1]` is used everywhere. It's an aggressive ease-out that makes entries feel swift and decisive.

### 6.2 Directional Conventions

| Element | Direction | Translate |
|---|---|---|
| Section headings | Slide from left | `x: -28` |
| Right-column content | Slide from right | `x: 24` |
| Accordion items | Alternating | `x: i % 2 === 0 ? -24 : 24` |
| Team cards (left) | Image from left, text from right | |
| Team cards (right) | Image from right, text from left | |
| FooterCta | "READY TO" from left, "build?" from right | |

### 6.3 Hero Entrance (Page Load)

```tsx
initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
```

Note: uses `animate` not `whileInView` — triggers immediately on load.

### 6.4 Parallax Watermarks

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
```

Used for ghost text watermarks ("AMPLITUDE", "AV") that drift against the scroll direction.

### 6.5 Auto-Advancing UI

- **ServicesSection**: `setInterval(7000)` — pauses **permanently** on user click
- **TestimonialsSection**: `setInterval(5500)` — pauses on hover, resumes on mouseLeave

---

## 7 · Key Components

### 7.1 HeroVisual (`components/ui/hero-visual.tsx`)

Abstract orbital SVG — three concentric elliptical rings rotating at different speeds around a pulsing central node. Desktop only (`hidden lg:flex`).

- Outer orbit: 95s clockwise, tilted −22°, 5 nodes
- Middle orbit: 58s counter-clockwise, tilted +14°, 5 nodes
- Inner orbit: 30s clockwise, circular, 3 nodes
- ViewBox: `0 0 640 660`, center at `(320, 330)`

**Critical**: `style={{ originX: cx, originY: cy }}` must use raw SVG coordinates (numbers), not CSS percentages.

### 7.2 Spotlight (`components/ui/spotlight.tsx`)

Global mouse-tracking crimson glow, mounted once in `layout.tsx`. `position: fixed`, `z-index: 3`. Creates a subtle light-follow effect on the dark background.

### 7.3 TeamMemberCard (`components/ui/team-member-card.tsx`)

Editorial-style team member layout with:
- Alternating left/right positioning
- Large ghosted index number
- Multi-layer photo treatment (gradients + grain + desaturation)
- Overlapping text block via negative margin (`-32px`)
- LinkedIn CTA button
- Focus area tags

### 7.4 TubelightNav (`components/ui/tubelight-navbar.tsx`)

Desktop navigation with a shared-layout animated indicator (Framer Motion `layoutId`). The "tubelight" lamp slides to the active item.

---

## 8 · Global CSS Features

Defined in `app/globals.css`:

| Feature | Implementation |
|---|---|
| Film grain | `body::after` pseudo-element, SVG noise, `opacity: 0.03`, `z-index: 9999` |
| Custom scrollbar | 3px wide, crimson thumb, void track |
| Selection highlight | Crimson background, white text |
| Crosshair cursor | `cursor: crosshair` on `body`, `a`, `button` |
| Ticker animation | `.ticker-track` (70s) + `.ticker-track-reverse` (85s), pause on hover |
| CTA pulse | `.cta-pulse` / `.cta-pulse-crimson` — 2.4s ease-out infinite |
| Ring rotations | `.ring-cw-1/2`, `.ring-ccw-1/2` — used in ServicesSection |
| Smooth scroll | `html { scroll-behavior: smooth }` |

---

## 9 · Page Routes

| Route | File | Status | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | ✅ Complete | Home — all sections |
| `/about` | `app/about/page.tsx` | ✅ Complete | Team, story, pull quote |
| `/offering` | `app/offering/page.tsx` | ✅ Complete | Service pillars (Co-build, Validate, Sell, Raise) |
| `/portfolio` | `app/portfolio/page.tsx` | ✅ Complete | Company grid with category filters |
| `/blog` | `app/blog/page.tsx` | ✅ Complete | Blog index |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | ✅ Complete | Individual blog posts |
| `/contact` | `app/contact/page.tsx` | ✅ Complete | Contact form + methods |
| `/privacy` | `app/privacy/page.tsx` | ✅ Complete | GDPR privacy policy |

---

## 10 · Deployment

### Build

```bash
cd "/Users/jakobwredstrom/Desktop/New website/amplitude-ventures-v2"
npm run build
```

This generates `out/` with static HTML. Build must pass with **zero TypeScript errors** before deploying.

### Deploy to Linode

```bash
tar -cf - -C out . | ssh -i ~/.ssh/gigevate_deploy -p 2222 deploy@172.239.240.151 \
  "sudo rm -rf /var/www/amplitude-ventures/* && sudo tar -xf - -C /var/www/amplitude-ventures/"
```

The site runs on nginx at port 4000. The nginx config handles:
- SPA-style routing (`.html` extension stripping)
- Static asset caching
- Gzip compression

### Verify

```bash
curl -s -o /dev/null -w "%{http_code}" http://172.239.240.151:4000/
curl -s -o /dev/null -w "%{http_code}" http://172.239.240.151:4000/about
curl -s -o /dev/null -w "%{http_code}" http://172.239.240.151:4000/offering
curl -s -o /dev/null -w "%{http_code}" http://172.239.240.151:4000/portfolio
```

All should return `200`.

### Deploy to Render (Recommended)

The site includes a `render.yaml` blueprint for Render static site deployment:

1. Push repo to GitHub
2. Connect repo on [render.com](https://render.com) → New → Static Site
3. Render auto-detects `render.yaml` and configures build, publish path, and security headers
4. HTTPS is automatic on Render (Let's Encrypt)
5. Configure custom domain `amplitude.ventures` in Render dashboard

After deploy, configure these headers in the Render dashboard (also defined in `render.yaml`):
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

---

## 11 · Rules — Never Break These

1. **Content in `lib/content/` only** — never hardcode strings in components
2. **Font variables via `style={{}}` only** — never `font-sans` or `font-display` in className
3. **`"use client"` on every section** — they all use Framer Motion hooks
4. **Design token names** — always `bg-void`, `text-crimson`, `text-warm-white`; never hardcode hex in className
5. **No heavy CDN dependencies in hero** — HeroVisual is pure SVG. Keep it that way.
6. **No `position: absolute` mouse tracking** — Spotlight and anything mouse-tracking must be `position: fixed`
7. **Port 3003 for dev** — hardcoded in package.json. Don't change it.
8. **Only Bebas + Cormorant + DM Sans** — no Inter, no Roboto, no Arial, no system fonts
9. **Static export** — no API routes, no server actions, no middleware
10. **Three-color palette** — void black, crimson, warm white. No blues, no grays, no gradients that aren't void→crimson

---

## 12 · Adding New Pages

1. Create `app/[route]/page.tsx` — Server Component (no animations at route level)
2. Export `metadata` for SEO
3. Import `Navbar`, your section, `FooterCta`, `Footer`
4. Create section under `components/sections/` with `"use client"`
5. Add content to `lib/content/index.ts`
6. Follow animation patterns from Section 6
7. Run `npm run build` — must pass cleanly
8. Deploy with the rsync pipeline

### Template

```tsx
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import YourSection from "@/components/sections/YourSection";
import FooterCta from "@/components/sections/FooterCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description for SEO.",
};

export default function YourPage() {
  return (
    <main className="bg-void min-h-screen">
      <Navbar />
      <YourSection />
      <FooterCta />
      <Footer />
    </main>
  );
}
```

---

## 13 · SEO & Structured Data

The root layout (`app/layout.tsx`) includes:

- **Full metadata** — title template, description, keywords, OpenGraph, Twitter cards
- **JSON-LD Organization schema** — feeds AI answer engines (Perplexity, ChatGPT, Google SGE)
- **robots.ts** — allows indexing with full capabilities
- **sitemap.ts** — auto-generated sitemap
- **Canonical URL** — `https://amplitude.ventures`

---

## 14 · Analytics & Tracking

### Architecture

All tracking scripts are conditionally loaded via `components/ui/analytics-scripts.tsx`, which only renders `<Script>` tags after the user grants GDPR consent via the cookie banner (`components/ui/cookie-consent.tsx`).

### Tracking IDs (Placeholders — Replace Before Launch)

| Service | Placeholder | Where to Get Real ID | File |
|---|---|---|---|
| Google Tag Manager | `GTM-XXXXXXX` | tagmanager.google.com | `components/ui/analytics-scripts.tsx` |
| Google Analytics 4 | `G-XXXXXXXXXX` | analytics.google.com → Admin → Data Streams | `components/ui/analytics-scripts.tsx` |
| Meta Pixel | `PIXEL_ID` | business.facebook.com → Events Manager | `components/ui/analytics-scripts.tsx` |

### Consent Flow

1. First visit → cookie banner appears (slide-up from bottom)
2. User clicks "Accept" → consent stored in `localStorage` as `av_cookie_consent=accepted`
3. `AnalyticsScripts` component detects consent → GTM, GA4, Meta Pixel scripts inject
4. User clicks "Reject" → no scripts load, `av_cookie_consent=rejected` stored
5. Footer "Cookie Preferences" link dispatches `av:consent-reset` event → banner re-shows

### Conversion Tracking

Contact form (`ContactSection.tsx`) fires these events on successful submission:
- GA4: `gtag('event', 'generate_lead', { event_category: 'contact' })`
- Meta Pixel: `fbq('track', 'Lead')`

### Security Headers

Meta tags in `app/layout.tsx`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

Server-side headers configured in `render.yaml` (+ Permissions-Policy, HSTS).

---

## 15 · Known Issues & Future Work

- **Forms backend** — Contact form submits to [Formspree](https://formspree.io) endpoint `https://formspree.io/f/mreykdne`. Submissions forward to `build@amplitude.ventures`. The endpoint is configured in `components/sections/ContactSection.tsx` as `FORMSPREE_ENDPOINT`.
- **Tracking IDs are placeholders** — Replace `GTM-XXXXXXX`, `G-XXXXXXXXXX`, and `PIXEL_ID` in `components/ui/analytics-scripts.tsx` before launch.
- **No CMS** — Blog posts are static in `lib/content/`. Consider MDX or Sanity for production.
- **Spline dependencies** — `@splinetool/react-spline` and `@splinetool/runtime` are still in `package.json` but unused. Safe to remove.
- **OG image** — `/public/og-image.png` exists (1200×630, programmatically generated).
- **Domain** — `amplitude.ventures` is configured in metadata but DNS may point elsewhere.

---

## 16 · Session Tips for AI Agents

- The `.bashrc` prints `pyenv`/`nvm` warnings on every Bash call — **ignore them**, they're harmless
- `npm run build` is the ground truth for "does the code work" — run it before claiming anything is done
- All imports use `@/` alias → project root
- Framer Motion `whileInView` animations require **incremental scrolling** in Playwright to trigger — scrolling to bottom all at once won't fire them
- The site uses static export, so there's no dev server needed for production. But `npm run dev` on port 3003 is useful for local preview.
- When deploying, always verify with `curl` that key routes return 200

---

## 17 · Quick Reference Card

```
Background:    bg-void (#080808)
Accent:        text-crimson (#C8102E)
Text:          text-warm-white (#F2EDE4)
Headline font: var(--font-bebas)     — Bebas Neue, ALL CAPS
Italic font:   var(--font-cormorant) — Cormorant Garamond
Body font:     var(--font-dm-sans)   — DM Sans
Ease curve:    [0.22, 1, 0.36, 1]
Blur entrance: filter: "blur(12px)" → "blur(0px)"
Logo:          /public/logo-main.png (28px in nav, 24px in footer)
Dev port:      3003
Build:         npm run build → out/
Deploy:        tar pipe over SSH to 172.239.240.151
```
