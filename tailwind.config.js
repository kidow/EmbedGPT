/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem'
      },
      colors: {
        text: '#ececf1',
        primary: '#343541',
        secondary: '#444654',
        brand: '#10a37f'
      },
      keyframes: {
        'fade-up': {
          from: {
            opacity: 0,
            transform: 'translate3d(0, -16px, 0)'
          },
          '60%': {
            opacity: 1
          },
          to: {
            transform: 'none'
          }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.2s linear'
      }
    }
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@tailwindcss/typography')
  ]
}
