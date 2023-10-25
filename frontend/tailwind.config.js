/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabinetGrotesk: ["Cabinet Grotesk", "sans-serif"],
      },
      colors: {
        mainBlue: "#0066dd",
        darkBlue: "#0d2862",
      },
      screens: {
        xsm: "520px",
        xmd: "900px",
      },
    },
  },
  plugins: [],
};
