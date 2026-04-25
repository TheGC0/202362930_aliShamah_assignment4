# Ali Shamah Portfolio - Assignment 4

Final personal web application for Assignment 4. The project is a polished portfolio built with Next.js, TypeScript, and Tailwind CSS, showcasing full-stack, mobile, dashboard, and AI/ML work through a responsive multi-page application.

Live deployment: https://ali-shamah-portfolio.vercel.app

## Project Overview

This portfolio brings together the previous assignment milestones into one complete web application:

- Home page with personal introduction, profile visual, featured projects, experience, skills, leadership, and contact links
- Projects index with search, category filters, sorting, result counts, and empty states
- Individual project case-study pages with overview, problem, solution, architecture, tech stack, screenshots, and links
- Contact page with a validated 3-step message form and local draft persistence
- Resume page with downloadable PDF, structured experience, skills, and education
- Links hub for quick access to LinkedIn, GitHub, WhatsApp, resume, and email
- Dark/light theme toggle with saved preference
- External API integrations with loading, success, and fallback/error states

## Assignment 4 Requirements Coverage

| Requirement | Implementation |
| --- | --- |
| Complete application | Multi-page Next.js portfolio with home, projects, project details, resume, links, and contact routes |
| Professional quality | Data-driven components, typed content models, responsive layout, focus states, SEO metadata, sitemap, robots, and JSON-LD |
| Innovation | Live GitHub stats, quote widget fallback system, scroll progress, animated role text, hero snapshot row, form draft restore, back-to-top button |
| AI integration | AI tools were used for code review, implementation support, UX iteration, and documentation; details are in `docs/ai-usage-report.md` |
| Documentation | README, AI usage report, technical documentation, and presentation materials are included |
| Performance | Optimized WebP assets, `next/image`, static generation, memoized filtering/sorting, dynamic client-only time widgets, and no external font downloads |

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS v4
- `next/image` for responsive image optimization
- Vercel deployment

## Site Features

### Home Page
- **Animated greeting** — time-aware "Good morning / afternoon / evening" message updates in real time
- **Role rotator** — animated headline cycles through developer roles with a gradient sheen effect
- **Hero snapshot** — compact stat row showing age, tech focus, and location
- **Live GitHub stats** — fetches public repo count, followers, and bio directly from the GitHub API with a loading skeleton and offline fallback
- **Quote widget** — pulls an inspirational tech quote from Quotable.io with a refresh button; falls back to four curated quotes when offline
- **Featured projects** — three highlighted case studies with images, tags, and category badges
- **Experience timeline** — full professional history with role, organization, period, and bullet points
- **Skills grid** — categorized skill badges across frontend, backend, mobile, and AI/ML
- **Scroll-reveal animations** — sections fade in as they enter the viewport

### Projects Page
- **Search** — real-time text search across project titles, subtitles, and tags
- **Category filter** — filter by Full-Stack, Mobile, AI/ML, Computer Vision, or Dashboards
- **Sort** — sort by newest, oldest, A–Z, or Z–A
- **Result count** — live count updates as filters change
- **Empty state** — helpful message and clear-filters button when no results match

### Project Case Studies
- Full case-study layout per project: overview, problem, solution, architecture diagram, key features, challenges and learnings
- Screenshot gallery for projects with images
- Tech stack badge list
- Live site and GitHub links (or "Private repo" indicator)
- Previous / next project navigation

### Contact Page
- **3-step form wizard** — guided flow: Identity → Message → Review
- **Per-field validation** — inline errors that clear as you type
- **Draft persistence** — full draft saved to localStorage on every keystroke; restored with a banner on your next visit with a discard option
- **Review step** — summary table to check details before opening your email app

### Resume Page
- Structured experience, skills, education, and certifications
- One-click PDF download
- Print-friendly layout via `@media print` styles

### Global Features
- **Theme toggle** — light, dark, and system-aware preference saved across visits
- **Scroll progress bar** — thin accent bar at the top tracks reading position
- **Back-to-top button** — appears after scrolling 400px; smooth scrolls back to the top
- **Responsive layout** — mobile, tablet, and desktop breakpoints throughout
- **Skip-to-content link** — keyboard accessibility shortcut in the root layout
- **404 page** — custom not-found page with a home link

## Navigating the Portfolio

1. **Start at the home page** (`/`) — read the intro, scroll through experience and skills, or jump to featured projects.
2. **Browse all projects** (`/projects`) — use the search bar or category buttons to narrow down; click any card to open the full case study.
3. **Read a case study** (`/projects/[name]`) — scroll through the problem, solution, architecture, and screenshots; use the previous/next links at the bottom to move between projects.
4. **Download the resume** (`/resume`) — view the structured resume online or click Download PDF to save a copy.
5. **Send a message** (`/contact`) — fill in your name and email (step 1), write your message (step 2), review (step 3), then hit Send to open a pre-filled email draft.
6. **Quick links** (`/links`) — one page with all social and contact links if you just need a fast connection.

## Project Structure

```text
202362930_aliShamah_assignment4/
|-- app/                         Next.js routes and global layout
|   |-- page.tsx                  Home page
|   |-- projects/                 Project index and dynamic case studies
|   |-- contact/                  Contact page
|   |-- resume/                   Resume page
|   `-- links/                    Links hub
|-- components/                   Reusable UI and feature components
|-- data/                         Portfolio, skills, timeline, and project content
|-- public/                       Static assets, PDFs, optimized images
|-- docs/
|   |-- ai-usage-report.md
|   `-- technical-documentation.md
|-- presentation/                 Slide outline and demo recording script
|-- scripts/
|   `-- build.mjs                 Production build wrapper
|-- package.json
`-- README.md
```

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

## Production Build

```bash
npm run lint
npm run build
npm run start
```

`npm run build` runs the Next.js production build through `scripts/build.mjs`, which disables telemetry and uses the webpack build path for reliable output.

## Quality Checklist

- Lint: `npm run lint`
- Production build: `npm run build`
- Responsive checks: mobile (375px), tablet (768px), and desktop (1280px)
- Manual feature checks: theme toggle, project search/filter/sort, project detail pages, contact form validation, draft restore, API fallbacks, resume download, links hub, back-to-top button
- Accessibility checks: keyboard navigation, visible focus states, semantic landmarks, form labels, ARIA feedback, reduced-motion support

## AI Use Summary

AI tools including ChatGPT, Claude Code, and OpenAI Codex were used for implementation support, debugging, UI/UX review, documentation drafting, and final Assignment 4 polish. All AI-assisted work was reviewed, edited, tested, and documented to maintain academic integrity.

Detailed report: `docs/ai-usage-report.md`

## Documentation

- `docs/technical-documentation.md` explains the architecture, routes, components, data model, performance choices, accessibility, SEO, and validation process.
- `docs/ai-usage-report.md` documents tools used, benefits, challenges, learning outcomes, and responsible use.
- `presentation/slides.md` contains a 5-7 minute slide outline.
- `presentation/demo-video-script.md` contains a recording script and demo flow.

## Deployment

The app is deployed on Vercel at: https://ali-shamah-portfolio.vercel.app

To deploy your own copy:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Use the default Next.js framework settings — no environment variables are required.
4. Vercel automatically runs `npm run build` and serves the output.
