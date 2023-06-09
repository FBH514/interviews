/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.html',
        './src/**/*.jsx',
        './src/**/*.js',
        './src/**/*.ts',
        './src/**/*.tsx'
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Oxygen', 'sans-serif']
            },
            boxShadow: {
                'lg': '0 10px 10px rgba(0, 0, 0, 0.2)'
            },
            height: {
                'landing': 'calc(100vh - 80px)',
                'mobile': 'calc(100vh - 144px)'
            },
            gridTemplateColumns: {
                'grid-cols-auto': 'repeat(auto-fit, minmax(350px, 1fr))',
                'client-card': 'repeat(auto-fit, minmax(64px, 1fr))',
                'reverse': 'reverse 1fr 1fr'
            },
        },
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px'
        }
    },
    plugins: [],
}