# Next Steps — What Needs to Be Built

Last updated: 2026-03-12. Home page is complete. Inner pages not yet built.

---

## Priority 1 — Inner Pages

These routes exist in the navbar but return 404. Build them in this order:

### 1. `/contact` — Contact Page
**Simplest page, highest business value.**

Content needed (add to `lib/content/index.ts`):
- Headline: "Let's talk."
- Sub: "If you're building something worth backing, we want to hear it."
- Contact details: email, LinkedIn
- Form fields: Name, Email, Company, Brief (textarea)

Technical requirements:
- Form needs a backend handler: recommend **Resend** (email) or **Formspree** (no backend)
- Page structure: split layout — left copy, right form
- Follow animation patterns (blur reveal, x-slide)
- No CMS needed — static copy

```bash
# Create file
touch app/contact/page.tsx
```

---

### 2. `/portfolio` — Portfolio Page
**Shows credibility.**

Content needed (add to `lib/content/index.ts` as `portfolio` array):
- Per company: `name`, `slug`, `tagline`, `stage`, `year`, `category`, `logoUrl` (or just text name)
- Currently only placeholder company names in ticker: Compera, Nucase, Share50, Enquip, 2040 Vision, AltPath, Meridian, Foundry, Vestry, Catalyst

Page structure: masonry or grid of company cards. Each card: company name, tagline, stage badge, year.

Technical requirements:
- No individual company pages needed initially
- If logo images exist: put in `/public/portfolio/[name].svg`, reference in content
- Optional: filter by stage (pre-seed / seed / series A)

---

### 3. `/about` — About Page
**Team + firm story.**

Content needed:
- Firm origin story (2–3 paragraphs)
- Partner bios: name, role, background, photo
- Investment thesis summary
- Optional: press/media mentions

Technical requirements:
- Partner photos: drop in `/public/team/[name].jpg`
- Page structure: editorial layout — large quote or principle at top, team grid below

---

### 4. `/blog` — Blog Index
**Lists all posts.**

Technical requirements:
- `blogPosts` array already exists in `lib/content/index.ts`
- Build: `app/blog/page.tsx` — lists all posts, same card style as BlogSection
- Simple: just iterate `blogPosts`, same `BlogSection` card component (extract it to `ui/`)

---

### 5. `/blog/[slug]` — Individual Post
**The actual article.**

Technical requirements:
- Route: `app/blog/[slug]/page.tsx`
- Generate from `blogPosts` slugs using `generateStaticParams()`
- Currently content is a title + excerpt only — needs full body text added to each post in `lib/content/`
- Recommend: convert blog posts to **MDX** files in `content/blog/[slug].mdx`
- Or: add a `body` field to each `blogPost` object (simpler, no MDX dependency)

---

## Priority 2 — Polish & Quality

### Logo
- Drop `/public/logo.svg` — the Navbar already references this path
- If PNG: update `Navbar.tsx` line 44: `src="/logo.png"`

### Remove dead file
- Delete `components/ui/splite.tsx` — old Spline wrapper, unused since robot removal

### Clean up `next.config.ts`
- Remove `framerusercontent.com` remote pattern — no longer used

### Mobile QA pass
- Test all sections on 375px (iPhone SE)
- Known: hero orbital visual already hidden on mobile (`hidden lg:flex`)
- Check: ticker, who cards, services tabs, principles accordion, stats grid, testimonials

### Metadata per page
- Add `export const metadata: Metadata` to each inner page
- Currently only root layout has metadata

---

## Priority 3 — Production Readiness

### Deploy to Vercel
```
/vercel:deploy
```
Or run the skill: it handles git push + Vercel project setup.

No env vars needed currently (no database, no CMS, no API keys in use).

### CMS for Blog (optional)
If Jakob wants to write posts without touching code:
- **Sanity.io** — best DX, free tier generous
- **Contentlayer + MDX** — zero external service, content in repo
- Recommend Sanity when/if blog is actively used

### Analytics
- Add PostHog or Vercel Analytics
- PostHog skill available: `/posthog:posthog-instrumentation`

### Contact form backend
- **Resend** (recommended): excellent DX, generous free tier, dead simple
- Sign up at resend.com, get API key, add to Vercel env vars
- Handler: `app/api/contact/route.ts`

---

## How to Start a New Session

1. Read `CLAUDE.md` fully
2. Read `docs/design-system.md` for aesthetic rules
3. Read `docs/next-steps.md` (this file) to know what to build next
4. Check dev server: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3003`
5. If not running: `cd /Users/jakobwredstrom/Desktop/amplitude-ventures-v2 && npm run dev`
6. Build check before committing: `cd /Users/jakobwredstrom/Desktop/amplitude-ventures-v2 && npm run build`
