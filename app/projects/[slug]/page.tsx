import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Tag } from "@/components/ui/tag";
import {
  getProjectBySlug,
  getProjectNeighbors,
  projects,
} from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.impact,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.impact,
      images: [project.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.impact,
      images: [project.image],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getProjectNeighbors(slug);

  return (
    <article className="space-y-10 pb-8">
      <header className="glass-panel rounded-3xl p-8">
        <div className="flex flex-wrap gap-2">
          {project.categories
            .filter((category) => category !== "All")
            .map((category) => (
              <Tag key={`${project.slug}-${category}`}>{category}</Tag>
            ))}
        </div>
        <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-[var(--muted)]">{project.subtitle}</p>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {project.impact}
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">Overview</h2>
          <p className="mt-3 leading-relaxed text-[var(--muted)]">{project.overview}</p>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">Problem</h2>
          <p className="mt-3 leading-relaxed text-[var(--muted)]">{project.problem}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">Solution</h2>
          <p className="mt-3 leading-relaxed text-[var(--muted)]">{project.solution}</p>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">Tech Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={`${project.slug}-${tech}`}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-1 text-sm text-[var(--text)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Architecture</h2>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Simplified flow diagram rendered as text.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm leading-relaxed text-[var(--text)]">
          {project.architecture}
        </pre>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">Key Features</h2>
          <ul className="mt-4 space-y-2">
            {project.keyFeatures.map((feature) => (
              <li key={feature} className="flex gap-2 text-sm text-[var(--muted)]">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">
            Challenges & Learnings
          </h2>
          <ul className="mt-4 space-y-2">
            {project.challengesAndLearnings.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-[var(--muted)]">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {project.gallery.length > 0 ? (
        <section className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-[var(--text)]">Screenshots</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {project.gallery.map((imagePath) => (
              <figure
                key={imagePath}
                className="overflow-hidden rounded-xl border border-[var(--border)]"
              >
                <div className="relative h-52">
                  <Image
                    src={imagePath}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="glass-panel rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Links</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              Live Site
            </a>
          ) : null}

          {project.links.demo ? (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              Demo
            </a>
          ) : null}

          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              GitHub
            </a>
          ) : null}

          {project.links.repoPrivate ? (
            <span className="rounded-full border border-dashed border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)]">
              Private repo
            </span>
          ) : null}
        </div>
      </section>

      <nav className="grid gap-4 sm:grid-cols-2" aria-label="Project navigation">
        {previous ? (
          <Link
            href={`/projects/${previous.slug}`}
            className="glass-panel rounded-2xl p-5 transition hover:-translate-y-0.5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Previous project</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text)]">{previous.title}</p>
          </Link>
        ) : (
          <div className="glass-panel rounded-2xl p-5 opacity-70">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Previous project</p>
            <p className="mt-2 text-lg font-semibold text-[var(--muted)]">None</p>
          </div>
        )}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="glass-panel rounded-2xl p-5 text-right transition hover:-translate-y-0.5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Next project</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text)]">{next.title}</p>
          </Link>
        ) : (
          <div className="glass-panel rounded-2xl p-5 text-right opacity-70">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Next project</p>
            <p className="mt-2 text-lg font-semibold text-[var(--muted)]">None</p>
          </div>
        )}
      </nav>
    </article>
  );
}
