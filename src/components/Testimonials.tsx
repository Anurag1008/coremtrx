import type { Testimonial } from "../types";
import { SectionHeader, Reveal } from "./ui";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="px-4 sm:px-6 py-24">
      <SectionHeader
        label="Social proof"
        title="What learners say"
        subtitle="Feedback from early builders who went deep on the OS track — not anonymous five-star spam."
      />
      <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        {testimonials.map((t, i) => (
          <TestiCard key={i} testimonial={t} />
        ))}
      </Reveal>
    </section>
  );
}

function TestiCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="group bg-[#0d1829] border border-[#1e2d45] p-8 transition-colors duration-200 hover:border-violet-500">
      <div className="text-yellow-400 tracking-widest text-sm mb-4">★★★★★</div>
      <p className="text-[0.92rem] text-[#6b7a99] leading-relaxed font-light italic mb-6">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-[Syne] font-extrabold text-sm text-black"
          style={{ background: "linear-gradient(135deg, #7b61ff, #00e5ff)" }}
        >
          {t.initials}
        </div>
        <div>
          <div className="font-[Syne] font-bold text-sm">{t.name}</div>
          <div className="font-mono text-[0.62rem] text-[#6b7a99] tracking-wider">{t.role}</div>
        </div>
      </div>
    </div>
  );
}
