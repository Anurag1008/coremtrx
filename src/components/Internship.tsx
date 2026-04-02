import type { InternshipStep } from "../types";
import { SectionHeader, Reveal } from "./ui";

interface InternshipProps {
  steps: InternshipStep[];
}

export default function Internship({ steps }: InternshipProps) {
  return (
    <section id="internship" className="relative px-4 sm:px-6 py-24 sm:py-28 overflow-hidden">
      {/* Soft backdrop glow */}
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        <SectionHeader
          label="Earn Your Stripes"
          title={<>Real Internship.<br />Real Projects.</>}
          subtitle="After completing the course, unlock the Internship Track. Complete curated tasks, get mentor reviews, and ship portfolio-ready work."
        />

        <Reveal className="mt-14 sm:mt-16 max-w-3xl">
          <div className="relative">
            {/* Timeline spine */}
            <div
              className="absolute left-[1.125rem] top-10 bottom-10 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-400/25 to-violet-500/25 sm:left-[1.375rem]"
              aria-hidden
            />

            <ul className="relative z-[1] flex flex-col gap-5 sm:gap-6 list-none p-0 m-0">
              {steps.map((step, i) => (
                <li key={step.number}>
                  <StepItem step={step} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StepItem({ step, index }: { step: InternshipStep; index: number }) {
  return (
    <article className="group relative flex gap-4 sm:gap-6">
      {/* Node on timeline */}
      <div className="relative z-[2] flex shrink-0 flex-col items-center pt-1 sm:pt-2">
        <div
          className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-cyan-400/50 bg-[#050810] shadow-[0_0_24px_rgba(0,229,255,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] ring-2 ring-cyan-400/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_32px_rgba(0,229,255,0.35)]"
          aria-hidden
        >
          <span className="font-mono text-[0.65rem] sm:text-[0.72rem] font-bold tracking-wider text-cyan-300">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-[#1e2d45] bg-gradient-to-br from-[#0c1626]/95 to-[#070b14]/98 p-5 sm:p-7 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.7)] transition-all duration-300 group-hover:border-cyan-400/35 group-hover:shadow-[0_24px_60px_-24px_rgba(0,229,255,0.12)]">
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,229,255,0.06) 0%, transparent 45%, rgba(123,97,255,0.04) 100%)",
          }}
        />
        <div className="relative">
          <h4 className="font-[Syne] font-bold text-lg sm:text-xl text-white mb-2 tracking-tight group-hover:text-cyan-50 transition-colors">
            {step.title}
          </h4>
          <p className="text-[0.9rem] sm:text-[0.92rem] text-[#9fb0cc] leading-relaxed font-light">
            {step.description}
          </p>
        </div>
      </div>
    </article>
  );
}
