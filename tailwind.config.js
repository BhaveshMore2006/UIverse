/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030014',
        'secondary-background': '#0A0118',
        panel: 'rgba(20, 10, 40, 0.4)',
        'elevated-panel': 'rgba(30, 20, 60, 0.6)',
        border: 'rgba(139, 92, 246, 0.15)',
        'primary-text': '#F8F8FF',
        'secondary-text': '#A390E4',
        'muted-text': '#6B5C8D',
        'primary-accent': '#8B5CF6',
        'secondary-accent': '#06B6D4',
        'optional-highlight': '#D946EF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #8B5CF6, #06B6D4, #D946EF)',
        'cosmic-glow': 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        'stars-pattern': 'radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 50px 160px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 130px 80px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 160px 120px, #ffffff, rgba(0,0,0,0))'
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(139, 92, 246, 0.1)',
        'float': '0 8px 30px -4px rgba(6, 182, 212, 0.2), 0 0 15px rgba(139, 92, 246, 0.3)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.4), inset 0 0 10px rgba(139, 92, 246, 0.2)',
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
