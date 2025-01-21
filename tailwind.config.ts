import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-primary": "var(--lightPrimary)",
        "light-secondary": "var(--lightSecondary)",
        "dark-primary": "var(--darkPrimary)",
        "dark-secondary": "var(--darkSecondary)",
        danger: "var(--danger)",
      },
    },
  },
  plugins: [],
} satisfies Config;
