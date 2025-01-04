/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "bg-yellow-50",
    "text-yellow-800",
    "ring-yellow-600/20",
    "bg-purple-50",
    "text-purple-700",
    "ring-purple-700/10",
    "bg-blue-50",
    "text-blue-700",
    "ring-blue-700/10",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
