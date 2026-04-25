# Demo Video Script

Target length: 5-7 minutes

## 0:00-1:00 - Introduction

Introduce yourself and the project:

> My name is Ali Shamah, and this is my final Assignment 4 personal portfolio web application. The goal was to create a polished, responsive, and documented web app that presents my profile, technical skills, projects, experience, resume, and contact options.

Mention motivation:

> I wanted the project to be useful beyond the course, so I built it as a professional portfolio that I can continue improving and share with others.

## 1:00-4:30 - Technical Demonstration

1. Open the home page.
   - Show the hero section, role animation, portrait, theme toggle, and compact snapshot row.
   - Point out the responsive layout and clean navigation.

2. Scroll to About.
   - Show profile, education, certifications, GitHub stats, and quote widget.
   - Mention that GitHub stats use a public API and the quote card has fallback content if the API is unavailable.

3. Open Projects.
   - Search for a keyword such as `AI` or `dashboard`.
   - Use category filters.
   - Change sorting.
   - Show the result count and empty state by searching for a term that does not match.

4. Open a project case study.
   - Show overview, problem, solution, architecture, tech stack, features, screenshots, and links.
   - Explain that pages are generated from typed project data.

5. Open Contact.
   - Show the 3-step form.
   - Trigger validation by clicking Next with empty fields.
   - Enter sample values, proceed to message, then review.
   - Mention local draft restore and the `mailto:` submission flow.

6. Open Resume and Links.
   - Show downloadable resume and quick links hub.

## 4:30-6:00 - Technical Deep Dive

Discuss architecture:

> The app uses Next.js App Router with route folders for home, projects, contact, resume, and links. Content is stored in typed data files, while reusable UI is separated into components.

Discuss challenge:

> A main challenge was combining interactive client features with a stable production build. Time-based widgets can cause hydration issues, so I loaded them through client-only wrappers. I also optimized large images into WebP assets to improve performance.

Discuss AI:

> I used AI tools for implementation support, debugging, code review, and documentation. I reviewed the suggestions, adapted them to the project, tested the result, and documented the process in the AI usage report.

## 6:00-7:00 - Conclusion

Close with outcomes:

> The final result is a responsive, documented, and production-ready personal web application. It demonstrates my full-stack, mobile, dashboard, and AI/ML work, and it is ready to share through the live deployment link.

Mention future work:

> Future improvements include a real backend for the contact form, project video demos, and a CMS for easier updates.

## Recording Checklist

- Run `npm run dev` before recording.
- Keep the browser zoom at 100%.
- Test the contact form flow once before recording.
- Keep the GitHub and quote widgets visible long enough to show loading or loaded states.
- Keep the demo focused on the assignment rubric.
