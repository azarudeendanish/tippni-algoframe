/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // enable dark mode via class
    theme: {
      extend: {
        colors: {
          primary: "rgb(var(--color-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        },
      },
    },
    plugins: [],
  }
  