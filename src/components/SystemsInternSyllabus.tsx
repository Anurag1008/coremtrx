import type { CheckoutDetailedModule } from "../types";

const accentStyles: Record<
  CheckoutDetailedModule["accent"],
  { border: string; bar: string; chip: string }
> = {
  emerald: {
    border: "border-emerald-500/35",
    bar: "bg-emerald-400",
    chip: "text-emerald-300 border-emerald-500/40 bg-emerald-500/10",
  },
  sky: {
    border: "border-sky-500/35",
    bar: "bg-sky-400",
    chip: "text-sky-300 border-sky-500/40 bg-sky-500/10",
  },
  violet: {
    border: "border-violet-500/35",
    bar: "bg-violet-400",
    chip: "text-violet-300 border-violet-500/40 bg-violet-500/10",
  },
};

export function SystemsInternSyllabus({
  modules,
  internshipSection,
}: {
  modules: CheckoutDetailedModule[];
  internshipSection?: { title: string; items: string[] };
}) {
  return (
    <div className="mt-8 space-y-8">
      <div>
        <p className="font-mono text-[0.75rem] tracking-[0.2em] text-cyan-400/90 uppercase mb-1">Course breakdown</p>
        <h2 className="font-[Syne] text-xl sm:text-2xl font-bold text-white tracking-tight">
          Systems-first curriculum — week by week
        </h2>
        <p className="text-sm text-[#7d8caf] mt-2 leading-relaxed">
          From how the machine executes code to a bootloader and kernel you wrote yourself — then a mentored internship on real systems-style work.
        </p>
      </div>

      {modules.map((mod) => {
        const a = accentStyles[mod.accent];
        return (
          <article
            key={mod.moduleLabel + mod.weekRange}
            className={`relative rounded-lg border ${a.border} bg-[#080d18] overflow-hidden`}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${a.bar}`} aria-hidden />
            <div className="pl-5 sm:pl-6 pr-4 py-5 sm:py-6">
              <div className="flex flex-wrap items-center gap-2 gap-y-1">
                <span className={`font-mono text-[0.65rem] tracking-widest uppercase px-2 py-0.5 rounded border ${a.chip}`}>
                  {mod.moduleLabel}
                </span>
                <span className="font-mono text-[0.68rem] text-[#6b7a99] tracking-wide">{mod.weekRange}</span>
              </div>
              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="text-2xl" aria-hidden>
                  {mod.emoji}
                </span>
                <h3 className="font-[Syne] text-lg sm:text-xl font-bold text-white">{mod.title}</h3>
              </div>
              <p className="text-[#b8c5db] text-sm mt-2 font-medium">{mod.headline}</p>

              <ul className="mt-3 space-y-1.5 text-sm text-[#9fb0cc]">
                {mod.themes.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-cyan-500/80 shrink-0">▸</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 space-y-3">
                <p className="font-mono text-[0.65rem] tracking-widest text-[#6b7a99] uppercase">Weekly plan</p>
                {mod.weeks.map((w) => (
                  <div
                    key={w.label}
                    className="rounded-md border border-white/6 bg-[#0b1120]/80 px-3 py-3 sm:px-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-[0.72rem] text-cyan-400/90 font-semibold">{w.label}</span>
                      <span className="text-xs text-[#7d8caf]">{w.focus}</span>
                    </div>
                    <ul className="mt-2 ml-1 space-y-1 text-sm text-[#9fb0cc] list-disc list-inside marker:text-[#4a5a78]">
                      {w.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-[#c4d0e8] border-t border-white/6 pt-4">
                <span className="text-cyan-400/90 mr-1.5">👉</span>
                {mod.outcome}
              </p>
            </div>
          </article>
        );
      })}

      {internshipSection ? (
        <div className="rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-[#0b1120] p-5 sm:p-6">
          <p className="font-mono text-[0.7rem] tracking-widest text-amber-200/80 uppercase mb-2">After the OS capstone</p>
          <h3 className="font-[Syne] text-lg font-bold text-white">{internshipSection.title}</h3>
          <ul className="mt-3 space-y-2 text-sm text-[#d4dce8]">
            {internshipSection.items.map((it) => (
              <li key={it} className="flex gap-2">
                <span className="text-amber-400/90 shrink-0">✓</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
