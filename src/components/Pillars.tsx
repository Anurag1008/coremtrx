import type { Pillar } from "../types";
import { SectionHeader, Reveal } from "./ui";

interface PillarsProps {
  pillars: Pillar[];
}

export default function Pillars({ pillars }: PillarsProps) {
  return (
    <section id="learn" className="px-4 sm:px-6 py-24">
      <SectionHeader
        label="What You Master"
        title={<>Four Pillars of<br />Core Engineering</>}
        subtitle="A curriculum built by engineers, for engineers who want to understand how the machine really works."
      />
      <Reveal className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#1e2d45] gap-px bg-[#1e2d45]">
        {pillars.map((p, i) => (
          <PillarCard key={i} pillar={p} />
        ))}
      </Reveal>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <div className="group relative bg-[#0d1829] p-10 overflow-hidden transition-colors duration-250 hover:bg-[#101828]">
      {/* Accent left bar */}
      <span className={`absolute top-0 left-0 w-[3px] h-0 group-hover:h-full transition-all duration-300 ${pillar.accentColor}`} />
      <span className="text-4xl mb-5 block">{pillar.icon}</span>
      <h3 className="font-[Syne] font-bold text-lg mb-3">{pillar.title}</h3>
      <p className="text-[0.9rem] text-[#6b7a99] leading-relaxed font-light">{pillar.description}</p>
    </div>
  );
}
