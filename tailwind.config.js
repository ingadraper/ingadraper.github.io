/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                ivory: '#FAF7F2',
                blush: '#F6EAE4',
                dusty: '#C99A96',
                'deep-rose': '#B05070',
                burgundy: '#7A2E48',
                porcelain: '#FBF8F4',
                mist: '#EFE4DD',
                ink: '#31272B',
                smoke: '#64565A',
                line: '#D9B9B4',
                charcoal: '#2B2426',
                slate: '#786D65',
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
