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
    },
  },
  plugins: [],
} satisfies Config;
