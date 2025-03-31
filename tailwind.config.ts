import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'bg-dark': '#050E05',
        'text-light': '#EAFFE5',
        'text-dark': '#000000',
        'bg-primary': '#2D8147',
        'bg-card': '#0B130B',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '10%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fromLeft: {
          '0%': {
            left: '-75px',
          },
          '100%': {
            left: '0px',
          },
        },
        fromRight: {
          '0%': {
            right: '-50px',
          },
          '100%': {
            right: '0px',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1.5s forwards',
        fromLeft: 'fromLeft 1s forwards',
        fromRight: 'fromRight 1s forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
