// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../docs/**/*.mdx"], // my markdown stuff is in ../docs, not /src
  darkMode: ['class', '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
  theme: {
    extend: {
      fontSize: {
        '2xl': {
          'min': '1.5rem',
          'max': '1.75rem',
        },
        },
      colors: {
        "light-green" : "f5fae7"
      },
  },
  },
  plugins: [],
}