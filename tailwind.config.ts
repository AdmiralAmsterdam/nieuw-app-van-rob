import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          deep: "#1A3A1B",
          primary: "#2C5F2E"
        },
        earth: {
          dark: "#8B6914",
          gold: "#C8A84B"
        },
        glass: {
          white: "rgba(255,255,255,0.65)",
          border: "rgba(255,255,255,0.4)"
        }
      },
      borderRadius: {
        glass: "24px"
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.12)"
      },
      backdropBlur: {
        glass: "20px"
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(18px, -16px) scale(1.1)" }
        }
      },
      animation: {
        blob: "blob 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
