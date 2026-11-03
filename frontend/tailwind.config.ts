import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          50: "#FAF7F2",
          100: "#F4EFE6",
          200: "#E6DDCF",
          300: "#D3C5B2",
          400: "#B8A38B",
          500: "#9A8168",
          600: "#7E6751",
          700: "#64503E",
          800: "#4D3D30",
          900: "#362A21",
        },
        agri: {
          50: "#F2F7F4",
          100: "#E2EDE6",
          200: "#C4DCCF",
          300: "#9BC3B0",
          400: "#6EA78E",
          500: "#498C70",
          600: "#2D6A4F",
          700: "#1B4332",
          800: "#133125",
          900: "#0D1F17",
          950: "#07110C",
        },
        harvest: {
          50: "#FCF8F2",
          100: "#F8F0E2",
          200: "#EFE0C2",
          300: "#E4CA9C",
          400: "#D7B074",
          500: "#C58B37",
          600: "#A87027",
          700: "#86551E",
          800: "#684019",
          900: "#4E2E14",
        },
        ivory: {
          DEFAULT: "#FBF9F4",
          soft: "#F5F2EB",
          dark: "#EDE8DD",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
