import Image from "next/image";
import Link from "next/link";

import { HeroRoleRotator } from "@/components/hero-role-rotator";
import { ProjectCard } from "@/components/project-card";
import { SkillGroup } from "@/components/skill-group";
import { TimelineItem } from "@/components/timeline-item";
import { SectionHeader } from "@/components/ui/section-header";
import { featuredProjects } from "@/data/projects";
import {
  certifications,
  education,
  experienceTimeline,
  heroRoles,
  leadership,
  siteConfig,
  skillGroups,
} from "@/data/site";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-8">
      <section id="home" className="section-anchor-offset">
        <div className="glass-panel rounded-3xl p-8 sm:p-12">
          <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl leading-tight text-[var(--text)] sm:flex-nowrap sm:text-3xl">
                <span>Hello, I&apos;m</span>
                <span className="role-highlight font-medium">
                  <HeroRoleRotator roles={heroRoles} />
                </span>
              </p>
              <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight text-[var(--text)] sm:text-7xl">
                {siteConfig.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Software Engineer focused on full-stack web/mobile development and practical AI/ML
                systems that solve real business problems.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#featured-projects"
                  className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  View Projects
                </Link>
                <Link
                  href="/#contact"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:-translate-y-0.5 hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  Contact
                </Link>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  GitHub
                </a>
                <a
                  href={siteConfig.links.resume}
                  download
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  Resume PDF
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs lg:mx-0 lg:-mt-4 lg:self-start lg:justify-self-end">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-subtle)]">
                <Image
                  src="/image.png"
                  alt="Ali Shamah portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 320px, 380px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-anchor-offset space-y-8">
        <SectionHeader
          eyebrow="About"
          title="Building useful products across web, mobile, and AI"
          description="I focus on turning business requirements into clear technical systems, then delivering polished interfaces and maintainable backend architecture."
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="glass-panel rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-[var(--text)]">Profile</h3>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              I am a Computer Science student at KFUPM and an active full-stack
              developer working on production software for business operations,
              event platforms, POS workflows, and applied AI/ML services.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              My work spans React/Next.js, Flutter, Node.js, Firebase, and Python
              ML tooling. I care about UX clarity, technical quality, and
              dependable delivery.
            </p>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-[var(--text)]">Education</h3>
            <p className="mt-4 text-sm text-[var(--muted)]">{education.school}</p>
            <p className="mt-2 text-sm font-medium text-[var(--text)]">{education.degree}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{education.period}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{education.graduation}</p>

            <hr className="futuristic-divider my-6" />

            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Certifications
            </h4>
            <ul className="mt-3 space-y-2">
              {certifications.map((certification) => (
                <li key={certification} className="text-sm text-[var(--text)]">
                  {certification}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="featured-projects" className="section-anchor-offset space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow="Featured"
            title="Selected projects"
            description="A focused sample of full-stack and AI/ML work with clear engineering outcomes."
          />
          <Link
            href="/projects"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            View all projects
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index === 0} />
          ))}
        </div>
      </section>

      <section id="experience" className="section-anchor-offset space-y-8">
        <SectionHeader
          eyebrow="Experience"
          title="Professional timeline"
          description="Project-based engineering and freelance delivery across product, operations, and automation domains."
        />
        <div className="space-y-4">
          {experienceTimeline.map((entry) => (
            <TimelineItem
              key={`${entry.organization}-${entry.period}`}
              role={entry.role}
              organization={entry.organization}
              period={entry.period}
              points={entry.points}
            />
          ))}
        </div>
      </section>

      <section id="skills" className="section-anchor-offset space-y-8">
        <SectionHeader
          eyebrow="Skills"
          title="Core tools and capabilities"
          description="A practical stack across frontend/mobile, backend infrastructure, and applied machine learning."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillGroup key={group.title} title={group.title} skills={group.skills} />
          ))}
        </div>
      </section>

      <section id="leadership" className="section-anchor-offset space-y-8">
        <SectionHeader
          eyebrow="Volunteering & Leadership"
          title="Leading teams and supporting organizations"
          description="Hands-on leadership experience in event technology and committee operations."
        />
        <div className="space-y-4">
          {leadership.map((entry) => (
            <TimelineItem
              key={`${entry.organization}-${entry.period}`}
              role={entry.role}
              organization={entry.organization}
              period={entry.period}
              points={[...entry.points]}
            />
          ))}
        </div>
      </section>

      <section id="contact" className="section-anchor-offset space-y-8">
        <SectionHeader
          eyebrow="Contact"
          title="Let us build something useful"
          description="For collaborations, project inquiries, or technical opportunities, reach out directly or use the contact page form."
        />

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <article className="glass-panel rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-[var(--text)]">Direct contact</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm text-[var(--text)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Email</p>
                <p className="mt-1">{siteConfig.email}</p>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm text-[var(--text)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Phone</p>
                <p className="mt-1">{siteConfig.phoneDisplay}</p>
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm text-[var(--text)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">LinkedIn</p>
                <p className="mt-1">Open profile</p>
              </a>
              <Link
                href="/links"
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4 text-sm text-[var(--text)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Links Hub</p>
                <p className="mt-1">View all quick links</p>
              </Link>
            </div>
          </article>

          <article className="glass-panel rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-[var(--text)]">Send a message</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Use the dedicated contact route for a message form with mail draft
              integration.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                Open Contact Page
              </Link>
              <a
                href={siteConfig.links.resume}
                download
                className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                Download Resume
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
