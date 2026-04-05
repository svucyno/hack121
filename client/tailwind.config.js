/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E11D48", // Rose 600 - Main brand color
          light: "#F43F5E",
          dark: "#BE123C",
        },
        secondary: {
          DEFAULT: "#312E81", // Indigo 900
          light: "#4338CA",
        },
        accent: {
          DEFAULT: "#10B981", // Emerald 500 for Safe/Go elements
        },
        warning: "#F59E0B",
        danger: "#DC2626",
        background: "#F8FAFC", // Slate 50
        surface: "#FFFFFF",
        text: {
          DEFAULT: "#0F172A", // Slate 900
          muted: "#64748B", // Slate 500
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px rgba(225, 29, 72, 0.5)', // primary glow
      }
    },
  },
  plugins: [],
}
