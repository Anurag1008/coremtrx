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
        title={<>Real Internship.<br />Real Certificate.</>}
        subtitle="After completing the course, unlock the Internship Track. Complete curated tasks, get reviewed, and earn a verified certificate."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-14 items-start">
        {/* Steps */}
        <Reveal className="space-y-8">
          {steps.map((step, i) => (
            <StepItem key={i} step={step} />
          ))}
        </Reveal>

        {/* Certificate preview */}
        <Reveal delay={150}>
          <CertificatePreview />
        </Reveal>
      </div>
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

function CertificatePreview() {
  return (
    <div className="relative bg-[#0d1829] border border-[#1e2d45] p-10 overflow-hidden">
      {/* Inner border */}
      <span className="absolute inset-2 border border-[#1e2d45] pointer-events-none" />
      {/* Corner glow */}
      <span
        className="absolute top-0 right-0 w-28 h-28 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.08), transparent)" }}
      />

      {/* Logo */}
      <div className="font-[Syne] font-extrabold text-xl text-cyan-400 mb-10">
        Core<span className="text-white">Mtrx</span>
      </div>

      <p className="font-mono text-[0.65rem] tracking-[4px] text-[#6b7a99] uppercase mb-1">
        Certificate of Internship
      </p>
      <h3 className="font-[Syne] font-extrabold text-[1.9rem] text-white border-b border-[#1e2d45] pb-4 mb-4">
        Your Name Here
      </h3>
      <p className="text-[0.82rem] text-[#6b7a99] leading-relaxed font-light mb-4">
        Has successfully completed the CoreMtrx Systems Engineering Internship, demonstrating
        proficiency in Operating Systems, Data Structures & Algorithms, and Low-Level Systems Programming.
      </p>
      <p className="font-mono text-[0.65rem] tracking-widest text-cyan-400 mb-6">
        CREDENTIAL ID: CMX-2025-XXXXX
      </p>

      <div className="flex justify-between items-end">
        <div className="font-mono text-[0.72rem] text-[#6b7a99]">
          <div className="text-base mb-1">Founder, CoreMtrx</div>
          <div className="border-t border-[#1e2d45] pt-1">CoreMtrx Education</div>
        </div>
        <div className="w-14 h-14 border-2 border-cyan-400 rounded-full flex items-center justify-center font-mono text-[0.5rem] text-cyan-400 text-center leading-tight tracking-wide">
          CORE<br />MTRX<br />CERT
        </div>
      </div>
    </div>
  );
}
