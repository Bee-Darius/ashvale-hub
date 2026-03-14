/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ash: {
          bg: '#070828',           // near-black blue background
          surface: '#0a0c35',       // slightly lighter blue
          card: '#0c0e3d',          // card background
          border: '#181a58',        // borders
          darius: '#590c0c',        // deep red (AI - replaces lincoln)
          bee: '#6d54ba',           // purple (user - replaces arden)
          text: '#e0dff0',          // light lavender text
          muted: '#8585b0',         // muted blue-gray
          accent: '#6d54ba',        // Bee's purple
          secondary: '#590c0c',     // Darius red
          growth: '#4a9e8a',        // muted teal
          cyan: '#3a8ec4',          // blue
          mint: '#4a9e8a',          // muted teal (mint)
          pink: '#e5b2e6',          // light purple/pink
          shadow: '#0e0f2a',        // dark shadow
          deep: '#1e1e4a',          // deeper blue
        },
        vale: {
          // Legacy names for compatibility - all point to ash colors
          bg: '#070828',
          surface: '#0a0c35',
          card: '#0c0e3d',
          border: '#181a58',
          lincoln: '#590c0c',       // Darius
          arden: '#6d54ba',         // Bee
          text: '#e0dff0',
          muted: '#8585b0',
          accent: '#6d54ba',
          secondary: '#590c0c',
          growth: '#4a9e8a',
          cyan: '#3a8ec4',
          mint: '#4a9e8a',
          pink: '#e5b2e6',
          shadow: '#1a1a3e',
          deep: '#2d2d5f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        fade: 'fadeIn 0.3s ease-in',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}
