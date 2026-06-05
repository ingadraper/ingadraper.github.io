/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                ivory: '#FAF7F2',
                blush: '#F5E6E0',
                dusty: '#D4A5A0',
                'deep-rose': '#B05070',
                burgundy: '#7A2E48',
                porcelain: '#FAF7F2',
                mist: '#F5E6E0',
                ink: '#7A2E48',
                smoke: '#5F4D53',
                line: '#D4A5A0',
                charcoal: '#7A2E48',
                slate: '#B05070',
                frosted: '#F5E6E0',
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
