import type { PricingTier } from "../types";
import { SectionHeader, Reveal } from "./ui";

interface PricingProps {
  tiers: PricingTier[];
}

export default function Pricing({ tiers }: PricingProps) {
  return (
    <section id="pricing" className="bg-[#0b1120] px-[5%] py-24">
      <SectionHeader
        label="Pricing"
        title={<>One Cohort.<br />Choose Your Path.</>}
        subtitle="No subscriptions. One-time payment. Lifetime access to all content."
        centered
      />
      <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        {tiers.map((tier, i) => (
          <PriceCard key={i} tier={tier} />
        ))}
      </Reveal>
    </section>
  );
}

function PriceCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`relative flex flex-col bg-[#0d1829] border p-10 transition-transform duration-200 hover:-translate-y-1.5 ${
        tier.featured
          ? "border-cyan-400"
          : "border-[#1e2d45]"
      }`}
      style={tier.featured ? { background: "linear-gradient(160deg, #0d1829, #0a1f2e)" } : {}}
    >
      {tier.featured && (
        <span
          className="absolute -top-px left-1/2 -translate-x-1/2 font-mono text-[0.62rem] tracking-widest bg-cyan-400 text-black px-4 py-1 font-bold"
          style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
        >
          MOST POPULAR
        </span>
      )}

      <p className="font-mono text-[0.7rem] tracking-widest text-[#6b7a99] uppercase mb-6">{tier.tier}</p>
      <div className="font-[Syne] font-extrabold text-5xl tracking-tight mb-1">{tier.price}</div>
      <p className="text-[0.8rem] text-[#6b7a99] font-light mb-6">{tier.note}</p>

      <ul className="flex-1 mb-8 space-y-0">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-[0.88rem] text-[#6b7a99] py-2 border-b border-white/5 last:border-0 font-light">
            {f.included ? (
              <span className="text-cyan-400 font-bold text-xs">✓</span>
            ) : (
              <span className="text-[#6b7a99] opacity-30 text-xs">✗</span>
            )}
            {f.label}
          </li>
        ))}
      </ul>

      <a
        href={tier.ctaHref}
        className={`font-mono text-[0.78rem] tracking-wider font-bold py-4 text-center no-underline transition-all duration-200 block ${
          tier.featured
            ? "bg-cyan-400 text-black hover:bg-white"
            : "border border-[#1e2d45] text-white hover:border-cyan-400 hover:text-cyan-400"
        }`}
        style={tier.featured ? { clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" } : {}}
      >
        {tier.cta}
      </a>
    </div>
  );
}
