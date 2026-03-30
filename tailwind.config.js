/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        syne: ["'Figtree'", "sans-serif"],
      },
      colors: {
        brand: {
          bg:       "#050810",
          surface:  "#0b1120",
          surface2: "#101828",
          border:   "#1e2d45",
          card:     "#0d1829",
          muted:    "#6b7a99",
          text:     "#e8edf5",
          cyan:     "#00e5ff",
          violet:   "#7b61ff",
          rose:     "#ff4d6d",
          yellow:   "#ffbe0b",
        },
      },
      animation: {
        tick:  "tick 20s linear infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        tick: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
