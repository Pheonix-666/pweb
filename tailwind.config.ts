import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        surface: "#111113",
        elevated: "#17171A",
        "border-hairline": "rgba(255, 255, 255, 0.08)",
        "border-hairline-light": "rgba(255, 255, 255, 0.14)",
        primary: "#F2F0EB",
        muted: "#8A8A90",
        tungsten: {
          DEFAULT: "#E8A33D",
          hover: "#F3B353",
          dark: "#C68222",
        },
        rec: "#E5484D",
        status: {
          green: "#30A46C",
        },
      },
      borderRadius: {
        DEFAULT: "2px",
        none: "0px",
        sm: "1px",
        md: "2px",
        lg: "2px",
        xl: "2px",
        "2xl": "2px",
        full: "9999px",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Instrument Serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter Tight", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        syncopate: ["var(--font-syncopate)", "Syncopate", "sans-serif"],
        outfit: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.05em",
        widest: "0.15em",
      },
      maxWidth: {
        container: "1440px",
      },
      animation: {
        "pulse-rec": "recBlink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-status": "statusGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        grain: "grainNoise 8s steps(10) infinite",
        marquee: "marquee-left 35s linear infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        recBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        statusGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.85)" },
        },
        grainNoise: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
