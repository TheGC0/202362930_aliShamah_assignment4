"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCategory } from "@/data/projects";
import { projectCategories } from "@/data/projects";

type SortKey = "date-desc" | "date-asc" | "name-asc" | "name-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "date-desc", label: "Newest first" },
  { value: "date-asc",  label: "Oldest first" },
  { value: "name-asc",  label: "Name A → Z" },
  { value: "name-desc", label: "Name Z → A" },
];

type ProjectsClientProps = {
  initialProjects: Project[];
};

/**
 * Normalise a string for search comparison:
 * lowercase, collapse hyphens/dots/slashes to spaces so that
 * "Next.js", "next-js", and "nextjs" all match a query of "next js" or "nextjs".
 */
function normalise(str: string): string {
  return str.toLowerCase().replace(/[-./\\]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Returns true when every word in the query appears somewhere in the
 * combined searchable text of the project.
 * Searching "react firebase" will only match projects that mention
 * BOTH react AND firebase anywhere across title, subtitle, tags, and tech stack.
 */
function matchesQuery(project: Project, query: string): boolean {
  if (!query) return true;

  const haystack = normalise(
    [
      project.title,
      project.subtitle,
      project.impact,
      ...project.tags,
      ...project.techStack,
      ...project.categories,
    ].join(" "),
  );

  // Every word in the query must appear somewhere in the haystack
  return query
    .split(" ")
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [query,          setQuery]    = useState("");
  const [activeCategory, setCategory] = useState<ProjectCategory>("All");
  const [sort,           setSort]     = useState<SortKey>("date-desc");

  const normalisedQuery = useMemo(() => normalise(query.trim()), [query]);

  const filteredProjects = useMemo(() => {
    let results = initialProjects.filter((project) => {
      const categoryMatch =
        activeCategory === "All" || project.categories.includes(activeCategory);
      const queryMatch = matchesQuery(project, normalisedQuery);
      return categoryMatch && queryMatch;
    });

    switch (sort) {
      case "date-desc": results = [...results].sort((a, b) => b.date.localeCompare(a.date)); break;
      case "date-asc":  results = [...results].sort((a, b) => a.date.localeCompare(b.date)); break;
      case "name-asc":  results = [...results].sort((a, b) => a.title.localeCompare(b.title)); break;
      case "name-desc": results = [...results].sort((a, b) => b.title.localeCompare(a.title)); break;
    }

    return results;
  }, [activeCategory, initialProjects, normalisedQuery, sort]);

  function handleReset() {
    setQuery("");
    setCategory("All");
    setSort("date-desc");
  }

  const hasActiveFilters = query.trim() || activeCategory !== "All" || sort !== "date-desc";

  return (
    <div className="space-y-8">
      {/* ── Controls panel ─────────────────────────────────────────────── */}
      <section
        aria-label="Project filters"
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]"
      >
        {/* Search */}
        <label htmlFor="project-search" className="text-sm font-medium text-[var(--text)]">
          Search projects
        </label>

        {/* UX guidance: explains HOW to use the search, not just what it does */}
        <p className="mt-0.5 text-xs text-[var(--muted)]">
          Type one or more keywords — e.g. <strong className="text-[var(--text)]">React Firebase</strong> finds
          projects that use both. Matches against project names, technologies, and descriptions.
        </p>

        <input
          id="project-search"
          name="project-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try: Flutter, AI, Next.js, dashboard…"
          aria-describedby="project-search-hint"
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        />

        {/* Category filter */}
        <div className="mt-4 space-y-1.5">
          <p id="project-search-hint" className="text-xs text-[var(--muted)]">
            Filter by category — click a pill to show only projects of that type:
          </p>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
            {projectCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                    isActive
                      ? "border-transparent bg-[var(--accent)] text-white"
                      : "border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort + results row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="project-sort" className="text-xs text-[var(--muted)]">
              Sort results:
            </label>
            <select
              id="project-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1.5 text-xs text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xs text-[var(--muted)]" aria-live="polite" aria-atomic="true">
              {filteredProjects.length === initialProjects.length
                ? `${initialProjects.length} projects`
                : `${filteredProjects.length} of ${initialProjects.length} matched`}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[var(--accent)] underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Project grid ───────────────────────────────────────────────── */}
      {filteredProjects.length > 0 ? (
        <section aria-label="Project results" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <h2 className="text-lg font-semibold text-[var(--text)]">No projects matched</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Try fewer keywords, check your spelling, or{" "}
            <button
              type="button"
              onClick={handleReset}
              className="text-[var(--accent)] underline-offset-2 hover:underline"
            >
              reset all filters
            </button>
            .
          </p>
          {normalisedQuery && (
            <p className="mt-1 text-xs text-[var(--muted)]">
              Tip: searching <strong className="text-[var(--text)]">&ldquo;{query.trim()}&rdquo;</strong> looks
              for all words together — try one word at a time for broader results.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
