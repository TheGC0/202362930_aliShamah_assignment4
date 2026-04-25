import Link from "next/link";

import { siteConfig } from "@/data/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/links", label: "Links Hub" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--surface)]/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-[var(--text)]">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Software Engineer focused on full-stack web/mobile applications and
            applied AI/ML systems.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[var(--text)] transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text)]">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.phone}`}
                className="transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>{siteConfig.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-6 py-4 text-center text-xs text-[var(--muted)]">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; TypeScript.</p>
      </div>
    </footer>
  );
}
