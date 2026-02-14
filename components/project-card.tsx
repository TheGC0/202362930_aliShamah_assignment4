import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";
import { Tag } from "@/components/ui/tag";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const hasThemeBrandVisual = Boolean(project.brandLogoLight || project.brandLogoDark);
  const usesBrandVisual = Boolean(project.brandLogo) || hasThemeBrandVisual;
  const fallbackBrandVisual =
    project.brandLogo ?? project.brandLogoLight ?? project.brandLogoDark;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Open ${project.title} case study`}
      />

      <div
        className={`relative h-52 overflow-hidden border-b border-[var(--border)] ${
          usesBrandVisual ? "bg-[var(--surface-subtle)]" : ""
        }`}
      >
        {hasThemeBrandVisual ? (
          <>
            {project.brandLogoLight ? (
              <Image
                src={project.brandLogoLight}
                alt={`${project.title} logo`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                priority={priority}
                className="theme-logo-light object-contain p-5 sm:p-6"
              />
            ) : null}
            {project.brandLogoDark ? (
              <Image
                src={project.brandLogoDark}
                alt={`${project.title} logo`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                priority={priority}
                className="theme-logo-dark object-contain p-5 sm:p-6"
              />
            ) : null}
          </>
        ) : (
          <Image
            src={usesBrandVisual && fallbackBrandVisual ? fallbackBrandVisual : project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priority}
            className={
              usesBrandVisual
                ? "object-contain p-5 sm:p-6"
                : "object-cover transition duration-500 group-hover:scale-[1.03]"
            }
          />
        )}
      </div>

      <div className="relative z-20 p-5">
        <div className="flex flex-wrap gap-2">
          {project.categories.filter((category) => category !== "All").map((category) => (
            <Tag key={`${project.slug}-${category}`}>{category}</Tag>
          ))}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-[var(--text)]">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{project.impact}</p>

        <div className="mt-4 grid grid-cols-1 gap-2">
          {project.stats.slice(0, 3).map((stat) => (
            <div
              key={`${project.slug}-${stat.label}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-2"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                {stat.label}
              </p>
              <p className="mt-1 text-xs font-medium text-[var(--text)]">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
