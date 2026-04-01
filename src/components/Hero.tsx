import type { Stat } from "../types";

interface HeroProps {
  stats: Stat[];
}

export default function Hero({ stats }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 pt-[120px] pb-20 overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none -top-24 -right-24"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none bottom-0 -left-24"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.07) 0%, transparent 70%)" }} />

      <SectionTag text="The Core Systems Cohort 1.0" />

      <h1 className="font-[Syne] font-extrabold text-[clamp(2.8rem,7vw,5.5rem)] leading-none tracking-[-2px] max-w-3xl mb-6">
        Learn How to Build Systems<br />
        From <span className="text-cyan-400">Scratch.</span><br />
        {/* Not <span className="text-violet-400">Templates.</span> */}
      </h1>

      <p className="text-lg text-[#6b7a99] max-w-xl leading-relaxed mb-10 font-light">
        Master OS internals, DSA from first principles, and build a real mini Operating System.
        Plus earn an internship certificate by completing real-world tasks.
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <a
          href="#pricing"
          className="font-mono text-[0.8rem] tracking-wider font-bold px-9 py-4 bg-cyan-400 text-black no-underline transition-all duration-200 hover:bg-white hover:scale-105"
          style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
        >
          JOIN THE COHORT →
        </a>
        <a
          href="#curriculum"
          className="font-mono text-[0.8rem] tracking-wider px-9 py-4 border border-[#1e2d45] text-white no-underline transition-all duration-200 hover:border-cyan-400 hover:text-cyan-400"
        >
          EXPLORE SYLLABUS
        </a>
      </div>

      <div className="flex flex-wrap gap-12 mt-16 pt-8 border-t border-[#1e2d45]">
        {stats.map((s) => (
          <StatItem key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}

function SectionTag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[3px] text-cyan-400 uppercase mb-6">
      <span className="w-10 h-px bg-cyan-400 inline-block" />
      {text}
    </div>
  );
}

function StatItem({ value, label }: Stat) {
  return (
    <div>
      <div className="font-[Syne] font-extrabold text-4xl text-cyan-400">{value}</div>
      <div className="font-mono text-[0.72rem] tracking-widest text-[#6b7a99] mt-1">{label}</div>
    </div>
  );
}
