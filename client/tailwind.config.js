/ @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Correction de la syntaxe du chemin
  theme: {
    extend: {
      colors: {
        bloodRed: "#BD2F23",
        greyDark: "#373837",
        greyBlack: "#080E12",  // Added missing #
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
