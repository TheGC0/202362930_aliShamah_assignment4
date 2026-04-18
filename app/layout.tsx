import type { Metadata } from "next";
import { IBM_Plex_Mono, Sora } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";

import { AnalyticsPlaceholder } from "@/components/analytics-placeholder";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/data/site";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const title = `${siteConfig.name} | Software Engineer`;
const description = siteConfig.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  keywords: [
    "Ali Shamah",
    "Software Engineer",
    "Full-Stack Developer",
    "AI/ML",
    "Next.js portfolio",
    "Web and Mobile Developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title,
    description,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio cover`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-cover.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo_noBg.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo_noBg.png",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.shortTitle,
  email: `mailto:${siteConfig.email}`,
  telephone: siteConfig.phoneDisplay,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhahran",
    addressCountry: "SA",
  },
  sameAs: [
    siteConfig.links.linkedin,
    siteConfig.links.github,
    siteConfig.links.linktree,
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${siteConfig.name} Portfolio`,
  url: siteConfig.url,
};

const scrollRevealScript = `
(function () {
  try {
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-scroll');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } catch (e) {}
})();
`;

const themeInitScript = `
(function () {
  try {
    // Apply the saved/system theme before React hydration to avoid flash and mismatch.
    var key = 'ali-shamah-theme';
    var stored = localStorage.getItem(key);
    var preference = stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = preference === 'system' ? (dark ? 'dark' : 'light') : preference;
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${ibmPlexMono.variable} antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script id="scroll-reveal" strategy="afterInteractive">
          {scrollRevealScript}
        </Script>

        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--surface)] focus:px-3 focus:py-2 focus:text-sm focus:text-[var(--text)] focus:ring-2 focus:ring-[var(--ring)]"
        >
          Skip to content
        </a>

        <div className="relative min-h-screen">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[var(--page-gradient)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_top,_var(--accent-soft),_transparent_62%)] opacity-70" />

          <ScrollProgress />
          <SiteHeader />

          <main id="content" className="mx-auto w-full max-w-6xl px-6 pb-8 pt-10 sm:pt-14">
            {children}
          </main>

          <SiteFooter />
        </div>

        <Suspense fallback={null}>
          <AnalyticsPlaceholder />
        </Suspense>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]),
          }}
        />
      </body>
    </html>
  );
}
