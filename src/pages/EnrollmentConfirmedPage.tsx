import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

/** LMS / access details go out this day (local time). */
const ACCESS_EMAIL_TARGET_MS = new Date(2026, 3, 19, 10, 0, 0).getTime();

export type EnrollmentConfirmedState = {
  email: string;
  name: string;
  courseTitle: string;
  courseId: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatAccessDateLabel() {
  const d = new Date(ACCESS_EMAIL_TARGET_MS);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

export default function EnrollmentConfirmedPage() {
  const location = useLocation();
  const state = location.state as EnrollmentConfirmedState | null;

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const countdown = useMemo(() => {
    const diff = Math.max(0, ACCESS_EMAIL_TARGET_MS - now);
    if (diff === 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0, ended: true };
    }
    const secsTotal = Math.floor(diff / 1000);
    return {
      days: Math.floor(secsTotal / 86400),
      hours: Math.floor((secsTotal % 86400) / 3600),
      mins: Math.floor((secsTotal % 3600) / 60),
      secs: secsTotal % 60,
      ended: false,
    };
  }, [now]);

  if (!state?.email?.trim() || !state?.name?.trim()) {
    return <Navigate to="/" replace />;
  }

  const firstName = state.name.trim().split(/\s+/)[0] ?? state.name;

  return (
    <div
      className="min-h-screen bg-[#050810] text-[#e8edf5]"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[900px] min-w-0 px-4 sm:px-6 py-10 md:py-14">
        <header className="flex items-center justify-between border-b border-[#1e2d45] pb-6 mb-10">
          <Link to="/" className="font-[Syne] font-extrabold text-2xl tracking-tight text-white no-underline">
            Core<span className="text-cyan-400">Mtrx</span>
          </Link>
          <span className="font-mono text-[0.65rem] tracking-widest text-emerald-400/90 uppercase">
            Payment verified
          </span>
        </header>

        <div className="rounded-2xl bg-gradient-to-b from-[#0a1220]/90 to-[#070b14] px-6 py-10 sm:px-10 sm:py-12 ring-1 ring-white/[0.06] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)]">
          <div className="flex items-start gap-4 mb-8">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40"
              aria-hidden
            >
              <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[0.72rem] tracking-[0.2em] text-cyan-400/90 uppercase mb-2">Enrollment secured</p>
              <h1 className="font-[Syne] text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                You&apos;re in, {firstName}
              </h1>
              <p className="text-[#9fb0cc] mt-3 leading-relaxed max-w-xl">
                We&apos;ve received your payment and saved your details against this enrolment. Your spot is confirmed for{" "}
                <span className="text-[#e8edf5] font-medium">{state.courseTitle}</span>.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#0b1120] border border-white/8 p-5 sm:p-6 mb-8">
            <p className="font-mono text-[0.68rem] tracking-widest text-[#6b7a99] uppercase mb-3">Access email scheduled</p>
            <p className="text-[#e8edf5] text-lg sm:text-xl font-medium leading-snug">
              On <span className="text-cyan-400">{formatAccessDateLabel()}</span>, we will email your LMS login and password to:
            </p>
            <p className="mt-4 font-mono text-sm sm:text-base text-cyan-300/95 break-all bg-black/25 rounded-md px-4 py-3 border border-cyan-500/20">
              {state.email.trim()}
            </p>
            <p className="text-sm text-[#6b7a99] mt-4 leading-relaxed">
              That message will come from our team domain — if you don&apos;t see it, check Promotions / Spam, then whitelist us or write to{" "}
              <a href="mailto:hello@coremtrx.in" className="text-cyan-400 hover:text-cyan-300 no-underline">
                hello@coremtrx.in
              </a>{" "}
              from the same address you used at checkout.
            </p>
          </div>

          <div className="mb-10">
            <p className="font-mono text-[0.72rem] tracking-[0.28em] text-cyan-400/90 uppercase mb-4 text-center">
              Time until access email window
            </p>
            <p className="text-center text-[#9fb0cc] text-sm mb-8">Countdown to 19 Apr 2026 · morning batch send-out</p>

            {countdown.ended ? (
              <p className="text-center font-[Syne] text-xl text-cyan-400">
                Access emails are going out — check your inbox (and spam).
              </p>
            ) : (
              <div className="flex flex-wrap items-end justify-center gap-1 sm:gap-2 md:gap-3">
                <TimeBlock value={countdown.days} label="DAYS" isDays />
                <Colon />
                <TimeBlock value={countdown.hours} label="HOURS" />
                <Colon />
                <TimeBlock value={countdown.mins} label="MINS" />
                <Colon />
                <TimeBlock value={countdown.secs} label="SECS" />
              </div>
            )}
          </div>

          <ul className="space-y-4 text-sm text-[#9fb0cc] border-t border-white/10 pt-8">
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-[#e8edf5] font-semibold">Receipt:</strong> Razorpay has emailed your payment receipt. Keep it for your records.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-[#e8edf5] font-semibold">Cohort kickoff:</strong> Live sessions align with the cohort calendar on the homepage — same email will get calendar and Discord invites where applicable.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold shrink-0">✓</span>
              <span>
                <strong className="text-[#e8edf5] font-semibold">Security:</strong> We never ask for your Razorpay OTP or card details over email or WhatsApp. Only trust links from our official domain.
              </span>
            </li>
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/"
              className="flex-1 text-center font-mono text-[0.78rem] tracking-wider font-bold py-3.5 no-underline bg-cyan-400 text-black hover:bg-white transition-colors rounded-md"
            >
              BACK TO HOME
            </Link>
            <Link
              to="/#faq"
              className="flex-1 text-center font-mono text-[0.78rem] tracking-wider font-bold py-3.5 no-underline border border-[#1e2d45] text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors rounded-md"
            >
              READ FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeBlock({ value, label, isDays }: { value: number; label: string; isDays?: boolean }) {
  return (
    <div className="flex flex-col items-center min-w-[4.5rem] sm:min-w-[5.5rem]">
      <span className="font-[Syne] font-extrabold text-[clamp(2.25rem,9vw,4rem)] leading-none text-white tabular-nums tracking-tight [text-shadow:0_0_40px_rgba(0,229,255,0.1)]">
        {isDays ? String(value) : pad(value)}
      </span>
      <span className="font-mono text-[0.65rem] sm:text-[0.72rem] tracking-[0.2em] text-[#6b7a99] mt-2 sm:mt-3 uppercase">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span
      className="font-[Syne] font-extrabold text-[clamp(1.5rem,6vw,2.5rem)] text-cyan-400/60 leading-none pb-6 sm:pb-8 select-none"
      aria-hidden
    >
      :
    </span>
  );
}
