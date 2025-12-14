/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                aqua: '#00D2A8',
                surface: '#0a0a0a',
            }
        },
    },
    plugins: [],
}