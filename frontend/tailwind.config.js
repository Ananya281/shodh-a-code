/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
extend: {
  boxShadow: {
    smooth: "0 0 10px rgba(0,0,0,0.2)",
  },
}
  },
  plugins: [],
}

