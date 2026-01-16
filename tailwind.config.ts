import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      backgroundImage: {
        "hero-pattern": "url('/hero/hero.png')",
      },
    },
  },
};

export default config;
