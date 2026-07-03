import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "wave": "wave 1s ease-in-out infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "24px" },
        },
      },
    safelist: [
        { pattern: /^from-(pink|rose|blue|cyan|orange|red|violet|purple|emerald|teal|amber|yellow|indigo)/ },
        { pattern: /^to-(pink|rose|blue|cyan|orange|red|violet|purple|emerald|teal|amber|yellow|indigo)/ },
      ],
    },
  },
  plugins: [],
}
export default config