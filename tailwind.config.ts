import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#155DFC",
        white: "#FAFAFA",
        black: "#1E1E1E",
      },
      fontFamily: {
        sans: ["var(--font-red-hat-display)", "sans-serif"],
      },
      fontSize: {
        // Desktop 1728
        "h1-1728": ["80px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-1728": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-1728": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "btn1-1728": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "btn2-1728": ["28px", { lineHeight: "1.2", fontWeight: "700" }],
        "p1-1728": ["28px", { lineHeight: "1.4", fontWeight: "400" }],
        "p2-1728": ["22px", { lineHeight: "1.4", fontWeight: "400" }],
        "footnote-1728": ["20px", { lineHeight: "1.4", fontWeight: "400" }],
        
        // Desktop 1440
        "h1-1440": ["64px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-1440": ["44px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-1440": ["26px", { lineHeight: "1.2", fontWeight: "700" }],
        "btn1-1440": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "btn2-1440": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "p1-1440": ["24px", { lineHeight: "1.4", fontWeight: "400" }],
        "p2-1440": ["20px", { lineHeight: "1.4", fontWeight: "400" }],
        "footnote-1440": ["18px", { lineHeight: "1.4", fontWeight: "400" }],
        
        // Tablet 744
        "h1-744": ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-744": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-744": ["20px", { lineHeight: "1.2", fontWeight: "700" }],
        "btn1-744": ["18px", { lineHeight: "1.2", fontWeight: "700" }],
        "btn2-744": ["18px", { lineHeight: "1.2", fontWeight: "700" }],
        "p1-744": ["20px", { lineHeight: "1.4", fontWeight: "400" }],
        "p2-744": ["16px", { lineHeight: "1.4", fontWeight: "400" }],
        "footnote-744": ["14px", { lineHeight: "1.4", fontWeight: "400" }],
        
        // Mobile 375
        "h1-375": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-375": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-375": ["20px", { lineHeight: "1.2", fontWeight: "700" }],
        "btn1-375": ["18px", { lineHeight: "1.2", fontWeight: "700" }],
        "btn2-375": ["18px", { lineHeight: "1.2", fontWeight: "700" }],
        "p1-375": ["20px", { lineHeight: "1.4", fontWeight: "400" }],
        "p2-375": ["16px", { lineHeight: "1.4", fontWeight: "400" }],
        "footnote-375": ["14px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      screens: {
        "mobile": "375px",
        "tablet": "744px",
        "desktop-1440": "1440px",
        "desktop-1728": "1728px",
      },
    },
  },
  plugins: [],
};
export default config;

