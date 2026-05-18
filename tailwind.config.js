/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                ivory: '#F7F4EF',
                porcelain: '#FFFEFB',
                mist: '#E8ECE7',
                rose: '#D7AFA5',
                clay: '#B66F5E',
                olive: '#53624D',
                ink: '#262522',
                smoke: '#6E6A64',
                line: '#DDD6CD',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
            },
            spacing: {
                '128': '32rem',
            },
        },
    },
    plugins: [],
};
