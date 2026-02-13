"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const SIX_HOURS_IN_SECONDS = 6 * 60 * 60;
const TARGET_TIME_STORAGE_KEY = "portfolio-maintenance-target-time";

type CountdownState = {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
};

function toCountdown(totalSeconds: number): CountdownState {
  const safe = Math.max(0, totalSeconds);

  return {
    hours: Math.floor(safe / 3600),
    minutes: Math.floor((safe % 3600) / 60),
    seconds: safe % 60,
    totalSeconds: safe,
  };
}

function fromTargetTime(targetTime: number): CountdownState {
  return toCountdown(Math.floor((targetTime - Date.now()) / 1000));
}

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="time-unit">
      <p className="time-value">{pad(value)}</p>
      <p className="time-label">{label}</p>
    </div>
  );
}

export default function MaintenanceCountdown() {
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    toCountdown(SIX_HOURS_IN_SECONDS),
  );
  const [eta, setEta] = useState("--:--");

  useEffect(() => {
    const resolveTargetTime = () => {
      const storedTargetTime = window.localStorage.getItem(
        TARGET_TIME_STORAGE_KEY,
      );
      const parsedTargetTime = storedTargetTime
        ? Number.parseInt(storedTargetTime, 10)
        : NaN;

      if (Number.isFinite(parsedTargetTime) && parsedTargetTime > 0) {
        return parsedTargetTime;
      }

      const freshTargetTime = Date.now() + SIX_HOURS_IN_SECONDS * 1000;
      window.localStorage.setItem(
        TARGET_TIME_STORAGE_KEY,
        String(freshTargetTime),
      );
      return freshTargetTime;
    };

    const targetTime = resolveTargetTime();
    const formattedEta = new Date(targetTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const updateCountdown = () => {
      setCountdown(fromTargetTime(targetTime));
      setEta(formattedEta);
    };

    const bootstrapId = setTimeout(updateCountdown, 0);
    const intervalId = setInterval(() => {
      updateCountdown();
    }, 1000);
    return () => {
      clearTimeout(bootstrapId);
      clearInterval(intervalId);
    };
  }, []);

  const progress = useMemo(() => {
    const completed = SIX_HOURS_IN_SECONDS - countdown.totalSeconds;
    return Math.min(100, Math.max(0, (completed / SIX_HOURS_IN_SECONDS) * 100));
  }, [countdown.totalSeconds]);

  const subtitle =
    countdown.totalSeconds === 0
      ? "Maintenance window is done. Final checks in progress."
      : "The website is under maintenance. Coming in cooldown 6h.";

  return (
    <section className="maint-card" aria-live="polite">
      <div className="brand-lockup">
        <div className="brand-logo-wrap">
          <Image
            src="/logo_noBg.png"
            alt="Portfolio logo"
            width={72}
            height={72}
            className="brand-logo"
            priority
          />
        </div>
      </div>

      <p className="status-line">
        <span className="status-dot" aria-hidden="true" />
        Maintenance mode active
      </p>

      <h1 className="title">The website is under maintenance.</h1>
      <p className="subtitle">{subtitle}</p>

      <div className="countdown" role="timer" aria-label="Countdown to relaunch">
        <TimeUnit value={countdown.hours} label="Hours" />
        <TimeUnit value={countdown.minutes} label="Minutes" />
        <TimeUnit value={countdown.seconds} label="Seconds" />
      </div>

      <div className="progress-wrap" aria-label="Maintenance progress">
        <div className="progress-head">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="meta-row">
        <p className="meta-chip">ETA: {eta}</p>
        <p className="meta-chip">Theme: black / white / gray</p>
      </div>

      <div className="ticker" aria-hidden="true">
        <p className="ticker-track">
          refining visuals • polishing animations • tuning performance • adding
          fresh case studies • refining visuals • polishing animations • tuning
          performance • adding fresh case studies •
        </p>
      </div>
    </section>
  );
}
