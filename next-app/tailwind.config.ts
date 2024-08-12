
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mob: {'max':"640px"},
      },
      colors: {
        background: "rgba(var(--background))",
        secondary: "rgba(var(--background-secondary))",
        warning: "rgba(var(--warning))",
        success: "rgba(var(--success))",
        danger: "rgba(var(--danger))",
        info: "rgba(var(--info))",
        text: "rgba(var(--text))",
        border: "rgba(var(--border))",
        contrast: "rgba(var(--contrast))",

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
