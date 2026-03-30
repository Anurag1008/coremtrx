export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
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
