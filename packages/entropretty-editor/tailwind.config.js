/** @type {import('tailwindcss').Config} */
import path from "node:path";

export default {
  content: [path.resolve(__dirname, "./src/**/*.{js,ts,jsx,tsx}")],
  theme: {
    extend: {},
  },
  plugins: [],
};
