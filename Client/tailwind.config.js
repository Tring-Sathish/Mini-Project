/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primarytext': '#333232',
        'primary': '#0063B2',
        'lighttext': '#C3C3C4',
        'secondrytext': '#888888',
        'secondry': '#2687F0',
        'background': '#FAFAFC',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
