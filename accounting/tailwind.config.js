module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'organic-orange': {
          50: '#FFF4E8',
          100: '#FFE8D1',
          300: '#FF8C42',
          500: '#FF6B35',
          700: '#D4533A',
        },
        'forest': {
          50: '#F0F4E8',
          100: '#D9E5C5',
          900: '#2D5016',
        },
        'clay': '#8B7355',
        'cream': '#E8D5C4',
        'charcoal': '#3A3A3A',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'organic': '16px',
        'industrial': '4px',
      },
      boxShadow: {
        'organic': '0 8px 24px rgba(0,0,0,0.12)',
        'industrial': '0 2px 8px rgba(0,0,0,0.15)',
        'inner-organic': 'inset 0 2px 4px rgba(255,107,53,0.1)',
      },
    },
  },
  plugins: [],
};
