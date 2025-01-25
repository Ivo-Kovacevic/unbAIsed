import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-primary": "var(--lightPrimary)",
        "light-secondary": "var(--lightSecondary)",
        "dark-primary": "var(--darkPrimary)",
        "dark-secondary": "var(--darkSecondary)",
        danger: "var(--danger)",
        pending: "var(--pending)",
        good: "var(--good)",
      },
    },
  },
  plugins: [],
} satisfies Config;
