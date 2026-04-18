"use client";

import { FormEvent, useEffect, useState } from "react";

import { siteConfig } from "@/data/site";

/* ── Types ───────────────────────────────────────────────────────────────── */

type Step = 1 | 2 | 3;

type FieldErrors = {
  name?:    string;
  email?:   string;
  message?: string;
};

type SubmitStatus = "idle" | "submitting" | "sent" | "error";

const STORAGE_KEY       = "contact-form-name";
const DRAFT_STORAGE_KEY = "contact-form-draft";
const MAX_MESSAGE       = 500;

type DraftData = { name: string; email: string; subject: string; message: string };

/* ── Validation ──────────────────────────────────────────────────────────── */

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateStep1(name: string, email: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim())  errors.name  = "Name is required.";
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

function validateStep2(message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!message.trim()) {
    errors.message = "Message is required.";
  } else if (message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.trim().length > MAX_MESSAGE) {
    errors.message = `Message must be ${MAX_MESSAGE} characters or fewer.`;
  }
  return errors;
}

/* ── Step indicator sub-component ───────────────────────────────────────── */

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { num: 1, label: "You" },
    { num: 2, label: "Message" },
    { num: 3, label: "Review" },
  ] as const;

  return (
    <div className="mb-6 flex items-center" aria-label="Form progress">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <span
              aria-current={current === step.num ? "step" : undefined}
              className={`flex h-7 w-7 items-center justify-content-center items-center justify-center rounded-full text-xs font-bold transition ${
                current > step.num
                  ? "bg-[var(--accent)] text-white"
                  : current === step.num
                  ? "bg-[var(--accent)] text-white ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--surface)]"
                  : "border border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--muted)]"
              }`}
            >
              {current > step.num ? "✓" : step.num}
            </span>
            <span
              className={`text-xs font-medium ${
                current === step.num ? "text-[var(--accent)]" : "text-[var(--muted)]"
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`mx-2 mb-5 h-px w-10 transition sm:w-16 ${
                current > step.num ? "bg-[var(--accent)]" : "bg-[var(--border)]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */

export function ContactForm() {
  const [step,          setStep]          = useState<Step>(1);
  const [name,          setName]          = useState("");
  const [email,         setEmail]         = useState("");
  const [subject,       setSubject]       = useState("");
  const [message,       setMessage]       = useState("");
  const [errors,        setErrors]        = useState<FieldErrors>({});
  const [status,        setStatus]        = useState<SubmitStatus>("idle");
  const [draftRestored, setDraftRestored] = useState(false);

  // Restore full draft from localStorage on mount
  useEffect(() => {
    const restoreDraft = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (raw) {
          const draft: DraftData = JSON.parse(raw);
          if (draft.name) setName(draft.name);
          if (draft.email) setEmail(draft.email);
          if (draft.subject) setSubject(draft.subject);
          if (draft.message) setMessage(draft.message);
          // Only show the banner if there was meaningful draft content
          if (draft.message?.trim() || draft.subject?.trim()) setDraftRestored(true);
        } else {
          // Fall back to legacy name-only key
          const savedName = localStorage.getItem(STORAGE_KEY);
          if (savedName) setName(savedName);
        }
      } catch {
        /* localStorage unavailable */
      }
    }, 0);

    return () => window.clearTimeout(restoreDraft);
  }, []);

  // Persist the entire form draft on every keystroke
  function saveDraft(patch: Partial<DraftData>) {
    try {
      const current: DraftData = { name, email, subject, message, ...patch };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(current));
      // Keep legacy name key in sync
      if (current.name.trim()) localStorage.setItem(STORAGE_KEY, current.name.trim());
    } catch { /* localStorage unavailable */ }
  }

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
    saveDraft({ name: value });
  };

  /* ── Step navigation ─────────────────────────────────────────────────── */

  function goNext() {
    if (step === 1) {
      const errs = validateStep1(name, email);
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      const errs = validateStep2(message);
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setErrors({});
      setStep(3);
    }
  }

  function goBack() {
    setErrors({});
    setStep((s) => (s > 1 ? (s - 1) as Step : s));
  }

  /* ── Submission ──────────────────────────────────────────────────────── */

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    try {
      const sub  = encodeURIComponent(subject.trim() || `Portfolio inquiry from ${name.trim()}`);
      const body = encodeURIComponent(
        `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      );
      window.location.href = `mailto:${siteConfig.email}?subject=${sub}&body=${body}`;
      setStatus("sent");
      // Clear draft after successful submission
      try { localStorage.removeItem(DRAFT_STORAGE_KEY); } catch { /* ignore */ }
    } catch {
      setStatus("error");
    }
  }

  /* ── Shared input styles ─────────────────────────────────────────────── */

  const inputBase =
    "mt-2 w-full rounded-xl border px-4 py-3 text-sm text-[var(--text)] bg-[var(--surface-subtle)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]";
  const inputOk  = "border-[var(--border)]";
  const inputErr = "border-red-500";

  const msgLen = message.trim().length;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]"
    >
      <StepIndicator current={step} />

      {/* Draft-restored notification */}
      {draftRestored && (
        <div
          role="status"
          className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-2.5 text-xs text-[var(--muted)]"
        >
          <span>✏️ Draft restored from your last visit.</span>
          <button
            type="button"
            onClick={() => {
              setName(""); setEmail(""); setSubject(""); setMessage("");
              setDraftRestored(false);
              try { localStorage.removeItem(DRAFT_STORAGE_KEY); } catch { /* ignore */ }
            }}
            className="text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Discard
          </button>
        </div>
      )}

      {/* ── Step 1: Identity ─────────────────────────────────────────── */}
      {step === 1 && (
        <fieldset className="space-y-4 border-none p-0">
          <legend className="sr-only">Your information</legend>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]">
            <strong className="block text-[var(--text)]">Step 1 of 3 — Your details</strong>
            Enter your name and email address so I know how to reach you back. Your name is
            automatically saved for your next visit. Click <strong className="text-[var(--text)]">Next →</strong> when ready.
          </div>

          {/* Name */}
          <div>
            <label htmlFor="cf-name" className="text-sm font-medium text-[var(--text)]">
              Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              autoComplete="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              aria-describedby={errors.name ? "cf-name-error" : "cf-name-hint"}
              aria-invalid={!!errors.name}
              className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
            />
            {errors.name ? (
              <p id="cf-name-error" role="alert" className="mt-1.5 text-xs text-red-500">
                {errors.name}
              </p>
            ) : (
              <p id="cf-name-hint" className="mt-1 text-xs text-[var(--muted)]">
                Saved for your next visit.
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="cf-email" className="text-sm font-medium text-[var(--text)]">
              Email <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                saveDraft({ email: e.target.value });
              }}
              aria-describedby={errors.email ? "cf-email-error" : undefined}
              aria-invalid={!!errors.email}
              className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
            />
            {errors.email && (
              <p id="cf-email-error" role="alert" className="mt-1.5 text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            Next →
          </button>
        </fieldset>
      )}

      {/* ── Step 2: Message ──────────────────────────────────────────── */}
      {step === 2 && (
        <fieldset className="space-y-4 border-none p-0">
          <legend className="sr-only">Your message</legend>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]">
            <strong className="block text-[var(--text)]">Step 2 of 3 — Your message</strong>
            Add an optional subject line, then write your message (minimum 10 characters, max 500).
            Use <strong className="text-[var(--text)]">← Back</strong> to correct your details, or{" "}
            <strong className="text-[var(--text)]">Review →</strong> to preview before sending.
          </div>

          {/* Subject (optional) */}
          <div>
            <label htmlFor="cf-subject" className="text-sm font-medium text-[var(--text)]">
              Subject <span className="text-[var(--muted)]">(optional)</span>
            </label>
            <input
              id="cf-subject"
              name="subject"
              placeholder="Project inquiry, collaboration…"
              value={subject}
              onChange={(e) => { setSubject(e.target.value); saveDraft({ subject: e.target.value }); }}
              className={`${inputBase} ${inputOk}`}
            />
          </div>

          {/* Message */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="cf-message" className="text-sm font-medium text-[var(--text)]">
                Message <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <span
                className={`text-xs ${
                  msgLen > MAX_MESSAGE
                    ? "text-red-500"
                    : msgLen > 0 && msgLen < 10
                    ? "text-red-500"
                    : "text-[var(--muted)]"
                }`}
              >
                {msgLen} / {MAX_MESSAGE}
              </span>
            </div>
            <textarea
              id="cf-message"
              name="message"
              rows={6}
              placeholder="What would you like to discuss? Projects, collaborations, or opportunities…"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                saveDraft({ message: e.target.value });
              }}
              aria-describedby={errors.message ? "cf-message-error" : "cf-message-hint"}
              aria-invalid={!!errors.message}
              className={`${inputBase} ${errors.message ? inputErr : inputOk}`}
            />
            {errors.message ? (
              <p id="cf-message-error" role="alert" className="mt-1.5 text-xs text-red-500">
                {errors.message}
              </p>
            ) : (
              <p id="cf-message-hint" className="mt-1 text-xs text-[var(--muted)]">
                10–{MAX_MESSAGE} characters.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              Review →
            </button>
          </div>
        </fieldset>
      )}

      {/* ── Step 3: Review & send ─────────────────────────────────────── */}
      {step === 3 && (
        <fieldset className="space-y-4 border-none p-0">
          <legend className="sr-only">Review and send</legend>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]">
            <strong className="block text-[var(--text)]">Step 3 of 3 — Review & send</strong>
            Check your details below. Click <strong className="text-[var(--text)]">← Edit</strong> to go back and make changes,
            or <strong className="text-[var(--text)]">Send message ✉</strong> to open your email app with a
            pre-filled draft — just hit send from there.
          </div>

          {/* Summary table */}
          <dl className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] text-sm">
            {[
              { term: "Name",    def: name },
              { term: "Email",   def: email },
              { term: "Subject", def: subject || "(none)" },
              { term: "Message", def: message },
            ].map(({ term, def }) => (
              <div key={term} className="flex gap-4 px-4 py-2.5">
                <dt className="w-20 flex-shrink-0 font-semibold text-[var(--text)]">{term}</dt>
                <dd className="min-w-0 break-words text-[var(--muted)]">{def}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            >
              ← Edit
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Opening email…" : "Send message ✉"}
            </button>
          </div>

          {/* Success */}
          {status === "sent" && (
            <div role="status" className="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                Email draft opened — just hit send in your email app!
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Nothing opened?{" "}
                <a href={`mailto:${siteConfig.email}`} className="underline hover:text-[var(--text)]">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm font-medium text-red-700 dark:text-red-400">
                Something went wrong. Please email directly:{" "}
                <a href={`mailto:${siteConfig.email}`} className="underline">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          )}
        </fieldset>
      )}
    </form>
  );
}
