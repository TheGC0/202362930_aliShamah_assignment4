# AI Usage Report

## Assignment 1

### Tools Used & Use Cases

#### 1) ChatGPT (OpenAI)
- Used for UI/UX iteration and implementation support while building the portfolio.
- Helped with:
  - Refining responsive layout and spacing
  - Debugging hydration and theme-toggle behavior
  - Improving accessibility labels and focus states
  - Generating and adjusting documentation structure

### Benefits & Challenges

**Benefits**
- Reduced development time for repetitive UI and documentation tasks.
- Faster debugging through step-by-step reasoning.
- Better consistency in code style and component structure.

**Challenges**
- Some AI suggestions were too generic and needed tailoring to the project's design language.
- A few suggestions introduced edge-case issues (for example SSR/CSR mismatch risk) and required manual correction.
- AI output still needed careful verification for assignment and rubric compliance.

### Learning Outcomes
- Improved practical use of Next.js App Router with reusable components.
- Better understanding of hydration pitfalls and how to avoid server/client mismatches.
- Stronger workflow for combining AI suggestions with manual code review and testing.
- Improved confidence in documenting engineering decisions clearly.

---

## Assignment 2

### Tools Used & Use Cases

#### 1) Claude Code (Anthropic — Claude Sonnet 4.6)
Used as the primary AI assistant for implementing Assignment 2's interactive features.

**Tasks where Claude Code assisted:**

- **Contact form enhancement**: Generated the initial structure for field-level validation logic and animated error/success banners. I reviewed the generated code, adjusted the validation rules (email regex, minimum message length), confirmed the localStorage name-save pattern, and verified it matched the existing form styles.

- **GitHub Stats component**: Suggested the pattern for fetching GitHub profile data and featured repositories in parallel with proper loading skeleton and error states. I reviewed the fetch logic, confirmed the cancel flag pattern prevents state updates on unmounted components, and adapted the card layout to match the site's design system.

- **Scroll-reveal animations**: Generated the IntersectionObserver script approach and the `.js-scroll` CSS class pattern (progressive enhancement — no flash of invisible content without JS). I verified the threshold value and transition timing worked well with the existing layout, then applied `.reveal` selectively to sections.

- **globals.css additions**: Suggested the `@keyframes fade-in-down` animation for form field errors and banners. I adjusted the easing and timing to be consistent with the site's existing animation style.

- **Documentation drafting**: Assisted in structuring this report and the README updates for Assignment 2. All written content was reviewed and edited for accuracy.

#### 2) ChatGPT (OpenAI) — continued from Assignment 1
- Consulted for cross-referencing specific Next.js App Router patterns.
- Used to sanity-check the IntersectionObserver approach for SSR-rendered pages.

### Benefits & Challenges — Assignment 2

**Benefits**
- Significantly faster implementation of boilerplate patterns (fetch with abort/cancel, skeleton loading states).
- Claude Code's ability to read the full codebase context meant suggestions fit the existing design system without major rework.
- Real-time iteration in the editor reduced the back-and-forth loop common with chat-based AI tools.

**Challenges**
- The first GitHub Stats card layout suggestion used absolute pixel sizes rather than the project's CSS variable system — required manual correction.
- Form validation logic needed several rounds of adjustment to match the UX goal (clear per-field inline errors that clear on typing, not on submit).
- Some scroll-reveal timing suggestions caused layout shift on fast connections — I tuned the `threshold` and `transitionDelay` values manually.

### Learning Outcomes — Assignment 2
- Stronger understanding of the IntersectionObserver API and how to use it progressively without breaking SSR.
- Hands-on practice with React `useEffect` cleanup patterns for async fetch operations.
- Practical experience using localStorage for lightweight user preference persistence.
- Improved ability to critically evaluate AI-generated code and adapt it to match an established codebase style.

### Responsible Use & Modifications
- Every AI-generated suggestion was reviewed before acceptance.
- Code was modified to match project constraints, existing design variables, and assignment requirements.
- Changes were validated with `npm run lint` and `npm run build`.
- AI was used as an assistant for speed and structure — not as a replacement for understanding. All final code decisions and edits were made by me.

### Academic Integrity Statement
- AI support was used transparently for ideation, code generation, and documentation.
- Final submitted work reflects my own understanding, review, and modifications.
- AI tools listed accurately above with descriptions of exactly how they were used.


---

## Assignment 3

### Tools Used & Use Cases

#### 1) Claude Code (Anthropic — Claude Sonnet 4.6)
Primary AI assistant for implementing Assignment 3's advanced features.

**Tasks where Claude Code assisted:**

- **Sort functionality in ProjectsClient**: Suggested adding a `SortKey` union type and a `<select>` dropdown alongside the existing category filter. I reviewed the generated sort logic, confirmed `localeCompare` is the right comparator for both date strings (ISO format) and titles, and added the "results count" line and "Clear filters" reset button myself.

- **QuoteWidget component (Quotable.io API)**: Generated the initial fetch pattern with loading skeleton, fallback quotes, and refresh button. I reviewed the error handling, adjusted the API query parameters (`tags`, `maxLength`) to get more relevant quotes, and matched the card styling to the existing `glass-panel` design system.

- **VisitorTimer component**: Suggested the `setInterval` + `useEffect` cleanup pattern. I added the `formatElapsed` function myself (seconds → minutes → hours formatting), chose `aria-live="off"` deliberately (a live-updating timer announced every second would be extremely disruptive to screen reader users), and added the `sr-only` span for context.

- **Multi-step ContactForm**: Suggested the step-state approach (`Step = 1 | 2 | 3`). I designed the `StepIndicator` sub-component layout, wrote the per-step validation functions (`validateStep1`, `validateStep2`) with specific error messages, added the subject field (optional, step 2), and built the review summary `<dl>` table in step 3.

- **`date` field for sort**: I added the `date` field to the `Project` type and assigned dates to all 6 projects based on my knowledge of when each was built. Claude did not know the actual dates.

- **Server Component `dynamic` fix**: Claude initially placed `dynamic({ ssr: false })` in `app/page.tsx` (a Server Component), which caused a build error. It then diagnosed the issue and suggested the `VisitorTimerDynamic` client wrapper pattern, which I implemented.

#### 2) ChatGPT (OpenAI) — reference use
- Cross-referenced the `aria-live="off"` decision for the timer — confirmed that a timer with frequent updates should not be `polite` or `assertive` to avoid disrupting screen reader users.

### Benefits & Challenges — Assignment 3

**Benefits**
- The multi-step form refactor was significantly faster with AI assistance — generating the initial structure took minutes rather than the hour it would have taken from scratch.
- Claude's codebase awareness (reading existing components before generating) meant suggestions already used `var(--accent)`, `var(--border)`, and the existing button class patterns without manual adaptation.
- Parallel feature development: while I reviewed one AI suggestion, the next could be drafted.

**Challenges**
- The `dynamic({ ssr: false })` in a Server Component error was caught only at build time, not in the editor. AI suggestions for Next.js App Router patterns should always be verified against the component's rendering context (server vs. client).
- The Quotable.io API occasionally returns quotes that don't quite fit a tech portfolio. The `tags` filter helps, but the fallback list required careful manual curation.
- Step 3 "review" panel required several iterations to display `message` without XSS risk — I confirmed that React's JSX escapes text by default (no manual `escapeHtml` needed, unlike the plain HTML version).

### Learning Outcomes — Assignment 3
- Deeper understanding of Next.js App Router rendering boundaries: `dynamic({ ssr: false })` must be inside a `"use client"` component, not a Server Component.
- Better grasp of when to use `aria-live` and when to explicitly suppress it (`aria-live="off"`) — accessibility is not just about adding ARIA, it's about not being disruptive.
- Practical use of `Promise.all` for parallel API calls — fetching profile and repos simultaneously instead of waiting on them one after the other.
- Understanding that sort + filter composition requires immutable operations (`[...results].sort(...)`) to avoid mutating the memoized source array.

### Responsible Use & Modifications
- All AI-generated code was reviewed, tested against `npm run build`, and modified to fit the project's design system and assignment requirements.
- The `date` field values, fallback quotes, and accessibility decisions were made by me, not by AI.
- `npm run lint` and `npm run build` were run after every change to verify correctness.
- AI was used for scaffolding speed and pattern suggestions — all architectural decisions (component boundaries, state shape, API choice) were made independently.

### Academic Integrity Statement
- AI support is documented transparently above with precise descriptions of what was generated vs. what was written independently.
- All submitted code reflects my own understanding, review, and modifications.
- I can explain every line of code in this project.


---

## Assignment 4

### Tools Used & Use Cases

#### 1) OpenAI Codex
Used as the final Assignment 4 assistant for production-readiness review, polishing, documentation, and verification.

**Tasks where Codex assisted:**

- **Rubric alignment review**: Compared the current portfolio against the Assignment 4 rubric criteria and identified final-submission gaps — especially README completeness, presentation material structure, AI documentation depth, and performance packaging. I used this as a checklist to prioritize remaining work, not as a replacement for my own review.
- **Image optimization workflow**: Helped identify oversized public assets and generate the WebP conversion workflow. I reviewed the resulting files, confirmed file sizes were acceptable, and updated the project data to reference the new paths.
- **Hero section redesign**: Suggested replacing the visitor timer with a compact hero snapshot row. I evaluated the suggestion against the design system, chose to keep it because it communicated more useful information (age, tech focus, and location), and adjusted the layout to match the existing glass-panel spacing.
- **Screenshot-based design debugging**: Used AI feedback on screenshots to identify visual issues such as the green accent not matching the requested monochrome theme and the hero portrait/card appearing clipped at narrow viewport widths. I reviewed the suggested layout fixes, kept the useful constraints, and manually verified that the final solution matched the black/white/grey direction.
- **Final visual polish pass**: Reviewed the visual system and helped identify inconsistencies in dark-mode accent contrast. I made the final decisions on color values and verified them against WCAG contrast guidelines manually.
- **Presentation structure**: Drafted the initial slide outline and recording script structure. I rewrote the speaker notes and technical content to match the final implementation details and presentation flow.

#### 2) Claude Code (Anthropic — Claude Sonnet 4.6)
Used in the final Assignment 4 pass for feature additions, code review, and documentation improvements.

**Tasks where Claude Code assisted:**

- **BackToTop component**: Generated the initial `useEffect` + `useState` scroll-listener pattern. I reviewed it, confirmed the `passive: true` option was correct for scroll performance, and adjusted the visibility threshold to 400px to match the typical hero section height.
- **SVG icon replacement**: Suggested using inline SVG `path` elements for the mobile menu hamburger and close icons instead of text characters. I chose the specific Heroicons paths (3-line hamburger, X close) that matched the site's visual weight.
- **Print stylesheet**: Suggested the `@media print` rule structure for the resume page. I reviewed which selectors to suppress (header, footer, back-to-top), confirmed `page-break-inside: avoid` applied to sections, and tested the output visually in Chrome's print preview.
- **README user guide section**: Drafted the initial "Site Features" and "Navigating the Portfolio" section outlines. I wrote the final content from scratch, describing each page's features in user-facing language rather than technical terms.
- **Slide deck enhancement**: Reviewed the existing slides.md and suggested converting it to a structured 11-slide format with a consistent table layout and speaker note depth. I rewrote the technical challenge table and all speaker notes based on actual implementation experiences.

#### 3) ChatGPT (OpenAI) — continued reference use
- Cross-referenced print CSS behavior for `@media print` — specifically confirmed that `display: none` on `header` and `footer` works correctly in Chrome and Safari print rendering.
- Sanity-checked the WCAG contrast ratio guidance for the dark-mode accent color choices.

### Innovative AI Use — Assignment 4

Beyond simple code generation, Assignment 4 used AI in more creative problem-solving ways:

1. **Rubric-as-a-test**: I fed the Assignment 4 rubric directly to Codex and asked it to score each criterion against the current implementation, identifying gaps. This is an unusual use of AI as a structured audit tool rather than a code generator — and it surfaced the README user guide gap that I had not noticed myself.

2. **Codebase-aware review**: By having Claude Code read my actual components before suggesting new ones, I avoided the common problem of AI-generated code that does not match the existing design system. Every suggestion already used `var(--accent)`, `var(--border)`, and the existing button class patterns without needing manual adaptation.

3. **Feature-value critique**: I used AI as a product reviewer to question whether the visitor timer added value. The result was replacing it with the hero snapshot row, which communicates more meaningful portfolio information and better fits the professional presentation.

4. **Screenshot-driven UI QA**: I used screenshots as review inputs for AI-assisted design debugging. This helped catch visual problems that were easier to see than describe in code, including theme mismatch and portrait/card framing. I still made the final CSS decisions manually after comparing the suggestions with the project layout.

5. **Documentation quality gate**: I used Claude Code to review my technical documentation and README drafts for gaps or confusing language, then rewrote sections based on the feedback. This caught the developer-only focus of the original README and led to adding the user-facing "Site Features" and "Navigating the Portfolio" sections.

### Benefits & Challenges — Assignment 4

**Benefits**
- The rubric audit use case was the most innovative — using AI as a structured reviewer rather than a code generator saved significant time on identifying submission gaps.
- Screenshot review made the design polish process faster because visual defects could be discussed directly instead of translated into vague layout descriptions.
- Codebase-aware Claude Code suggestions required almost no manual adaptation to match the design system, unlike generic AI tools.
- Documentation review helped shift the README from developer-only to user-friendly, which directly addresses the "User Experience" documentation rubric criterion.

**Challenges**
- Some Codex suggestions still needed adjustment to match the App Router rendering context (server vs. client component boundaries).
- The presentation deliverables require a human-recorded video and final slide PDF export; AI prepared the content, but the recording must be completed manually.
- AI suggestions for print CSS needed careful verification — the initial suggestion included too-aggressive display:none rules that would have hidden the resume content itself.

### Learning Outcomes — Assignment 4
- Learned to use AI as a structured audit tool, not just a code generator — feeding the rubric directly produced more targeted feedback than asking general questions.
- Learned that AI is most useful for UI polish when screenshots are paired with manual code review; the screenshot identifies the problem, but the codebase still determines the correct fix.
- Improved understanding of print CSS and how `@media print` interacts with Next.js-rendered pages.
- Practiced writing user-facing documentation (as opposed to developer documentation) as a distinct skill — the language, structure, and goals are very different.
- Strengthened the validation workflow: lint → build → manual feature check → print preview → cross-browser check.

### Responsible Use & Modifications
- All AI-generated code was reviewed before being kept, tested against `npm run build`, and verified manually in the browser.
- Speaker notes and all written content in the README and slides were rewritten in my own words, not submitted as AI output.
- Rubric audit results were treated as suggestions, not verdicts — I made the final prioritization decisions myself.
- `npm run lint` and `npm run build` were run after every change.
- AI was used as an accelerator for speed and pattern generation; all final code decisions, architectural choices, and written explanations are my own.

### Academic Integrity Statement
- AI use is documented openly for each assignment phase with specific task-level descriptions.
- The final submission reflects reviewed, modified, tested, and personally understood work.
- I can explain every component, hook, CSS rule, and data model in this project.
