import { type ReactNode } from "react";
import { useScrollReveal } from "../hooks";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ label, title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center max-w-2xl mx-auto" : ""}>
      <p className="font-mono text-[0.68rem] tracking-[3px] text-cyan-400 uppercase mb-3">{label}</p>
      <h2 className="font-[Syne] font-extrabold text-[clamp(2rem,4vw,3rem)] tracking-tight mb-3 text-[#f0f4fc]">{title}</h2>
      {subtitle && (
        <p
          className={`text-[#9fb0cc] text-base leading-relaxed font-light max-w-xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionTag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[3px] text-cyan-400 uppercase mb-6">
      <span className="w-10 h-px bg-cyan-400 inline-block" />
      {text}
    </div>
  );
}
