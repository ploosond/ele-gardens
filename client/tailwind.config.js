/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#244d2a", // Example primary color
        secondary: "#296132", // Example secondary color
        accent: "#31793c", // Example accent color
        tertiary: "#429a4c", // New tertiary color
        neutral: "#f0f9f1", // Example neutral color
        one: "#f0f9f1",
        two: "#dcf1de",
        three: "#bde3c1",
      },
    },
  },
  plugins: [],
};
