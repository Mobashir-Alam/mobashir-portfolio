/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        bg: "#0a0a0f",
        surface: "#111118",
        surface2: "#16161f",
        accent: "#6c63ff",
        accent2: "#a78bfa",
        green: "#22d3a5",
        muted: "#7b7b9a",
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        "drift-a": "drift-a 18s ease-in-out infinite alternate",
        "drift-b": "drift-b 18s ease-in-out infinite alternate",
        "fade-up": "fade-up 0.6s ease forwards",
      },
      keyframes: {
        "pulse-dot": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "drift-a": {
          from: { transform: "translate(0,0) scale(1)" },
          to: { transform: "translate(60px,40px) scale(1.1)" },
        },
        "drift-b": {
          from: { transform: "translate(0,0) scale(1)" },
          to: { transform: "translate(-60px,-40px) scale(1.1)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
