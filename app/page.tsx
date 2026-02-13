import MaintenanceCountdown from "./maintenance-countdown";

export default function Home() {
  return (
    <main className="maintenance-shell">
      <div className="maintenance-grid" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <MaintenanceCountdown />
    </main>
  );
}
