"use client";

import dynamic from "next/dynamic";

const TimeGreetingInner = dynamic(
  () => import("@/components/time-greeting").then((m) => m.TimeGreeting),
  { ssr: false },
);

export function TimeGreetingDynamic() {
  return <TimeGreetingInner />;
}
