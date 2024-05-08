/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        orbus: {
          100: '#fde8c7', // Lighter shade
          200: '#fbda9f', // Light shade
          300: '#f9cc77', // Light-medium shade
          400: '#f7be4f', // Medium shade
          500: '#f5b027', // Default shade
          600: '#f3b91a', // Base color
          700: '#c19215', // Dark-medium shade
          800: '#8f6b11', // Dark shade
          900: '#5e450c' // Darker shade
        }
      }
    }
  },
  plugins: []
}
