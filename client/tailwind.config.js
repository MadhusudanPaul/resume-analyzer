/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        surface: {
          900: "#080c14",
          800: "#0d1321",
          700: "#111827",
          600: "#1a2236",
          500: "#1e2d45",
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "score-fill": "score-fill 1.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(34,211,238,0.3)" },
          to: { boxShadow: "0 0 30px rgba(34,211,238,0.7), 0 0 60px rgba(34,211,238,0.3)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
    },
  },
  plugins: [],
};
