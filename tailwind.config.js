/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        text: '#ececf1',
        primary: '#343541',
        secondary: '#444654',
        brand: '#10a37f'
      }
    }
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/typography')
  ]
}
