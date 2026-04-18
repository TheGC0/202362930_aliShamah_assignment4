# Technical Documentation

## 1) Project Overview
This project is a professional personal portfolio for **Ali Shamah**, built across Assignments 1, 2, and 3. It exceeds the assignment minimums while covering every required feature: About, Projects with filter/sort, Contact with multi-step validation, external API integrations, state management, and performance optimization.

**Live deployment:** https://ali-shamah-portfolio.vercel.app

---

## 2) Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Images | `next/image` (optimized, lazy loading) |
| Fonts | `next/font/google` — Sora + IBM Plex Mono (font-display: swap) |
| Deployment | Vercel |

---

## 3) Architecture

### App Routes
| Route | Description |
|-------|-------------|
| `/` | Home — hero, about, GitHub stats, quote widget, featured projects, experience, skills, leadership, contact |
| `/projects` | Project index — search + category filter + sort |
| `/projects/[slug]` | Detailed case-study pages (SSG) |
| `/contact` | Dedicated contact page with 3-step form |
| `/resume` | Resume summary + PDF download |
| `/links` | Social links hub |

### Data Layer
- `data/site.ts` — profile, social links, experience timeline, leadership, education, skills, certifications
- `data/projects.ts` — single source of truth for all 6 projects (includes `date` field for sort)

---

## 4) Components Reference

### Assignment 3 — New Components

| Component | File | Purpose |
|-----------|------|---------|
| QuoteWidget | `components/quote-widget.tsx` | Fetches a random quote from Quotable.io API. Shows skeleton loading, refresh button, and falls back to 4 hardcoded quotes if the API is unreachable |
| VisitorTimer | `components/visitor-timer.tsx` | Tracks and displays time spent on the page (0s → Xm Xs → Xh Xm). Runs client-side only via `setInterval` |
| VisitorTimerDynamic | `components/visitor-timer-dynamic.tsx` | Client-component wrapper enabling `ssr: false` dynamic import of VisitorTimer from a Server Component page |
| TimeGreeting | `components/time-greeting.tsx` | Renders "Good morning/afternoon/evening" based on the visitor's local clock. Updates at the top of each hour. Client-side only |
| TimeGreetingDynamic | `components/time-greeting-dynamic.tsx` | Client-component wrapper for TimeGreeting, same pattern as VisitorTimerDynamic |
| ScrollProgress | `components/scroll-progress.tsx` | Thin accent bar fixed at the top of every page. Width reflects how far the user has scrolled. Uses `requestAnimationFrame` to avoid layout thrashing |

### Assignment 3 — Modified Components

| Component | File | Changes |
|-----------|------|---------|
| ProjectsClient | `components/projects-client.tsx` | Added sort dropdown (newest/oldest/A→Z/Z→A), results count display, and "Clear filters" reset. Sort and filter applied together in `useMemo` |
| ContactForm | `components/contact-form.tsx` | Refactored from single-step to 3-step wizard (Identity → Message → Review). Added per-step validation, optional Subject field, full draft auto-save to localStorage, "Draft restored" banner with Discard option, draft cleared on successful submission |

### Foundation Components (Assignments 1 & 2)

| Component | Purpose |
|-----------|---------|
| `components/github-stats.tsx` | Fetches GitHub profile stats via REST API with skeleton loading and error fallback |
| `components/hero-role-rotator.tsx` | Animated text cycling through role titles |
| `components/theme-toggle.tsx` | Light/dark/system theme switcher with localStorage persistence |
| `components/site-header.tsx` | Sticky navigation with active-section tracking and mobile menu |
| `components/project-card.tsx` | Project display card with theme-aware logos |
| `components/skill-group.tsx` | Skill category badge grid |
| `components/timeline-item.tsx` | Experience/leadership timeline entry |
| `components/analytics-placeholder.tsx` | Suspense-wrapped analytics boundary |

---

## 5) Assignment 3 Feature Details

### API Integration

**GitHub REST API** (`https://api.github.com/users/TheGC0`)
- Fetches user profile and repository list in parallel using `Promise.all`
- Displays: public repo count, followers, following, bio, avatar
- Skeleton loading state shown during fetch
- Friendly error message + direct GitHub link on failure
- 60 unauthenticated requests/hour limit (no API key required)

**Quotable.io API** (`https://api.quotable.io/random`)
- Fetches a random quote tagged `technology`, `inspirational`, or `wisdom`, max 160 characters
- Loading skeleton shown during fetch
- 4 hardcoded fallback quotes shown when API is unreachable or returns an error
- Refresh button allows the user to fetch a new quote on demand

### Complex Logic — Projects Filter + Sort

Processing pipeline (runs inside `useMemo`, recalculates only when inputs change):
1. Filter by search term — matches against `title`, `subtitle`, and `tags` (case-insensitive)
2. Filter by category — exact match against `project.categories` array, or "All"
3. Sort by selected key — `date-desc` | `date-asc` | `name-asc` | `name-desc`

Sort uses `.localeCompare()` on ISO date strings (YYYY-MM) and titles. A spread `[...results]` prevents mutating the memoized source array.

### Complex Logic — Multi-Step Contact Form

| Step | Fields | Validation Rules |
|------|--------|-----------------|
| 1 – Identity | Name, Email | Name: non-empty · Email: non-empty + regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| 2 – Message | Subject (optional), Message | Message: non-empty, ≥ 10 chars, ≤ 500 chars |
| 3 – Review | Read-only summary | User reviews before submitting |

Validation runs on "Next" click — form cannot advance until the current step is valid. Errors clear as the user types. Submission composes a `mailto:` URL and opens the user's email client.

### State Management

| State | Storage | Scope | Description |
|-------|---------|-------|-------------|
| Theme | `localStorage` (`ali-shamah-theme`) | Persistent | Light/dark/system — applied before first paint to eliminate flash |
| Visitor name | `localStorage` (`contact-form-name`) | Persistent | Saved from Name field, restored on next visit |
| Form draft | `localStorage` (`contact-form-draft`) | Persistent | Full form draft (name + email + subject + message) auto-saved on every keystroke; cleared on successful submission |
| Time greeting | JS / `Date` | Page load | Recomputed at top of each hour if user stays on page |
| Visitor timer | React state (`useState`) | Page load | `setInterval` increments every second, cleaned up on unmount |
| Filter/sort | React state | Page load | `{ query, category, sort }` — drives `useMemo` pipeline |
| Form step | React state | Form session | `1 | 2 | 3` — controls which fieldset is visible |
| Scroll progress | React state | Page load | Updated via `requestAnimationFrame` on scroll |

---

## 6) Performance Optimizations

| Technique | Where | Benefit |
|-----------|-------|---------|
| `useMemo` on filter+sort | `projects-client.tsx` | Recalculates only when query, category, or sort changes |
| `dynamic({ ssr: false })` | timer + greeting wrappers | Prevents SSR/hydration mismatch for time-dependent components |
| `Promise.all` | `github-stats.tsx` | Profile + repos fetched in parallel, not sequentially |
| `IntersectionObserver` | `layout.tsx` scroll reveal | No `scroll` event listener — browser compositor thread handles it |
| `requestAnimationFrame` | `scroll-progress.tsx` | Batches scroll updates to animation frames, prevents layout thrashing |
| `io.unobserve()` after reveal | `layout.tsx` | Observer stops tracking elements after they animate in |
| `next/image` | All images | Automatic WebP conversion, responsive `srcset`, lazy loading |
| `next/font` with `display: swap` | `layout.tsx` | Fonts load without blocking render |
| `aria-live="off"` on timer | `visitor-timer.tsx` | Prevents screen reader announcement every second |
| Inline theme init script | `layout.tsx` | Theme applied synchronously before React hydration — no FOUC |

---

## 7) Accessibility

- Semantic HTML: `header`, `main`, `section`, `nav`, `footer`, `article`, `dl`, `fieldset`, `legend`
- Keyboard navigation: all interactive elements have `focus-visible` ring styles
- ARIA labels on form fields, buttons, progress indicators
- `aria-invalid` + `aria-describedby` linking fields to their error messages
- `role="alert"` on validation error messages (announced immediately)
- `role="status"` on success banners (announced politely)
- `role="progressbar"` with `aria-valuenow/min/max` on scroll progress bar
- `aria-live="off"` on visitor timer to avoid disruptive announcements
- `aria-current="step"` on active form step indicator
- Skip-to-content link in root layout

---

## 8) SEO & Metadata

- Per-route `Metadata` exports with `title` and `description`
- OpenGraph + Twitter card images
- JSON-LD structured data (`Person` + `WebSite` schemas)
- `sitemap.xml` and `robots.txt` generated via Next.js route handlers
- Canonical URL set in metadata

---

## 9) Testing & Validation

```bash
# Lint check
npm run lint

# Production build (catches TypeScript errors + SSR issues)
npm run build

# Local preview of production build
npm run start
```

Manual checks performed:
- Responsive layout at 375px, 768px, 1280px viewports
- Theme toggle in both light and dark modes
- Projects filter + sort combinations
- Contact form — all 3 steps, validation errors, draft save/restore
- GitHub stats and quote widget with network throttling (slow 3G)
- Scroll progress bar accuracy
- Keyboard-only navigation through all interactive elements
