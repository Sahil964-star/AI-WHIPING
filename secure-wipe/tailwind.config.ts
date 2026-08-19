import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom palette
        warmBeige: {
          50: '#faf8f5',
          100: '#f0eade',
          200: '#e1d4c1',
          300: '#d1bca1',
          400: '#c2a182',
          500: '#b58b66',
          600: '#a37453',
          700: '#875d45',
          800: '#6f4e3c',
          900: '#5a4133',
        },
        peach: {
          50: '#fdf7f4',
          100: '#faece4',
          200: '#f3d4c4',
          300: '#ebb59f',
          400: '#e19071',
          500: '#d76f47',
          600: '#cc5732',
          700: '#aa4427',
          800: '#8a3922',
          900: '#72311f',
        },
        darkBrown: {
          500: '#5c4b41',
          600: '#4a3c34',
          700: '#3d312a',
          800: '#2e2520',
          900: '#211a17',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(92, 75, 65, 0.05)',
        'soft-lg': '0 8px 30px -4px rgba(92, 75, 65, 0.08)',
      }
    },
  },
  plugins: [],
};
export default config;
