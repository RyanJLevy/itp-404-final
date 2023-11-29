const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "#FAFAFA",
        primary: "#0A9396",
        "dark-grey": "#2B2B2B",
        "secondary-purple": "#6930c3",
      },
    },
  },
  plugins: [],
};
