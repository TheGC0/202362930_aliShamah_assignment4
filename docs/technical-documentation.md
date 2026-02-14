# Technical Documentation

## 1) Project Overview
This project is a professional personal portfolio for **Ali Shamah**. It exceeds the assignment minimum while preserving all required foundation features: About, Projects, and Contact with responsive behavior and JavaScript interactivity.

## 2) Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- `next/image`, `next/font`

## 3) Architecture

### App Routes
- `/` Home (hero, about, featured projects, experience, skills, leadership, contact)
- `/projects` Project index with category filters and search
- `/projects/[slug]` Detailed case-study pages
- `/links` Link hub page
- `/resume` Resume summary + PDF download
- `/contact` Contact page with client-side mail draft form

### Data Layer
- `data/site.ts`: profile, links, experience, leadership, education, skills, certifications
- `data/projects.ts`: single source of truth for project content

### Reusable Components
- `components/project-card.tsx`
- `components/skill-group.tsx`
- `components/timeline-item.tsx`
- `components/contact-form.tsx`
- `components/theme-toggle.tsx`
- `components/site-header.tsx`
- `components/site-footer.tsx`

## 4) Assignment Requirement Mapping

### About Me
Implemented on the home page with:
- role-based hero intro
- short one-line tagline
- profile/avatar image
- additional 2-3 sentence profile in the About section

### Projects
Implemented with 2+ projects (currently more than 2) including:
- project title
- short impact description
- image thumbnails/placeholders

### Contact
Implemented with required fields:
- Name
- Email
- Message

Form is frontend-only and opens a `mailto:` draft (no backend/API key required).

## 5) Interactivity (JavaScript)
- Theme toggle (light/dark/system behavior)
- Animated role rotation in hero
- Project filtering + search on `/projects`
- Smooth in-page section navigation

## 6) Responsive Design
- Mobile-first styling with Tailwind utility classes
- Flexible layout using CSS Grid/Flexbox
- Breakpoints tested for phone, tablet, desktop

## 7) Accessibility
- Semantic landmarks (`header`, `main`, `section`, `nav`, `footer`)
- Keyboard focus styles (`focus-visible` rings)
- ARIA labels for form and navigation controls
- Skip-to-content link in root layout

## 8) SEO & Metadata
- Route metadata and social sharing cards
- OpenGraph + Twitter cards
- JSON-LD structured data (`Person`, `WebSite`)
- `sitemap.xml` and `robots.txt`

## 9) Performance
- Optimized image handling through `next/image`
- Local static assets in `public/`
- Production build optimization through Next.js

## 10) Testing & Validation
- Static checks: `npm run lint`
- Production build: `npm run build`
- Manual UI checks on mobile/tablet/desktop viewports
- Link and route verification
