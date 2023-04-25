/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#892F8B', // define the primary color
        'secondary': '#F4E9FF', // define the secondary color
        'wordContainer': '#D9D9D9',
      },
    },
  },
  plugins: [],
}

