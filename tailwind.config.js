module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      screens: {
        standalone: { raw: '(display-mode: standalone)' },
      },
      animation: {
        'spin-2': 'spin 2s linear infinite',
        'spin-4': 'spin 4s linear infinite',
        'spin-funky': 'spin-funky 1.6s ease-in-out infinite both',
      },
      keyframes: {
        'spin-funky': {
          '0%, 25%': { transform: 'rotate(0)' },
          '50%, 75%': { transform: 'rotate(45deg)', 'stroke-dashoffset': 75 },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
