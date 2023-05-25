/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // If using the src directory, add:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

