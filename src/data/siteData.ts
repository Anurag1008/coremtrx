import type {
  NavLink, Pillar, Module,
  OSFeature, InternshipStep, PricingTier,
  Testimonial, FAQItem,
} from "../types";

export const navLinks: NavLink[] = [
  { label: "CURRICULUM", href: "#curriculum" },
  { label: "OS PROJECT", href: "#os" },
  { label: "INTERNSHIP", href: "#internship" },
  { label: "PRICING", href: "#pricing" },
];

export const tickerItems: string[] = [
  "OPERATING SYSTEMS", "DATA STRUCTURES", "ALGORITHMS",
  "MINI OS PROJECT", "INTERNSHIP TRACK", "SYSTEM DESIGN",
  "MEMORY MANAGEMENT", "PROCESS SCHEDULING",
];

export const pillars: Pillar[] = [
  {
    icon: "⚙️",
    title: "Operating systems",
    description:
      "Processes, memory, scheduling, and syscalls — build the mental model so “what the OS does” stops feeling like magic.",
    accentBar: "bg-cyan-400",
  },
  {
    icon: "🌲",
    title: "DSA that sticks",
    description:
      "Trees, graphs, DP, and patterns — practiced with complexity in mind so interviews test understanding, not recall.",
    accentBar: "bg-violet-500",
  },
  {
    icon: "🖥️",
    title: "Mini OS capstone",
    description:
      "Bootloader → kernel → scheduler → shell in QEMU. A real systems project you can demo and document.",
    accentBar: "bg-rose-500",
  },
  {
    icon: "🛠️",
    title: "Internship-style track",
    description:
      "After the core: mentor-reviewed tasks that feel like real tickets — feedback loops, not checkbox busywork.",
    accentBar: "bg-amber-400",
  },
];

export const modules: Module[] = [
  {
    number: "MODULE 01",
    weeks: "WEEKS 1–2",
    icon: "🧩",
    title: "Build Strong Foundations",
    topics: [
      "Understand how programs actually run on your machine",
      "CPU, memory & execution — the mental model that sticks",
      "How the OS orchestrates everything (without drowning in theory)",
      "See the stack from hardware → OS → your code",
      "Outcome: you finally know what’s happening behind the screen",
    ],
  },
  {
    number: "MODULE 02",
    weeks: "WEEKS 3–5",
    icon: "📊",
    title: "Crack DSA with Confidence",
    topics: [
      "Interview-ready problem solving (Striver 191–style sheet)",
      "Arrays, strings & linked lists — patterns, not memorization",
      "Trees & graphs, explained so you can explain them in interviews",
      "Recursion, backtracking & DP — easy → advanced, step by step",
      "Outcome: you walk into DSA rounds with real clarity",
    ],
  },
  {
    number: "MODULE 03",
    weeks: "WEEKS 6–10",
    icon: "💻",
    title: "Build Your Own OS",
    topics: [
      "Your first low-level programs — think like a systems engineer",
      "Bootloader from scratch → load your own kernel",
      "Memory, processes & scheduling — you implement the ideas",
      "Interrupts, syscalls & the glue between hardware and software",
      "Ship a runnable mini OS (e.g. in QEMU) — portfolio gold",
      "Outcome: you graduate from “coder” to system developer",
    ],
  },
];

export const osFeatures: OSFeature[] = [
  { label: "x86 bootloader written in Assembly" },
  { label: "Kernel in C with real interrupt handling" },
  { label: "Custom memory allocator" },
  { label: "Round-Robin process scheduler" },
  { label: "Basic shell with command parsing" },
  { label: "Full source code + step-by-step walkthrough" },
];

export const internshipSteps: InternshipStep[] = [
  {
    number: "01",
    title: "Complete the Core Cohort",
    description:
      "Finish all three modules and submit your Mini OS project to unlock the Internship Track.",
  },
  {
    number: "02",
    title: "Get Assigned Tasks",
    description:
      "Receive 3–5 real-world tasks: debugging a kernel module, optimizing an algorithm, writing technical docs.",
  },
  {
    number: "03",
    title: "Submit & Get Reviewed",
    description:
      "Submit your work via GitHub. Mentors review and give feedback. Revise until it meets our bar.",
  },
  {
    number: "04",
    title: "Ship & Showcase",
    description:
      "Polish your best tasks into a portfolio narrative. Get a mentor sign-off and share your work with confidence.",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    tier: "Core Access",
    price: "₹2,999",
    note: "one-time · lifetime access",
    features: [
      { label: "All 3 course modules", included: true },
      { label: "Mini OS project walkthrough", included: true },
      { label: "Source code access", included: true },
      { label: "Discord community", included: true },
      { label: "Internship track", included: false },
      { label: "Mentor portfolio review", included: false },
      { label: "Mentor reviews", included: false },
    ],
    cta: "GET CORE ACCESS",
    ctaHref: "#",
  },
  {
    tier: "Systems Intern Program",
    price: "₹5,999",
    note: "one-time · lifetime access",
    features: [
      { label: "Everything in Core Access", included: true },
      { label: "Internship track unlocked", included: true },
      { label: "3–5 real task assignments", included: true },
      { label: "Mentor code reviews", included: true },
      { label: "Portfolio + mentor sign-off", included: true },
      { label: "Priority Discord support", included: true },
      { label: "Career guidance session", included: true },
    ],
    cta: "ENROLL + INTERNSHIP",
    ctaHref: "#",
    featured: true,
  },
  {
    tier: "Team / College",
    price: "Custom",
    note: "for 5+ students · bulk pricing",
    features: [
      { label: "Everything in Systems Intern Program", included: true },
      { label: "Group onboarding call", included: true },
      { label: "Custom cohort scheduling", included: true },
      { label: "Campus ambassador perks", included: true },
      { label: "Batch onboarding", included: true },
      { label: "LMS integration", included: true },
      { label: "Dedicated support", included: true },
    ],
    cta: "CONTACT US",
    ctaHref: "mailto:hello@coremtrx.in",
  },
];

export const testimonials: Testimonial[] = [
  {
    initials: "RK",
    quote:
      "I finally understand how memory allocation works under the hood. The Mini OS project was genuinely the hardest and best thing I've built.",
    name: "Rahul K.",
    role: "CS UNDERGRAD · IIT DELHI",
  },
  {
    initials: "PS",
    quote:
      "The DSA module is different from every other course — it actually explains WHY we use each structure, not just how to code it.",
    name: "Priya S.",
    role: "SELF TAUGHT · SDE INTERN AT STARTUP",
  },
  {
    initials: "AM",
    quote:
      "Finished four internship tasks and the reviewer feedback on my code was brutally honest and incredibly helpful.",
    name: "Arjun M.",
    role: "B.TECH CSE · PLACED AT INFOSYS",
  },
];

export const faqs: FAQItem[] = [
  {
    question: "Do I need prior knowledge of OS or systems programming?",
    answer:
      "Basic programming knowledge (C/C++ or any compiled language) is enough. We cover everything from the ground up. If you know what a function is, you're ready.",
  },
  {
    question: "What language is used for the Mini OS project?",
    answer:
      "The bootloader is written in x86 Assembly and the kernel is written in C. We teach you exactly what you need to know — no prior Assembly experience required.",
  },
  {
    question: "How long do I have to complete the internship tasks?",
    answer:
      "You get 30 days from the date you unlock the Internship Track. Each task typically takes 2–5 hours. You can request a 15-day extension once per task if needed.",
  },
  {
    question: "Do companies care about the internship track?",
    answer:
      "Employers care about what you can build and explain. The track is designed so you leave with reviewed work and a clear story for interviews — not a generic badge.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "We offer a 7-day no-questions-asked refund if you haven't accessed more than 30% of the course content. After that, all sales are final.",
  },
  {
    question: "When does the cohort start?",
    answer:
      "Live lectures begin 20 April 2026. Enroll early to lock pricing and get pre-course material as soon as you sign up.",
  },
];
