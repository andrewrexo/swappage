import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 20s ease infinite',
        'slow-ease': 'gradient-x 10s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-accent':
          'linear-gradient(to right, var(--accent-12), var(--accent-11), var(--accent-10))',
      },
      backgroundColor: {
        accent: 'var(--accent-11)',
        surface: 'var(--color-surface)',
      },
      colors: {
        accent: 'var(--accent-11)',
        'accent-light': 'var(--accent-8)',
        surface: 'var(--color-surface)',
      },
    },
  },
  plugins: [],
};
export default config;
