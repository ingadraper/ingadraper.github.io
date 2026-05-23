/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                ivory: '#EEEEEE',
                porcelain: '#FFFFFF',
                mist: '#EEEEEE',
                ink: '#0C0F24',
                smoke: '#686672',
                line: '#EEEEEE',
                charcoal: '#31303F',
                slate: '#506CAA',
                frosted: '#91A3C9',
            },
            fontFamily: {
                sans: ['Roboto', 'system-ui', 'sans-serif'],
                display: ['Manrope', 'system-ui', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
            },
        },
    },
    plugins: [],
};
