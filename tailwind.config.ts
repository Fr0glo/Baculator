import type { Config } from "tailwindcss";

const config: Config = {
  // Dark mode is toggled by adding the `dark` class to <html>.
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary: a confident deep teal/green — a tasteful nod to Morocco
        // without leaning on cliché red/green flags.
        brand: {
          50: "#ecfdf6",
          100: "#d1faea",
          200: "#a7f3d6",
          300: "#6ee7bd",
          400: "#34d39e",
          500: "#10b981",
          600: "#059467",
          700: "#047653",
          800: "#065f44",
          900: "#064e3a",
          950: "#022c22",
        },
        // Accent: warm amber for highlights, CTAs and energy.
        accent: {
          50: "#fff8eb",
          100: "#ffedc6",
          200: "#ffd988",
          300: "#ffc14d",
          400: "#ffa91f",
          500: "#f98e06",
          600: "#dd6a02",
          700: "#b74a06",
          800: "#943a0c",
          900: "#7a310d",
          950: "#461702",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 4px 16px rgba(16,24,40,0.06)",
        "card-lg": "0 2px 4px rgba(16,24,40,0.05), 0 12px 32px rgba(16,24,40,0.10)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        "scale-in": "scale-in 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
