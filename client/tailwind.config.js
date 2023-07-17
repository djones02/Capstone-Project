/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light_blue: "#3D76E1",
        dark_blue: "#2B6ADE",
        black: "#483D3F",
        white: "#F5F5F5",
        ice_blue: "#83A8EC",
        dark_red: "#FF3333",
        light_red: "#FF5C5C",
        gray: "#584B4D"
      }
    },
  },
  plugins: [require("daisyui")],
}

