type TimelineItemProps = {
  role: string;
  organization: string;
  period: string;
  points: string[];
};

export function TimelineItem({
  role,
  organization,
  period,
  points,
}: TimelineItemProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
      <div
        className="absolute bottom-6 left-0 top-6 w-1 rounded-r-full bg-gradient-to-b from-[var(--accent)]/70 via-[var(--accent)]/40 to-transparent"
        aria-hidden="true"
      />
      <div className="pl-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {period}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">{role}</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">{organization}</p>
        {points.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {points.map((point) => (
              <li key={point} className="flex gap-2 text-sm text-[var(--muted)]">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  aria-hidden="true"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
