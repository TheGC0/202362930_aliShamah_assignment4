# Ali Shamah Portfolio — Assignment 4 Presentation
## 5–7 Minute Slide Deck

---

## Slide 1 — Title

**Ali Shamah Portfolio Web Application**
*Assignment 4 | Final Personal Web Application*

> Student: Ali Shamah | ID: 202362930
> Live: https://ali-shamah-portfolio.vercel.app

**Speaker notes:**
Welcome. This is my final personal portfolio web application built over four assignments. It brings together everything I have learned about professional web development, from responsive UI to API integration, accessibility, and performance.

---

## Slide 2 — Project Objectives

**What I set out to build:**

- A complete, production-ready personal portfolio
- Responsive across mobile, tablet, and desktop
- Multiple pages: Home, Projects, Case Studies, Resume, Contact, Links Hub
- Live API integrations with real error handling
- Professional code quality, documentation, and AI-assisted development

**Speaker notes:**
The objective was not just to build a landing page, but a real-world web application that works like something I would publish professionally. Every feature was built with real use in mind — not just to pass a requirement.

---

## Slide 3 — Application Pages Overview

| Page | What it does |
|------|-------------|
| `/` Home | Intro, GitHub stats, quote, featured projects, experience, skills |
| `/projects` | Search + filter + sort all 6 case studies |
| `/projects/[slug]` | Detailed case study: problem, solution, architecture |
| `/resume` | Structured resume with one-click PDF download |
| `/contact` | 3-step guided message form with draft persistence |
| `/links` | Quick-access social and contact links hub |

**Speaker notes:**
The app is structured around how a real recruiter or collaborator would use a portfolio. They land on the home page, learn who I am, browse projects, open a case study, download the resume, and reach out through the contact page.

---

## Slide 4 — Technical Architecture

**Stack:**
- Next.js 16 App Router + React 19 + TypeScript 5
- Tailwind CSS v4 with CSS custom properties (design tokens)
- `next/image` for responsive, lazy-loaded WebP images
- Static generation for case-study pages (`generateStaticParams`)
- Vercel deployment

**Architecture pattern:**
```
data/site.ts + data/projects.ts
       ↓ (typed content)
components/ (reusable UI)
       ↓
app/ routes (Server + Client Components)
       ↓
Vercel (static + edge)
```

**Speaker notes:**
I separated content from components from routes. All profile data, experience, skills, and project content live in typed data files. Components read from those files. Routes compose components. This makes adding a new project a one-file change with no UI edits needed.

---

## Slide 5 — Key Feature: Projects Filter + Sort

**Live demo of the projects page**

- Real-time search across title, subtitle, and tags
- Category filter: Full-Stack, Mobile, AI/ML, Computer Vision, Dashboards
- Sort: Newest, Oldest, A–Z, Z–A
- Live result count and empty-state guidance

**How it works technically:**
```typescript
const filtered = useMemo(() => {
  let results = initialProjects;
  // 1. text search → 2. category filter → 3. sort
  return [...results].sort(sortFn);
}, [query, category, sort, initialProjects]);
```

**Speaker notes:**
All filtering and sorting runs client-side inside a `useMemo` that recalculates only when inputs change. The spread `[...results]` prevents mutating the memoized source array — a subtle but important correctness detail I added after reviewing the AI suggestion.

---

## Slide 6 — Key Feature: 3-Step Contact Form

**Demo flow:**
1. Step 1 — Name and Email (with real-time inline validation)
2. Step 2 — Subject (optional) and Message (10–500 character counter)
3. Step 3 — Read-only review panel before sending

**Extra UX details:**
- Full draft auto-saved to localStorage on every keystroke
- "Draft restored" banner on next visit with Discard option
- Opens pre-filled `mailto:` email client on submit
- `aria-invalid` + `aria-describedby` for accessible error linking

**Speaker notes:**
The draft-restore feature is something I added beyond the basic requirement because it reflects how real web forms should work. If a user accidentally closes the tab, their message is not lost. I tested this cross-tab behavior manually.

---

## Slide 7 — Key Feature: Live API Integrations

**GitHub Stats (GitHub REST API)**
- Fetches profile + top repos in parallel using `Promise.all`
- Loading skeleton → success card → friendly fallback on error
- No API key needed (60 req/hour unauthenticated)

**Quote Widget (Quotable.io)**
- Fetches a random technology/inspiration quote
- Refresh button for a new quote on demand
- Falls back to 4 curated hardcoded quotes when offline

**Both demonstrate:** loading state → success state → graceful degradation

**Speaker notes:**
Both APIs can fail. I built each widget to handle three states explicitly: loading, success, and error/offline. The fallback quotes required manual curation — the API filter helped, but some returned quotes were not appropriate for a tech portfolio.

---

## Slide 8 — AI Integration

| Assignment | Tool | Primary use |
|------------|------|-------------|
| 1 | ChatGPT | Layout, accessibility, docs structure |
| 2 | Claude Code | GitHub stats, scroll reveal, form validation |
| 3 | Claude Code | Multi-step form, quote widget, sort logic |
| 4 | OpenAI Codex | Rubric audit, image optimization, final polish |

**Key principle applied:** Every AI suggestion was reviewed, modified, and tested before keeping. AI generated patterns; I made all architectural and UX decisions.

**Speaker notes:**
I used AI as an accelerator, not a replacement. The most valuable use was having Claude Code read my entire codebase before generating suggestions — this meant outputs already used my CSS variables and component patterns without manual rework. The least reliable use was Next.js App Router specifics, where I caught a server/client boundary error at build time that the AI missed.

---

## Slide 9 — Technical Challenges

**Resolved challenges:**

| Challenge | Solution |
|-----------|---------|
| SSR hydration mismatch on time-aware greeting | `dynamic({ ssr: false })` wrapper component |
| `dynamic()` placed in a Server Component | Moved to `"use client"` wrapper; learned App Router boundary rules |
| Scroll reveal flashing on load | Added JS class gate: `.js-scroll .reveal` only applies after IntersectionObserver activates |
| Sort mutating memoized array | Added `[...results].sort(...)` spread before every sort |
| Quote API returning off-topic results | Added `tags` query param + manual fallback curation |

**Unresolved / future work:**
- Contact form uses `mailto:` — a real backend (e.g. Resend API) would be more reliable
- No CMS — adding/editing projects requires a code change
- No analytics — planned after privacy policy review

**Speaker notes:**
The most important lesson from the challenges: AI suggestions for framework-specific patterns should always be verified against the component's rendering context. The build step caught issues that the editor and AI both missed.

---

## Slide 10 — Lessons Learned

1. **Content/UI separation** pays off — adding a new project is a data file change, not a UI rebuild
2. **API resilience matters** — every external call needs a loading, success, and error path
3. **Accessibility is additive work** — focus states, ARIA labels, and skip links take planning, not retrofitting
4. **AI + review > AI alone** — the best outputs came from prompting with full codebase context, then modifying
5. **Build validation is essential** — `npm run build` caught SSR/CSR errors that lint and the editor missed

**Speaker notes:**
These lessons apply directly to real professional work. The portfolio is something I will continue to improve and publish as a genuine professional tool beyond this assignment.

---

## Slide 11 — Conclusion

**What was delivered:**
- Complete 6-route Next.js portfolio — deployed and publicly accessible
- 7+ innovative features beyond the baseline requirements
- Comprehensive documentation: README, technical docs, AI usage report
- Professional design: responsive, accessible, performant

**Live URL:** https://ali-shamah-portfolio.vercel.app

**Repository:** github.com/AliShamah/202362930_aliShamah_assignment4

**Speaker notes:**
This project is now a foundation I will keep improving and use professionally. Thank you.

---

*Total estimated presentation time: 5–7 minutes*
*Practice tip: Time each slide at 30–45 seconds; slow down on slides 5, 6, and 9 for the live demo and technical detail.*
