/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "work-sans": ["Work Sans", "sans-serif"],
        "epilogue": ["Epilogue", "sans-serif"],
      }
    },
  },
  plugins: [],
};
