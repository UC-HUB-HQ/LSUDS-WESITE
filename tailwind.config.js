/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tab: { max: "800px" },
      // => @media (max-width: 800px) { ... }
      mobile: { max: "430px" },
      // => @media (max-width: 430px) { ... }
    },
    fontFamily: {
      Poppins: ["Poppins", "serif"],
    },
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100vw)", opacity: "0" },
        },
      },
      animation: {
        slideIn: "slideIn 1s linear",
        slideOut: "slideOut 1s linear",
      },
      colors: {
        customRed: "#c60e20",
        softBlue: "#5368df",
      },
    },
  },
  plugins: [],
};