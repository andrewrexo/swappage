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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
