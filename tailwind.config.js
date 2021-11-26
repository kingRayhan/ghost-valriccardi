const { gray } = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./**/*.hbs"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: "var(--ghost-accent-color)",
        "dark-primary": {
          DEFAULT: gray[600],
          dark: gray[200],
        },
        "dark-secondary": {
          DEFAULT: gray[500],
          dark: gray[300],
        },
        "dark-tertiary": {
          DEFAULT: gray[400],
          dark: gray[400],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
