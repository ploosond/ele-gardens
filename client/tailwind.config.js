/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",

        surface: "var(--color-surface)",
        bg: "var(--color-bg)",
        muted: "var(--color-muted)",

        text: "var(--color-text)",
        "on-dark": "var(--color-on-dark)",
        "on-primary": "var(--color-on-primary)",
        "on-secondary": "var(--color-on-secondary)",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
