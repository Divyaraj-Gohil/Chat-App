/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat': "url('https://i.pinimg.com/474x/85/70/f6/8570f6339d3189c96e340d47a581d3b8.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}