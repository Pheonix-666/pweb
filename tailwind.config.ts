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
        background: "#000000",
        surface: "#080610",
        elevated: "#100C1A",
        "border-hairline": "rgba(243, 232, 255, 0.06)",
        "border-hairline-light": "rgba(168, 85, 247, 0.15)",
        primary: "#F3E8FF",
        muted: "#94A3B8",
        tungsten: {
          DEFAULT: "#A855F7",
          hover: "#C084FC",
          dark: "#7C3AED",
        },
        accent: {
          DEFAULT: "#A855F7",
          hover: "#C084FC",
          dark: "#7C3AED",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F5D77F",
          dark: "#AA7C11",
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
        lg: "4px",
        xl: "6px",
        "2xl": "8px",
        full: "9999px",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
        octagonal: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
        chakra: ["var(--font-chakra)", "Chakra Petch", "sans-serif"],
        unbounded: ["var(--font-unbounded)", "Unbounded", "sans-serif"],
        syne: ["var(--font-syne)", "Syne", "sans-serif"],
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
      },
    },
  },
  plugins: [],
};

export default config;
