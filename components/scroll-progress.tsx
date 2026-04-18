"use client";

import { useEffect, useState } from "react";

/**
 * Thin accent-colored bar fixed at the very top of the viewport.
 * Width tracks how far the user has scrolled through the page (0 → 100%).
 * Uses requestAnimationFrame to avoid layout thrashing on scroll.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: `${progress}%` }}
      className="fixed left-0 top-0 z-[200] h-[3px] bg-[var(--accent)] transition-[width] duration-75 ease-out"
    />
  );
}
