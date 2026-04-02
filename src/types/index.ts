export interface NavLink {
  label: string;
  href: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
  /** Tailwind background class for the top accent bar (e.g. bg-cyan-400) */
  accentBar: string;
}

export interface Module {
  number: string;
  weeks: string;
  icon: string;
  title: string;
  topics: string[];
}

export interface OSFeature {
  label: string;
}

export interface InternshipStep {
  number: string;
  title: string;
  description: string;
}

export interface PricingTier {
  tier: string;
  price: string;
  note: string;
  features: { label: string; included: boolean }[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
}

export interface Testimonial {
  initials: string;
  quote: string;
  name: string;
  role: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

/** Week-by-week row inside a module (checkout syllabus). */
export interface CheckoutWeekEntry {
  label: string;
  focus: string;
  bullets: string[];
}

/** One module with accent + optional per-week breakdown. */
export interface CheckoutDetailedModule {
  moduleLabel: string;
  weekRange: string;
  accent: "emerald" | "sky" | "violet";
  title: string;
  emoji: string;
  headline: string;
  themes: string[];
  outcome: string;
  weeks: CheckoutWeekEntry[];
}

export interface CheckoutCourse {
  id: string;
  badge?: string;
  title: string;
  subtitle?: string;
  notes: string[];
  outline?: { title: string; items: string[] }[];
  /** When set (e.g. Systems Intern), renders rich syllabus instead of flat outline. */
  detailedModules?: CheckoutDetailedModule[];
  internshipSection?: { title: string; items: string[] };
  pricing?: {
    planName?: string;
    validityNote?: string;
    detailsHref?: string;
    priceInINR: number;
    discountInINR?: number;
  };
}
