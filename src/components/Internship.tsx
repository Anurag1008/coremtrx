import type { InternshipStep } from "../types";
import { SectionHeader, Reveal } from "./ui";

interface InternshipProps {
  steps: InternshipStep[];
}

export default function Internship({ steps }: InternshipProps) {
  return (
    <section id="internship" className="px-4 sm:px-6 py-24">
      <SectionHeader
        label="Earn Your Stripes"
        title={<>Real Internship.<br />Real Projects.</>}
        subtitle="After completing the course, unlock the Internship Track. Complete curated tasks, get mentor reviews, and ship portfolio-ready work."
      />

      <Reveal className="mt-14 max-w-2xl mx-auto space-y-8">
        {steps.map((step, i) => (
          <StepItem key={i} step={step} />
        ))}
      </Reveal>
    </section>
  );
}

function StepItem({ step }: { step: InternshipStep }) {
  return (
    <div className="flex gap-6 items-start">
      <span className="font-[Syne] font-extrabold text-[2.5rem] text-cyan-400 opacity-25 leading-none min-w-[60px]">
        {step.number}
      </span>
      <div>
        <h4 className="font-[Syne] font-bold text-base mb-1">{step.title}</h4>
        <p className="text-[0.88rem] text-[#6b7a99] leading-relaxed font-light">{step.description}</p>
      </div>
    </div>
  );
}

