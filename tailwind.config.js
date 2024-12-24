/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: ["bg-yellow-400", "bg-violet-400", "bg-blue-400"],
  theme: {
    extend: {},
  },
  plugins: [],
}
