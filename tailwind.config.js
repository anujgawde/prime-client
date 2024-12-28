/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5465FF",
        lavender: "#788BFF",
        danger: "#CC0000",
        "lavender-light": "#BFD7FF",
        "background-grey": "#E7E7E7",
        "document-primary": "#4285F4",
        "template-primary": "#ff5005",
      },
    },
  },
  plugins: [],
};
