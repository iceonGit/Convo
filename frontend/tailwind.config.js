/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                theme: {
                    primary: '#0A4D8E',
                    secondary: '#e2e2e2',
                    accent: '#1d4ed8',
                    neutral: '#0f77db',
                    'base-100': '#191919',
                    info: '#a8a29e',
                    success: '#a3e635',
                    warning: '#f59e0b',
                    error: '#b91c1c',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};
