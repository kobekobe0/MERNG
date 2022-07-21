/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                12: '1fr 2fr',
                11: '1fr 3fr',
            },
        },
    },
    plugins: [],
}
