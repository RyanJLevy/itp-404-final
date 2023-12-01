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
        "dark-primary": "#11696A",
        "dark-grey": "#2B2B2B",
        secondary: "#824670",
        "dark-secondary": "#5F3452",
      },
    },
  },
  plugins: [],
};
