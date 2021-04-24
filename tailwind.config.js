module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                darkpurple: '#151515',
                pink: '#f25287',
                lightpink: '#f7d9d9',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require(`@tailwindcss/typography`)],
};
