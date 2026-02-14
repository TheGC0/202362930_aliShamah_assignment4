"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { siteConfig } from "@/data/site";

const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle").then((module) => module.ThemeToggle),
  {
    ssr: false,
    loading: () => <span className="inline-flex h-11 w-[108px]" aria-hidden="true" />,
  },
);

const homeSectionLinks = [
  { id: "about", label: "About" },
  { id: "featured-projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "leadership", label: "Leadership" },
  { id: "contact", label: "Contact" },
] as const;

const routeLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/links", label: "Links Hub" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(homeSectionLinks[0].id);

  const isHome = pathname === "/";

  const navItems = useMemo(() => {
    if (isHome) {
      return homeSectionLinks.map((item) => ({
        href: `/#${item.id}`,
        label: item.label,
        id: item.id,
      }));
    }

    return routeLinks.map((item) => ({
      href: item.href,
      label: item.label,
      id: item.href,
    }));
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const sectionElements = homeSectionLinks
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sectionElements.length === 0) {
      return;
    }

    // Track the most visible home section to keep nav highlight in sync while scrolling.
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--header-bg)]/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full px-2 py-1 transition hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-label="Ali Shamah home"
        >
          <span className="grid h-10 w-10 place-items-center">
            <Image
              src="/logo_noBg.png"
              alt="Ali Shamah logo"
              width={34}
              height={34}
              className="h-8 w-8 object-contain"
            />
          </span>
          <span className="text-sm font-semibold tracking-wide text-[var(--text)]">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = isHome
              ? activeSection === item.id
              : item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-full px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] ${
                  isActive
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text)]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span aria-hidden="true">{isMenuOpen ? "X" : "="}</span>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-menu"
          className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm text-[var(--text)] transition hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
