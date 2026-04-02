import { useEffect, useMemo, useState } from "react";

/** Lectures start 20 Apr 2026, 8:00 PM (local time) */
const TARGET_MS = new Date(2026, 3, 20, 20, 0, 0).getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatTargetLabel() {
  const d = new Date(TARGET_MS);
  const dateStr = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
  const timeStr = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
  return `${dateStr} - ${timeStr.toLowerCase()}`;
}

export default function CohortCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { days, hours, mins, secs, ended } = useMemo(() => {
    const diff = Math.max(0, TARGET_MS - now);
    if (diff === 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0, ended: true };
    }
    const secsTotal = Math.floor(diff / 1000);
    const days = Math.floor(secsTotal / 86400);
    const hours = Math.floor((secsTotal % 86400) / 3600);
    const mins = Math.floor((secsTotal % 3600) / 60);
    const secs = secsTotal % 60;
    return { days, hours, mins, secs, ended: false };
  }, [now]);

  const label = formatTargetLabel();

  return (
    <section
      className="relative px-4 sm:px-6 pt-4 pb-16 sm:pt-6 sm:pb-20 bg-[#050810] overflow-hidden"
      aria-label="Cohort start countdown"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-b from-[#0a1220]/80 to-[#070b14]/95 px-6 py-12 sm:px-10 sm:py-16 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.6),0_0_60px_-20px_rgba(0,229,255,0.08)] ring-1 ring-white/[0.06]">
          <p className="font-mono text-[0.72rem] sm:text-[0.75rem] tracking-[0.28em] text-cyan-400/90 uppercase mb-4">
            Cohort launch
          </p>
          <h2 className="font-[Syne] font-extrabold text-[clamp(1.85rem,5.5vw,3.25rem)] sm:text-4xl md:text-5xl tracking-tight text-white mb-3 leading-tight">
            <span>Cohort is </span>
            <span className="text-cyan-400">Live From</span>
          </h2>
          <p className="text-base sm:text-lg text-[#9fb0cc] font-light mb-12 sm:mb-14">{label}</p>

          {ended ? (
            <p className="font-[Syne] text-xl sm:text-2xl text-cyan-400">Cohort is live — enroll to join.</p>
          ) : (
            <div className="flex flex-wrap items-end justify-center gap-1 sm:gap-2 md:gap-3">
              <TimeBlock value={days} label="DAYS" />
              <Colon />
              <TimeBlock value={hours} label="HOURS" />
              <Colon />
              <TimeBlock value={mins} label="MINS" />
              <Colon />
              <TimeBlock value={secs} label="SECS" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[4.75rem] sm:min-w-[6rem] md:min-w-[7rem]">
      <span className="font-[Syne] font-extrabold text-[clamp(2.75rem,11vw,5.25rem)] leading-none text-white tabular-nums tracking-tight [text-shadow:0_0_40px_rgba(0,229,255,0.12)]">
        {label === "DAYS" ? String(value) : pad(value)}
      </span>
      <span className="font-mono text-[0.68rem] sm:text-[0.75rem] tracking-[0.22em] text-[#6b7a99] mt-3 sm:mt-4 uppercase">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span
      className="font-[Syne] font-extrabold text-[clamp(2rem,7vw,3.75rem)] text-cyan-400/70 leading-none pb-8 sm:pb-10 md:pb-12 select-none"
      aria-hidden
    >
      :
    </span>
  );
}
