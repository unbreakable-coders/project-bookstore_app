/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      sm: "320px",

      md: "640px",

      lg: "1200px",

      xl: "1440px",
    },

    extend: {
    },
  },

  plugins: [],
};
