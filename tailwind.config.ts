import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      
      fontFamily: {
        custom:["Qwitcher Grypen", 'cursive']
        // sans: ["Lato", 'sans-serif'], // Using Google Font
        // custom: ['CustomFont', 'sans-serif'], // Using locally hosted font
      },
    },
  },
  plugins: [],
};
export default config;
