import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        umarti: {
          navy: "#1e3a8a",
          navyDark: "#0f2559",
          orange: "#f97316",
          cream: "#f5efe6",
        },
      },
    },
  },
  plugins: [],
};

export default config;
