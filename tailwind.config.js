/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      colors: {
        bg: "#0a0a0f",
        "bg-elevated": "#13131f",
        "bg-input": "#0d0d14",
        "text-primary": "#ffffff",
        "text-secondary": "#a0a0b0",
        "text-muted": "#555560",
        accent: "#c9a227",
        "accent-hover": "#e8c93a",
        border: "#1e1e2d",
        "border-subtle": "#151520",
        success: "#4ade80",
        error: "#f87171",
        info: "#60a5fa",
      },
    },
  },
  plugins: [],
}