/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'zenaris': {
          50: '#F8F7F2',   // Light beige background
          100: '#F0EDE5',  // Slightly darker beige
          200: '#E8E4D8',  // Card backgrounds
          300: '#D4CFC0',  // Borders
          400: '#A8A394',  // Light gray text
          500: '#6B6759',  // Medium gray text
          600: '#4A4639',  // Dark gray text
          700: '#2D2A1F',  // Very dark text
          800: '#1A1810',  // Almost black
        },
        'accent': {
          blue: '#1E40AF',    // Primary action blue
          green: '#059669',   // Success/positive
          orange: '#EA580C',  // Warning/medium
          red: '#DC2626',     // Danger/severe
          yellow: '#D97706',  // Mild/caution
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
} 