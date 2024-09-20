/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['poppins', 'sans-serif'], 
        mukta : ["Mukta", "system-ui"],
        lobster: ["Lobster Two", "system-ui"],
        kanit: ["Kanit", "system-ui"],
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0' },
          '100%': { opacity: '1' },
        },
       
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none',    /* Firefox */
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',            /* Chrome, Safari */
        },
      })
    }
  ],
}