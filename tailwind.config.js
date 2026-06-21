/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                ivory: '#FDFAF5',
                blush: '#F0DDD8',
                dusty: '#C4808E',
                'deep-rose': '#B06878',
                burgundy: '#2C2C2C',
                porcelain: '#F7EDEA',
                mist: '#F0DDD8',
                ink: '#2C2C2C',
                smoke: '#5A4A4A',
                line: '#E1C4BE',
                charcoal: '#2C2C2C',
                slate: '#C4808E',
                frosted: '#FFFDF8',
            },
            fontFamily: {
                sans: ['Jost', 'system-ui', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
                subheading: ['Cormorant Garamond', 'serif'],
            },
            spacing: {
                '128': '32rem',
            },
        },
    },
    plugins: [],
};
