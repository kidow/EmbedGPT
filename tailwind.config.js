/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: { text: '#ececf1', primary: '#343541', secondary: '#444654' }
    }
  },
  plugins: [require('prettier-plugin-tailwindcss')]
}
