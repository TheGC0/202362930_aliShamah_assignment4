import type { Metadata } from "next";

import { GhalaaCelebration } from "./GhalaaCelebration";

export const metadata: Metadata = {
  title: "Happy Birthday Ghalaa! 🎂",
  description: "A special birthday celebration for Ghalaa 🎉",
  robots: { index: false, follow: false },
};

export default function GhalaaPage() {
  return <GhalaaCelebration />;
}
