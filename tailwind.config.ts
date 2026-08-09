import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF3FA",
          100: "#DCE6F3",
          200: "#B9CBE3",
          300: "#8FA8CC",
          400: "#5E7FB0",
          500: "#3A5A8C",
          600: "#24426E",
          700: "#173054",
          800: "#0E2140",
          900: "#0B1D3A",
          950: "#060F22",
          DEFAULT: "#0B1D3A",
          dark: "#071229",
          darker: "#040A1A",
          light: "#EEF3FA",
        },
        accent: {
          50: "#FFF3EB",
          100: "#FEE3D1",
          200: "#FCC7A3",
          300: "#F9A36A",
          400: "#F67F3B",
          500: "#F05E1B",
          600: "#DE4A0E",
          700: "#B83B09",
          800: "#932F0A",
          900: "#76290C",
          DEFAULT: "#F05E1B",
          dark: "#DE4A0E",
          darker: "#B83B09",
        },
        water: {
          50: "#ECFCFF",
          100: "#CFF7FE",
          200: "#A5EEFC",
          300: "#67E0F9",
          400: "#22C9EF",
          500: "#06ACD5",
          600: "#089AB4",
          700: "#0E7A92",
          800: "#166276",
          900: "#185164",
        },
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
      },
      fontFamily: {
        heading: [
          "var(--font-plus-jakarta)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        body: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        18: "4.5rem",
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        card: "1.25rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(6, 15, 34, 0.06), 0 4px 16px rgba(6, 15, 34, 0.08)",
        "card-hover":
          "0 2px 4px rgba(6, 15, 34, 0.08), 0 16px 40px rgba(6, 15, 34, 0.16)",
        "glow-accent":
          "0 10px 30px -8px rgba(240, 94, 27, 0.55)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(115deg, rgba(6, 15, 34, 0.96) 0%, rgba(11, 29, 58, 0.78) 40%, rgba(11, 29, 58, 0.25) 75%, rgba(6, 15, 34, 0.1) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
