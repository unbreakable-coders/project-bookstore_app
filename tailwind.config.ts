import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],

  darkMode: 'class',

  theme: {
    screens: {
      sm: '320px',
      md: '640px',
      lg: '1200px',
      xl: '1440px',
    },

    extend: {},
  },

  plugins: [],
};

export default config;
