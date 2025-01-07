/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
      },
      backdropFilter: {
        none: "none",
        blur: "blur(15px)",
      },
      colors: {
        "bg-color": "#101010",
        "on-bg-color": "#f2f2f2",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(315deg, #55efc4 0%, #000000 74%)",
      },
      rotate: {
        225: "225deg",
      },
    },
  },
  plugins: [],
};
