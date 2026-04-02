import { SectionHeader, Reveal } from "./ui";

// This component is no longer used on the landing page.
// Keep it self-contained so TypeScript doesn't complain about unused props.
export default function Pillars() {
  return (
    <section id="learn" className="px-4 sm:px-6 py-24 sm:py-28">
      <SectionHeader
        label="Placement outcomes"
        title={<>Your resume gets<br />stronger.</>}
        subtitle="You won’t just “complete a course”. You’ll build proof (mini OS + tasks), turn it into recruiter-ready bullets, and leave with an eye-catching, ATS-friendly resume."
      />

      <Reveal className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
        <ResumeCard
          title="Project proof bullets"
          body="Turn your mini OS work into strong resume lines: what you built, what you improved, and what it demonstrates."
          accent="bg-cyan-400"
        />
        <ResumeCard
          title="ATS-friendly formatting"
          body="Clean one-page structure, crisp tech keywords, and a narrative that keeps recruiters reading."
          accent="bg-violet-500"
        />
        <ResumeCard
          title="Showcase ready assets"
          body="GitHub-ready links, demo notes, and internship-style tasks so your resume looks credible—not generic."
          accent="bg-rose-500"
        />
      </Reveal>

      <div className="mt-10 sm:mt-12 text-center text-[#9fb0cc] text-sm sm:text-base font-light leading-relaxed max-w-3xl mx-auto">
        By the end, you’ll have both: a resume you can confidently share and a portfolio story that matches it.
      </div>
    </section>
  );
}

function ResumeCard({ title, body, accent }: { title: string; body: string; accent: string }) {
  return (
    <article className="relative rounded-2xl border border-[#1e2d45] bg-[#070b14] p-7 sm:p-8 overflow-hidden transition-all duration-300 hover:border-cyan-400/25 hover:shadow-[0_24px_70px_-40px_rgba(0,229,255,0.18)]">
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${accent} opacity-90`} aria-hidden />
      <div className="relative">
        <h3 className="font-[Syne] font-bold text-lg sm:text-xl text-[#f0f4fc] mb-3 leading-snug tracking-tight">
          {title}
        </h3>
        <p className="text-[0.92rem] sm:text-[0.95rem] text-[#9fb0cc] leading-relaxed font-light">
          {body}
        </p>
      </div>
    </article>
  );
}
