# Assignment 1 Portfolio - Ali Shamah

Professional, responsive personal portfolio built with Next.js + TypeScript.

This implementation is intentionally above the minimum assignment baseline while still covering every required foundation item.

## Live Overview
- Main page sections: About, Featured Projects, Experience, Skills, Leadership, Contact
- Dedicated pages: Projects, Project Details, Links Hub, Resume, Contact
- Theme toggle + interactive project search/filter

## Assignment 1 Requirements Coverage

### 1) Repository Setup
- Clean folder structure with reusable components and data-driven content.
- Git history and branch workflow can be managed in GitHub before submission.
- If your instructor requires exact naming, publish this in a public repo named:
  - `<studentid>-<firstname><lastname>-assignment1`

### 2) Content Requirements
- **About Me**: intro + one-liner tagline + profile avatar
- **Projects**: 2+ projects (currently 6) with title, short description, and images
- **Contact**: form with Name, Email, Message (frontend-only, no backend required)

### 3) Responsive Design
- Mobile-first layout using Tailwind CSS (Flexbox/Grid).
- Works across mobile, tablet, and desktop.

### 4) Interactivity
- Theme toggle (light/dark/system)
- Animated role text in hero
- Smooth section scrolling and active nav state
- Project search + category filters

### 5) AI Integration
- Detailed report: `docs/ai-usage-report.md`
- Technical documentation: `docs/technical-documentation.md`
- AI used for implementation support, debugging, and documentation drafting with manual review.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- next/image, next/font

## Project Structure
```text
portfolio/
|-- app/
|-- components/
|-- data/
|-- public/
|-- docs/
|   |-- ai-usage-report.md
|   |-- technical-documentation.md
|   `-- rubric-self-check.md
`-- README.md
```

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open:
```text
http://localhost:3000
```

## Production Build

```bash
npm run lint
npm run build
npm run start
```

## Quality and Validation
- Linting: `npm run lint`
- Production readiness: `npm run build`
- Responsive checks: mobile, tablet, desktop in browser DevTools
- Accessibility checks: keyboard navigation, focus states, semantic structure

## Deployment (Vercel)
1. Push repository to GitHub.
2. Import project into Vercel.
3. Deploy with default Next.js settings.

Live deployment (optional):
- https://ali-shamah-portfolio.vercel.app

## Submission Checklist
- Public repository is created and accessible.
- Repository name matches instructor format exactly:
  - `<studentid>-<firstname><lastname>-assignment1`
- README, `docs/ai-usage-report.md`, and `docs/technical-documentation.md` are updated.
- Core requirements verified: About, Projects (2+), Contact form (Name/Email/Message), responsive behavior, and JavaScript interactivity.
- Final validation completed:
  - `npm run lint`
  - `npm run build`

## Key Files
- `app/page.tsx` home sections
- `app/projects/page.tsx` project index
- `app/projects/[slug]/page.tsx` case-study template
- `app/contact/page.tsx` contact page
- `components/contact-form.tsx` Name/Email/Message form
- `data/site.ts` personal/profile data
- `data/projects.ts` project data source
- `docs/ai-usage-report.md` AI usage documentation
- `docs/technical-documentation.md` technical explanation

## AI Use Summary (Short)
AI tools were used for iterative UI improvement, code suggestions, and debugging support. All generated outputs were reviewed, modified, and validated manually for correctness and academic integrity.
