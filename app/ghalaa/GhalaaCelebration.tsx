"use client";

import { useEffect, useRef, useState } from "react";

import "./ghalaa.css";

/* ── Types ─────────────────────────────────────────────────────────── */
interface Particle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; color: string; size: number;
}
interface Shell {
  x: number; y: number; vy: number; color: string;
  particles: Particle[]; exploded: boolean; targetY: number;
  trail: Array<{ x: number; y: number }>;
}
interface ConfettiPiece {
  id: number; left: string; delay: string; duration: string;
  color: string; width: number; height: number; rotation: number;
}
interface Balloon {
  id: number; left: string; color: string;
  w: number; h: number; duration: string; delay: string;
}

/* ── Pink palette constants ─────────────────────────────────────────── */
const FW_COLORS = [
  "#FF69B4","#FF1493","#FFB6C1","#FF85C8","#FF6B9D",
  "#FFD1DC","#F72585","#FF4D6D","#FFAFD7","#FC9BCA",
  "#FF007F","#FFC0CB","#E91E63","#F48FB1","#FF4081",
  "#FFFFFF","#FFD700","#FFE0EC","#FF80AB","#FF5BA3",
];
const CONFETTI_COLORS = [
  "#FF69B4","#FF1493","#FFB6C1","#FF85C8","#FFD1DC",
  "#FF6B9D","#FFFFFF","#FFD700","#F72585","#FFAFD7",
];
const BALLOON_COLORS = [
  "#FF69B4","#FF1493","#FFB6C1","#FF85C8",
  "#FFD1DC","#FF6B9D","#F72585","#FFAFD7",
];
const EMOJIS = ["🎉","🎈","🌸","💖","🎊","✨","🥳","🎁","🌷","💗"];

// Video playlist: ghalla2 first, then ghalaa, then YouTube
const VIDEO_SRC = ["/videos/ghalla2.MP4", "/videos/ghalaa.MP4"];

/* ── Component ──────────────────────────────────────────────────────── */
export function GhalaaCelebration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const ytRef     = useRef<HTMLIFrameElement>(null);
  const shellsRef = useRef<Shell[]>([]);
  const animRef   = useRef<number>(0);

  const [phase,     setPhase]     = useState<"dark" | "reveal" | "full">("dark");
  const [confetti,  setConfetti]  = useState<ConfettiPiece[]>([]);
  const [balloons,  setBalloons]  = useState<Balloon[]>([]);
  // 0 = ghalla2.MP4 · 1 = ghalaa.MP4 · 2 = YouTube
  const [videoStep, setVideoStep] = useState<0 | 1 | 2>(0);

  const advance = () => setVideoStep(s => (Math.min(s + 1, 2)) as 0 | 1 | 2);

  /* ── Random decorations (client-only) ───────────────────────────── */
  useEffect(() => {
    const rnd = () => Math.random();
    setConfetti(
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        left: `${rnd() * 100}%`,
        delay: `${rnd() * 6}s`,
        duration: `${3.5 + rnd() * 4}s`,
        color: CONFETTI_COLORS[Math.floor(rnd() * CONFETTI_COLORS.length)],
        width:  6 + Math.floor(rnd() * 8),
        height: 6 + Math.floor(rnd() * 8),
        rotation: Math.floor(rnd() * 360),
      }))
    );
    setBalloons(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${4 + (i / 14) * 92 + (rnd() * 4 - 2)}%`,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        w: 36 + Math.floor(rnd() * 22),
        h: 44 + Math.floor(rnd() * 26),
        duration: `${7 + rnd() * 6}s`,
        delay: `${i * 0.28}s`,
      }))
    );
  }, []);

  /* ── Fireworks canvas ───────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const launch = () => {
      const color   = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
      const x       = canvas.width  * (0.08 + Math.random() * 0.84);
      const targetY = canvas.height * (0.04 + Math.random() * 0.52);
      const frames  = 22 + Math.random() * 22;
      shellsRef.current.push({
        x, y: canvas.height,
        vy: -(canvas.height - targetY) / frames,
        color, particles: [], exploded: false, targetY, trail: [],
      });
    };

    const burst = (shell: Shell) => {
      const n      = 90 + Math.floor(Math.random() * 70);
      const isRing = Math.random() > 0.62;
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2;
        const speed = isRing ? 3.5 + Math.random() * 1.2 : Math.random() * 6.5 + 0.8;
        shell.particles.push({
          x: shell.x, y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.35
            ? shell.color
            : FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
          size: Math.random() * 3.5 + 0.4,
        });
      }
      for (let i = 0; i < 28; i++) {
        shell.particles.push({
          x: shell.x, y: shell.y,
          vx: (Math.random() - 0.5) * 4.5,
          vy: (Math.random() - 0.5) * 4.5 - 1.5,
          alpha: 1, color: "#FFFFFF", size: 1.6,
        });
      }
      shell.exploded = true;
    };

    let lastLaunch = 0;
    const draw = (time: number) => {
      // Pink-tinted dark trail
      ctx.fillStyle = "rgba(20,0,10,0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (time - lastLaunch > 480 + Math.random() * 320) {
        launch();
        if (Math.random() > 0.38) launch();
        if (Math.random() > 0.72) launch();
        lastLaunch = time;
      }

      shellsRef.current = shellsRef.current.filter(shell => {
        if (!shell.exploded) {
          shell.trail.push({ x: shell.x, y: shell.y });
          if (shell.trail.length > 14) shell.trail.shift();
          shell.trail.forEach((pt, i) => {
            const r = 2.8 * (i / shell.trail.length);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
            ctx.fillStyle = shell.color;
            ctx.globalAlpha = 0.7 * (i / shell.trail.length);
            ctx.fill();
          });
          ctx.globalAlpha = 1;
          shell.y += shell.vy;
          if (shell.y <= shell.targetY) burst(shell);
          return true;
        }
        shell.particles = shell.particles.filter(p => {
          p.x += p.vx; p.y += p.vy;
          p.vy += 0.09;
          p.vx *= 0.988; p.vy *= 0.988;
          p.alpha -= 0.011;
          if (p.alpha <= 0) return false;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle  = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
          return true;
        });
        return shell.particles.length > 0;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Reveal sequence ────────────────────────────────────────────── */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 600);
    const t2 = setTimeout(() => setPhase("full"),   1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── YouTube postMessage play ───────────────────────────────────── */
  const sendPlay = () => {
    const send = () =>
      ytRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*"
      );
    send();
    setTimeout(send, 800);
    setTimeout(send, 2000);
  };

  const CAPTIONS = [
    "💌 A special message just for you",
    "🎬 And one more surprise...",
    "🎵 Keep the celebration going!",
  ];

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <div className="ghalaa-root">
      <canvas ref={canvasRef} className="ghalaa-canvas" />

      <div className={`ghalaa-veil${phase !== "dark" ? " ghalaa-veil--gone" : ""}`} />

      {/* Confetti */}
      {phase === "full" && (
        <div className="confetti-container" aria-hidden="true">
          {confetti.map(c => (
            <div
              key={c.id}
              className="confetti-piece"
              style={{
                left: c.left,
                animationDelay: c.delay,
                animationDuration: c.duration,
                backgroundColor: c.color,
                width: `${c.width}px`,
                height: `${c.height}px`,
                borderRadius: c.width === c.height ? "50%" : "2px",
                transform: `rotate(${c.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Balloons */}
      {phase === "full" && (
        <div className="balloons-container" aria-hidden="true">
          {balloons.map(b => (
            <div
              key={b.id}
              className="balloon"
              style={{
                left: b.left,
                backgroundColor: b.color,
                width: `${b.w}px`,
                height: `${b.h}px`,
                animationDuration: b.duration,
                animationDelay: b.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className={`ghalaa-content${phase === "full" ? " ghalaa-content--visible" : ""}`}>
        <div className="ghalaa-card">

          <div className="ghalaa-cake" aria-hidden="true">🎂</div>

          <h1 className="ghalaa-title">
            <span className="ghalaa-happy">Happy Birthday</span>
            <span className="ghalaa-name">Ghalaa!</span>
          </h1>

          <div className="ghalaa-emojis" aria-hidden="true">
            {EMOJIS.map((e, i) => (
              <span key={i} className="ghalaa-emoji" style={{ animationDelay: `${i * 0.16}s` }}>
                {e}
              </span>
            ))}
          </div>

          <p className="ghalaa-message">
            Wishing you a day as magical and beautiful as you are 🌸
          </p>

          {/* ── Video section ── */}
          <div className="ghalaa-video-section">
            <div className="ghalaa-video-glow">

              {/* Steps 0 & 1 — local videos */}
              {videoStep < 2 && (
                <video
                  key={videoStep}
                  ref={videoRef}
                  src={VIDEO_SRC[videoStep]}
                  controls
                  autoPlay
                  playsInline
                  muted
                  className="ghalaa-video"
                  onCanPlay={() => { videoRef.current?.play().catch(() => {}); }}
                  onEnded={advance}
                  onError={advance}
                />
              )}

              {/* Step 2 — YouTube */}
              {videoStep === 2 && (
                <iframe
                  key="yt"
                  ref={ytRef}
                  src="https://www.youtube.com/embed/mg3ShWnu10A?autoplay=1&start=18&rel=0&modestbranding=1&enablejsapi=1"
                  title="Birthday song"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="ghalaa-yt-iframe ghalaa-yt-fadein"
                  onLoad={sendPlay}
                />
              )}

            </div>
            <p className="ghalaa-video-caption">{CAPTIONS[videoStep]}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
