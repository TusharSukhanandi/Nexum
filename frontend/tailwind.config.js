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
        shrinkExpand: "1s cubic-bezier(0.25,1.5,0.3,1) forwards shrinkExpand ",
        shrinkExpandReverse: "1s cubic-bezier(0.25,1.5,0.5,1) forwards shrinkExpand reverse"
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0' },
          '100%': { opacity: '1' },
        },
        shrinkExpand: {
          "0%": { width: "80%" },
          "30%": { width: "85%" }, // Slight expansion
          "80%": { width: "49%" }, // Goes smaller than target
          "100%": { width: "50%" } // Final state
        }
       
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