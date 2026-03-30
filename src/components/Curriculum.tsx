import type { Module } from "../types";
import { SectionHeader, Reveal } from "./ui";

interface CurriculumProps {
  modules: Module[];
}

export default function Curriculum({ modules }: CurriculumProps) {
  return (
    <section id="curriculum" className="bg-[#0b1120] px-[5%] py-24">
      <div className="flex flex-wrap justify-between items-end gap-8 mb-12">
        <SectionHeader
          label="Full Syllabus"
          title={<>Every Module,<br />Every Topic</>}
        />
        <p className="text-[#6b7a99] text-sm font-light max-w-xs leading-relaxed">
          Structured in 3 phases over 12 weeks. Each module builds on the last.
        </p>
      </div>

      <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod, i) => (
          <ModuleCard key={i} module={mod} />
        ))}
      </Reveal>
    </section>
  );
}

function ModuleCard({ module: mod }: { module: Module }) {
  return (
    <div className="group bg-[#0d1829] border border-[#1e2d45] p-7 transition-all duration-200 hover:border-cyan-400 hover:-translate-y-1">
      <p className="font-mono text-[0.68rem] text-cyan-400 tracking-widest mb-2">
        {mod.number} — {mod.weeks}
      </p>
      <h3 className="font-[Syne] font-bold text-base mb-4">
        {mod.icon} {mod.title}
      </h3>
      <ul className="space-y-0">
        {mod.topics.map((topic, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-[0.82rem] text-[#6b7a99] py-1.5 border-b border-white/5 last:border-0 font-light"
          >
            <span className="text-cyan-400 text-[0.65rem]">▸</span>
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}
