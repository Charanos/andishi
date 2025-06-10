module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Properly reference CSS variables
        fontNunito: ["var(--font-nunito)", "sans-serif"],
        fontMontserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        dark: "#0B0D0E",
        offdark: "#121317",
        primary: "#00C6FB",
        purple: "#7F5CFF",
        magenta: "#FF00EA",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/typography'),
  ],
};