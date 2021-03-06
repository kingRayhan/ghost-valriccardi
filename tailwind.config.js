const { gray } = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./**/*.hbs"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Raleway", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      borderWidth: {
        6: "6px",
      },
      colors: {
        accent: "var(--ghost-accent-color)",
        "dark-primary": {
          DEFAULT: "#202020",
          // dark: gray[200],
        },
        "dark-secondary": {
          DEFAULT: "#B1B9C4",
        },
        "dark-tertiary": {
          DEFAULT: "#C7D0DB",
          // dark: gray[400],
        },
        "dark-quaternary": {
          DEFAULT: "#F0F3F4",
          // dark: gray[400],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
