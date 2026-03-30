import type {
  NavLink, Stat, Pillar, Module,
  OSFeature, InternshipStep, PricingTier,
  Testimonial, FAQItem,
} from "../types";

export const navLinks: NavLink[] = [
  { label: "CURRICULUM", href: "#curriculum" },
  { label: "OS PROJECT", href: "#os" },
  { label: "INTERNSHIP", href: "#internship" },
  { label: "PRICING", href: "#pricing" },
];

export const heroStats: Stat[] = [
  { value: "3", label: "CORE MODULES" },
  { value: "60+", label: "VIDEO HOURS" },
  { value: "∞", label: "ACCESS" },
  { value: "1", label: "REAL OS PROJECT" },
];

export const tickerItems: string[] = [
  "OPERATING SYSTEMS", "DATA STRUCTURES", "ALGORITHMS",
  "MINI OS PROJECT", "INTERNSHIP CERTIFICATE", "SYSTEM DESIGN",
  "MEMORY MANAGEMENT", "PROCESS SCHEDULING",
];

export const pillars: Pillar[] = [
  {
    icon: "⚙️",
    title: "Operating Systems",
    description:
      "Processes, threads, scheduling algorithms, memory management, file systems, and OS architecture — from theory to implementation.",
    accentColor: "before:bg-cyan-400",
  },
  {
    icon: "🌲",
    title: "Data Structures & Algorithms",
    description:
      "Arrays, linked lists, trees, graphs, heaps, hashing — implemented from scratch with time/space complexity deep dives.",
    accentColor: "before:bg-violet-500",
  },
  {
    icon: "🖥️",
    title: "Mini OS Build",
    description:
      "Write a bootloader, kernel, basic scheduler, and memory allocator. Ship a working mini OS as your portfolio capstone.",
    accentColor: "before:bg-rose-500",
  },
  {
    icon: "🏅",
    title: "Internship Track",
    description:
      "Complete curated real-world tasks, get mentor feedback, and earn a verified CoreMtrx Internship Certificate.",
    accentColor: "before:bg-yellow-400",
  },
];

export const modules: Module[] = [
  {
    number: "MODULE 01",
    weeks: "WEEKS 1–4",
    icon: "🧠",
    title: "Operating System Fundamentals",
    topics: [
      "Computer architecture & hardware basics",
      "Process management & lifecycle",
      "CPU scheduling algorithms (FCFS, SJF, Round Robin)",
      "Memory management: paging, segmentation",
      "Virtual memory & page replacement",
      "File system internals (FAT, inode)",
      "Deadlocks: detection, prevention, avoidance",
      "I/O systems & device drivers intro",
    ],
  },
  {
    number: "MODULE 02",
    weeks: "WEEKS 5–8",
    icon: "📐",
    title: "DSA from First Principles",
    topics: [
      "Arrays, strings, and complexity analysis",
      "Linked lists (singly, doubly, circular)",
      "Stacks, queues, deques",
      "Binary trees, BST, AVL trees",
      "Heaps, priority queues",
      "Hash maps and collision resolution",
      "Graphs: BFS, DFS, Dijkstra, Kruskal",
      "Dynamic programming patterns",
    ],
  },
  {
    number: "MODULE 03",
    weeks: "WEEKS 9–12",
    icon: "🖥️",
    title: "Build a Mini Operating System",
    topics: [
      "Bootloader from scratch (x86 Assembly + C)",
      "Setting up the kernel environment",
      "Interrupt handling & IDT setup",
      "Basic memory allocator (malloc/free)",
      "Process scheduler implementation",
      "Simple shell / command interpreter",
      "File system stub implementation",
      "Final demo: running your OS in QEMU",
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
    title: "Receive Your Certificate",
    description:
      "A verified CoreMtrx Internship Certificate issued with a unique credential ID. Share on LinkedIn.",
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
      { label: "Certificate", included: false },
      { label: "Mentor reviews", included: false },
    ],
    cta: "GET CORE ACCESS",
    ctaHref: "#",
  },
  {
    tier: "Full Stack Intern",
    price: "₹5,999",
    note: "one-time · lifetime access",
    features: [
      { label: "Everything in Core Access", included: true },
      { label: "Internship track unlocked", included: true },
      { label: "3–5 real task assignments", included: true },
      { label: "Mentor code reviews", included: true },
      { label: "Verified Certificate (LinkedIn)", included: true },
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
      { label: "Everything in Full Stack Intern", included: true },
      { label: "Group onboarding call", included: true },
      { label: "Custom cohort scheduling", included: true },
      { label: "Campus ambassador perks", included: true },
      { label: "Batch certificates", included: true },
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
      "Got my certificate after completing 4 internship tasks. The reviewer's feedback on my code was brutally honest and incredibly helpful.",
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
    question: "Is the certificate recognized by companies?",
    answer:
      "The certificate comes with a unique verifiable credential ID that employers can verify on our website. We are actively partnering with companies to give it weight.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "We offer a 7-day no-questions-asked refund if you haven't accessed more than 30% of the course content. After that, all sales are final.",
  },
  {
    question: "When does the cohort start?",
    answer:
      "Cohort 1.0 launches Q3 2025. Buy now to lock in the early-bird price. You'll get access to pre-course material immediately after enrollment.",
  },
];
