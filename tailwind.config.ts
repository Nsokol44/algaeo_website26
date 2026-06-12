import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        algaeo: {
          "green-dark": "var(--green-dark)",
          "green-mid": "var(--green-mid)",
          "green-light": "var(--green-light)",
          "green-pale": "var(--green-pale)",
          "off-white": "var(--off-white)",
          "text-dark": "var(--text-dark)",
          "text-mid": "var(--text-mid)",
          "text-light": "#8a9693",
          "accent-blue": "#004a99",
          border: "var(--border)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "a-sm": "0 1px 4px rgba(0,0,0,0.06)",
        "a-md": "0 4px 16px rgba(0,0,0,0.08)",
        "a-lg": "0 12px 40px rgba(0,0,0,0.12)",
      },
      borderRadius: { card: "12px", btn: "6px" },
      maxWidth: { container: "1200px" },
    },
  },
  plugins: [],
};
export default config;
