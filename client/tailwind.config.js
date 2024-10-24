/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bloodRed: "#BD2F23",
        greyDark: "#373837",
        greyBlack: "#080E12",
        greyMid: "#141617",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"], // Fixed the spelling and added value
      },
    },
  },
  plugins: [require("daisyui")],
};
