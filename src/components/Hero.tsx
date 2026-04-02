export default function Hero() {
  return (
    <section className="relative flex flex-col justify-start px-4 sm:px-6 pt-[120px] pb-10 sm:pb-12 overflow-hidden">
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
        Then unlock the internship track — real tasks, mentor feedback, portfolio pieces.
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <a
          href="#pricing"
          className="font-mono text-[0.8rem] tracking-wider font-bold px-9 py-4 bg-cyan-400 text-black no-underline transition-all duration-200 hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
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

      <ul className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-x-8 sm:gap-y-2 text-[0.78rem] text-[#6b7a99] font-mono tracking-wide list-none">
        <li className="flex items-center gap-2">
          <span className="text-cyan-400 shrink-0" aria-hidden>
            ✓
          </span>
          Live cohort starts Apr 2026
        </li>
        <li className="flex items-center gap-2">
          <span className="text-cyan-400 shrink-0" aria-hidden>
            ✓
          </span>
          One-time fee · lifetime access
        </li>
        <li className="flex items-center gap-2">
          <span className="text-cyan-400 shrink-0" aria-hidden>
            ✓
          </span>
          Secure checkout · UPI & cards
        </li>
      </ul>
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

