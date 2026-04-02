import { Reveal } from "./ui";

export default function PlacementReady() {
  return (
    <section
      className="px-4 sm:px-6 py-20 sm:py-24 border-t border-b border-[#1e2d45] overflow-hidden"
      aria-label="Placement ready resume"
      style={{ background: "linear-gradient(135deg, #0b1120 0%, #050810 65%, #0b1120 100%)" }}
    >
      <div
        className="absolute pointer-events-none opacity-70"
        style={{
          right: "-140px",
          top: "-140px",
          width: "420px",
          height: "420px",
          background: "radial-gradient(circle, rgba(0,229,255,0.16) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start lg:items-center justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.68rem] tracking-[3px] text-cyan-400 uppercase mb-4">
              Resume that recruiters can read
            </p>
            <h2 className="font-[Syne] font-extrabold text-[clamp(2.1rem,5vw,3.3rem)] tracking-tight text-white mb-4 leading-[1.05]">
              Your resume gets{" "}
              <span className="text-cyan-400">stronger</span> for placements.
            </h2>
            <p className="text-[#9fb0cc] text-base sm:text-lg font-light leading-relaxed">
              You don’t just watch modules. You ship a mini OS + internship-style work, then convert
              it into crisp resume bullets (ATS-friendly) and a portfolio story that stands out.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                {
                  title: "Proof-based bullets",
                  body: "Turn your project outcomes into strong, measurable lines recruiters scan.",
                },
                {
                  title: "ATS-friendly structure",
                  body: "Clean formatting + tech keywords — so your resume passes the first filter.",
                },
                {
                  title: "Placement-ready storytelling",
                  body: "You’ll know what to say, what to demo, and why it matters.",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 text-cyan-400 font-bold">✓</span>
                  <div>
                    <div className="font-[Syne] font-bold text-[0.98rem] text-white">
                      {item.title}
                    </div>
                    <div className="text-[#9fb0cc] text-[0.9rem] leading-relaxed font-light">
                      {item.body}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="w-full lg:w-[420px] rounded-2xl border border-[#1e2d45] bg-[#070b14] p-6 shadow-[0_20px_70px_-40px_rgba(0,0,0,0.75)]">
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[0.68rem] tracking-[3px] text-cyan-400 uppercase">
                  Resume preview
                </p>
                <span className="text-[0.62rem] font-mono tracking-widest text-[#6b7a99]">
                  Example bullets
                </span>
              </div>

              <div className="space-y-3">
                {[
                  "Built a bootable mini OS (QEMU) in C + Assembly with a functional scheduler.",
                  "Implemented memory & process primitives; debugged low-level faults and improved stability.",
                  "Converted internship-style tasks into recruiter-ready impact bullets and portfolio notes.",
                ].map((line, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/5 bg-[#0b1120] p-4"
                  >
                    <p className="text-[#9fb0cc] text-[0.9rem] leading-relaxed font-light">
                      <span className="text-cyan-400 font-bold mr-2">{String(i + 1).padStart(2, "0")}.</span>
                      {line}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-3 flex-wrap">
                <a
                  href="#pricing"
                  className="font-mono text-[0.78rem] tracking-wider font-bold px-5 py-3 bg-cyan-400 text-black no-underline transition-all duration-200 hover:bg-white hover:scale-[1.02]"
                  style={{
                    clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  }}
                >
                  Enroll now
                </a>
                <a
                  href="#pricing"
                  className="font-mono text-[0.78rem] tracking-wider font-bold px-5 py-3 border border-[#1e2d45] text-white no-underline transition-all duration-200 hover:border-cyan-400 hover:text-cyan-400"
                >
                  View plans
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

