import type { CheckoutCourse } from "../types";

export const checkoutCourses: Record<string, CheckoutCourse> = {
  "core-access": {
    id: "core-access",
    badge: "Core Cohort 2026",
    title: "Core Access",
    subtitle:
      "Three stacked modules: systems intuition → interview-grade DSA → a real mini OS you built yourself. Hinglish-friendly, lifetime access.",
    notes: [
      "Live-style teaching + recordings — revisit anytime.",
      "Community + project support so you don’t stall mid-build.",
      "One payment → lifetime access to all three modules.",
    ],
    syllabusLinks: [{ label: "Full syllabus (Notion / PDF)", href: "#" }],
    outline: [
      {
        title: "🧩 Course breakdown — what you unlock",
        items: [
          "MODULE 01 (Weeks 1–2): Strong foundations — how computers & OS really run your code.",
          "MODULE 02 (Weeks 3–5): DSA that sticks — Striver 191–style grind, interview-ready.",
          "MODULE 03 (Weeks 6–10): Build your own OS — bootloader → kernel → memory & processes.",
        ],
      },
      {
        title: "MODULE 01 — Build strong foundations",
        items: [
          "How programs run inside your system — no fluff, just clarity.",
          "CPU, memory & execution: the model every serious dev needs.",
          "How the operating system stays in control — explained simply.",
          "You walk away knowing what’s on the screen isn’t magic — it’s mechanics.",
        ],
      },
      {
        title: "MODULE 02 — Crack DSA with confidence",
        items: [
          "Problem-solving muscle via a structured sheet (Striver 191–style path).",
          "Arrays, strings, linked lists — patterns you can reuse.",
          "Trees & graphs made approachable — including recursion & backtracking.",
          "Dynamic programming from basics to advanced — with a roadmap, not chaos.",
          "Built for interviews: you can explain your approach, not just paste code.",
        ],
      },
      {
        title: "MODULE 03 — Build your own OS",
        items: [
          "Write low-level code that talks to the machine.",
          "Bootloader from scratch → boot into your kernel.",
          "Memory, processes & scheduling — concepts you implement, not just read.",
          "System calls & real systems thinking — the shift to “system developer.”",
          "Capstone: a mini OS you can demo — rare on any resume.",
        ],
      },
    ],
    pricing: {
      planName: "Base plan",
      validityNote: "Lifetime access",
      priceInINR: 2999,
      discountInINR: 0,
    },
  },
  "systems-intern": {
    id: "systems-intern",
    badge: "Systems · OS · Mentorship",
    title: "Systems Intern Program",
    subtitle:
      "A systems-oriented track: machine → OS → kernel → internship tasks that look like real OS / infra work. Same 3-module cohort as Core Access, plus mentorship and shipped tasks you can show in interviews.",
    notes: [
      "Not a generic “web dev” internship — you’ll lean on C, memory, debugging, and low-level reasoning.",
      "After your mini OS ships → unlock 3–5 mentor-reviewed tasks (kernel-adjacent, perf, tooling, docs).",
      "Portfolio story that screams systems programming — not CRUD tutorials.",
    ],
    syllabusLinks: [{ label: "Download syllabus (PDF)", href: "#" }],
    detailedModules: [
      {
        moduleLabel: "MODULE 01",
        weekRange: "Weeks 1–2",
        accent: "emerald",
        emoji: "🧠",
        title: "Build strong foundations",
        headline: "Understand how computers actually run your programs — before you ever write kernel code.",
        themes: [
          "How programs run inside your system (load → execute → syscall).",
          "CPU, registers, memory, and the stack — the mental model that sticks.",
          "How the operating system stays in control: processes, context switches, and isolation.",
          "Clear explanations — no gatekeeping textbook wall of theory.",
        ],
        outcome: "You finally understand what’s happening behind the screen when you hit “Run.”",
        weeks: [
          {
            label: "Week 1",
            focus: "Execution model & hardware basics",
            bullets: [
              "From source to binary: how your code becomes something the CPU can execute.",
              "Registers, ALU, fetch–decode–execute — enough to read OS docs later without panic.",
              "Virtual memory preview: why every process “thinks” it owns RAM.",
              "Mini lab: trace a simple program with tools you’ll reuse in OS weeks.",
            ],
          },
          {
            label: "Week 2",
            focus: "Operating system as the control plane",
            bullets: [
              "Processes vs threads: what the scheduler actually schedules.",
              "User mode vs kernel mode — why syscalls are the only bridge you get.",
              "How interrupts let hardware talk to the OS (keyboard, timer, disk).",
              "Wrap-up: you can draw the path from keypress → interrupt → driver → your app.",
            ],
          },
        ],
      },
      {
        moduleLabel: "MODULE 02",
        weekRange: "Weeks 3–5",
        accent: "sky",
        emoji: "📊",
        title: "Crack DSA with confidence",
        headline: "Interview-grade problem solving with a Striver 191–style roadmap — patterns, not memorization.",
        themes: [
          "Structured problem-solving (arrays → graphs → DP) with complexity discipline.",
          "Trees & graphs made approachable — traversals, shortest paths, DSU.",
          "Recursion + backtracking + DP — easy → advanced with a clear ladder.",
          "You’ll explain trade-offs, not just paste code.",
        ],
        outcome: "You become interview-ready for product and infra teams that still ask real DSA.",
        weeks: [
          {
            label: "Week 3",
            focus: "Arrays, strings, linked lists",
            bullets: [
              "Two pointers, sliding window, prefix sums — the patterns that repeat in interviews.",
              "String manipulation without bugs; hashing for O(1) lookups.",
              "Linked lists: reverse, merge, detect cycles — muscle memory for whiteboards.",
              "Timed practice blocks + review of your own mistakes.",
            ],
          },
          {
            label: "Week 4",
            focus: "Trees, graphs, and recursion",
            bullets: [
              "Binary trees, BSTs, heaps — when to use which structure.",
              "Graphs: BFS/DFS, bipartite checks, cycle detection.",
              "Recursion & backtracking templates — subsets, permutations, N-Queens.",
              "Connect graphs to systems: dependency graphs, scheduling intuition.",
            ],
          },
          {
            label: "Week 5",
            focus: "Dynamic programming & interview sprint",
            bullets: [
              "DP patterns: 1D/2D grids, knapsack, LCS/LIS — with a repeatable thought process.",
              "Greedy vs DP — where people lose marks and how to avoid it.",
              "Mock interviews + feedback on clarity and complexity.",
              "Mini capstone: “explain this solution” recordings for your own review.",
            ],
          },
        ],
      },
      {
        moduleLabel: "MODULE 03",
        weekRange: "Weeks 6–10",
        accent: "violet",
        emoji: "💻",
        title: "Build your own OS",
        headline: "Step-by-step systems development — from bootloader to kernel to processes you can point to.",
        themes: [
          "Low-level programming: Assembly + C where it matters.",
          "Bootloader + kernel bring-up — you control the first instructions the CPU runs.",
          "Memory, scheduling, and syscalls — the spine of every real OS.",
          "Ship a runnable demo (e.g. QEMU) — your strongest portfolio piece.",
        ],
        outcome: "You move from “coder” → “system developer” with a repo that proves it.",
        weeks: [
          {
            label: "Week 6",
            focus: "Toolchain & first low-level programs",
            bullets: [
              "Cross-compiler, linker scripts, and bare-metal basics.",
              "Your first boot sector / “hello world” in a way that actually boots.",
              "Reading x86 docs and datasheets — slowly, with guidance.",
              "Set up QEMU so every build is one command away.",
            ],
          },
          {
            label: "Week 7",
            focus: "Bootloader from scratch",
            bullets: [
              "Real mode → protected mode transition (concept + implementation path).",
              "Load your kernel into memory — your boot code is your handshake with the CPU.",
              "Debug tips: when nothing prints, how to bisect the failure.",
              "Checkpoint: screen output or serial output that proves boot success.",
            ],
          },
          {
            label: "Week 8",
            focus: "Kernel bring-up & interrupts",
            bullets: [
              "Kernel entry: stack, segments, and basic C runtime in kernel space.",
              "IDT, interrupts, and exceptions — the OS’s nervous system.",
              "Timer interrupt: toward preemptive scheduling (even if minimal at first).",
              "Code review mindset: small, safe commits that always boot.",
            ],
          },
          {
            label: "Week 9",
            focus: "Memory & processes",
            bullets: [
              "Physical vs virtual memory — enough to implement a simple allocator.",
              "Process control blocks (PCB) and a minimal scheduler (e.g. round-robin).",
              "Context switching — the hardest idea in the course, taught in layers.",
              "Stretch: cooperative vs preemptive multitasking.",
            ],
          },
          {
            label: "Week 10",
            focus: "Syscalls, shell & capstone demo",
            bullets: [
              "System calls: user ↔ kernel boundary with a clean API.",
              "Minimal shell / command parser — proof your OS is interactive.",
              "Capstone rehearsal: record a demo, document your README, prep for Q&A.",
              "Final demo: run your OS in QEMU — the clip you’ll put on LinkedIn.",
            ],
          },
        ],
      },
    ],
    internshipSection: {
      title: "Systems internship track (after capstone)",
      items: [
        "Unlock 3–5 tasks that feel like real tickets: kernel debugging, perf fixes, tooling, or technical writing.",
        "Mentor reviews on your diffs — the same feedback loops you’d get on a small infra team.",
        "Mentor sign-off on portfolio-ready work — clear talking points for recruiters.",
        "Optional: portfolio review — how to talk about your OS project in interviews.",
      ],
    },
    pricing: {
      planName: "Systems Intern · lifetime",
      validityNote: "Lifetime access + internship track",
      priceInINR: 5999,
      discountInINR: 0,
    },
  },
};
