import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          warmWhite: '#FAF8F5',
          maroon: '#6B1D2F',
          darkMaroon: '#4A121F',
          gold: '#D4AF37',
          darkGold: '#B8962D',
          beige: '#E8E2D5',
          lightBeige: '#F3EFEA',
          charcoal: '#1A1A1A',
          muted: '#666666',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 10px 30px -10px rgba(107, 29, 47, 0.15)',
        gold: '0 8px 25px -8px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
