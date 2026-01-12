/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "allerta-stencil": ["var(--font-allerta-stencil)", "sans-serif"],
        "indie-flower": ["var(--font-indie-flower)", "cursive"],
        "croissant-one": ["var(--font-croissant-one)", "serif"],
        "eagle-lake": ["var(--font-eagle-lake)", "serif"],
        "denk-one": ["var(--font-denk-one)", "sans-serif"],
        dhurjati: ["var(--font-dhurjati)", "sans-serif"],
      },
      colors: {
        citrushack: {
          cream: "#FFFAF6",
          darkBlue: "#2D3142",
          lightGray: "#BFC0C0",
          orange: "#EF8354",
          blueGray: "#4F5D75",
          beige: "#F0E0C6",
          red: "#FF0000",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
