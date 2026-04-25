import { siteConfig } from "@/data/site";

const birthDate = new Date("2005-11-07T00:00:00");

function getAge(date: Date) {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const birthdayHasPassed =
    today.getMonth() > date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

  if (!birthdayHasPassed) {
    age -= 1;
  }

  return age;
}

const highlights = [
  { label: "Age", value: `${getAge(birthDate)} years old` },
  { label: "Focus", value: "Web, Mobile, AI/ML" },
  { label: "Location", value: siteConfig.location },
] as const;

export function HeroSnapshot() {
  return (
    <dl
      aria-label="Portfolio snapshot"
      className="mt-6 grid max-w-2xl gap-3 border-y border-[var(--border)] py-4 sm:grid-cols-3"
    >
      {highlights.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-[var(--text)]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
