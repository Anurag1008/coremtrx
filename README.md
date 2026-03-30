# CoreMtrx — Course Landing Page

A production-ready React + TypeScript + Tailwind CSS landing page for the CoreMtrx systems programming cohort.

## Tech Stack

- **React 18** — UI library
- **TypeScript** — full type safety across all components and data
- **Tailwind CSS 3** — utility-first styling
- **Vite** — lightning-fast dev server & bundler

---

## Project Structure

```
coremtrx/
├── src/
│   ├── components/          # One file per section/component
│   │   ├── Navbar.tsx       # Fixed top nav with logo + links
│   │   ├── Cursor.tsx       # Custom animated cursor
│   │   ├── Hero.tsx         # Hero section with stats
│   │   ├── Ticker.tsx       # Animated scrolling ticker
│   │   ├── Pillars.tsx      # "4 Pillars" cards grid
│   │   ├── Curriculum.tsx   # Module breakdown cards
│   │   ├── OSSection.tsx    # Mini OS feature + terminal
│   │   ├── Internship.tsx   # Steps + certificate preview
│   │   ├── Pricing.tsx      # 3-tier pricing cards
│   │   ├── Testimonials.tsx # Student reviews
│   │   ├── FAQ.tsx          # Accordion FAQ
│   │   ├── FooterCTA.tsx    # CTA banner + footer
│   │   └── ui.tsx           # Shared: SectionHeader, Reveal
│   │
│   ├── data/
│   │   └── siteData.ts      # ALL site content in one place
│   │
│   ├── hooks/
│   │   └── index.ts         # useCursor, useScrollReveal
│   │
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   │
│   ├── App.tsx              # Root — composes all sections
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles + Tailwind directives
│
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Build for Production

```bash
npm run build
# Output goes to /dist
```

---

## Customising Content

All site text, prices, features, and data live in one file:

```
src/data/siteData.ts
```

Edit any of the exported arrays to update the page — no need to touch components.

### Key things to update before launch:
- `pricingTiers` — set your real prices
- `heroStats` — update cohort numbers
- `faqs` — add/remove questions
- `testimonials` — replace with real student reviews
- Footer email in `FooterCTA.tsx` (`hello@coremtrx.in`)
- Cohort start date in the FAQ answer

---

## Adding New Sections

1. Create `src/components/MySection.tsx`
2. Add its data type to `src/types/index.ts`
3. Add the data to `src/data/siteData.ts`
4. Import and render in `src/App.tsx`

---

## Custom Fonts

Fonts are loaded via Google Fonts in `src/index.css`:
- **Syne** — headings and display text
- **Space Mono** — labels, tags, monospace UI
- **DM Sans** — body copy

Configured in `tailwind.config.js` under `theme.extend.fontFamily`.
