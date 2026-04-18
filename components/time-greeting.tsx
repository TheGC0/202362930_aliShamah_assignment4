"use client";

import { useEffect, useState } from "react";

/** Returns "morning" | "afternoon" | "evening" based on the user's local time. */
function getTimeOfDay(): "morning" | "afternoon" | "evening" {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

/**
 * Renders a time-aware greeting that changes based on the visitor's local clock.
 * Rendered client-side only to avoid SSR/hydration mismatch.
 */
export function TimeGreeting() {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    setGreeting(`Good ${getTimeOfDay()},`);

    // Recalculate at the top of each hour in case the user stays on the page
    const now = new Date();
    const msUntilNextHour =
      (60 - now.getMinutes()) * 60_000 - now.getSeconds() * 1000;

    const timeout = setTimeout(() => {
      setGreeting(`Good ${getTimeOfDay()},`);
    }, msUntilNextHour);

    return () => clearTimeout(timeout);
  }, []);

  if (!greeting) return null;

  return (
    <span className="block text-sm font-medium tracking-wide text-[var(--accent)]">
      {greeting}
    </span>
  );
}
