/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        'secondary-background': '#0A0A0F',
        panel: '#0F1018',
        'elevated-panel': '#141520',
        border: 'rgba(255,255,255,0.08)',
        'primary-text': '#F5F7FA',
        'secondary-text': '#A1A7B3',
        'muted-text': '#6B7280',
        'primary-accent': '#8B5CF6',
        'secondary-accent': '#06B6D4',
        'optional-highlight': '#EC4899',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #8B5CF6, #06B6D4)',
      },
    },
  },
  plugins: [],
}
